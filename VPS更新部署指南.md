# VPS更新部署指南 - 快速版

**适用场景**: 代码已push到GitHub，需要在VPS上拉取最新代码并重新编译

---

## 🚀 快速更新步骤（推荐）

### 方法1：使用自动更新脚本

如果您已经创建了更新脚本，直接运行：

```bash
# SSH连接到VPS
ssh -i aierxuan-key.pem ubuntu@YOUR-ELASTIC-IP

# 运行更新脚本
cd /var/www/aierxuan
./update.sh
```

---

### 方法2：手动更新（详细步骤）

#### 第一步：连接到VPS

```bash
# 使用您的弹性IP连接
ssh -i aierxuan-key.pem ubuntu@YOUR-ELASTIC-IP
```

#### 第二步：进入项目目录

```bash
cd /var/www/aierxuan/aierxuan-website
```

#### 第三步：拉取最新代码

```bash
# 查看当前状态
git status

# 拉取最新代码
git pull origin main
```

**如果遇到冲突**：
```bash
# 保存本地修改（如果有）
git stash

# 拉取最新代码
git pull origin main

# 恢复本地修改（如果需要）
git stash pop
```

#### 第四步：安装新依赖（如果有）

```bash
# 安装或更新依赖
npm install

# 如果遇到ARM架构问题
npm install --platform=linux --arch=arm64
```

#### 第五步：重新构建项目

```bash
# 清理旧的构建文件（可选）
rm -rf .next

# 重新构建
npm run build
```

**构建过程说明**：
- 这个过程可能需要2-5分钟
- 会看到"Creating an optimized production build..."
- 完成后会显示"Compiled successfully"

#### 第六步：重启应用

```bash
# 使用PM2重启应用
pm2 restart aierxuan-website

# 查看应用状态
pm2 status

# 查看实时日志（确认启动成功）
pm2 logs aierxuan-website --lines 50
```

#### 第七步：验证更新

```bash
# 测试本地访问
curl http://localhost:3000

# 测试域名访问
curl http://aierxuanlaptop.com

# 如果配置了HTTPS
curl -I https://aierxuanlaptop.com
```

---

## 📝 完整更新脚本

如果还没有创建更新脚本，现在创建一个：

```bash
# 创建更新脚本
nano /var/www/aierxuan/update.sh
```

**脚本内容**：
```bash
#!/bin/bash

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  AIERXUAN网站更新脚本${NC}"
echo -e "${GREEN}========================================${NC}"

# 进入项目目录
cd /var/www/aierxuan/aierxuan-website

# 1. 拉取最新代码
echo -e "\n${YELLOW}[1/5] 拉取最新代码...${NC}"
git pull origin main
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Git拉取失败！${NC}"
    exit 1
fi
echo -e "${GREEN}✅ 代码拉取成功${NC}"

# 2. 安装依赖
echo -e "\n${YELLOW}[2/5] 安装/更新依赖...${NC}"
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ 依赖安装失败！${NC}"
    exit 1
fi
echo -e "${GREEN}✅ 依赖安装成功${NC}"

# 3. 清理旧构建
echo -e "\n${YELLOW}[3/5] 清理旧构建文件...${NC}"
rm -rf .next
echo -e "${GREEN}✅ 清理完成${NC}"

# 4. 重新构建
echo -e "\n${YELLOW}[4/5] 重新构建项目...${NC}"
npm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ 构建失败！${NC}"
    exit 1
fi
echo -e "${GREEN}✅ 构建成功${NC}"

# 5. 重启应用
echo -e "\n${YELLOW}[5/5] 重启应用...${NC}"
pm2 restart aierxuan-website
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ 应用重启失败！${NC}"
    exit 1
fi
echo -e "${GREEN}✅ 应用重启成功${NC}"

# 显示状态
echo -e "\n${YELLOW}当前应用状态：${NC}"
pm2 status aierxuan-website

echo -e "\n${GREEN}========================================${NC}"
echo -e "${GREEN}  ✅ 网站更新完成！${NC}"
echo -e "${GREEN}========================================${NC}"
echo -e "\n访问地址："
echo -e "  HTTP:  http://aierxuanlaptop.com"
echo -e "  HTTPS: https://aierxuanlaptop.com"
echo -e "\n查看日志："
echo -e "  pm2 logs aierxuan-website"
```

**设置执行权限**：
```bash
chmod +x /var/www/aierxuan/update.sh
```

**使用方法**：
```bash
cd /var/www/aierxuan
./update.sh
```

---

## 🔍 故障排查

### 问题1：Git拉取失败

```bash
# 查看Git状态
git status

# 如果有本地修改冲突
git stash
git pull origin main

# 或者强制覆盖本地修改
git fetch origin
git reset --hard origin/main
```

### 问题2：构建失败

```bash
# 查看详细错误信息
npm run build 2>&1 | tee build.log

# 检查Node.js版本
node --version  # 应该是 v18.x

# 清理缓存重试
rm -rf node_modules package-lock.json .next
npm install
npm run build
```

### 问题3：应用无法启动

```bash
# 查看PM2日志
pm2 logs aierxuan-website --lines 100

# 查看错误日志
cat /var/www/aierxuan/logs/err.log

# 重启PM2
pm2 delete aierxuan-website
pm2 start ecosystem.config.js

# 查看端口占用
sudo netstat -tlnp | grep :3000
```

### 问题4：网站无法访问

```bash
# 检查应用状态
pm2 status

# 检查Nginx状态
sudo systemctl status nginx

# 重启Nginx
sudo systemctl restart nginx

# 测试本地访问
curl http://localhost:3000
```

---

## 📊 监控和日志

### 查看应用日志
```bash
# 实时查看日志
pm2 logs aierxuan-website

# 查看最近50行日志
pm2 logs aierxuan-website --lines 50

# 查看错误日志
pm2 logs aierxuan-website --err

# 清空日志
pm2 flush
```

### 查看系统资源
```bash
# 查看内存使用
free -h

# 查看磁盘使用
df -h

# 查看CPU和内存（实时）
htop

# 查看PM2进程资源
pm2 monit
```

### 查看Nginx日志
```bash
# 访问日志
sudo tail -f /var/log/nginx/access.log

# 错误日志
sudo tail -f /var/log/nginx/error.log
```

---

## ⚡ 快速命令参考

```bash
# 一键更新（如果有更新脚本）
cd /var/www/aierxuan && ./update.sh

# 手动更新（完整命令）
cd /var/www/aierxuan/aierxuan-website && \
git pull origin main && \
npm install && \
npm run build && \
pm2 restart aierxuan-website

# 查看状态
pm2 status && pm2 logs aierxuan-website --lines 20

# 重启所有服务
pm2 restart all && sudo systemctl restart nginx

# 查看网站是否正常
curl -I http://aierxuanlaptop.com
```

---

## 🎯 更新检查清单

完成更新后，请检查以下项目：

- [ ] Git代码已拉取到最新版本
- [ ] npm依赖已安装/更新
- [ ] 项目构建成功（.next目录已生成）
- [ ] PM2应用状态为"online"
- [ ] 应用日志无错误信息
- [ ] 本地访问正常（curl http://localhost:3000）
- [ ] 域名访问正常（http://aierxuanlaptop.com）
- [ ] HTTPS访问正常（https://aierxuanlaptop.com）
- [ ] 新功能正常显示（MOQ和价格等）

---

## 📞 需要帮助？

如果遇到问题，请提供以下信息：

1. **错误信息**：
   ```bash
   pm2 logs aierxuan-website --lines 100 > error.log
   ```

2. **系统状态**：
   ```bash
   pm2 status
   sudo systemctl status nginx
   node --version
   npm --version
   ```

3. **构建日志**：
   ```bash
   npm run build 2>&1 | tee build.log
   ```

---

**更新时间**: 2025年10月31日  
**适用版本**: Next.js 15.5.4  
**服务器**: AWS Lightsail (ARM架构)

