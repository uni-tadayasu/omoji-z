#!/usr/bin/env python3
"""Validate an OMOJI Z update ZIP; apply only when --apply is supplied.

Usage:
  python3 tools/apply-update.py omoji-z-update.zip --target /path/to/repository
  python3 tools/apply-update.py omoji-z-update.zip --target /path/to/repository --apply

Every before/after hash and every archive path is checked before writing. Apply
creates a backup ZIP in TARGET/.omoji-backups/ unless --backup PATH is given.
"""
from __future__ import annotations
import argparse
import datetime as dt
import hashlib
import json
import os
import re
import shutil
import stat
import sys
import tempfile
import uuid
import zipfile
from pathlib import Path, PurePosixPath

MAX_FILES = 20000
MAX_BYTES = 512 * 1024 * 1024
MAX_MANIFEST = 16 * 1024 * 1024
HASH = re.compile(r'^[0-9a-f]{64}$')
MANIFEST = '_update/manifest.json'


def safe_path(value, *, metadata=False, directory=False) -> str:
    if not isinstance(value, str) or not value or len(value) > 4096 or '\\' in value or '\x00' in value or ':' in value:
        raise ValueError(f'Unsafe archive path: {value!r}')
    path = PurePosixPath(value)
    parts = value.split('/')
    if path.is_absolute() or any(part in {'', '.', '..'} for part in parts):
        raise ValueError(f'Unsafe archive path: {value!r}')
    reserved = {'con', 'prn', 'aux', 'nul'} | {f'{prefix}{number}' for prefix in ('com', 'lpt') for number in range(1, 10)}
    if any(part.endswith((' ', '.')) or any(ord(char) < 32 for char in part) or part.split('.')[0].casefold() in reserved for part in parts):
        raise ValueError(f'Nonportable Windows path is not allowed: {value!r}')
    if any(part.casefold() in {'.git', '.omoji-backups'} for part in parts):
        raise ValueError(f'Protected path is not allowed: {value!r}')
    if parts[0] == '_update' and not (metadata and (value == MANIFEST or directory and value == '_update')):
        raise ValueError(f'Unexpected update metadata path: {value!r}')
    return value


def target_path(root: Path, relative: str) -> Path:
    safe_path(relative)
    current = root
    parts = PurePosixPath(relative).parts
    for index, part in enumerate(parts):
        current = current / part
        if current.is_symlink():
            raise ValueError(f'Target symlink is not allowed: {relative}')
        if current.exists() and index < len(parts) - 1 and not current.is_dir():
            raise ValueError(f'Target parent is not a directory: {relative}')
    if current.exists() and not current.is_file():
        raise ValueError(f'Target is not a regular file: {relative}')
    return current


def digest_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open('rb') as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b''):
            digest.update(chunk)
    return digest.hexdigest()


def require_hash(value, label, *, optional=False):
    if optional and value is None:
        return
    if not isinstance(value, str) or not HASH.fullmatch(value):
        raise ValueError(f'Invalid {label}.')


def read_manifest(archive: zipfile.ZipFile):
    entries = archive.infolist()
    if len(entries) > MAX_FILES:
        raise ValueError('Too many archive entries.')
    index = {}
    total = 0
    folded = set()
    for info in entries:
        name = info.filename[:-1] if info.is_dir() else info.filename
        safe_path(name, metadata=True, directory=info.is_dir())
        folded_name = name.casefold()
        if name in index or folded_name in folded:
            raise ValueError(f'Duplicate/case-colliding archive path: {name}')
        folded.add(folded_name)
        mode = (info.external_attr >> 16) & 0xffff
        file_type = stat.S_IFMT(mode)
        if file_type not in {0, stat.S_IFREG, stat.S_IFDIR} or info.flag_bits & 1:
            raise ValueError(f'Symlink, special, or encrypted archive entry: {name}')
        if info.file_size < 0 or info.file_size > MAX_BYTES:
            raise ValueError(f'Archive entry is too large: {name}')
        total += info.file_size
        if total > MAX_BYTES:
            raise ValueError('The expanded archive exceeds 512 MiB.')
        if not info.is_dir():
            index[name] = info
    if MANIFEST not in index or index[MANIFEST].file_size > MAX_MANIFEST:
        raise ValueError('Missing or oversized _update/manifest.json.')
    try:
        data = json.loads(archive.read(MANIFEST))
    except (UnicodeDecodeError, json.JSONDecodeError) as error:
        raise ValueError('Invalid update manifest JSON.') from error
    if not isinstance(data, dict) or data.get('format') != 'omoji-z-update' or data.get('version') != 1:
        raise ValueError('Unsupported update manifest format/version.')
    if not isinstance(data.get('baseCommit'), str) or not re.fullmatch(r'[0-9a-f]{40,64}', data['baseCommit']):
        raise ValueError('Invalid baseCommit.')
    files = data.get('files')
    deleted = data.get('deleted')
    if not isinstance(files, list) or not isinstance(deleted, list) or len(files) + len(deleted) > MAX_FILES:
        raise ValueError('Invalid changed/deleted file lists.')
    listed = set()
    folded_paths = set()
    for entry in files + deleted:
        if not isinstance(entry, dict):
            raise ValueError('Invalid manifest file entry.')
        name = safe_path(entry.get('path'))
        if name in listed or name.casefold() in folded_paths:
            raise ValueError(f'Duplicate/case-colliding manifest path: {name}')
        listed.add(name)
        folded_paths.add(name.casefold())
    # A file and one of its descendant paths cannot both be written/deleted.
    for name in listed:
        parts = PurePosixPath(name).parts
        if any('/'.join(parts[:end]).casefold() in folded_paths for end in range(1, len(parts))):
            raise ValueError(f'Overlapping manifest file paths: {name}')
    expected = {MANIFEST}
    for entry in files:
        name = entry['path']
        require_hash(entry.get('beforeSha256'), f'beforeSha256 for {name}', optional=True)
        require_hash(entry.get('afterSha256'), f'afterSha256 for {name}')
        size = entry.get('size')
        if type(size) is not int or size < 0 or size > MAX_BYTES:
            raise ValueError(f'Invalid file size for {name}')
        if entry.get('mode', 0o644) not in {0o644, 0o755}:
            raise ValueError(f'Unsupported file permissions for {name}')
        if name not in index or index[name].file_size != size:
            raise ValueError(f'Missing or incorrect payload size for {name}')
        expected.add(name)
    for entry in deleted:
        require_hash(entry.get('beforeSha256'), f'deleted beforeSha256 for {entry["path"]}')
        if entry.get('afterSha256') is not None:
            raise ValueError('Deleted entries must not have after hashes.')
    if set(index) != expected:
        raise ValueError('Archive contains files that are not declared in the manifest.')
    return data


def verify_before(root: Path, manifest):
    conflicts = []
    for entry in manifest['files'] + manifest['deleted']:
        path = target_path(root, entry['path'])
        before = entry.get('beforeSha256')
        if before is None:
            if path.exists():
                conflicts.append(f'{entry["path"]}: new file already exists')
        elif not path.exists():
            conflicts.append(f'{entry["path"]}: expected original file is missing')
        elif digest_file(path) != before:
            conflicts.append(f'{entry["path"]}: original SHA-256 does not match (local changes or a different base)')
    if conflicts:
        raise ValueError('No files were changed. Baseline check failed:\n' + '\n'.join(conflicts))


def stage_payloads(archive, manifest, staging: Path):
    for entry in manifest['files']:
        destination = staging / entry['path']
        destination.parent.mkdir(parents=True, exist_ok=True)
        digest = hashlib.sha256()
        size = 0
        with archive.open(entry['path']) as stream, destination.open('wb') as output:
            for chunk in iter(lambda: stream.read(1024 * 1024), b''):
                size += len(chunk)
                if size > entry['size']:
                    raise ValueError(f'Payload exceeds declared size: {entry["path"]}')
                digest.update(chunk)
                output.write(chunk)
        if size != entry['size'] or digest.hexdigest() != entry['afterSha256']:
            raise ValueError(f'Payload SHA-256 does not match: {entry["path"]}')


def atomic_copy(source: Path, target: Path, mode=0o644):
    target.parent.mkdir(parents=True, exist_ok=True)
    descriptor, temporary_name = tempfile.mkstemp(prefix='.omoji-write-', dir=target.parent)
    temporary = Path(temporary_name)
    try:
        with os.fdopen(descriptor, 'wb') as output, source.open('rb') as stream:
            shutil.copyfileobj(stream, output)
        os.chmod(temporary, mode)
        os.replace(temporary, target)
    finally:
        temporary.unlink(missing_ok=True)


def make_backup(root: Path, manifest, path: Path):
    if path.is_symlink() or path.exists():
        raise ValueError('Backup path already exists or is a symlink; choose a new filename.')
    path.parent.mkdir(parents=True, exist_ok=True)
    restore = {'format': 'omoji-z-backup', 'version': 1, 'baseCommit': manifest['baseCommit'],
               'createdAt': dt.datetime.now(dt.timezone.utc).isoformat(),
               'removeAddedFiles': [entry['path'] for entry in manifest['files'] if entry['beforeSha256'] is None]}
    # Exclusive creation avoids overwriting any user file.
    with path.open('xb') as stream, zipfile.ZipFile(stream, 'w', compression=zipfile.ZIP_DEFLATED) as backup:
        for entry in manifest['files'] + manifest['deleted']:
            source = target_path(root, entry['path'])
            if source.exists():
                backup.write(source, entry['path'])
        backup.writestr('_update/restore.json', json.dumps(restore, ensure_ascii=False, indent=2) + '\n')
    return path


def prune_empty_parents(path: Path, root: Path):
    while path != root and root in path.parents:
        try:
            path.rmdir()
        except OSError:
            break
        path = path.parent


def restore_backup(root: Path, manifest, backup_path: Path):
    with zipfile.ZipFile(backup_path) as backup, tempfile.TemporaryDirectory(prefix='omoji-rollback-') as temporary:
        temporary = Path(temporary)
        for entry in manifest['files'] + manifest['deleted']:
            name = entry['path']
            target = target_path(root, name)
            if entry.get('beforeSha256') is None:
                if target.exists():
                    target.unlink()
                    prune_empty_parents(target.parent, root)
            else:
                info = backup.getinfo(name)
                staged = temporary / name
                staged.parent.mkdir(parents=True, exist_ok=True)
                with backup.open(name) as source, staged.open('wb') as output:
                    shutil.copyfileobj(source, output)
                if digest_file(staged) != entry['beforeSha256']:
                    raise ValueError(f'Backup SHA-256 mismatch: {name}')
                atomic_copy(staged, target, (info.external_attr >> 16) & 0o777 or 0o644)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('archive', type=Path)
    parser.add_argument('--target', type=Path, default=Path.cwd())
    parser.add_argument('--apply', action='store_true')
    parser.add_argument('--backup', type=Path, help='New backup ZIP filename; default TARGET/.omoji-backups/TIMESTAMP.zip')
    args = parser.parse_args()
    if args.target.is_symlink():
        raise ValueError('The target directory must not be a symlink.')
    root = args.target.resolve()
    if not root.is_dir():
        raise ValueError('The target must be an existing repository/game directory.')
    archive_path = args.archive.resolve()
    with zipfile.ZipFile(archive_path) as archive, tempfile.TemporaryDirectory(prefix='omoji-update-') as temporary:
        manifest = read_manifest(archive)
        verify_before(root, manifest)
        staging = Path(temporary)
        stage_payloads(archive, manifest, staging)
        result = {'mode': 'apply' if args.apply else 'dry-run', 'baseCommit': manifest['baseCommit'],
                  'target': str(root), 'changed': len(manifest['files']), 'deleted': len(manifest['deleted']),
                  'deletePaths': [entry['path'] for entry in manifest['deleted']]}
        if not args.apply:
            result['message'] = 'All original and payload SHA-256 checks passed. No target files were changed. Add --apply to install.'
            print(json.dumps(result, ensure_ascii=False, indent=2))
            return
        verify_before(root, manifest)
        if args.backup:
            backup_path = args.backup.absolute()
            if backup_path == archive_path:
                raise ValueError('Backup must not overwrite the update ZIP.')
        else:
            backup_directory = root / '.omoji-backups'
            if backup_directory.is_symlink():
                raise ValueError('Backup directory must not be a symlink.')
            stamp = dt.datetime.now(dt.timezone.utc).strftime('%Y%m%dT%H%M%SZ')
            backup_path = backup_directory / f'{stamp}-{uuid.uuid4().hex[:8]}.zip'
        # Refuse backup locations that are files being updated or their parents.
        for entry in manifest['files'] + manifest['deleted']:
            affected = root / entry['path']
            if backup_path == affected or affected in backup_path.parents:
                raise ValueError('Backup path overlaps an updated file.')
        make_backup(root, manifest, backup_path)
        try:
            for entry in manifest['files']:
                target = target_path(root, entry['path'])
                atomic_copy(staging / entry['path'], target, entry.get('mode', 0o644))
            for entry in manifest['deleted']:
                target = target_path(root, entry['path'])
                target.unlink()
                prune_empty_parents(target.parent, root)
            for entry in manifest['files']:
                if digest_file(target_path(root, entry['path'])) != entry['afterSha256']:
                    raise ValueError(f'Installed SHA-256 mismatch: {entry["path"]}')
        except Exception:
            restore_backup(root, manifest, backup_path)
            raise
        result['backup'] = str(backup_path)
        result['message'] = 'Update applied; installed SHA-256 values verified. Original files are in the backup ZIP.'
        print(json.dumps(result, ensure_ascii=False, indent=2))

if __name__ == '__main__':
    try:
        main()
    except (OSError, ValueError, KeyError, RuntimeError, zipfile.BadZipFile) as error:
        print(f'Update failed: {error}', file=sys.stderr)
        sys.exit(1)
