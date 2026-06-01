# AIERXUAN W1-W2 Landing Page Image Prompts

> Date: 2026-05-31  
> Scope: Prompt-only asset plan for W1-W2 landing pages and marketing materials. Do not generate images before style approval.

## 0. Global Direction

- Business role: Shenzhen-based OEM/ODM laptop and Mini PC manufacturer for overseas B2B buyers.
- Visual tone: photorealistic industrial photography, clean B2B technology supplier, credible manufacturing proof, not consumer e-commerce.
- Brand palette: white, cool gray, brushed metal, glass, subtle AIERXUAN blue accent similar to `oklch(0.6231 0.1880 259.8145)`.
- Composition rule: landing page hero images must leave a calm overlay zone for page copy and CTA.
- Text rule: allow at most one readable brand cue, `"AIERXUAN"`. Add LP copy, certification notes, prices, MOQ, and offer details in the webpage/design layer, not inside the generated image.
- Authenticity rule: for final buyer-facing use, replace or refine with real product/factory references when available.

### Global Negative Prompt

Use this avoid list with every prompt:

```text
Avoid: fake certification logos, fake EAC/CE/PSE/ISO marks, fake certificate numbers, copied competitor logos, Intel/AMD/Lenovo/Dell/Apple/ASUS branding, gibberish labels, unreadable dense text, unrealistic oversized products, sci-fi lab styling, messy warehouse, smiling stock-photo people staring at camera, watermarks, random UI screens, exaggerated neon colors, cartoon rendering, cheap AI plastic texture.
```

## 1. EN Mini PC LP Hero

### Prompt EN-01: Mini PC Product + Manufacturing Trust Hero

**中文用途说明**：用于 `/en/lp/mini-pc` 首屏 hero。画面右侧展示迷你主机产品、测试工位和小批量包装，左侧留白给英文 headline、CTA 和表单入口。适合欧洲 B2B 办公、嵌入式、系统集成采购方。

**建议尺寸/比例**：Desktop `2400x1350` / `16:9`; mobile crop safe center-right. Leave left 42% low-detail overlay space.

**风格关键词**：摄影写实、B2B 专业、OEM/ODM 制造、冷白影棚光、品牌蓝点缀、干净工业摄影。

**English Prompt**:

```text
Create a photorealistic 16:9 website hero image for AIERXUAN, a Shenzhen-based OEM/ODM Mini PC manufacturer serving B2B distributors, office IT buyers, and embedded system integrators.

Scene: a clean product proof setup inside a modern electronics manufacturing facility. On the right side, show several compact generic Mini PCs with matte black and brushed aluminum finishes on an anti-static workbench, one unit connected to a testing monitor, a small QC checklist clipboard with no readable text, organized accessories, neutral export cartons, and a glimpse of an assembly line in the background.

Composition: eye-level commercial product photography, 35mm lens, three-quarter product angle, strong foreground-to-background depth. Leave the left 42% of the frame calm, slightly darker, and low-detail for website headline and CTA overlay. Keep the Mini PCs and QC workstation on the right half. Maintain safe center crop for mobile.

Lighting: large softbox from upper left, gentle rim light along product edges, clean realistic reflections on metal surfaces, balanced exposure, cool white manufacturing environment with subtle AIERXUAN blue accent lighting.

Branding: one exact readable wall sign in the background may read "AIERXUAN"; no other readable text.

Style: premium B2B technology supplier, realistic materials, clean industrial photography, practical manufacturing credibility, not a consumer gadget ad.

Output Fit: hero background for an English Mini PC landing page, copy overlay on the left, visual proof on the right, high clarity, professional website-ready crop.

Avoid: fake certification logos, fake EAC/CE/PSE/ISO marks, fake certificate numbers, copied competitor logos, Intel/AMD/Lenovo/Dell/Apple/ASUS branding, gibberish labels, unreadable dense text, unrealistic oversized products, sci-fi lab styling, messy warehouse, smiling stock-photo people staring at camera, watermarks, random UI screens, exaggerated neon colors, cartoon rendering, cheap AI plastic texture.
```

### Prompt EN-02: Mini PC OEM Configuration Tabletop

**中文用途说明**：作为 EN 迷你主机 LP 的二屏或广告落地页备用图，强调可定制外壳、接口、包装和批量交付，但不生成具体芯片品牌或不可验证规格。

**建议尺寸/比例**：`1800x1200` / `3:2`; can crop to `4:3` card.

**风格关键词**：产品证明图、OEM 配置、干净台面、真实反光、B2B 采购可信度。

**English Prompt**:

```text
Create a photorealistic B2B product proof image for AIERXUAN Mini PC OEM capability.

Subject: three generic Mini PC enclosure variants arranged on a clean light gray workbench: matte black, silver aluminum, and vented industrial chassis. Include neutral accessory cables, unbranded packaging samples, a caliper, an anti-static mat, and a closed compliance document folder with no logos or readable certification marks.

Composition: commercial product photography, 50mm lens, f/5.6, three-quarter tabletop angle, clear hierarchy, products in the foreground, packaging and testing tools in the midground. Leave a small calm area at the top-left for a short caption if needed.

Lighting: soft studio key light from upper left, weak fill from right, realistic shadows, controlled reflections, neutral white balance with subtle blue brand accent.

Style: practical OEM sourcing image, premium but not luxury, clean manufacturing proof, accurate scale relationships.

Avoid: fake certification logos, fake EAC/CE/PSE/ISO marks, fake certificate numbers, copied competitor logos, Intel/AMD/Lenovo/Dell/Apple/ASUS branding, gibberish labels, unreadable dense text, unrealistic oversized products, sci-fi lab styling, messy warehouse, smiling stock-photo people staring at camera, watermarks, random UI screens, exaggerated neon colors, cartoon rendering, cheap AI plastic texture.
```

## 2. RU Business Laptop LP Hero

### Prompt RU-01: Business Laptop Russia Landing Hero

**中文用途说明**：用于 `/ru/lp/business-laptop` 首屏 hero。视觉重点是商务本批量采购、俄语市场信任感、合规文件夹、双币种报价流程。不要让 AI 生成 EAC 官方标识或具体认证编号，页面文案中再写真实 EAC 说明。

**建议尺寸/比例**：Desktop `2400x1350` / `16:9`; mobile center crop. Leave right 38% calm overlay zone if俄语文案放右侧，或生成后水平翻转用于左侧文案。

**风格关键词**：俄语市场商务调性、低调专业、工厂背书、双报价信任感、摄影写实、AIERXUAN 蓝。

**English Prompt**:

```text
Create a photorealistic 16:9 website hero image for AIERXUAN's Russian-market business laptop OEM landing page.

Scene: a professional B2B sourcing desk inside a clean electronics factory showroom. On the left side, show several generic slim business laptops in dark gray and silver finishes, one open at a neutral blank desktop, with a background view of organized laptop assembly workstations behind glass. Include a neat document folder labeled only "Compliance Documents" in plain English, a clean quotation worksheet showing only two short column headers "RUB" and "USD", and export cartons without readable shipping labels.

Composition: eye-level 35mm commercial interior lens, straight vertical lines, laptop samples in the foreground, sourcing desk in the midground, factory proof in the background. Leave the right 38% calm, slightly darker, low-detail negative space for Russian headline, Telegram CTA, and form overlay. Keep mobile crop safe with the main laptop samples near center-left.

Lighting: soft daylight from large factory windows on camera left, controlled overhead practical lights, subtle rim light on laptop edges, neutral-to-cool color temperature, realistic shadows.

Branding: one exact readable wall sign may read "AIERXUAN"; no other brand marks.

Style: premium B2B business laptop supplier, Russian distribution sourcing mood, serious and practical, not lifestyle retail, not consumer fashion.

Output Fit: hero background for a Russian business laptop landing page, visual trust from product samples plus factory context, clean overlay space for web copy.

Avoid: fake certification logos, fake EAC/CE/PSE/ISO marks, fake certificate numbers, copied competitor logos, Intel/AMD/Lenovo/Dell/Apple/ASUS branding, gibberish labels, unreadable dense text, unrealistic oversized products, sci-fi lab styling, messy warehouse, smiling stock-photo people staring at camera, watermarks, random UI screens, exaggerated neon colors, cartoon rendering, cheap AI plastic texture.
```

### Prompt RU-02: Business Laptop Quote Pack Visual

**中文用途说明**：用于 RU LP 信任区或 Yandex 广告素材。强调双币种报价、DAP/CIF 运输选项、商务本样机与出口包装，但所有价格、运输条款和认证细节后期用网页组件写，图片里不承载真实商业承诺。

**建议尺寸/比例**：`1600x900` / `16:9`; can crop to `1.91:1` ad creative.

**风格关键词**：B2B 报价包、商务采购、俄市场、干净办公桌、制造可信度。

**English Prompt**:

```text
Create a photorealistic B2B sales enablement image for AIERXUAN business laptop export quotation.

Subject: a clean procurement desk with two generic business laptop samples, a neutral RFQ response folder, a simple two-column quote sheet with only the short headers "RUB" and "USD", sealed unbranded export cartons in the background, and a blurred view of a QC workstation behind glass.

Composition: 50mm lens, f/4, controlled shallow depth of field, laptop samples and RFQ folder sharp in the foreground, cartons and factory background softly separated. Keep the top-right corner calm for a small web label or ad title.

Lighting: soft side light from camera left, gentle fill from the right, realistic paper texture, clean metal reflections, cool gray and white palette with restrained AIERXUAN blue accent.

Style: professional B2B procurement photography, export-ready, trustworthy, minimal, serious Russian-market tone.

Avoid: fake certification logos, fake EAC/CE/PSE/ISO marks, fake certificate numbers, copied competitor logos, Intel/AMD/Lenovo/Dell/Apple/ASUS branding, gibberish labels, unreadable dense text, unrealistic oversized products, sci-fi lab styling, messy warehouse, smiling stock-photo people staring at camera, watermarks, random UI screens, exaggerated neon colors, cartoon rendering, cheap AI plastic texture.
```

## 3. OEM Capability Image Set

### Prompt OEM-01: Factory Exterior With Brand Cue

**中文用途说明**：用于 OEM 能力页、首页 manufacturing proof 或白皮书封面内页。建立“真实厂家”第一印象，不放夸张产品，不放虚假认证。

**建议尺寸/比例**：`2400x1350` / `16:9`.

**风格关键词**：现代工厂外景、企业摄影、玻璃金属、真实工业园、品牌蓝。

**English Prompt**:

```text
Create a photorealistic corporate exterior image of a modern electronics manufacturing factory for AIERXUAN.

Scene: a clean industrial park with a medium-sized modern factory building, glass and metal facade, orderly entrance, small logistics driveway, subtle landscaping, and clear blue daytime sky. The building facade has one exact readable sign: "AIERXUAN". No oversized products outside the building.

Composition: wide-angle 24mm architectural photography, straight vertical lines, three-quarter front view, factory entrance and facade as the main subject, enough sky and clean pavement for website cropping.

Lighting: crisp natural daylight, soft shadows, realistic reflections on glass, neutral color grade with subtle blue brand accents.

Style: credible OEM/ODM manufacturer, professional corporate industrial photography, realistic scale, clean and organized.

Avoid: fake certification logos, fake EAC/CE/PSE/ISO marks, fake certificate numbers, copied competitor logos, Intel/AMD/Lenovo/Dell/Apple/ASUS branding, gibberish labels, unreadable dense text, unrealistic oversized products, sci-fi lab styling, messy warehouse, smiling stock-photo people staring at camera, watermarks, random UI screens, exaggerated neon colors, cartoon rendering, cheap AI plastic texture.
```

### Prompt OEM-02: Laptop Assembly Line

**中文用途说明**：用于 OEM 能力展示组图中的产线卡片。强调有序装配、工人、治具、传送线和可规模交付，不写具体“15 条产线/98% 自动化率”等待确认数字。

**建议尺寸/比例**：`1800x1200` / `3:2`.

**风格关键词**：产线摄影、笔记本组装、洁净服、真实工位、明亮有序、B2B 工业。

**English Prompt**:

```text
Create a photorealistic industrial photography image of a laptop assembly line for an OEM/ODM manufacturer.

Scene: a clean electronics production floor with workers in light blue anti-static coats assembling generic laptop chassis at organized workstations. Show conveyor sections, torque drivers, anti-static mats, component trays, and quality check tags with no readable text. The environment is bright, orderly, and operational.

Composition: eye-level 28mm documentary-commercial lens, diagonal production line leading from foreground to background, workers focused on assembly tasks, products visible but generic and unbranded.

Lighting: even overhead factory lighting, soft daylight fill, high clarity without harsh glare, neutral white balance with subtle blue accents.

Style: realistic B2B manufacturing capability proof, efficient and clean, not staged like a stock office photo.

Avoid: fake certification logos, fake EAC/CE/PSE/ISO marks, fake certificate numbers, copied competitor logos, Intel/AMD/Lenovo/Dell/Apple/ASUS branding, gibberish labels, unreadable dense text, unrealistic oversized products, sci-fi lab styling, messy warehouse, smiling stock-photo people staring at camera, watermarks, random UI screens, exaggerated neon colors, cartoon rendering, cheap AI plastic texture.
```

### Prompt OEM-03: Mini PC Testing And Burn-In Rack

**中文用途说明**：用于迷你主机 LP 或 OEM 能力组图，体现每台机器经过上电测试、老化测试和稳定性验证。避免生成具体测试数值或系统界面。

**建议尺寸/比例**：`1800x1200` / `3:2`.

**风格关键词**：Mini PC 测试、老化架、QC 工位、工程师、技术可信度、冷白光。

**English Prompt**:

```text
Create a photorealistic QC and burn-in testing image for generic Mini PCs in an electronics factory.

Scene: rows of compact unbranded Mini PCs connected on organized burn-in racks, with clean cables, test monitors showing neutral abstract diagnostic screens without readable text, and a technician in an anti-static coat checking the setup with a tablet. Include ESD mats, labels as blank color blocks, and a tidy QC workstation.

Composition: 35mm lens, f/4, medium-wide view, testing racks leading into the background, technician as a supporting element, Mini PC units and cables clearly visible but not cluttered.

Lighting: cool white overhead factory lighting, soft fill, slight rim light on metal edges, balanced exposure, crisp industrial realism.

Style: technical B2B proof, ODM manufacturing capability, reliability testing, clean and credible.

Avoid: fake certification logos, fake EAC/CE/PSE/ISO marks, fake certificate numbers, copied competitor logos, Intel/AMD/Lenovo/Dell/Apple/ASUS branding, gibberish labels, unreadable dense text, unrealistic oversized products, sci-fi lab styling, messy warehouse, smiling stock-photo people staring at camera, watermarks, random UI screens, exaggerated neon colors, cartoon rendering, cheap AI plastic texture.
```

### Prompt OEM-04: Quality Control Inspection Lab

**中文用途说明**：用于 QC/质量控制模块。强调检测仪器、工程师、抽检/全检流程感，但不出现“ISO 9001”等未经回填确认的认证字样。

**建议尺寸/比例**：`1800x1200` / `3:2`.

**风格关键词**：QC 实验室、电子测试仪、笔记本检测、严谨、干净、摄影写实。

**English Prompt**:

```text
Create a photorealistic quality control laboratory image for laptop and Mini PC manufacturing.

Scene: a clean electronics QC lab with one technician inspecting a generic business laptop on a test bench, surrounded by measurement tools, power meters, thermal testing equipment, ESD-safe surface, and a neutral checklist on a clipboard with no readable small text. The background shows organized shelves of test fixtures and sample units.

Composition: 50mm lens, f/4, technician hands and laptop test area in sharp focus, background softly separated, camera at desk height for a professional inspection perspective.

Lighting: large soft overhead panel, mild side fill, accurate skin and material tones, low glare on laptop screen, cool white lab environment.

Style: serious quality assurance, B2B manufacturing credibility, precise and realistic, no dramatic sci-fi lighting.

Avoid: fake certification logos, fake EAC/CE/PSE/ISO marks, fake certificate numbers, copied competitor logos, Intel/AMD/Lenovo/Dell/Apple/ASUS branding, gibberish labels, unreadable dense text, unrealistic oversized products, sci-fi lab styling, messy warehouse, smiling stock-photo people staring at camera, watermarks, random UI screens, exaggerated neon colors, cartoon rendering, cheap AI plastic texture.
```

### Prompt OEM-05: Packaging And Export Logistics

**中文用途说明**：用于 OEM 能力组图中的包装/物流模块，以及 ABM 邮件附件视觉。体现出口包装、批量订单和仓储秩序，不写虚假目的地、客户名或订单数量。

**建议尺寸/比例**：`1800x1200` / `3:2`.

**风格关键词**：出口包装、仓储物流、ODM 交付、整洁货架、B2B 专业。

**English Prompt**:

```text
Create a photorealistic warehouse and export packaging image for an OEM laptop and Mini PC manufacturer.

Scene: a clean logistics area with neatly stacked unbranded export cartons, foam inserts, packaging samples, pallet racks, barcode-like blank labels with no readable text, and two workers sealing boxes at a packing station. Include a few generic laptop and Mini PC sample boxes on a table to show product category without exposing fake customer brands.

Composition: 28mm commercial warehouse lens, straight vertical lines, packing station in the foreground, organized pallet racks in the background, strong depth and clear aisle lines.

Lighting: bright industrial warehouse lighting, soft shadows, neutral gray and white palette, subtle blue accent on shelf tags or tape.

Style: efficient export-ready B2B supplier, clean logistics proof, realistic scale, no chaotic storage.

Avoid: fake certification logos, fake EAC/CE/PSE/ISO marks, fake certificate numbers, copied competitor logos, Intel/AMD/Lenovo/Dell/Apple/ASUS branding, gibberish labels, unreadable dense text, unrealistic oversized products, sci-fi lab styling, messy warehouse, smiling stock-photo people staring at camera, watermarks, random UI screens, exaggerated neon colors, cartoon rendering, cheap AI plastic texture.
```

## 4. Social / ABM Image Prompts

### Prompt ABM-01: LinkedIn Company Cover

**中文用途说明**：用于 LinkedIn 公司页封面。强调 AIERXUAN 是 OEM/ODM 笔记本和迷你主机制造商，画面左侧/中部要干净，方便设计层叠加公司简介。

**建议尺寸/比例**：`1584x396` / LinkedIn cover.

**风格关键词**：LinkedIn 专业、横幅、工厂+产品+QC、品牌蓝、低噪音。

**English Prompt**:

```text
Create a photorealistic LinkedIn company cover banner for AIERXUAN, an OEM/ODM laptop and Mini PC manufacturer.

Scene: a wide panoramic view combining a clean electronics showroom foreground, generic business laptop and Mini PC samples on a table, and a softly visible factory QC area in the background. Include one exact wall sign: "AIERXUAN".

Composition: ultra-wide banner, 1584x396 ratio, main visual interest on the right 55%, left 45% calm and low-detail for profile UI and text overlay. Keep important products away from the far edges.

Lighting: soft professional interior lighting, cool white balance, subtle blue brand accent, realistic reflections.

Style: B2B LinkedIn professional, credible manufacturer, clean and modern, not flashy.

Avoid: fake certification logos, fake EAC/CE/PSE/ISO marks, fake certificate numbers, copied competitor logos, Intel/AMD/Lenovo/Dell/Apple/ASUS branding, gibberish labels, unreadable dense text, unrealistic oversized products, sci-fi lab styling, messy warehouse, smiling stock-photo people staring at camera, watermarks, random UI screens, exaggerated neon colors, cartoon rendering, cheap AI plastic texture.
```

### Prompt ABM-02: LinkedIn Post - OEM Customization

**中文用途说明**：用于 LinkedIn 图文贴或 ABM 首轮触达配图，主题是“定制外壳/键盘/包装/BIOS 等 OEM 配置能力”。不在图里写具体承诺，文案另加。

**建议尺寸/比例**：`1200x1200` / `1:1`.

**风格关键词**：社媒专业图、OEM 定制、采购决策、产品样品、干净构图。

**English Prompt**:

```text
Create a photorealistic square LinkedIn post image about OEM customization for laptop and Mini PC sourcing.

Subject: a clean sample table with generic laptop shells, Mini PC enclosures, neutral keyboard layout samples, blank packaging mockups, color swatches in gray/black/silver/blue, and a sourcing notebook with no readable text.

Composition: top-down 45-degree commercial product photography, 50mm lens feel, organized grid layout, strong negative space in the upper-left for a short social caption added later.

Lighting: large softbox, minimal shadows, accurate material textures, cool gray and white palette with AIERXUAN blue accents.

Style: professional B2B procurement content, practical customization proof, polished but realistic.

Avoid: fake certification logos, fake EAC/CE/PSE/ISO marks, fake certificate numbers, copied competitor logos, Intel/AMD/Lenovo/Dell/Apple/ASUS branding, gibberish labels, unreadable dense text, unrealistic oversized products, sci-fi lab styling, messy warehouse, smiling stock-photo people staring at camera, watermarks, random UI screens, exaggerated neon colors, cartoon rendering, cheap AI plastic texture.
```

### Prompt ABM-03: LinkedIn Post - QC Process

**中文用途说明**：用于 LinkedIn/邮件 ABM 第二轮，展示质量控制流程和测试可信度。适合配文引导下载白皮书或询价。

**建议尺寸/比例**：`1200x1500` / `4:5`.

**风格关键词**：QC 流程、工程师、B2B 信任、工业摄影、冷白光。

**English Prompt**:

```text
Create a photorealistic 4:5 LinkedIn image showing electronics quality control for a laptop and Mini PC OEM supplier.

Scene: a technician in an anti-static coat testing a generic laptop and a compact Mini PC at a clean QC bench. Show measurement equipment, ESD mat, cable management, blank checklist cards, and organized sample shelves in the background.

Composition: vertical commercial documentary style, 50mm lens, technician hands and device under test in the lower center, calm upper area for a headline overlay, shallow but usable depth of field.

Lighting: soft overhead panel plus side fill, controlled screen glare, realistic skin tones and material detail, cool gray and blue color grade.

Style: LinkedIn professional B2B manufacturing proof, rigorous, calm, credible.

Avoid: fake certification logos, fake EAC/CE/PSE/ISO marks, fake certificate numbers, copied competitor logos, Intel/AMD/Lenovo/Dell/Apple/ASUS branding, gibberish labels, unreadable dense text, unrealistic oversized products, sci-fi lab styling, messy warehouse, smiling stock-photo people staring at camera, watermarks, random UI screens, exaggerated neon colors, cartoon rendering, cheap AI plastic texture.
```

### Prompt ABM-04: Email Header - RFQ Response Pack

**中文用途说明**：用于 RFQ 响应包、邮件页眉或 PDF 封面小图。突出“快速整理采购需求、报价、样品、交期”的视觉语义，但不要在图片中承诺具体小时数或价格。

**建议尺寸/比例**：`1600x600` / email header.

**风格关键词**：RFQ 包、采购桌面、商务本+迷你主机、干净横幅、B2B 专业。

**English Prompt**:

```text
Create a photorealistic wide email header image for a B2B RFQ response pack from AIERXUAN.

Scene: a clean procurement desk with a generic business laptop, a compact Mini PC, a neutral quotation folder, blank specification sheets, a pen, and a small product sample box. The background is a softly blurred factory showroom with shelves and QC tools.

Composition: 1600x600 wide banner, visual anchor on the right, left side calm for email title overlay, 50mm commercial lens, neat diagonal arrangement from documents to products.

Lighting: soft office daylight, realistic paper and metal texture, neutral exposure, subtle AIERXUAN blue accent.

Branding: optional one exact small sign "AIERXUAN" in the blurred background; no other readable text.

Style: efficient B2B sales support, export quotation readiness, polished but practical.

Avoid: fake certification logos, fake EAC/CE/PSE/ISO marks, fake certificate numbers, copied competitor logos, Intel/AMD/Lenovo/Dell/Apple/ASUS branding, gibberish labels, unreadable dense text, unrealistic oversized products, sci-fi lab styling, messy warehouse, smiling stock-photo people staring at camera, watermarks, random UI screens, exaggerated neon colors, cartoon rendering, cheap AI plastic texture.
```

### Prompt ABM-05: Telegram / RU Social - Business Laptop Export

**中文用途说明**：用于 Telegram 俄语频道或 Yandex/RU 社媒配图。突出商务本、出口包装、Telegram CTA 可由设计层后加，不让 AI 写俄文避免乱码。

**建议尺寸/比例**：`1080x1350` / `4:5`.

**风格关键词**：俄语社媒、商务本出口、专业工厂、暗蓝灰、可信供应商。

**English Prompt**:

```text
Create a photorealistic vertical social media image for Russian-market B2B business laptop export sourcing.

Scene: two generic business laptop samples on a clean factory showroom desk, neutral export cartons behind them, a blurred QC workstation in the background, and a subtle AIERXUAN blue accent light. No Russian text inside the image; leave space for design-layer Russian copy.

Composition: 4:5 vertical, product samples in the lower half, calm dark-blue-gray negative space in the upper third for later text overlay, 50mm lens, controlled shallow depth of field.

Lighting: soft side light, gentle rim light on laptop edges, balanced cool white environment, serious professional tone.

Style: Russian B2B sourcing visual, trustworthy, practical, export-ready, not retail lifestyle.

Avoid: fake certification logos, fake EAC/CE/PSE/ISO marks, fake certificate numbers, copied competitor logos, Intel/AMD/Lenovo/Dell/Apple/ASUS branding, gibberish labels, unreadable dense text, unrealistic oversized products, sci-fi lab styling, messy warehouse, smiling stock-photo people staring at camera, watermarks, random UI screens, exaggerated neon colors, cartoon rendering, cheap AI plastic texture.
```

### Prompt ABM-06: Whitepaper / Gated Handbook Cover

**中文用途说明**：用于 W2 白皮书《2026 OEM 产品手册》封面或下载卡片。视觉上像专业采购资料，不生成不可确认的年份、认证、参数；标题后期排版。

**建议尺寸/比例**：`1600x900` / `16:9` 或 PDF cover crop.

**风格关键词**：白皮书封面、OEM 产品手册、样品陈列、制造背书、干净高级。

**English Prompt**:

```text
Create a photorealistic whitepaper cover image for an OEM laptop and Mini PC product handbook.

Scene: a premium but practical B2B product showroom table with generic business laptops, Mini PCs, blank specification cards, neutral packaging samples, and a softly visible factory QC area in the background. Include one exact wall sign: "AIERXUAN".

Composition: 16:9 commercial product and showroom photography, products arranged on the right two-thirds, left third calm and bright for handbook title overlay, 35mm lens, straight lines, clean hierarchy.

Lighting: large softbox plus natural showroom daylight, realistic shadows, cool gray/white palette with AIERXUAN blue accent, crisp but not overly glossy.

Style: professional sourcing handbook, B2B OEM/ODM credibility, modern technology supplier, editorial-grade commercial photography.

Avoid: fake certification logos, fake EAC/CE/PSE/ISO marks, fake certificate numbers, copied competitor logos, Intel/AMD/Lenovo/Dell/Apple/ASUS branding, gibberish labels, unreadable dense text, unrealistic oversized products, sci-fi lab styling, messy warehouse, smiling stock-photo people staring at camera, watermarks, random UI screens, exaggerated neon colors, cartoon rendering, cheap AI plastic texture.
```

## 5. Recommended Generation Order

1. Generate `EN-01` and `RU-01` first because they unblock the two LP hero gaps.
2. Generate `OEM-02`, `OEM-04`, and `OEM-05` as the first capability set; they cover assembly, QC, and packaging trust.
3. Generate `ABM-01`, `ABM-02`, and `ABM-03` for LinkedIn W1-W2 launch.
4. Hold `EN-02`, `RU-02`, `OEM-01`, `OEM-03`, `ABM-04`, `ABM-05`, and `ABM-06` as second-pass or campaign-specific assets.

## 6. QA Checklist After Generation

- Brand spelling: if `"AIERXUAN"` is wrong, retry with no readable brand text or add the logo in design.
- Certifications: reject any image with fake EAC/CE/PSE/ISO seals, numbers, holograms, or official-looking marks.
- Product realism: reject oversized laptops, impossible Mini PC ports, warped keyboards, or copied competitor design cues.
- Overlay usability: hero images must preserve the assigned calm zone for page headline and CTA.
- B2B tone: reject lifestyle retail shots, smiling stock-photo scenes, neon gamer aesthetics, and messy workshop imagery.
- Text noise: reject gibberish labels on screens, boxes, folders, and worksheets.
