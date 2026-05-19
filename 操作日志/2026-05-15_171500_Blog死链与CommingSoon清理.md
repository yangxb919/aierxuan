# Blog 死链与 Coming Soon 占位清理

日期：2026-05-15

## 涉及表
- `blog_post_translations`（Supabase）

## 改动范围
9 篇文章 × 6 locale = 54 行 body_md（含 #16 EN 仅 1 行不在内，因为它没有这些问题）。

实际 PATCH 行数：55（首批 54 + 日语版残留 1 行补刀）。

## 执行的规则
- A：`/articles/X` → `/en/blog/X`（slug 一致，仅路径修复）
- B：错误 slug → 正确 slug
- C：不存在的 slug → 最相近真实文章
- D：`/en/blog/wrong-slug` → 正确 slug
- E：3 个不计划写的链接对应整行删除（best-mini-pc-gaming / digital-signage / barebones-kit）
- F：剥离各 locale 的 "Coming Soon" 类标注
  - EN: `(Coming Soon)`
  - RU: `(Скоро)`
  - JA: `(近日公開予定)` `(近日公開)` + 残留英文 `(Coming Soon)`
  - FR: `(À venir)` `(Bientôt)`
  - PT: `(Em Breve)`
  - zh-CN: `(即将推出)`

## 备份
`操作日志/backups/2026-05-15_blog_bodies_before_deadlink_fix.json`（54 行 body_md / 1.5MB）

## 验证（最终）
- `/articles/...` 死链：**0**（之前 20+）
- `](#)` 空锚：**0**（之前 9+）
- "Coming Soon" 类标签：**0**（之前 15+）

## ISR 缓存
Next.js blog 页 `revalidate = 3600`，最长 1 小时后前端更新。

## 待办
- #11 `[Your Company]` 占位符 + 发布时间错乱 + 补 FAQ + 补内链
- #13 / #14 / #15 补 FAQ
- #16 补 RU + ja/fr/pt/zh-CN 翻译 + CTA + body 内 "2025" 字样
- 其他 11 篇 body 内的 2025 字样（如 "Last Updated December 28, 2025"）
