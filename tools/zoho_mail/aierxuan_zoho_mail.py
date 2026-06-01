#!/usr/bin/env python3
"""AIERXUAN Zoho Mail helper for Codex/Hermes.

- Reads/searches mail via IMAP without marking messages as read.
- Creates email drafts in Zoho Drafts via IMAP APPEND.
- Intentionally does not send email.
- Uses macOS Keychain service `zoho-aierxuan-imap`.
"""
from __future__ import annotations

import argparse
import email
import html
import imaplib
import json
import os
import re
import socket
import ssl
import subprocess
import sys
import time
from email import policy
from email.header import decode_header, make_header
from email.message import EmailMessage, Message
from email.utils import formataddr, formatdate, getaddresses, make_msgid, parseaddr
from pathlib import Path
from typing import List, Optional

ACCOUNT = "admin@aierxuanlaptop.com"
DISPLAY_NAME = "AIERXUAN Admin"
IMAP_HOST = "imappro.zoho.com"
IMAP_PORT = 993
KEYCHAIN_SERVICE = "zoho-aierxuan-imap"
DEFAULT_SEARCH_FOLDERS = "INBOX,Sent,Drafts"


def run(cmd: List[str], timeout: int = 10) -> str:
    return subprocess.check_output(cmd, stderr=subprocess.DEVNULL, timeout=timeout).decode().strip()


def keychain_password() -> str:
    try:
        return run([
            "security", "find-generic-password",
            "-a", ACCOUNT,
            "-s", KEYCHAIN_SERVICE,
            "-w",
        ])
    except Exception as exc:
        raise RuntimeError(
            "Missing Zoho App Password in macOS Keychain. "
            "Run: tools/zoho_mail/setup_keychain.sh"
        ) from exc


def local_bind_ip() -> Optional[str]:
    # en0 is Wi-Fi on this Mac. Binding to it bypasses Shadowrocket utun IMAP interception.
    for iface in ["en0"]:
        try:
            ip = run(["ipconfig", "getifaddr", iface], timeout=3)
            if ip and re.match(r"^\d+\.\d+\.\d+\.\d+$", ip):
                return ip
        except Exception:
            pass
    return None


def default_gateway() -> Optional[str]:
    try:
        out = run(["ipconfig", "getpacket", "en0"], timeout=3)
        m = re.search(r"domain_name_server \(ip_mult\): \{(\d+\.\d+\.\d+\.\d+)\}", out)
        if m:
            return m.group(1)
        m = re.search(r"router \(ip_mult\): \{(\d+\.\d+\.\d+\.\d+)\}", out)
        if m:
            return m.group(1)
    except Exception:
        pass
    try:
        out = run(["route", "-n", "get", "default"], timeout=3)
        m = re.search(r"gateway:\s+(\d+\.\d+\.\d+\.\d+)", out)
        return m.group(1) if m else None
    except Exception:
        return None


def resolve_host(host: str) -> str:
    # macOS resolver may be routed through Shadowrocket DNS and return 198.18.x.x.
    try:
        ip = socket.gethostbyname(host)
        if not ip.startswith("198.18."):
            return ip
    except Exception:
        pass

    gw = default_gateway()
    if gw:
        try:
            out = run(["dig", f"@{gw}", host, "+short"], timeout=5)
            for line in out.splitlines():
                line = line.strip()
                if re.match(r"^\d+\.\d+\.\d+\.\d+$", line):
                    return line
        except Exception:
            pass
    return host


class BoundIMAP4SSL(imaplib.IMAP4_SSL):
    def open(self, host: str = "", port: int = imaplib.IMAP4_SSL_PORT, timeout: Optional[int] = None):
        self.host = host
        self.port = port
        target = resolve_host(host)
        bind = local_bind_ip()
        source = (bind, 0) if bind else None
        sock = socket.create_connection((target, port), timeout=timeout or 30, source_address=source)
        self.sock = self.ssl_context.wrap_socket(sock, server_hostname=host)
        self.file = self.sock.makefile("rb")


def connect() -> BoundIMAP4SSL:
    ctx = ssl.create_default_context()
    imap = BoundIMAP4SSL(IMAP_HOST, IMAP_PORT, ssl_context=ctx, timeout=30)
    imap.login(ACCOUNT, keychain_password())
    return imap


def dec(value) -> str:
    if value is None:
        return ""
    if isinstance(value, bytes):
        value = value.decode("utf-8", "replace")
    try:
        return str(make_header(decode_header(value)))
    except Exception:
        return str(value)


def parse_header(raw: bytes) -> dict:
    msg = email.message_from_bytes(raw)
    return {
        "from": dec(msg.get("From")),
        "to": dec(msg.get("To")),
        "cc": dec(msg.get("Cc")),
        "subject": dec(msg.get("Subject")),
        "date": dec(msg.get("Date")),
        "message_id": dec(msg.get("Message-ID")),
        "references": dec(msg.get("References")),
    }


def fetch_header(imap: imaplib.IMAP4_SSL, uid: bytes) -> dict:
    typ, data = imap.uid("fetch", uid, "(FLAGS BODY.PEEK[HEADER.FIELDS (FROM TO CC SUBJECT DATE MESSAGE-ID REFERENCES)])")
    if typ != "OK":
        return {"uid": uid.decode(), "error": "fetch header failed"}
    flags = ""
    raw_header = b""
    for item in data:
        if isinstance(item, tuple):
            meta, body = item
            flags = meta.decode("utf-8", "replace")
            raw_header = body or b""
    h = parse_header(raw_header)
    h["uid"] = uid.decode()
    h["unseen"] = "\\Seen" not in flags
    return h


def list_folders(imap) -> list:
    typ, boxes = imap.list()
    if typ != "OK":
        return []
    out = []
    for b in boxes or []:
        s = b.decode("utf-8", "replace")
        parts = re.findall(r'"([^"]*)"', s)
        name = parts[-1] if parts else s.split()[-1]
        out.append(name)
    return out


def select(imap, folder: str, readonly: bool = True):
    typ, _ = imap.select(folder, readonly=readonly)
    if typ != "OK":
        raise RuntimeError(f"cannot select folder: {folder}")


def recent(imap, folder: str, limit: int, unseen_only: bool = False) -> list:
    select(imap, folder, readonly=True)
    criteria = "UNSEEN" if unseen_only else "ALL"
    typ, data = imap.uid("search", None, criteria)
    if typ != "OK":
        return []
    uids = data[0].split()
    uids = uids[-limit:][::-1]
    return [fetch_header(imap, uid) for uid in uids]


def msg_text(msg: Message) -> str:
    parts = []
    if msg.is_multipart():
        for part in msg.walk():
            ctype = part.get_content_type()
            disp = str(part.get("Content-Disposition") or "").lower()
            if "attachment" in disp:
                continue
            if ctype in ("text/plain", "text/html"):
                payload = part.get_payload(decode=True)
                if payload is None:
                    continue
                charset = part.get_content_charset() or "utf-8"
                text = payload.decode(charset, "replace")
                if ctype == "text/html":
                    text = re.sub(r"(?is)<(script|style).*?>.*?</\1>", " ", text)
                    text = re.sub(r"(?s)<[^>]+>", " ", text)
                    text = html.unescape(text)
                parts.append(text)
    else:
        payload = msg.get_payload(decode=True)
        if payload:
            charset = msg.get_content_charset() or "utf-8"
            parts.append(payload.decode(charset, "replace"))
    text = "\n".join(parts)
    text = re.sub(r"\n{3,}", "\n\n", text)
    text = re.sub(r"[ \t]{2,}", " ", text)
    return text.strip()


def read_msg(imap, folder: str, uid: str) -> dict:
    select(imap, folder, readonly=True)
    typ, data = imap.uid("fetch", uid, "(BODY.PEEK[])")
    if typ != "OK":
        raise RuntimeError(f"cannot fetch uid {uid}")
    raw = b""
    for item in data:
        if isinstance(item, tuple):
            raw = item[1]
            break
    msg = email.message_from_bytes(raw)
    h = parse_header(raw)
    h["uid"] = uid
    h["folder"] = folder
    h["body"] = msg_text(msg)
    return h


def fetch_full_header(imap, folder: str, uid: str) -> dict:
    select(imap, folder, readonly=True)
    typ, data = imap.uid("fetch", uid, "(BODY.PEEK[HEADER])")
    if typ != "OK":
        raise RuntimeError(f"cannot fetch header uid {uid}")
    raw = b""
    for item in data:
        if isinstance(item, tuple):
            raw = item[1]
            break
    h = parse_header(raw)
    h["uid"] = uid
    h["folder"] = folder
    return h


def server_search(imap, folder: str, query: str, limit: int) -> list:
    select(imap, folder, readonly=True)
    typ, data = imap.uid("search", "CHARSET", "UTF-8", "TEXT", query)
    if typ != "OK":
        typ, data = imap.uid("search", None, "TEXT", query)
    if typ != "OK":
        return []
    uids = data[0].split()[-limit:][::-1]
    rows = []
    for uid in uids:
        h = fetch_header(imap, uid)
        h["folder"] = folder
        rows.append(h)
    return rows


def find_draft_folder(imap, override: Optional[str] = None) -> str:
    if override:
        return override
    folders = list_folders(imap)
    preferred = ["Drafts", "Draft", "INBOX/Drafts", "草稿箱"]
    folded = {f.lower(): f for f in folders}
    for name in preferred:
        if name.lower() in folded:
            return folded[name.lower()]
    for f in folders:
        low = f.lower()
        if "draft" in low or "草稿" in f:
            return f
    # Zoho normally uses Drafts; if list failed, still try it.
    return "Drafts"


def clean_subject_for_reply(subject: str) -> str:
    subject = subject or ""
    return subject if subject.lower().startswith("re:") else f"Re: {subject}".strip()


def header_line(value: str) -> str:
    return " ".join(str(value or "").split())


def first_address(header_value: str) -> str:
    addrs = getaddresses([header_value or ""])
    for name, addr in addrs:
        if addr:
            return formataddr((name, addr)) if name else addr
    return ""


def make_draft_message(args, reply_header: Optional[dict]) -> EmailMessage:
    body = args.body or ""
    if args.body_file:
        body = Path(args.body_file).read_text(encoding="utf-8")
    elif not args.body and not sys.stdin.isatty():
        body = sys.stdin.read()

    to_addr = args.to or ""
    subject = args.subject or ""
    if reply_header:
        to_addr = to_addr or first_address(reply_header.get("from", ""))
        subject = subject or clean_subject_for_reply(reply_header.get("subject", ""))

    if not to_addr:
        raise RuntimeError("draft requires --to, or --reply-to-uid with original From header")
    if not subject:
        raise RuntimeError("draft requires --subject, or --reply-to-uid with original Subject header")

    msg = EmailMessage(policy=policy.SMTP)
    msg["From"] = formataddr((DISPLAY_NAME, ACCOUNT))
    msg["To"] = to_addr
    if args.cc:
        msg["Cc"] = args.cc
    if args.bcc:
        msg["Bcc"] = args.bcc
    msg["Subject"] = subject
    msg["Date"] = formatdate(localtime=True)
    msg["Message-ID"] = make_msgid(domain="aierxuanlaptop.com")

    if reply_header:
        original_mid = header_line(reply_header.get("message_id", ""))
        if original_mid:
            msg["In-Reply-To"] = original_mid
            refs = header_line(reply_header.get("references", ""))
            msg["References"] = f"{refs} {original_mid}".strip()

    msg.set_content(body or "")
    return msg


def save_draft(imap, msg: EmailMessage, folder: Optional[str] = None) -> dict:
    draft_folder = find_draft_folder(imap, folder)
    typ, data = imap.append(
        draft_folder,
        r"(\Draft)",
        imaplib.Time2Internaldate(time.time()),
        msg.as_bytes(policy=policy.SMTP),
    )
    if typ != "OK":
        raise RuntimeError(f"failed to append draft to {draft_folder}: {data}")
    return {
        "account": ACCOUNT,
        "action": "draft_saved",
        "folder": draft_folder,
        "to": dec(msg.get("To")),
        "subject": dec(msg.get("Subject")),
        "message_id": dec(msg.get("Message-ID")),
        "imap_response": [x.decode("utf-8", "replace") if isinstance(x, bytes) else str(x) for x in (data or [])],
        "sent": False,
    }


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(description="AIERXUAN Zoho Mail read/search/draft helper. No send command is provided.")
    sub = p.add_subparsers(dest="cmd", required=True)

    sub.add_parser("folders")

    r = sub.add_parser("recent")
    r.add_argument("--folder", default="INBOX")
    r.add_argument("--limit", type=int, default=10)
    r.add_argument("--unseen", action="store_true")

    rd = sub.add_parser("read")
    rd.add_argument("uid")
    rd.add_argument("--folder", default="INBOX")

    s = sub.add_parser("search")
    s.add_argument("query")
    s.add_argument("--folders", default=DEFAULT_SEARCH_FOLDERS)
    s.add_argument("--limit", type=int, default=10)

    d = sub.add_parser("draft")
    d.add_argument("--to")
    d.add_argument("--cc", default="")
    d.add_argument("--bcc", default="")
    d.add_argument("--subject")
    d.add_argument("--body")
    d.add_argument("--body-file")
    d.add_argument("--draft-folder")
    d.add_argument("--reply-to-uid")
    d.add_argument("--reply-folder", default="INBOX")
    return p


def main():
    args = build_parser().parse_args()
    imap = connect()
    try:
        if args.cmd == "folders":
            result = {"account": ACCOUNT, "folders": list_folders(imap)}
        elif args.cmd == "recent":
            result = {"account": ACCOUNT, "folder": args.folder, "messages": recent(imap, args.folder, args.limit, args.unseen)}
        elif args.cmd == "read":
            result = read_msg(imap, args.folder, args.uid)
        elif args.cmd == "search":
            rows = []
            for folder in [f.strip() for f in args.folders.split(",") if f.strip()]:
                try:
                    rows.extend(server_search(imap, folder, args.query, args.limit))
                except Exception as e:
                    rows.append({"folder": folder, "error": str(e)})
            result = {"account": ACCOUNT, "query": args.query, "messages": rows[: args.limit]}
        elif args.cmd == "draft":
            reply_header = fetch_full_header(imap, args.reply_folder, args.reply_to_uid) if args.reply_to_uid else None
            msg = make_draft_message(args, reply_header)
            result = save_draft(imap, msg, args.draft_folder)
        else:
            raise RuntimeError(f"unknown command: {args.cmd}")
        print(json.dumps(result, ensure_ascii=False, indent=2))
    finally:
        try:
            imap.logout()
        except Exception:
            pass


if __name__ == "__main__":
    try:
        main()
    except Exception as exc:
        print(json.dumps({"ok": False, "error": str(exc)}, ensure_ascii=False, indent=2), file=sys.stderr)
        sys.exit(1)
