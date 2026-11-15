#!/usr/bin/env python3
"""Restore verified original environment art and build the v3 soundtrack on its work branch."""
from __future__ import annotations
import base64
import hashlib
import json
from pathlib import Path, PurePosixPath
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
DESCRIPTOR = ROOT / '.omoji-v3-build.json'
BASE = '93733a076aa15f437793452d6aa270f39a01b48e'
ALLOWED_ART = {'assets/art/hero-v3.webp', 'assets/art/sky-v3-forest.webp',
               'assets/art/sky-v3-alpine.webp', 'assets/art/sky-v3-coast.webp',
               'assets/art/sky-v3-snow.webp', 'assets/art/foliage-v3.webp'}

def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

def restore_art(payload):
    entries = payload.get('art', [])
    if not isinstance(entries, list) or len(entries) > len(ALLOWED_ART):
        raise ValueError('Invalid original artwork transfer.')
    prepared = {}
    for entry in entries:
        name = entry.get('path')
        if name not in ALLOWED_ART or name in prepared or PurePosixPath(name).is_absolute():
            raise ValueError('Unexpected original artwork path.')
        path = ROOT / name
        if any(parent.is_symlink() for parent in [path, *path.parents] if parent != ROOT.parent):
            raise ValueError('Artwork destination contains a symlink.')
        data = base64.b64decode(entry['content'], validate=True)
        if not 100 < len(data) < 4 * 1024 * 1024 or not data.startswith(b'RIFF') or data[8:12] != b'WEBP':
            raise ValueError('Invalid WebP payload.')
        if hashlib.sha256(data).hexdigest() != entry['sha256']:
            raise ValueError('Original artwork checksum differs.')
        prepared[path] = data
    for path, data in prepared.items():
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_bytes(data)
    print(f'Restored {len(prepared)} original WebP assets with SHA-256 verification.', flush=True)

def main():
    payload = json.loads(DESCRIPTOR.read_text())
    if payload.get('edition') != 3 or payload.get('baseCommit') != BASE:
        raise ValueError('Unexpected v3 build descriptor.')
    restore_art(payload)
    subprocess.run([sys.executable, 'tools/compose-audio.py', '--jobs', '2'], cwd=ROOT, check=True)
    subprocess.run(['node', 'tools/test-soundtrack.mjs'], cwd=ROOT, check=True)
    subprocess.run([sys.executable, 'tools/generate-pages.py'], cwd=ROOT, check=True)
    entries = [{'path': path.relative_to(ROOT).as_posix(), 'bytes': path.stat().st_size,
                'sha256': digest(path)} for path in sorted((ROOT / 'assets').rglob('*'))
               if path.is_file() and path.name != 'asset-inventory.json']
    inventory = {'schemaVersion': 1, 'edition': 'driving-studio-v3', 'baseCommit': BASE, 'files': entries}
    (ROOT / 'assets/asset-inventory.json').write_text(json.dumps(inventory, ensure_ascii=False, indent=2) + '\n')
    DESCRIPTOR.unlink()
    print(f'Built v3 production assets; {len(entries)} inventory entries. Temporary descriptor removed.', flush=True)

if __name__ == '__main__':
    main()
