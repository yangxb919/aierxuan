# 备份 public/uploads/ 到 Cloudflare R2 (aierxuan 桶)

日期：2026-05-15
任务：把网站本地图片目录备份到 R2，作为冷备。

## 涉及文件
- `~/.config/rclone/rclone.conf`（新建，权限 600，未进 git）
- `aierxuan-website/scripts/backup-uploads-to-r2.sh`（新建，可重复运行）

## 操作内容
1. `brew install rclone`（v1.74.1）。
2. 写 rclone 配置段 `[r2-aierxuan]`，type=s3 provider=Cloudflare。
3. 首次全量上传：`public/uploads/` → `r2-aierxuan:aierxuan/uploads/`。
4. 结果：215 个对象 / 24.938 MiB（含 `.gitkeep`、`manifest.json`）。
5. 写 `scripts/backup-uploads-to-r2.sh` 以便后续一键增量同步。

## 凭证管理
- R2 User API Token 名：`aierxuan-local-backup`（用户 API 令牌，离职即停用）
- 凭证保存在 `~/.config/rclone/rclone.conf`，权限 600，未追踪入 git。
- ⚠️ 凭证在创建过程中曾以明文出现在 AI 对话中。建议备份完成后回 Cloudflare 控制台轮换密钥。

## 后续使用
- 增量备份：`bash scripts/backup-uploads-to-r2.sh`
- 预览：`bash scripts/backup-uploads-to-r2.sh --dry`
