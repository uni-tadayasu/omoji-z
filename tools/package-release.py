#!/usr/bin/env python3
"""Create a complete GitHub source ZIP and a hash-checked changed-files ZIP.

The baseline comes from a Git commit; the new version is the current filesystem,
including uncommitted and new files. No commit, push, or network access occurs.
"""
from __future__ import annotations
import argparse
import datetime as dt
import hashlib
import json
import os
import stat
import subprocess
import sys
import tempfile
import zipfile
from pathlib import Path, PurePosixPath

DEFAULT_BASE = 'd56dadaef293b97f88d9f017d8e65701be98e721'
EXCLUDED_PARTS = {'.git', '.openai', 'node_modules', '__pycache__', '.pytest_cache',
                  '.mypy_cache', '.venv', 'venv', 'work', 'output', 'dist', 'build',
                  '_site', '_update', '.omoji-backups', '.DS_Store'}
EXCLUDED_SUFFIXES = {'.zip', '.pyc', '.pyo', '.tmp', '.log'}

def safe_name(value: str) -> str:
    if not value or '\\' in value or '\x00' in value or ':' in value:
        raise ValueError(f'Unsupported archive path: {value!r}')
    path = PurePosixPath(value)
    if path.is_absolute() or any(part in {'', '.', '..'} for part in value.split('/')):
        raise ValueError(f'Unsafe archive path: {value!r}')
    return value

def included(value: str) -> bool:
    path = PurePosixPath(value)
    return not any(part in EXCLUDED_PARTS for part in path.parts) and path.suffix.lower() not in EXCLUDED_SUFFIXES

def git(root: Path, *args: str) -> bytes:
    result = subprocess.run(['git', '-C', str(root), *args], check=False, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if result.returncode:
        raise ValueError(result.stderr.decode('utf-8', 'replace').strip() or 'Git command failed.')
    return result.stdout

def digest_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open('rb') as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b''):
            digest.update(chunk)
    return digest.hexdigest()

def baseline_files(root: Path, commit: str):
    entries = []
    for record in git(root, 'ls-tree', '-rz', '--full-tree', commit).split(b'\0'):
        if not record:
            continue
        metadata, raw_name = record.split(b'\t', 1)
        mode, kind, object_id = metadata.decode('ascii').split(' ')
        name = safe_name(raw_name.decode('utf-8'))
        if not included(name):
            continue
        if kind != 'blob' or mode not in {'100644', '100755'}:
            raise ValueError(f'Baseline has an unsupported symlink/submodule: {name}')
        entries.append((name, object_id, int(mode, 8) & 0o777))
    # One cat-file process handles even large original audio/model collections.
    with tempfile.TemporaryFile() as requests:
        for _, object_id, _ in entries:
            requests.write((object_id + '\n').encode('ascii'))
        requests.seek(0)
        process = subprocess.Popen(['git', '-C', str(root), 'cat-file', '--batch'], stdin=requests, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        result = {}
        try:
            for name, object_id, mode in entries:
                header = process.stdout.readline().decode('ascii').strip().split(' ')
                if len(header) != 3 or header[0] != object_id or header[1] != 'blob':
                    raise ValueError(f'Cannot read baseline file: {name}')
                remaining = int(header[2])
                size = remaining
                digest = hashlib.sha256()
                while remaining:
                    chunk = process.stdout.read(min(1024 * 1024, remaining))
                    if not chunk:
                        raise ValueError(f'Truncated Git blob: {name}')
                    digest.update(chunk)
                    remaining -= len(chunk)
                if process.stdout.read(1) != b'\n':
                    raise ValueError('Invalid Git cat-file response.')
                result[name] = {'sha256': digest.hexdigest(), 'size': size, 'mode': mode}
            _, errors = process.communicate()
            if process.returncode:
                raise ValueError(errors.decode('utf-8', 'replace'))
            return result
        finally:
            if process.poll() is None:
                process.kill()
                process.wait()

def current_files(root: Path, out: Path):
    result = {}
    for directory, subdirectories, filenames in os.walk(root, followlinks=False):
        parent = Path(directory)
        kept = []
        for name in sorted(subdirectories):
            path = parent / name
            relative = path.relative_to(root).as_posix()
            if not included(relative) or path == out or out in path.parents:
                continue
            if path.is_symlink():
                raise ValueError(f'Symlink is not allowed in release: {relative}')
            kept.append(name)
        subdirectories[:] = kept
        for name in sorted(filenames):
            path = parent / name
            relative = safe_name(path.relative_to(root).as_posix())
            if not included(relative) or path == out or out in path.parents:
                continue
            if path.is_symlink() or not path.is_file():
                raise ValueError(f'Unsupported release file: {relative}')
            mode = 0o755 if path.stat().st_mode & stat.S_IXUSR else 0o644
            result[relative] = {'sha256': digest_file(path), 'size': path.stat().st_size, 'mode': mode}
    if 'index.html' not in result:
        raise ValueError('The release root does not contain index.html.')
    return result

def add_file(archive: zipfile.ZipFile, name: str, source: Path, expected: dict):
    info = zipfile.ZipInfo(safe_name(name))
    info.compress_type = zipfile.ZIP_DEFLATED
    info.external_attr = (stat.S_IFREG | expected['mode']) << 16
    digest = hashlib.sha256()
    size = 0
    with archive.open(info, 'w', force_zip64=True) as output, source.open('rb') as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b''):
            digest.update(chunk)
            size += len(chunk)
            output.write(chunk)
    if digest.hexdigest() != expected['sha256'] or size != expected['size']:
        raise ValueError(f'File changed while packaging; run again after edits finish: {name}')

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root', type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument('--base-ref', '--base', dest='base_ref', default=DEFAULT_BASE)
    parser.add_argument('--out', type=Path, required=True)
    args = parser.parse_args()
    root = args.root.resolve()
    if args.out.is_symlink():
        raise ValueError('The output directory must not be a symlink.')
    out = args.out.resolve()
    protected = [root / name for name in ('assets', 'tools', '.github', '.git', '.openai')]
    if out == root or out in root.parents or any(out == path or path in out.parents for path in protected):
        raise ValueError('Use a separate output directory, outside assets/tools/repository metadata.')
    base_ref = args.base_ref
    if not base_ref or base_ref.startswith('-') or '\x00' in base_ref:
        raise ValueError('Invalid baseline reference.')
    commit = git(root, 'rev-parse', '--verify', base_ref + '^{commit}').decode('ascii').strip()
    head = git(root, 'rev-parse', '--verify', 'HEAD').decode('ascii').strip()
    before = baseline_files(root, commit)
    after = current_files(root, out)
    changed = []
    deleted = []
    for name, data in sorted(after.items()):
        old = before.get(name)
        if old is None or old['sha256'] != data['sha256'] or old['mode'] != data['mode']:
            changed.append({'path': name, 'beforeSha256': old['sha256'] if old else None,
                            'afterSha256': data['sha256'], 'size': data['size'], 'mode': data['mode']})
    for name, data in sorted(before.items()):
        if name not in after:
            deleted.append({'path': name, 'beforeSha256': data['sha256'], 'afterSha256': None})
    manifest = {'format': 'omoji-z-update', 'version': 1, 'baseCommit': commit, 'sourceHead': head,
                'createdAt': dt.datetime.now(dt.timezone.utc).isoformat(), 'files': changed, 'deleted': deleted,
                'unchangedCount': len(after) - len(changed)}
    out.mkdir(parents=True, exist_ok=True)
    full_path = out / 'omoji-z-full.zip'
    update_path = out / 'omoji-z-update.zip'
    # Stage both outputs; a failed build does not replace a previous valid ZIP.
    with tempfile.TemporaryDirectory(prefix='.omoji-release-', dir=out) as temporary:
        temporary = Path(temporary)
        with zipfile.ZipFile(temporary / full_path.name, 'w', compression=zipfile.ZIP_DEFLATED, compresslevel=6) as archive:
            for name, data in sorted(after.items()):
                add_file(archive, name, root / name, data)
        with zipfile.ZipFile(temporary / update_path.name, 'w', compression=zipfile.ZIP_DEFLATED, compresslevel=6) as archive:
            for entry in changed:
                add_file(archive, entry['path'], root / entry['path'], after[entry['path']])
            archive.writestr('_update/manifest.json', json.dumps(manifest, ensure_ascii=False, indent=2) + '\n')
        # Catch concurrent edits/deletions/additions before committing either ZIP.
        if current_files(root, out) != after:
            raise ValueError('The source changed while packaging. Wait for edits to finish and run again.')
        os.replace(temporary / full_path.name, full_path)
        os.replace(temporary / update_path.name, update_path)
    summary = {'baseCommit': commit, 'sourceHead': head, 'full': str(full_path), 'update': str(update_path),
               'fullFileCount': len(after), 'changedFileCount': len(changed), 'deletedFileCount': len(deleted),
               'fullSha256': digest_file(full_path), 'updateSha256': digest_file(update_path)}
    (out / 'release-summary.json').write_text(json.dumps(summary, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(json.dumps(summary, ensure_ascii=False, indent=2))

if __name__ == '__main__':
    try:
        main()
    except (OSError, ValueError, subprocess.SubprocessError, zipfile.BadZipFile) as error:
        print(f'Packaging failed: {error}', file=sys.stderr)
        sys.exit(1)
