#!/usr/bin/env bash
set -euo pipefail

ACCOUNT="admin@aierxuanlaptop.com"
SERVICE="zoho-aierxuan-imap"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

cat <<MSG
AIERXUAN Zoho Mail Keychain setup
Account:  $ACCOUNT
Service:  $SERVICE

Before running this, enable IMAP in Zoho Mail and generate a Zoho App Password.
Paste the App Password below. Input is hidden and will be stored in macOS Keychain.
MSG

read -r -s -p "Zoho App Password: " ZOHO_APP_PASSWORD
echo

if [[ -z "${ZOHO_APP_PASSWORD}" ]]; then
  echo "Error: empty password, nothing stored." >&2
  exit 1
fi

security add-generic-password \
  -a "$ACCOUNT" \
  -s "$SERVICE" \
  -w "$ZOHO_APP_PASSWORD" \
  -U

unset ZOHO_APP_PASSWORD

echo "Stored in Keychain. Testing IMAP folder list..."
python3 "$SCRIPT_DIR/aierxuan_zoho_mail.py" folders
