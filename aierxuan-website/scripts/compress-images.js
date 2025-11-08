#!/usr/bin/env node

/**
 * 图片压缩脚本
 * 使用sharp将JPG图片转换为WebP格式并压缩
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// 配置
const config = {
  quality: 85,
  effort: 6, // 0-6, 6是最高压缩率
};

// 需要压缩的图片列表
const imagesToCompress = [
  // Hero banners (已完成)
  {
    input: 'public/images/hero-banner.jpg',
    output: 'public/images/hero-banner.webp',
    priority: 'high'
  },
  {
    input: 'public/images/about-hero-banner-new.jpg',
    output: 'public/images/about-hero-banner-new.webp',
    priority: 'medium'
  },
  {
    input: 'public/images/blog-hero-banner.jpg',
    output: 'public/images/blog-hero-banner.webp',
    priority: 'medium'
  },
  // Manufacturing images (新增)
  {
    input: 'public/images/manufacturing/manufacturing-1.jpg',
    output: 'public/images/manufacturing/manufacturing-1.webp',
    priority: 'medium'
  },
  {
    input: 'public/images/manufacturing/manufacturing-2.jpg',
    output: 'public/images/manufacturing/manufacturing-2.webp',
    priority: 'medium'
  },
  {
    input: 'public/images/manufacturing/manufacturing-3.jpg',
    output: 'public/images/manufacturing/manufacturing-3.webp',
    priority: 'medium'
  },
  {
    input: 'public/images/manufacturing/manufacturing-4.jpg',
    output: 'public/images/manufacturing/manufacturing-4.webp',
    priority: 'medium'
  },
  // Factory images (新增)
  {
    input: 'public/images/factory/factory-1.jpg',
    output: 'public/images/factory/factory-1.webp',
    priority: 'low'
  },
  {
    input: 'public/images/factory/factory-2.jpg',
    output: 'public/images/factory/factory-2.webp',
    priority: 'low'
  },
  {
    input: 'public/images/factory/factory-3.jpg',
    output: 'public/images/factory/factory-3.webp',
    priority: 'low'
  },
  {
    input: 'public/images/factory/factory-4.jpg',
    output: 'public/images/factory/factory-4.webp',
    priority: 'low'
  },
  {
    input: 'public/images/factory/factory-5.jpg',
    output: 'public/images/factory/factory-5.webp',
    priority: 'low'
  },
  {
    input: 'public/images/factory/factory-6.jpg',
    output: 'public/images/factory/factory-6.webp',
    priority: 'low'
  },
];

async function compressImage(inputPath, outputPath) {
  const fullInputPath = path.join(__dirname, '..', inputPath);
  const fullOutputPath = path.join(__dirname, '..', outputPath);

  // 检查输入文件是否存在
  if (!fs.existsSync(fullInputPath)) {
    console.log(`⚠️  跳过: ${inputPath} (文件不存在)`);
    return null;
  }

  try {
    // 获取原始文件大小
    const originalStats = fs.statSync(fullInputPath);
    const originalSize = originalStats.size;

    // 压缩图片
    await sharp(fullInputPath)
      .webp({
        quality: config.quality,
        effort: config.effort,
      })
      .toFile(fullOutputPath);

    // 获取压缩后文件大小
    const compressedStats = fs.statSync(fullOutputPath);
    const compressedSize = compressedStats.size;

    // 计算压缩率
    const compressionRatio = ((originalSize - compressedSize) / originalSize * 100).toFixed(2);

    return {
      input: inputPath,
      output: outputPath,
      originalSize: (originalSize / 1024 / 1024).toFixed(2) + 'MB',
      compressedSize: (compressedSize / 1024).toFixed(2) + 'KB',
      compressionRatio: compressionRatio + '%',
    };
  } catch (error) {
    console.error(`❌ 压缩失败: ${inputPath}`, error.message);
    return null;
  }
}

async function main() {
  console.log('🚀 开始压缩图片...\n');

  const results = [];

  for (const image of imagesToCompress) {
    console.log(`📦 压缩: ${image.input}`);
    const result = await compressImage(image.input, image.output);
    if (result) {
      results.push(result);
      console.log(`✅ 完成: ${result.output}`);
      console.log(`   原始大小: ${result.originalSize}`);
      console.log(`   压缩后: ${result.compressedSize}`);
      console.log(`   压缩率: ${result.compressionRatio}\n`);
    }
  }

  // 输出总结
  console.log('\n📊 压缩总结:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  results.forEach((result, index) => {
    console.log(`${index + 1}. ${result.input}`);
    console.log(`   ${result.originalSize} → ${result.compressedSize} (节省 ${result.compressionRatio})`);
  });
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`\n✅ 成功压缩 ${results.length} 张图片！`);
}

main().catch(console.error);

