# 第 3 周页面内容规划：结合产品 Excel、NotebookLM 与海外话题调研

日期：2026-05-12  
产品资料来源：

- `/Users/yangxiaobo/Desktop/AIERXUAN/products/爱尔轩产品规格书 2025.11.7.xlsx`
- `/Users/yangxiaobo/Desktop/AIERXUAN/products/玩家战魂产品规格书 2025.11.7.xlsx`
- `/Users/yangxiaobo/Desktop/AIERXUAN/aierxuan-website/docs/week3-laptop-topic-screening-2026-05-12.md`
- `/Users/yangxiaobo/Desktop/AIERXUAN/aierxuan-website/docs/notebooklm-laptop-topic-2026-05-12/notebooklm-analysis.md`

## 最终结论

第 3 周仍然按 3 个高价值页面执行，但产品页建议从原先偏“商务/教育泛产品页”的方向，升级为一个有真实性能证据的代表型号页：

| 页面 | 最终推荐 | 原因 |
|---|---|---|
| `/en/oem` | `OEM/ODM Laptop Manufacturing for AI-Ready Business, Education and Gaming Programs` | NotebookLM 确认 OEM/ODM 是最高 B2B 转化入口；Excel 证明产品线既有商务轻薄，也有 RTX 高性能机型，可以支撑更完整的定制能力叙事。 |
| 代表性产品页 | `/en/products/qinglong-gt161-i7-13620h-rtx5060` | 这是两个 Excel 中最适合做“高性能代表页”的型号：RTX5060、8GB GDDR7、100W+15W GPU 功耗、2.5K 165Hz、DDR5 最高 96GB、80Wh、Thunderbolt 4、HDMI 2.1。 |
| 核心 Blog | 优先重写现有 `/en/blog/choosing-right-business-laptop`，标题改为 `How to Choose Laptops for Education, Office, Gaming and Distributor Bulk Orders in 2026` | 保留原有 URL 权重，同时把海外热点中的 business laptop、student laptop、AI laptop、RTX 5060、battery life、ARM/Snapdragon 讨论整合成采购指南。 |

如果后续只想做纯商务/教育产品页，备用型号是 `灵感14Ultra/i7-13620H`；但如果本周目标是“代表高性能产品”，应优先选择 `青龙16Pro/i7 13620H-RTX5060`。

## 产品性能筛选

| 排名 | 型号 | 关键性能 | 适合页面角色 | 判断 |
|---:|---|---|---|---|
| 1 | `青龙16Pro/i7 13620H-RTX5060` | i7-13620H，10 核 16 线程，RTX5060 8GB GDDR7，GPU 100W+15W，CPU+GPU 双烤 45W+115W，DDR5 最高 96GB，2.5K 165Hz，80Wh | 代表性高性能产品页 | 最适合承接海外 RTX 50、gaming laptop、creator laptop、TGP 透明度等热点。 |
| 2 | `凯王X16/i9 12900H-RTX3060` | i9-12900HK，14 核 20 线程，RTX3060 12GB，2.5K 165Hz，88.16Wh，最高 64GB DDR4 | 备选高性能页 | CPU 强、电池大，但 GPU 代际不如 RTX5060，话题热度稍弱。 |
| 3 | `凯王16Pro/i9 11900H-RTX3060` / `i7 11850H-RTX3060` | RTX3060 12GB，2.5K 屏，88.16Wh，最高 64GB | 旧款高性能补充 | 可作对比，不建议作为本周主推。 |
| 4 | `灵感14Ultra/i7-13620H` | i7-13620H，1.13kg，14 英寸 2800x1800 120Hz，LPDDR5 16GB/6400，PCIe 4 SSD | 商务/教育高性能轻薄备用页 | 适合 office、education、distributor bulk order，但缺少独显，不适合作 RTX 热点页。 |
| 5 | `幻影Air14/R5-7430` | Ryzen 5 7430U，6 核 12 线程，14 英寸 2880x1800 120Hz，60Wh，双内存槽最高 64GB | 平衡型商务/教育备用页 | 升级性强、屏幕好，但性能话题性弱。 |

不建议作为第 3 周代表页的型号：N5095、N95、N100、i3-6100U、i7-6600U。它们可以覆盖低价/教育入门市场，但不适合“高性能代表产品”。

## 代表产品页确认

推荐 URL：`/en/products/qinglong-gt161-i7-13620h-rtx5060`  
推荐 H1：`Qinglong 16 Pro RTX 5060 High-Performance Laptop for Gaming, Creation and Distributor Bulk Orders`

### 直接答案

`Qinglong 16 Pro` 是一款面向游戏渠道、创作者设备采购、性能型分销项目和高配置 OEM/ODM 项目的 16 英寸高性能笔记本。根据产品规格书，它搭载 Intel Core i7-13620H、NVIDIA GeForce RTX5060 8GB GDDR7、16 英寸 2.5K 165Hz IPS 屏、DDR5 双内存槽最高 96GB、双 M.2 2280 SSD 插槽和 80Wh 电池。

### 证据模块

| 证据类型 | 页面应展示内容 |
|---|---|
| GPU 透明度 | `NVIDIA GeForce RTX5060`、`8GB GDDR7`、显卡基础功耗 `100W`、动态增强功耗 `15W`、CPU+GPU 双烤 `45W+115W`、支持独显直连。 |
| 屏幕证据 | 16 英寸、2560x1600、16:10、IPS、雾面屏、100% sRGB、82% NTSC、165Hz。 |
| 升级能力 | DDR5 SODIMM*2，单根最高 48GB，总计最高 96GB；2 个 M.2 2280 NVMe PCIe 3.0 插槽，支持 256GB-2TB、直连存储技术、RAID。 |
| 端口能力 | Thunderbolt 4 Type-C，DP 1.4，100W PD，HDMI 2.1，USB 3.2 Gen2，RJ45 1Gbps，SD 卡口，Kensington lock。 |
| 散热/性能模式 | 办公模式 3000 r/min、平衡模式 3900 r/min、狂飙模式 5200 r/min，可通过 Fn+F10 或控制软件切换。 |
| 电池 | 15.56V 4924mAh / 80Wh。不要写续航小时数，除非后续补测试条件。 |

### 规格表

| 项目 | 内容 |
|---|---|
| Product model | `GT161/i7 13620H-RTX5060` |
| Store model | `Qinglong 16 Pro / i7 13620H-RTX5060` |
| CPU | Intel Core i7-13620H, 10 cores / 16 threads, 45W TDP, up to 4.9GHz |
| GPU | NVIDIA GeForce RTX5060, 8GB GDDR7 |
| GPU power | Base 100W + 15W dynamic boost; CPU+GPU listed as 45W+115W |
| Display | 16-inch 2.5K 2560x1600 IPS, 16:10, matte, 165Hz, 100% sRGB |
| RAM | DDR5 SODIMM*2, up to 48GB per slot, up to 96GB total, 5600MT/s |
| Storage | 2 x M.2 2280 NVMe PCIe 3.0, 256GB-2TB, direct storage and RAID support |
| Battery | 15.56V 4924mAh / 80Wh |
| Wireless | MediaTek MT7902 WiFi 6E, Bluetooth 5.3 |
| Camera | 720p camera |
| Security | fTPM 2.0, Kensington lock |
| OS | Windows 11 / Windows 10 |

### FAQ

1. `What is the GPU power of the RTX 5060 laptop?`
   - Answer with the exact Excel data: base 100W, dynamic boost 15W, CPU+GPU listed as 45W+115W.
2. `Does this laptop support dedicated GPU direct output?`
   - Yes, the specification sheet lists dedicated GPU direct support.
3. `Can RAM and SSD be upgraded?`
   - Yes. DDR5 SODIMM*2 supports up to 96GB total. It also includes two M.2 2280 NVMe slots.
4. `Is the display suitable for gaming and creative work?`
   - It has a 16-inch 2.5K 165Hz IPS matte panel with 100% sRGB coverage.
5. `Does it support Thunderbolt 4 and HDMI 2.1?`
   - Yes. The rear I/O includes Thunderbolt 4 Type-C with DP 1.4 and 100W PD, plus HDMI 2.1.
6. `What is the battery capacity?`
   - 80Wh. Avoid claiming runtime until a tested battery-life scenario is available.
7. `Can this model be customized for distributor or OEM orders?`
   - Yes, connect this answer to AIERXUAN logo, packaging, keyboard language, OS image, warranty and MOQ options.

### CTA

- `Request RTX 5060 Sample`
- `Ask for Distributor Pricing`
- `Send OEM/ODM Requirements`

### 重要修正提醒

`scripts/upload-products.ts` 里 RTX5060 旧数据与 Excel 不一致，后续正式改页面时必须以 Excel 为准：

| 字段 | 上传脚本旧值 | Excel 规格书值 |
|---|---|---|
| GPU memory | `8GB GDDR6` | `8GB GDDR7` |
| GPU power | `75W` | `100W + 15W dynamic boost`; CPU+GPU `45W+115W` |
| RAM max | `64GB` | `96GB` |
| Storage | `PCIe 4.0` | `2 x M.2 2280 NVMe PCIe 3.0` |
| Battery | `62Wh` | `80Wh` |
| WiFi/Bluetooth | `802.11ax / Bluetooth 5.2` | `MediaTek MT7902 WiFi 6E / BT 5.3` |

同时，Excel 中该型号重量为空，不要沿用脚本里的 `约 2.3kg`，除非供应链确认。

## `/en/oem` 页面内容确认

推荐 H1：`OEM/ODM Laptop Manufacturing for AI-Ready Business, Education and Gaming Programs`

页面定位：把海外热点中的 AI laptop、business laptop、student laptop、RTX 5060 gaming laptop，转化成 B2B 采购和 OEM/ODM 定制需求。

### 页面结构

| 模块 | 内容 |
|---|---|
| Direct Answer | AIERXUAN provides OEM/ODM manufacturing for business laptops, education laptops, gaming laptops and Mini PCs, with MOQ from 100 units, samples in 7-15 days and standard production in 15-25 days. |
| Evidence | 2014 年成立、10+ 年经验、Intel China Channel Partner since 2019、500,000+ units shipped、50+ countries、15,000㎡ facility、50,000+ monthly capacity、CE/FCC/RoHS、ISO 9001/14001。 |
| Product line table | Business/education thin-light: `灵感14Ultra/i7-13620H`；high-performance gaming/creator: `青龙16Pro/i7-13620H-RTX5060`；budget education/distribution: Air/N 系列；Mini PC 单独列。 |
| OEM/ODM table | Logo, packaging, keyboard language, BIOS boot logo, OS image, RAM/SSD configuration, certifications, carton labels, warranty/RMA. |
| Market fit | AI-ready business devices、student laptop bulk deployment、RTX 5060 gaming distributor demand、battery/upgradeability concerns。 |
| FAQ | MOQ、样品、交期、AI-ready 配置边界、RTX/TGP 能否确认、认证范围、售后、键盘语言、系统镜像。 |
| CTA | `Send OEM Requirements`、`Request Product Catalog`、`Ask for Sample Lead Time`。 |

写作边界：可以写 `AI-ready configuration options`，不要写 `Copilot+ PC`、`NPU TOPS`、`Snapdragon`，除非后续有具体 SKU 证据。

## 核心 Blog 内容确认

优先 URL：`/en/blog/choosing-right-business-laptop`  
备选新 URL：`/en/blog/laptop-buying-guide-2026-education-office-gaming-bulk-orders`  
推荐 H1：`How to Choose Laptops for Education, Office, Gaming and Distributor Bulk Orders in 2026`

### 直接答案

2026 年学校、办公室和分销商批量采购笔记本时，应先确认用途、CPU/RAM/SSD、屏幕、电池容量、接口、可维修/可升级性、系统镜像、认证、MOQ、交期和售后。AI PC、OLED、Snapdragon/ARM、RTX 50 都值得关注，但必须按实际使用场景选择，而不是只看热词。

### 表格结构

| 采购场景 | 推荐配置重点 | AIERXUAN 可承接型号/方向 |
|---|---|---|
| Education / student bulk | 轻便、耐用、价格稳定、电池容量、键盘语言、RMA | Air / 灵感轻薄系列 |
| Office / enterprise | 稳定平台、内存/SSD、接口、TPM、系统镜像 | 灵感14Ultra、幻影Air14 |
| Gaming distributor | GPU 型号、TGP、散热、刷新率、独显直连、售后 | 青龙16Pro RTX5060 |
| Creator / GPU workload | 独显、显存、色域、内存上限、SSD 扩展 | 青龙16Pro RTX5060 |
| OEM private label | Logo、包装、BIOS、OS、认证、MOQ、交期 | `/en/oem` |

### FAQ

- `Are AI laptops worth it for schools and offices in 2026?`
- `Is Snapdragon or Windows on ARM suitable for business deployment?`
- `Should students choose OLED or IPS laptops?`
- `How much RAM is enough for office and education laptops?`
- `When should a buyer choose an RTX laptop instead of a business laptop?`
- `What should distributors ask a laptop manufacturer before bulk orders?`
- `Why do TGP, cooling and ports matter for gaming laptops?`

CTA：文章中段导向 `/en/oem`，高性能章节导向 `/en/products/qinglong-gt161-i7-13620h-rtx5060`，结尾导向 RFQ/contact。

## 第 3 周执行顺序

1. 先改 `/en/oem`：建立制造能力、定制能力、采购信任和页面 Schema。
2. 再改 `/en/products/qinglong-gt161-i7-13620h-rtx5060`：用 Excel 真实参数修正产品数据和 Product Schema。
3. 最后重写核心 Blog：承接海外热点搜索，把用户导向 OEM 页和 RTX5060 产品页。

## 上线前还需补证

| 需要确认 | 原因 |
|---|---|
| RTX5060 型号重量 | Excel 当前为空，不能直接写 2.3kg。 |
| 真实产品图片 | 产品页必须展示该型号实物或可靠渲染图，不能只用通用占位图。 |
| 电池续航测试 | 只有 80Wh 容量，没有续航小时数；如要写续航，需给亮度、场景、系统配置。 |
| 噪音/温度数据 | Gaming/creator 买家会追问散热和噪音；当前只有风扇转速模式。 |
| 产品级 CE/FCC/RoHS | OEM 页面可写公司/项目能力，产品页最好确认具体型号或项目认证。 |
| 保修/RMA 条款 | B2B 转化必填，尤其是分销商和学校采购。 |

