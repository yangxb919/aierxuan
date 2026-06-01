# AIERXUAN 任务清单

## 已上线（部署完成 2026-06-01）

### PR #1 + VPS GEO 调和 → main → 生产部署 ✅
- PR #1 已合并(merge 72bf0c3)；与 VPS 未提交 GEO 工作调和(merge c9c8e80)后推 main
- VPS 部署：备份分支 vps-local-20260601(7424149) 已 push 留存；110 碰撞文件确认全相同/超集后 pull；npm build + pm2 restart aierxuan；线上验证 200 + email-protection 归零 + FAQ JSON-LD + sitemap 含 /en/oem
- ⚠️ 调和保留：oem GEO answer-first 全保留；唯独 layout Organization JSON-LD 的 email 字段未重新加(与 PR 移除明文 email 的修复对立)——待老板裁定是否需要
- ⚠️ 待老板确认：admin 代码注释称生产库列为 product_translations.locale，而 PR 用 language_code(有 seo-p0-check 守卫)；若线上产品标题异常需复核此字段
- 清理：备份分支 vps-local-20260601 暂留作安全网，确认无误后可删

## 待办

### GA4 实测结论（2026-06-01 拉取，脚本 hermes/aierxuan-seo/ga4/ga4_tool.py）
- **GA4 已连通**：page_view/scroll/user_engagement 正常 → GTM 内已有 GA4 配置标签（Measurement ID 存在，只是不在代码里）
- **主缺口收窄**：generate_lead 28 天进了 GA4 1 次但 keyEvents=0 → **核心动作=GA4 后台标记 generate_lead 为关键事件**（比"整条链路断"轻）
- form_start 7→generate_lead 1：ContactModal 无埋点(T5 待部署)+填表流失；部署 PR #1 后复测
- chatgpt.com referral 26 sessions=第二大来源(>Google organic 5)；/admin 被统计建议排除

### GA4 关键事件 ✅ 已确认开启（2026-06-01 opencli 核查）
- GA4 管理→Events 表 generate_lead 开关 aria-pressed=true、实心 star → 已标记关键事件
- 28天 API keyEvents=0 因 GA4 标记不追溯历史（近期才开），新事件起将计入
- 后续：部署 PR #1 后过 1-2 天用 ga4_tool.py 复测 keyEvents 是否开始增长

### GTM 核查 ✅（2026-06-01 opencli）account 6321036536/container 233584522/ws6
- GA4 Event 标签「GA4 Event - generate_lead」配置正确：事件名 generate_lead / 衡量ID G-JXR491KJTZ / 触发器 CE - generate_lead
- 另有 2 个 GA4 配置标签（GA4-aierxuanlaptop + Google Analytics 4，疑重复，后续可清理）
- 结论：GTM→GA4 链路本就通（1 次 generate_lead 经此进 GA4）；低计数纯因 ContactModal 未 push（=T5 修，待部署）

### 部署流程（VPS）
- ssh aierxuan → /var/www/aierxuan/update.sh（git pull main + npm install + rm .next + build + pm2 restart aierxuan-website）
- PM2 应用名 aierxuan-website；验证 curl localhost:3000 / https://aierxuanlaptop.com
- **SKU 认证矩阵回填**：模板 marketing/assets/sku-cert-matrix-TEMPLATE.md，需填 CE/FCC/RoHS/EAC 等真实数据
- 执行文档另有 ~10 项老板决策待批

## 已完成

### T8 T6#6 残留 404 内链核查+修复 ✅
- **负责人**：SEO专家｜dispatch 39162f37
- **结论**：08ddff4 已覆盖复检主清单；抽取 articles/*.md 内链发现 10 条残留旧 slug 会被通用 rewrite 打到未发布 blog → 已修
- **commit**：9a8f903（已 push 进 PR #1）；seo-p0-check/lint/build 全过
- **注**：生产旧 slug 现仍 404 因 PR 未部署，非修复无效

### T6 关键词/搜索词缺口分析 ✅
- **负责人**：搜索词分析师｜dispatch fac2c788
- **产出**：seo/aierxuan-keyword-gap-analysis-2026-06-01.md
- **Top 缺口**：①/en/oem 未索引(0 EN 商业曝光) ②wholesale/custom laptop 交易 LP 完全缺失(4400 量级机会) ③RU 词过时(旧 gaming→新商务本 B2B) ④AI 渠道 answer-first 内容真空 ⑤否定词/品牌词未分层(小预算 ROI 杀手) ⑥多篇高价值 article 仍有 404 内链

### T7 落地页物料图像提示词 ✅
- **负责人**：图像提示词工程师｜dispatch dd4b2245
- **产出**：marketing/assets/aierxuan-lp-image-prompts-2026-05-31.md
- **覆盖**：EN/RU LP hero(EN-01/02,RU-01/02) + OEM 组图×5 + ABM 配图×6，均含 prompt/用途/尺寸/风格/避免项；待老板定风格后再实际生成

### T3 P0 SEO 修复执行 ✅
- **负责人**：SEO专家｜dispatch aaec619f
- **分支**：fix/generate-lead-tracking（3 commit 08ddff4/b805599/a132eec，堆在 T5 之上，未 push）
- **修复**：①SafeEmail 渲染消除 email-protection 404 + 旧 slug 301 + 失效内链归一 ②proxy 不再污染公共页缓存 + /en/oem priority 0.95 + 内链入口 + x-default ③ja/fr/pt/zh-CN 加 noindex,follow 不进 sitemap ④metadata 长度规范+H1 去重+ru 产品 title 本地化修复 ⑤Navbar md→lg 修平板溢出
- **验证**：seo-p0-check.mjs 通过、lint 0 error、build 通过、Playwright 三端验证
- **遗留(需老板)**：部署后 GSC 手动 Request Indexing /en/oem；复查 CF 缓存 BYPASS→可缓存、404 是否下降

### T5 generate_lead 追踪修复 — B 类代码 PR ✅
- **负责人**：增长黑客｜dispatch afd3d782
- **分支**：fix/generate-lead-tracking（commit da3a0bc，未 push）
- **改动**：ContactModal.tsx 成功分支接入 trackLeadFormSubmit({source:'contact_modal'})；ads-tracking.ts lead 加 value:1/currency:USD；新增测试
- **验证**：新增测试先红后绿(2 pass)、现有 12 pass、lint 0 error、build 通过
- **遗留**：A 类 GTM/GA4 后台配置仍需老板处理才能真正打通

### T4 30天计划锁 B 档 + W1 启动 ✅
- **负责人**：跨境电商运营专家｜dispatch f3b8e0ae
- **产出**：执行文档锁 B 档；generate_lead 修复规格书；认证矩阵模板；SEO ⏳项全部转已对齐(§8)
- **B 档预算**：Yandex$400-600/Google$500-700/LinkedIn$120/邮件$80-150/阿里MIC免费/翻译$150-250；砍日本付费+Europages+付费橱窗

## 已完成

### T1 全站 SEO 现状复检 ✅
- **负责人**：SEO专家｜dispatch aab87bc6
- **产出**：seo/aierxuan-technical-seo-recheck-2026-05-31.md
- **已修复确认**：apex 301 生效；OEM JSON-LD 上线；/ru/oem 已索引
- **P0 待修**：①站内 404/失效内链(email-protection 404×116、旧 blog slug) ②/en/oem 仍未索引(最大英文商业页问题) ③公共页 set-cookie+private 缓存致 CF BYPASS ④sitemap 仅 88URL 缺 ja/fr/pt/zh-CN、hreflang 不全 ⑤on-page(53 title 超长/25 desc 超长/19 H1 异常，多在 blog；ru 产品 title 与 en 重复)

### T2 30 天询盘计划推进至执行层 ✅
- **负责人**：跨境电商运营专家｜dispatch 0ffe0855
- **产出**：planning/30day-inquiry-plan-EXECUTION-2026-05-31.md
- **结论**：选定 v1.1-final，落为三档预算门控；默认 B 档执行，W1 全为不花钱基建，无阻塞
- **关键洞察**：SEO 自然搜索近乎为零（90天 40曝光/6点击）；AI 来源(chatgpt.com 18 sessions)已是最强自然渠道；generate_lead 追踪当前=0 为 Day1 命门
