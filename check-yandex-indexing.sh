#!/bin/bash

# Yandex 收录检查脚本
# 使用方法: ./check-yandex-indexing.sh aierxuanlaptop.com

DOMAIN=${1:-aierxuanlaptop.com}

echo "==================================="
echo "Yandex 收录检查: $DOMAIN"
echo "==================================="
echo ""

# 1. 检查网站是否可访问
echo "1. 检查网站可访问性..."
if curl -s -I "https://$DOMAIN" | head -1 | grep -q "200"; then
    echo "   ✅ 网站可访问"
else
    echo "   ❌ 网站无法访问"
fi
echo ""

# 2. 检查 Yandex 验证文件
echo "2. 检查 Yandex 验证文件..."
YANDEX_FILE=$(curl -s "https://$DOMAIN/robots.txt" | grep -o "yandex_[a-z0-9]*\.html" | head -1)
if [ -n "$YANDEX_FILE" ]; then
    echo "   找到验证文件: $YANDEX_FILE"
    if curl -s "https://$DOMAIN/$YANDEX_FILE" | grep -q "Verification:"; then
        echo "   ✅ 验证文件可访问"
    else
        echo "   ❌ 验证文件无法访问"
    fi
else
    echo "   ⚠️  未找到验证文件引用"
fi
echo ""

# 3. 检查 sitemap
echo "3. 检查 Sitemap..."
if curl -s "https://$DOMAIN/sitemap.xml" | grep -q "<urlset"; then
    URL_COUNT=$(curl -s "https://$DOMAIN/sitemap.xml" | grep -c "<loc>")
    echo "   ✅ Sitemap 可访问 (包含 $URL_COUNT 个 URL)"
else
    echo "   ❌ Sitemap 无法访问"
fi
echo ""

# 4. 检查 robots.txt
echo "4. 检查 robots.txt..."
if curl -s "https://$DOMAIN/robots.txt" | grep -q "Sitemap:"; then
    echo "   ✅ robots.txt 包含 Sitemap 引用"
else
    echo "   ⚠️  robots.txt 未包含 Sitemap 引用"
fi
echo ""

# 5. 手动检查说明
echo "==================================="
echo "手动检查 Yandex 收录"
echo "==================================="
echo ""
echo "由于 Yandex 需要验证，请手动执行以下步骤："
echo ""
echo "方法 1: 直接搜索"
echo "  1. 访问: https://yandex.com"
echo "  2. 搜索: site:$DOMAIN"
echo "  3. 查看结果数量"
echo ""
echo "方法 2: Yandex Webmaster"
echo "  1. 访问: https://webmaster.yandex.com/"
echo "  2. 登录并选择你的网站"
echo "  3. 查看 '索引' 或 'Indexing' 部分"
echo "  4. 查看已索引页面数量"
echo ""
echo "方法 3: 使用浏览器开发者工具"
echo "  1. 打开浏览器访问 Yandex"
echo "  2. 搜索 site:$DOMAIN"
echo "  3. 查看页面源代码中的结果数量"
echo ""
