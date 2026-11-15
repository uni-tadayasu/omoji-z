#!/usr/bin/env python3
"""Copy only browser-public game files into a GitHub Pages staging directory.

Usage: python3 tools/build-site.py --out /tmp/omoji-public
An existing nonempty destination needs --clean. No source files are changed.
"""
from __future__ import annotations
import argparse
import json
import shutil
import sys
from pathlib import Path

ROOT_FILES = {
    '.nojekyll', 'CNAME', 'announcements.json', 'robots.txt', 'sitemap.xml',
    'manifest.webmanifest', 'RIGHTS.txt', 'THIRD_PARTY_NOTICES.txt',
    'LICENSE', 'LICENSE.txt', 'favicon.ico', 'sw.js', 'service-worker.js',
}
PUBLIC_DIRECTORIES = ('assets', 'cars', 'courses')

def public_files(root: Path):
    files = []
    for path in sorted(root.iterdir()):
        if path.is_symlink():
            if path.name in ROOT_FILES or path.suffix in {'.html', '.webmanifest'} or path.name in PUBLIC_DIRECTORIES:
                raise ValueError(f'Symlink is not allowed in public files: {path.name}')
            continue
        if path.is_file() and (path.name in ROOT_FILES or path.suffix in {'.html', '.webmanifest'}):
            files.append(path)
    for name in PUBLIC_DIRECTORIES:
        directory = root / name
        if not directory.is_dir():
            continue
        for path in sorted(directory.rglob('*')):
            if path.is_symlink():
                raise ValueError(f'Symlink is not allowed: {path.relative_to(root)}')
            allowed = name == 'assets' or path.suffix == '.html'
            if allowed and path.is_file() and not any(part.startswith('.') or part == '__pycache__' for part in path.relative_to(directory).parts):
                files.append(path)
    if not (root / 'index.html').is_file():
        raise ValueError('The source must contain index.html.')
    return files

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root', type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument('--out', '--stage', dest='out', type=Path, default=Path('_site'))
    parser.add_argument('--clean', action='store_true', help='Replace an existing staging directory.')
    args = parser.parse_args()
    root = args.root.resolve()
    if args.out.is_symlink():
        raise ValueError('The staging directory must not be a symlink.')
    out = args.out.resolve()
    protected = [root / name for name in (*PUBLIC_DIRECTORIES, 'tools', '.github', '.git', '.openai')]
    if out == root or out in root.parents or any(out == path or path in out.parents for path in protected):
        raise ValueError('The staging directory must not overwrite source, assets, tools, or repository metadata.')
    files = public_files(root)
    if out.exists():
        if not out.is_dir():
            raise ValueError('The staging destination is not a directory.')
        if any(out.iterdir()):
            if not args.clean:
                raise ValueError('The staging directory is not empty. Choose a new directory or pass --clean.')
            shutil.rmtree(out)
    out.mkdir(parents=True, exist_ok=True)
    for source in files:
        destination = out / source.relative_to(root)
        destination.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(source, destination)
    print(json.dumps({'stage': str(out), 'files': len(files), 'bytes': sum(p.stat().st_size for p in files)}, ensure_ascii=False))

if __name__ == '__main__':
    try:
        main()
    except (OSError, ValueError) as error:
        print(f'Build failed: {error}', file=sys.stderr)
        sys.exit(1)
