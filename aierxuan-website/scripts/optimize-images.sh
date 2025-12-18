#!/bin/bash

# 图片优化脚本 - 将 JPG/PNG 转换为 WebP 和 AVIF 格式
# 依赖: brew install libvips (macOS) 或 apt install libvips-tools (Linux)

IMAGES_DIR="public/images"
QUALITY=85
MAX_WIDTH=1920

# 检查 vips 是否安装
if ! command -v vips &> /dev/null; then
    echo "请先安装 libvips: brew install vips (macOS) 或 apt install libvips-tools (Linux)"
    exit 1
fi

# 查找所有 JPG/PNG 图片
find "$IMAGES_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | while read -r img; do
    filename="${img%.*}"

    echo "处理: $img"

    # 转换为 WebP
    vips thumbnail "$img" "${filename}.webp" $MAX_WIDTH --height 10000 -o "Q=$QUALITY"

    # 转换为 AVIF
    vips thumbnail "$img" "${filename}.avif" $MAX_WIDTH --height 10000 -o "Q=$QUALITY"

    echo "  -> ${filename}.webp"
    echo "  -> ${filename}.avif"
done

echo "图片优化完成!"
