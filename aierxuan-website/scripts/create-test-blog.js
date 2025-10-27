const fs = require('fs');
const path = require('path');
const http = require('http');

// Read test blog content
const testContent = fs.readFileSync(path.join(__dirname, '..', 'test-blog-content.md'), 'utf8');

// Extract sections
const titleMatch = testContent.match(/## Title\n(.+)/);
const excerptMatch = testContent.match(/## Excerpt\n(.+)/);
const bodyMatch = testContent.match(/## Body \(Markdown\)\n\n([\s\S]+?)(?=\n## Meta Description)/);
const metaMatch = testContent.match(/## Meta Description\n(.+)/);

const title = titleMatch ? titleMatch[1].trim() : '';
const excerpt = excerptMatch ? excerptMatch[1].trim() : '';
const body = bodyMatch ? bodyMatch[1].trim() : '';
const meta = metaMatch ? metaMatch[1].trim() : '';

console.log('📝 Creating test blog post...\n');
console.log('Title:', title);
console.log('Excerpt length:', excerpt.length, 'chars');
console.log('Body length:', body.length, 'chars');
console.log('Meta length:', meta.length, 'chars');
console.log('');

// Login first
const loginData = JSON.stringify({
  email: 'admin@aierxuan.com',
  password: 'admin123'
});

const loginOptions = {
  hostname: 'localhost',
  port: 3001,
  path: '/api/admin/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(loginData)
  }
};

console.log('🔐 Logging in...');

const loginReq = http.request(loginOptions, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    if (res.statusCode !== 200) {
      console.error('❌ Login failed');
      console.error('Status:', res.statusCode);
      console.error('Response:', data);
      process.exit(1);
    }
    
    const cookies = res.headers['set-cookie'];
    if (!cookies) {
      console.error('❌ Login failed: No cookies');
      process.exit(1);
    }
    
    const sessionCookie = cookies.find(c => c.startsWith('admin_session='));
    if (!sessionCookie) {
      console.error('❌ Login failed: No session cookie');
      process.exit(1);
    }
    
    console.log('✅ Login successful\n');
    
    // Create blog post
    const timestamp = Date.now();
    const blogData = JSON.stringify({
      slug: `future-industrial-automation-ai-test-${timestamp}`,
      status: 'draft',
      published_at: null,
      cover_image: null,
      translations: [
        {
          locale: 'en',
          title: title,
          excerpt: excerpt,
          body: body,
          meta_description: meta
        }
      ]
    });
    
    const blogOptions = {
      hostname: 'localhost',
      port: 3001,
      path: '/api/admin/blog',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(blogData),
        'Cookie': sessionCookie.split(';')[0]
      }
    };
    
    console.log('📤 Creating blog post...');
    
    const blogReq = http.request(blogOptions, (blogRes) => {
      let blogData = '';
      blogRes.on('data', (chunk) => { blogData += chunk; });
      blogRes.on('end', () => {
        console.log('Response status:', blogRes.statusCode);
        
        if (blogRes.statusCode === 200 || blogRes.statusCode === 201) {
          try {
            const result = JSON.parse(blogData);
            console.log('\n✅ Blog post created successfully!\n');
            console.log('📄 Post ID:', result.id || result.post?.id || 'N/A');
            console.log('📝 Slug:', result.slug || result.post?.slug || 'N/A');
            console.log('📊 Status:', result.status || result.post?.status || 'N/A');
            
            const postId = result.id || result.post?.id;
            if (postId) {
              console.log('\n🔗 Edit URL: http://localhost:3001/admin/blog/' + postId + '/edit');
              console.log('🔗 View in list: http://localhost:3001/admin/blog');
            }
            
            console.log('\n✨ You can now test the translation feature!');
            console.log('   1. Visit the edit URL above');
            console.log('   2. Click "AI智能翻译" button');
            console.log('   3. Wait for translation to complete');
            console.log('   4. Switch language tabs to verify results');
          } catch (e) {
            console.log('✅ Blog post created (response parsing issue)');
            console.log('Raw response:', blogData);
          }
        } else {
          console.error('\n❌ Failed to create blog post');
          console.error('Status:', blogRes.statusCode);
          console.error('Response:', blogData);
        }
      });
    });
    
    blogReq.on('error', (e) => {
      console.error('❌ Error creating blog post:', e.message);
    });
    
    blogReq.write(blogData);
    blogReq.end();
  });
});

loginReq.on('error', (e) => {
  console.error('❌ Login error:', e.message);
  process.exit(1);
});

loginReq.write(loginData);
loginReq.end();

