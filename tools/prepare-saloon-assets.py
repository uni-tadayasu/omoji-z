#!/usr/bin/env python3
"""Restore the exact supplied Grand Saloon and its rendered images on the work branch.

The transient base64 transfer is validated completely before production paths are
written. This helper makes no network requests and does not publish anything.
"""
from __future__ import annotations
import argparse
import base64
import hashlib
import json
from pathlib import Path
import re
import struct
import tempfile

BASE = '45f245c6d7051b589e03710dfcdc47d8ec83817c'
MODEL = 'assets/models/grand-saloon.glb'
MODEL_BYTES = 24970372
MODEL_SHA = '730254e6e74205c927bb2da14abe97419406df5ea09bc4e284eabec71e3743cd'
ALLOWED = {MODEL, 'assets/models/saloon-sprites.webp', 'assets/art/grand-saloon.webp'}
PART = re.compile(r'^\.saloon-transfer/part-[0-9]{3,5}\.txt$')
HASH = re.compile(r'^[0-9a-f]{64}$')
TRANSFER = '.saloon-transfer'


def checked_path(root: Path, name: str) -> Path:
    path = root / name
    current = root
    for component in Path(name).parts:
        current = current / component
        if current.is_symlink():
            raise ValueError(f'Symlink is not allowed: {name}')
    return path


def restore(root: Path) -> dict:
    root = root.resolve()
    manifest_path = checked_path(root, TRANSFER + '/manifest.json')
    if manifest_path.stat().st_size > 65536:
        raise ValueError('Transfer manifest is too large.')
    manifest = json.loads(manifest_path.read_text(encoding='utf-8'))
    if manifest.get('version') != 1 or manifest.get('baseCommit') != BASE:
        raise ValueError('Unexpected model transfer revision.')
    entries = manifest.get('files')
    if not isinstance(entries, list) or len(entries) != len(ALLOWED):
        raise ValueError('The transfer must contain the model and its two rendered images.')
    prepared = {}
    part_names = set()
    for entry in entries:
        name = entry.get('path')
        size = entry.get('bytes')
        digest = entry.get('sha256')
        if name not in ALLOWED or name in prepared or entry.get('encoding') != 'base64':
            raise ValueError('Unexpected or duplicate production asset.')
        if type(size) is not int or not 100 < size <= 32 * 1024 * 1024 or not isinstance(digest, str) or not HASH.fullmatch(digest):
            raise ValueError('Invalid production asset size or checksum.')
        if name == MODEL and (size != MODEL_BYTES or digest != MODEL_SHA):
            raise ValueError('The supplied GLB must remain byte-for-byte unchanged.')
        if name != MODEL and size > 8 * 1024 * 1024:
            raise ValueError('Rendered image exceeds the transfer budget.')
        parts = entry.get('parts')
        if not isinstance(parts, list) or not 1 <= len(parts) <= 80:
            raise ValueError('Invalid transfer chunk list.')
        encoded = []
        encoded_size = 0
        for part in parts:
            if not isinstance(part, str) or not PART.fullmatch(part) or part in part_names:
                raise ValueError('Unexpected or reused transfer chunk path.')
            part_names.add(part)
            path = checked_path(root, part)
            if not path.is_file() or not 1 <= path.stat().st_size <= 2 * 1024 * 1024:
                raise ValueError('Missing or oversized transfer chunk.')
            content = path.read_text(encoding='ascii')
            encoded_size += len(content)
            if encoded_size > ((size + 2) // 3) * 4:
                raise ValueError('Encoded asset exceeds its declared size.')
            encoded.append(content)
        data = base64.b64decode(''.join(encoded), validate=True)
        if len(data) != size or hashlib.sha256(data).hexdigest() != digest:
            raise ValueError(f'Transfer checksum differs: {name}')
        if name == MODEL:
            if struct.unpack_from('<4sII', data) != (b'glTF', 2, MODEL_BYTES):
                raise ValueError('Invalid original GLB container.')
        elif not (data[:4] == b'RIFF' and data[8:12] == b'WEBP'):
            raise ValueError('Invalid rendered WebP image.')
        checked_path(root, name)
        prepared[name] = data
    if set(prepared) != ALLOWED:
        raise ValueError('Incomplete production asset set.')
    expected = part_names | {TRANSFER + '/manifest.json'}
    actual = set()
    for path in (root / TRANSFER).iterdir():
        if path.is_symlink() or not path.is_file():
            raise ValueError('Unexpected directory or symlink in transfer.')
        actual.add(path.relative_to(root).as_posix())
    if actual != expected:
        raise ValueError('Unexpected or missing transfer files.')
    checked_path(root, 'assets/asset-inventory.json')
    if (root / 'assets').exists() and any(path.is_symlink() for path in (root / 'assets').rglob('*')):
        raise ValueError('Asset inventory cannot follow a symlink.')
    # All sources and destinations are validated before any production file changes.
    for name, data in prepared.items():
        path = checked_path(root, name)
        path.parent.mkdir(parents=True, exist_ok=True)
        with tempfile.NamedTemporaryFile(dir=path.parent, prefix='.' + path.name, suffix='.tmp', delete=False) as temporary:
            temporary.write(data)
            temporary_path = Path(temporary.name)
        try:
            temporary_path.replace(path)
        finally:
            temporary_path.unlink(missing_ok=True)
    inventory = []
    for path in sorted((root / 'assets').rglob('*')):
        if path.is_symlink():
            raise ValueError('Asset inventory cannot follow a symlink.')
        if path.is_file() and path.name != 'asset-inventory.json':
            data = path.read_bytes()
            inventory.append({'path': path.relative_to(root).as_posix(), 'bytes': len(data), 'sha256': hashlib.sha256(data).hexdigest()})
    (root / 'assets/asset-inventory.json').write_text(json.dumps({
        'schemaVersion': 1, 'edition': 'classic-remaster-saloon-4.3', 'baseCommit': BASE, 'files': inventory,
    }, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    for name in expected:
        (root / name).unlink()
    (root / TRANSFER).rmdir()
    return {'restoredAssets': len(prepared), 'inventoryEntries': len(inventory), 'modelSha256': MODEL_SHA, 'transferRemoved': True}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root', type=Path, default=Path(__file__).resolve().parents[1])
    args = parser.parse_args()
    print(json.dumps(restore(args.root), ensure_ascii=False))


if __name__ == '__main__':
    main()
