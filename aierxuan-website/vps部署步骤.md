完整部署步骤
第一步：连接服务器
# 使用您的弹性IP连接（请替换为实际IP）
ssh -i aierxuan-key.pem ubuntu@YOUR-ELASTIC-IP

Run in CloudShell
第二步：系统环境准备
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装基础工具
sudo apt install -y curl wget git unzip build-essential

# 安装Node.js 18 LTS (ARM版本)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 验证安装
node --version
npm --version

# 安装PM2和Nginx
sudo npm install -g pm2
sudo apt install -y nginx certbot python3-certbot-nginx

Run in CloudShell
📦 第三步：创建目录结构并克隆项目
# 创建完整目录结构
sudo mkdir -p /var/www/aierxuan
cd /var/www/aierxuan

# 克隆项目到指定路径
sudo git clone https://github.com/yangxb919/aierxuan.git aierxuan-website

# 设置权限
sudo chown -R ubuntu:ubuntu /var/www/aierxuan

# 进入项目目录
cd /var/www/aierxuan/aierxuan-website

Run in CloudShell
🔧 第四步：项目配置和构建
# 查看项目结构
ls -la

# 安装依赖
npm install

# 如果遇到ARM架构问题，使用：
npm install --platform=linux --arch=arm64

# 创建环境变量文件
cp .env.example .env.local 2>/dev/null || touch .env.local
nano .env.local

Run in CloudShell
环境变量配置：

# 根据项目需求配置
NEXT_PUBLIC_SITE_URL=http://aierxuanlaptop.com
NODE_ENV=production
PORT=3000
# 添加其他必要的环境变量

# 构建项目
npm run build

# 验证构建
ls -la .next/

Run in CloudShell
⚙️ 第五步：配置PM2进程管理
# 创建PM2配置文件
nano /var/www/aierxuan/aierxuan-website/ecosystem.config.js

Run in CloudShell
module.exports = {
  apps: [{
    name: 'aierxuan-website',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/aierxuan/aierxuan-website',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '/var/www/aierxuan/logs/err.log',
    out_file: '/var/www/aierxuan/logs/out.log',
    log_file: '/var/www/aierxuan/logs/combined.log'
  }]
}

# 创建日志目录
mkdir -p /var/www/aierxuan/logs

# 启动应用
pm2 start ecosystem.config.js

# 设置开机自启
pm2 save
pm2 startup
# 执行显示的sudo命令

# 查看状态
pm2 status
pm2 logs aierxuan-website

Run in CloudShell
🌐 第六步：配置Nginx反向代理
# 创建Nginx配置文件
sudo nano /etc/nginx/sites-available/aierxuanlaptop.com

Run in CloudShell
server {
    listen 80;
    server_name aierxuanlaptop.com www.aierxuanlaptop.com;

    # 安全头设置
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # 主要代理配置
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 86400;
        
        # 处理大文件上传
        client_max_body_size 50M;
    }

    # Next.js静态文件优化
    location /_next/static {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # 图片和静态资源缓存
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=86400";
    }

    # 健康检查
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }
}

# 启用站点
sudo ln -s /etc/nginx/sites-available/aierxuanlaptop.com /etc/nginx/sites-enabled/

# 删除默认站点
sudo rm -f /etc/nginx/sites-enabled/default

# 测试Nginx配置
sudo nginx -t

# 重启Nginx
sudo systemctl restart nginx
sudo systemctl enable nginx

Run in CloudShell
🔒 第七步：配置SSL证书
# 安装Let's Encrypt SSL证书
sudo certbot --nginx -d aierxuanlaptop.com -d www.aierxuanlaptop.com

# 按提示输入邮箱和同意条款

# 设置自动续期
sudo crontab -e
# 添加以下行：
0 12 * * * /usr/bin/certbot renew --quiet

Run in CloudShell
🛡️ 第八步：安全配置
# 配置防火墙
sudo ufw enable
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'

# 查看防火墙状态
sudo ufw status

# 禁用root登录（可选）
sudo nano /etc/ssh/sshd_config
# 找到并修改：PermitRootLogin no
sudo systemctl restart ssh

Run in CloudShell
📊 第九步：验证部署
# 检查PM2状态
pm2 status
pm2 logs aierxuan-website --lines 20

# 检查Nginx状态
sudo systemctl status nginx

# 检查端口监听
sudo netstat -tlnp | grep :80
sudo netstat -tlnp | grep :3000

# 测试本地访问
curl http://localhost:3000
curl http://aierxuanlaptop.com

# 检查SSL证书（如果已配置）
curl -I https://aierxuanlaptop.com

Run in CloudShell
🌍 第十步：域名DNS配置
在您的域名提供商处配置DNS记录：

A记录：
aierxuanlaptop.com → YOUR-ELASTIC-IP
www.aierxuanlaptop.com → YOUR-ELASTIC-IP

或者使用CNAME：
www.aierxuanlaptop.com → aierxuanlaptop.com

🔄 第十一步：后续维护脚本
# 创建更新脚本
nano /var/www/aierxuan/update.sh

Run in CloudShell
#!/bin/bash
cd /var/www/aierxuan/aierxuan-website

echo "开始更新网站..."

# 拉取最新代码
git pull origin main

# 安装新依赖
npm install

# 重新构建
npm run build

# 重启应用
pm2 restart aierxuan-website

echo "网站更新完成！"

Run in CloudShell
# 设置执行权限
chmod +x /var/www/aierxuan/update.sh

Run in CloudShell
📈 第十二步：监控和日志
# 安装监控工具
sudo apt install -y htop iotop

# 查看系统资源
htop

# 查看应用日志
pm2 logs aierxuan-website

# 查看Nginx日志
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# 查看磁盘使用
df -h

# 查看内存使用
free -h

Run in CloudShell
🎯 验证清单
完成后请检查以下项目：

 服务器可以SSH连接
 Node.js和npm已安装
 项目已克隆到 /var/www/aierxuan/aierxuan-website/
 依赖已安装，项目已构建
 PM2应用运行正常
 Nginx配置正确，服务运行
 域名DNS已配置
 网站可以通过 http://aierxuanlaptop.com 访问
 SSL证书已配置（HTTPS访问）
 防火墙已配置
🚀 最终访问地址
HTTP: http://aierxuanlaptop.com 
HTTPS: https://aierxuanlaptop.com  (SSL配置后)
带www: https://www.aierxuanlaptop.com 
💡 常见问题解决
如果网站无法访问：
# 检查应用状态
pm2 status
pm2 logs aierxuan-website

# 检查端口
sudo netstat -tlnp | grep :3000

# 重启服务
pm2 restart aierxuan-website
sudo systemctl restart nginx

Run in CloudShell
如果SSL证书失败：
# 检查域名解析
nslookup aierxuanlaptop.com

# 手动重试SSL
sudo certbot --nginx -d aierxuanlaptop.com -d www.aierxuanlaptop.com --force-renewal

Run in CloudShell
现在您可以开始按照这些步骤部署您的aierxuan网站了！每完成一个步骤，建议测试一下确保正常工作再继续下一步。



