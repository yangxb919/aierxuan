# www.aierxuanlaptop.com 落地改造清单（可一步步执行）

## 目标

1. 统一主域为 `https://www.aierxuanlaptop.com`。
2. `aierxuanlaptop.com` 全量 301 到 `www`。
3. Next.js 输出的 canonical/sitemap/robots 全部统一为 `www` 域名。
4. 俄语首页 metadata 本地化（避免俄语首页仍是英文 SEO 文案）。
5. 发布后可直接在 Google/Yandex 提交抓取。

---

## 一、Nginx 规则改造（先做）

在服务器修改站点配置（例如 `/etc/nginx/sites-available/aierxuanlaptop.com`）：

```nginx
# 80 全部跳转到 https://www
server {
    listen 80;
    server_name aierxuanlaptop.com www.aierxuanlaptop.com;
    return 301 https://www.aierxuanlaptop.com$request_uri;
}

# 443 裸域跳转到 https://www
server {
    listen 443 ssl http2;
    server_name aierxuanlaptop.com;

    ssl_certificate     /etc/letsencrypt/live/www.aierxuanlaptop.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/www.aierxuanlaptop.com/privkey.pem;

    return 301 https://www.aierxuanlaptop.com$request_uri;
}

# 443 主站 www
server {
    listen 443 ssl http2;
    server_name www.aierxuanlaptop.com;

    ssl_certificate     /etc/letsencrypt/live/www.aierxuanlaptop.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/www.aierxuanlaptop.com/privkey.pem;

    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

执行：

```bash
sudo nginx -t
sudo systemctl reload nginx
```

首次签发证书（如未签发）：

```bash
sudo certbot --nginx -d aierxuanlaptop.com -d www.aierxuanlaptop.com
```

---

## 二、环境变量统一（Next.js）

修改生产环境 `.env.local`（或部署环境变量）：

```env
NEXT_PUBLIC_SITE_URL=https://www.aierxuanlaptop.com
```

---

## 三、新增统一站点 URL 配置文件

新增文件：`src/lib/site-url.ts`

```ts
const fallback = 'https://www.aierxuanlaptop.com'
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || fallback).replace(/\/+$/, '')
```

---

## 四、替换硬编码域名（必须改）

把以下文件中的 `https://aierxuanlaptop.com` 替换为 `SITE_URL`：

1. `src/app/[lang]/layout.tsx`
2. `src/app/[lang]/faq/page.tsx`
3. `src/app/[lang]/oem/page.tsx`
4. `src/app/sitemap.ts`
5. `src/app/robots.ts`

示例改法：

```ts
import { SITE_URL } from '@/lib/site-url'

canonical: `${SITE_URL}/${lang}`
sitemap: `${SITE_URL}/sitemap.xml`
url: `${SITE_URL}/${locale}${page}`
```

---

## 五、俄语首页 metadata 本地化（必须改）

问题：`/ru` 首页 title/description 仍是英文。  
建议：在 `src/app/[lang]/layout.tsx` 的 `generateMetadata` 里按语言输出 SEO 文案。

示例：

```ts
const byLang = {
  en: {
    title: 'AIERXUAN - Professional Laptop & Mini PC Manufacturer',
    description: 'Leading OEM/ODM manufacturer ...',
    keywords: 'laptop manufacturer, mini pc factory, ...'
  },
  ru: {
    title: 'AIERXUAN — Производитель ноутбуков и мини-ПК',
    description: 'Профессиональное OEM/ODM производство ноутбуков и мини-ПК...',
    keywords: 'OEM ноутбуки, ODM производство, мини-ПК оптом, ...'
  }
}

const seo = byLang[lang as 'en' | 'ru'] ?? byLang.en
```

---

## 六、sitemap 扩展（建议本次一并做）

当前 sitemap 主要是核心页面，建议补齐：

1. 博客详情页：`/[lang]/blog/[slug]`
2. 产品详情页：`/[lang]/products/[slug]`

优先至少覆盖 en/ru 两种语言，避免只收录目录页。

---

## 七、构建与发布

在项目目录执行：

```bash
cd /var/www/aierxuan/aierxuan-website
npm install
npm run build
pm2 restart aierxuan-website
```

---

## 八、发布后验证（必须执行）

```bash
curl -I http://aierxuanlaptop.com
curl -I https://aierxuanlaptop.com
curl -I https://www.aierxuanlaptop.com
curl -s https://www.aierxuanlaptop.com/ru | grep -Eo '<title>[^<]+|<meta name="description" content="[^"]+'
curl -s https://www.aierxuanlaptop.com/sitemap.xml | grep -c '<url>'
```

预期：

1. 裸域全部 301 到 `https://www...`
2. `/ru` 的 title/description 为俄语
3. sitemap 可访问且 URL 数量增加

---

## 九、收录推进动作（上线当天）

1. 在 Google Search Console 提交：`https://www.aierxuanlaptop.com/sitemap.xml`
2. 在 Yandex Webmaster 提交同一 sitemap
3. 手动请求抓取关键页：
   - `/ru`
   - `/ru/products`
   - `/ru/oem`
   - `/ru/blog`
   - `/ru/faq`

---

## 十、执行顺序建议（最省时间）

1. Nginx 301 + HTTPS 一次性改好。
2. 代码层统一 `SITE_URL`，移除所有硬编码域名。
3. 本地/测试环境验证后发布。
4. 发布后立刻提交 Search Console / Yandex Webmaster。
5. 观察 7-14 天收录变化，再做第二轮内容扩展。

