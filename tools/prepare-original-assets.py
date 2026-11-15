#!/usr/bin/env python3
"""Restore verified original artwork and rebuild the sample-free soundtrack.

Used by prepare-original-assets.yml on the isolated original-design branch.
This helper never handles credentials, edits workflows, or pushes Git commits.
Only the temporary .omoji-transfer directory is removed when preparation passes.
"""
from __future__ import annotations
import base64
import hashlib
import json
import os
from pathlib import Path, PurePosixPath
import re
import shutil
import subprocess
import sys
import tempfile

BASE_COMMIT = 'd56dadaef293b97f88d9f017d8e65701be98e721'
EXPECTED_ART = frozenset({
    'assets/art/hero-photo.webp', 'assets/art/share.png',
    'assets/art/icon-192.png', 'assets/art/icon-512.png', 'assets/art/favicon.ico',
})
HASH = re.compile(r'^[0-9a-f]{64}$')
MAX_TRANSFER_BYTES = 32 * 1024 * 1024


def checked_destination(root: Path, name: str) -> Path:
    if not isinstance(name, str) or not name or '\\' in name or '\x00' in name or ':' in name:
        raise ValueError(f'Unsafe transfer path: {name!r}')
    path = PurePosixPath(name)
    if path.is_absolute() or any(part in {'', '.', '..'} for part in name.split('/')):
        raise ValueError(f'Unsafe transfer path: {name!r}')
    current = root
    for index, part in enumerate(path.parts):
        current = current / part
        if current.is_symlink():
            raise ValueError(f'Symlink is not allowed: {name}')
        if current.exists() and index < len(path.parts) - 1 and not current.is_dir():
            raise ValueError(f'Parent is not a directory: {name}')
    if current.exists() and not current.is_file():
        raise ValueError(f'Destination is not a regular file: {name}')
    return current


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open('rb') as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b''):
            digest.update(chunk)
    return digest.hexdigest()


def atomic_bytes(path: Path, data: bytes):
    path.parent.mkdir(parents=True, exist_ok=True)
    descriptor, temporary_name = tempfile.mkstemp(prefix='.omoji-asset-', dir=path.parent)
    temporary = Path(temporary_name)
    try:
        with os.fdopen(descriptor, 'wb') as output:
            output.write(data)
        os.chmod(temporary, 0o644)
        os.replace(temporary, path)
    finally:
        temporary.unlink(missing_ok=True)


def restore_art(root: Path) -> int:
    transfer = checked_destination(root, '.omoji-transfer/art.json')
    if not transfer.is_file() or transfer.stat().st_size > MAX_TRANSFER_BYTES:
        raise ValueError('Missing or oversized .omoji-transfer/art.json.')
    payload = json.loads(transfer.read_text(encoding='utf-8'))
    if not isinstance(payload, dict) or payload.get('schemaVersion') != 1 or not isinstance(payload.get('files'), list):
        raise ValueError('Unsupported artwork transfer format.')
    if len(payload['files']) != len(EXPECTED_ART):
        raise ValueError('Artwork transfer must contain exactly the five expected images.')
    validated = {}
    total = 0
    # Validate every path, destination, base64 payload, and SHA before any writes.
    for entry in payload['files']:
        if not isinstance(entry, dict):
            raise ValueError('Invalid transfer entry.')
        name = entry.get('path')
        destination = checked_destination(root, name)
        if name not in EXPECTED_ART or name in validated:
            raise ValueError(f'Unexpected or duplicate artwork path: {name!r}')
        expected = entry.get('sha256')
        content = entry.get('content')
        if not isinstance(expected, str) or not HASH.fullmatch(expected) or not isinstance(content, str):
            raise ValueError(f'Missing SHA-256/base64 content for {name}')
        try:
            data = base64.b64decode(content, validate=True)
        except (ValueError, base64.binascii.Error) as error:
            raise ValueError(f'Invalid base64 for {name}') from error
        total += len(data)
        if total > MAX_TRANSFER_BYTES or not data:
            raise ValueError('Empty artwork or expanded transfer is too large.')
        if hashlib.sha256(data).hexdigest() != expected:
            raise ValueError(f'Artwork SHA-256 mismatch: {name}')
        validated[name] = (destination, data, expected)
    if set(validated) != EXPECTED_ART:
        raise ValueError('Artwork transfer does not contain the expected image set.')
    for name, (destination, data, expected) in sorted(validated.items()):
        atomic_bytes(destination, data)
        if sha256_file(destination) != expected:
            raise ValueError(f'Installed artwork SHA-256 mismatch: {name}')
    print(f'Restored {len(validated)} original artwork files; all SHA-256 values verified.', flush=True)
    return len(validated)


def verify_audio(root: Path):
    audio = root / 'assets/audio'
    if audio.is_symlink() or not audio.is_dir():
        raise ValueError('The audio directory must be a real directory.')
    score_path = checked_destination(root, 'assets/audio/original-score.json')
    score = json.loads(score_path.read_text(encoding='utf-8'))
    tracks = score.get('tracks') if isinstance(score, dict) else None
    if not isinstance(tracks, list) or len(tracks) != 128:
        raise ValueError('The regenerated score must contain exactly 128 tracks.')
    expected = {f'parapara-{index:03d}.mp3' for index in range(128)}
    if {track.get('file') for track in tracks if isinstance(track, dict)} != expected:
        raise ValueError('Regenerated score track filenames are incomplete or duplicated.')
    if {path.name for path in audio.glob('*.mp3')} != expected:
        raise ValueError('Unexpected or missing MP3 files after composition.')
    hashes = set()
    for track in tracks:
        path = checked_destination(root, 'assets/audio/' + track['file'])
        digest = sha256_file(path)
        if track.get('sha256') != digest or track.get('bytes') != path.stat().st_size:
            raise ValueError(f'Regenerated score metadata mismatch: {track["file"]}')
        if digest in hashes:
            raise ValueError('Two regenerated tracks have the same hash.')
        hashes.add(digest)
    print('Verified 128 unique regenerated MP3s against original-score.json.', flush=True)


def write_inventory(root: Path) -> dict:
    assets = root / 'assets'
    if assets.is_symlink() or not assets.is_dir():
        raise ValueError('The assets directory must be a real directory.')
    inventory_path = checked_destination(root, 'assets/asset-inventory.json')
    files = []
    for path in sorted(assets.rglob('*')):
        if path.is_symlink():
            raise ValueError(f'Asset inventory cannot include symlinks: {path.relative_to(root)}')
        if path.is_file() and path != inventory_path:
            files.append({'path': path.relative_to(root).as_posix(), 'bytes': path.stat().st_size,
                          'sha256': sha256_file(path)})
    inventory = {'schemaVersion': 1, 'edition': 'original-design-v2',
                 'baseCommit': BASE_COMMIT, 'files': files}
    atomic_bytes(inventory_path, (json.dumps(inventory, ensure_ascii=False, indent=2) + '\n').encode('utf-8'))
    reread = json.loads(inventory_path.read_text(encoding='utf-8'))
    if reread != inventory:
        raise ValueError('Asset inventory verification failed.')
    print(f'Rebuilt asset inventory for {len(files)} files.', flush=True)
    return inventory


def remove_transfer(root: Path):
    transfer = root / '.omoji-transfer'
    if transfer.is_symlink() or not transfer.is_dir():
        raise ValueError('The temporary transfer directory must be a real directory.')
    if any(path.is_symlink() for path in transfer.rglob('*')):
        raise ValueError('A symlink exists in the temporary transfer directory.')
    # This is the only directory removed by this helper. Workflow/helper stay tracked.
    shutil.rmtree(transfer)
    print('Removed temporary .omoji-transfer directory.', flush=True)


def main():
    root = Path(__file__).resolve().parents[1]
    restore_art(root)
    composer = checked_destination(root, 'tools/compose-audio.py')
    if not composer.is_file():
        raise ValueError('Original soundtrack composer is missing.')
    subprocess.run([sys.executable, str(composer), '--jobs', '2'], cwd=root, check=True)
    verify_audio(root)
    write_inventory(root)
    remove_transfer(root)


if __name__ == '__main__':
    try:
        main()
    except (OSError, ValueError, KeyError, subprocess.CalledProcessError) as error:
        print(f'Original asset preparation failed: {error}', file=sys.stderr)
        sys.exit(1)
