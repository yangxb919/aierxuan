#!/usr/bin/env bash
# Sync public/uploads/ to the Cloudflare R2 "aierxuan" bucket.
# Requires rclone with a remote named "r2-aierxuan" configured in
# ~/.config/rclone/rclone.conf (credentials are NOT stored in this repo).
#
# Usage:
#   bash scripts/backup-uploads-to-r2.sh          # incremental sync
#   bash scripts/backup-uploads-to-r2.sh --dry    # preview only

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$REPO_ROOT/public/uploads/"
DST="r2-aierxuan:aierxuan/uploads/"

if ! command -v rclone >/dev/null 2>&1; then
  echo "rclone not installed. Run: brew install rclone" >&2
  exit 1
fi

if ! rclone listremotes | grep -q '^r2-aierxuan:$'; then
  echo "rclone remote 'r2-aierxuan' missing in ~/.config/rclone/rclone.conf" >&2
  exit 1
fi

EXTRA=()
if [[ "${1:-}" == "--dry" ]]; then
  EXTRA+=(--dry-run)
fi

rclone sync "$SRC" "$DST" \
  --transfers 8 \
  --checkers 8 \
  --progress \
  --stats 5s \
  --stats-one-line \
  --exclude ".DS_Store" \
  "${EXTRA[@]}"

echo ""
echo "Remote totals:"
rclone size "$DST"
