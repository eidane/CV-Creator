#!/usr/bin/env python3
"""
GitHub Auto-Updater for macOS/Linux
Run with: python3 auto_updater.py
"""

import os
import sys
import json
import urllib.request
import shutil
from datetime import datetime
from pathlib import Path

# ========== CONFIGURATION ==========
GITHUB_OWNER = 'eidane'
GITHUB_REPO = 'CV-Creator'
GITHUB_BRANCH = 'main'
VERSION_FILE_URL = f'https://raw.githubusercontent.com/{GITHUB_OWNER}/{GITHUB_REPO}/{GITHUB_BRANCH}/version.json'
FILES_TO_UPDATE = [
    'index.js',
    'config.json',
    # Add more files here
]
LOCAL_VERSION_PATH = './version.json'
# ====================================


def fetch_json(url):
    """Fetch JSON from URL"""
    try:
        with urllib.request.urlopen(url) as response:
            return json.loads(response.read().decode())
    except Exception as e:
        raise Exception(f'Failed to fetch {url}: {e}')


def download_file(filename):
    """Download file from GitHub raw content"""
    url = f'https://raw.githubusercontent.com/{GITHUB_OWNER}/{GITHUB_REPO}/{GITHUB_BRANCH}/{filename}'
    try:
        with urllib.request.urlopen(url) as response:
            content = response.read()
        with open(filename, 'wb') as f:
            f.write(content)
        print(f'  ✓ Downloaded: {filename}')
    except Exception as e:
        raise Exception(f'Failed to download {filename}: {e}')


def is_newer_version(remote, local):
    """Compare version strings (simple semver)"""
    r = [int(x) for x in remote.split('.')]
    l = [int(x) for x in local.split('.')]
    for i in range(max(len(r), len(l))):
        rv = r[i] if i < len(r) else 0
        lv = l[i] if i < len(l) else 0
        if rv > lv:
            return True
        if rv < lv:
            return False
    return False


def check_and_apply_updates():
    """Main update check and execution"""
    print('[Auto-Updater] Checking for updates...')

    try:
        # Get remote version
        remote_version = fetch_json(VERSION_FILE_URL)
        print(f"[Auto-Updater] Remote version: {remote_version.get('version', 'unknown')}")

        # Get local version
        local_version = '0.0.0'
        if os.path.exists(LOCAL_VERSION_PATH):
            with open(LOCAL_VERSION_PATH, 'r') as f:
                local_version = json.load(f).get('version', '0.0.0')
        print(f'[Auto-Updater] Local version: {local_version}')

        # Check if update needed
        if not is_newer_version(remote_version['version'], local_version):
            print('[Auto-Updater] ✓ Up to date!')
            return

        print(f"[Auto-Updater] Update available: {local_version} → {remote_version['version']}")

        # Backup current files
        print('[Auto-Updater] Creating backup...')
        backup_dir = f'./backup-{datetime.now().strftime("%Y%m%d_%H%M%S")}'
        os.makedirs(backup_dir)
        for file in FILES_TO_UPDATE:
            if os.path.exists(file):
                shutil.copy2(file, os.path.join(backup_dir, file))
        print(f'  ✓ Backup saved to: {backup_dir}')

        # Download updated files
        print('[Auto-Updater] Downloading updates...')
        for file in FILES_TO_UPDATE:
            download_file(file)

        # Update local version file
        with open(LOCAL_VERSION_PATH, 'w') as f:
            json.dump(remote_version, f, indent=2)

        print('[Auto-Updater] ✓ Update completed successfully!')

    except Exception as error:
        print(f'[Auto-Updater] ✗ Error: {error}')
        sys.exit(1)


if __name__ == '__main__':
    check_and_apply_updates()