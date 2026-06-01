# AIERXUAN Zoho Mail for Codex

结论：这里按 PRSPARES 的 Zoho 方式做了本地脚本，但账号换成 `admin@aierxuanlaptop.com`，只允许查信、读信、搜索、保存草稿，不提供发送命令。

## 文件

- `tools/zoho_mail/aierxuan_zoho_mail.py`：Codex/Hermes 使用的邮箱脚本。
- `tools/zoho_mail/setup_keychain.sh`：把 Zoho App Password 存到 macOS Keychain。
- `.agents/skills/aierxuan-zoho-mail/SKILL.md`：给 Codex 自动识别的项目级 skill。

## 第一次设置

1. 登录 Zoho Mail 的 `admin@aierxuanlaptop.com`。
2. 确认 IMAP 已开启：Zoho Mail Settings → Mail Accounts → IMAP Access。
3. 生成 App Password：Zoho Account → Security → App Passwords。
4. 回到本机执行：

```bash
cd /Users/yangxiaobo/Desktop/aierxuan
./tools/zoho_mail/setup_keychain.sh
```

Keychain 保存规则：

- Account：`admin@aierxuanlaptop.com`
- Service：`zoho-aierxuan-imap`
- 密码不写入项目文件，不给 Codex 直接看。

## Codex 常用命令

```bash
cd /Users/yangxiaobo/Desktop/aierxuan

# 看文件夹
python3 tools/zoho_mail/aierxuan_zoho_mail.py folders

# 看最近 10 封未读邮件，不会标记已读
python3 tools/zoho_mail/aierxuan_zoho_mail.py recent --folder INBOX --limit 10 --unseen

# 读邮件正文，不会标记已读
python3 tools/zoho_mail/aierxuan_zoho_mail.py read <UID> --folder INBOX

# 搜索邮件
python3 tools/zoho_mail/aierxuan_zoho_mail.py search "battery inquiry" --folders INBOX,Sent,Drafts --limit 10

# 新建草稿，不发送
python3 tools/zoho_mail/aierxuan_zoho_mail.py draft --to buyer@example.com --subject "Re: Laptop inquiry" --body-file /tmp/aierxuan_reply.txt

# 基于原邮件起草回复，不发送
python3 tools/zoho_mail/aierxuan_zoho_mail.py draft --reply-to-uid <UID> --reply-folder INBOX --body-file /tmp/aierxuan_reply.txt
```

## 规则

- 只读查信用 `BODY.PEEK`，避免把邮件标记为已读。
- 草稿通过 IMAP 保存到 Drafts，不走 SMTP，不会发送。
- 如果 Codex 报 `Missing Zoho App Password in macOS Keychain`，只需要重新跑 `./tools/zoho_mail/setup_keychain.sh`。
