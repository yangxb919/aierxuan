# 📝 Blog Editor User Guide

## Overview

The AIERXUAN Blog Management System provides a WordPress-like editing experience with the following features:

- ✅ **Rich Markdown Editor** with live preview
- ✅ **Image Upload** from local files
- ✅ **Cover Image Management** with drag-and-drop
- ✅ **Multi-language Support** (6 languages)
- ✅ **Draft/Publish Workflow**
- ✅ **SEO Optimization** fields

---

## Accessing the Blog Editor

1. Navigate to: `http://localhost:3000/admin/blog`
2. Click **"+ New Blog Post"** button
3. Or edit existing posts by clicking **"Edit"** in the blog list

---

## Editor Features

### 1. **Basic Information Section**

#### Slug (URL)
- **Purpose**: Defines the URL path for your blog post
- **Format**: lowercase, hyphen-separated (e.g., `my-awesome-post`)
- **Example**: If slug is `industrial-automation-guide`, the URL will be `/blog/industrial-automation-guide`

#### Status
- **Draft**: Not visible to public, can be edited
- **Published**: Live on the website
- **Archived**: Hidden from public but preserved

#### Cover Image
- **Upload**: Click the upload area or drag & drop an image
- **Requirements**: 
  - Max size: 5MB
  - Formats: JPG, PNG, GIF, WebP
  - Recommended: 1200x630px (16:9 ratio)
- **Actions**: 
  - Hover over image to **Change** or **Remove**

---

### 2. **Content Editor (Multi-language)**

#### Language Tabs
Switch between 6 languages:
- 🇺🇸 English (required)
- 🇷🇺 Russian
- 🇯🇵 Japanese
- 🇫🇷 French
- 🇵🇹 Portuguese
- 🇨🇳 Chinese (Simplified)

#### Title
- Main heading of your blog post
- **Required** for English
- Appears in search results and social media shares

#### Excerpt
- Brief summary (2-3 sentences)
- Shown in blog list pages
- Used in social media previews

#### Body Content - Markdown Editor

**Write Tab**: Edit your content
**Preview Tab**: See how it will look

##### Formatting Toolbar

| Button | Function | Markdown Syntax |
|--------|----------|-----------------|
| **H1** | Heading 1 | `# Heading` |
| **H2** | Heading 2 | `## Heading` |
| **H3** | Heading 3 | `### Heading` |
| **B** | Bold text | `**bold**` |
| **I** | Italic text | `*italic*` |
| **Link** | Insert link | `[text](url)` |
| **Quote** | Blockquote | `> quote` |
| **Code** | Inline code | `` `code` `` |
| **List** | Bullet list | `- item` |
| **1.** | Numbered list | `1. item` |
| **Image** | Upload image | `![alt](url)` |

##### Image Upload in Content

1. Click the **"Image"** button in toolbar
2. Select an image from your computer
3. Image is automatically uploaded and inserted
4. Markdown syntax is added: `![filename](url)`
5. You can edit the alt text in brackets

**Example**:
```markdown
![Industrial Robot Arm](/uploads/blog/1234567890-abc123.jpg)
```

##### Markdown Examples

**Headers**:
```markdown
# Main Title (H1)
## Section Title (H2)
### Subsection (H3)
```

**Text Formatting**:
```markdown
**Bold text**
*Italic text*
***Bold and italic***
~~Strikethrough~~
```

**Links**:
```markdown
[Visit our website](https://aierxuan.com)
```

**Images**:
```markdown
![Alt text for image](/path/to/image.jpg)
```

**Lists**:
```markdown
- Bullet point 1
- Bullet point 2
  - Nested item

1. Numbered item 1
2. Numbered item 2
```

**Blockquotes**:
```markdown
> This is a quote
> It can span multiple lines
```

**Code**:
```markdown
Inline `code` in text

```javascript
// Code block
function hello() {
  console.log("Hello World");
}
```
```

**Tables**:
```markdown
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
```

#### Meta Description (SEO)
- **Purpose**: Appears in Google search results
- **Length**: 150-160 characters (counter shown)
- **Tips**: 
  - Include target keywords
  - Make it compelling to click
  - Summarize the post's value

---

## Workflow

### Creating a New Post

1. **Fill Basic Info**
   - Enter a unique slug
   - Upload cover image (optional)
   - Set status to "Draft"

2. **Write Content**
   - Start with English (required)
   - Use formatting toolbar
   - Upload images as needed
   - Switch to Preview tab to check

3. **Add Translations** (optional)
   - Switch language tabs
   - Translate title, excerpt, body
   - Each language can have different content

4. **SEO Optimization**
   - Write compelling meta descriptions
   - Use descriptive alt text for images

5. **Save or Publish**
   - **Save as Draft**: Saves without publishing
   - **Publish Now**: Makes post live immediately

### Editing Existing Posts

1. Go to `/admin/blog`
2. Find your post in the list
3. Click **"Edit"**
4. Make changes
5. Click **"Save as Draft"** or **"Publish Now"**

---

## Tips & Best Practices

### Writing Tips
- ✅ Start with a compelling title
- ✅ Use headers (H2, H3) to structure content
- ✅ Break text into short paragraphs
- ✅ Add images every 2-3 paragraphs
- ✅ Use bullet points for lists
- ✅ Include code examples when relevant

### Image Tips
- ✅ Optimize images before upload (compress)
- ✅ Use descriptive filenames
- ✅ Add meaningful alt text
- ✅ Maintain consistent aspect ratios
- ✅ Use WebP format for better performance

### SEO Tips
- ✅ Include keywords in title and first paragraph
- ✅ Use descriptive slugs
- ✅ Write unique meta descriptions
- ✅ Add internal links to other posts
- ✅ Use proper heading hierarchy (H1 → H2 → H3)

---

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Bold | `Ctrl/Cmd + B` |
| Italic | `Ctrl/Cmd + I` |
| Save | `Ctrl/Cmd + S` |
| Preview | `Ctrl/Cmd + P` |

---

## Troubleshooting

### Image Upload Fails
- Check file size (must be < 5MB)
- Verify file format (JPG, PNG, GIF, WebP only)
- Check internet connection
- Try a different browser

### Content Not Saving
- Check for required fields (English title & body)
- Verify you're logged in as admin
- Check browser console for errors
- Try refreshing the page

### Preview Not Showing
- Switch to "Write" tab and back to "Preview"
- Check for Markdown syntax errors
- Refresh the page

---

## Support

For technical issues or questions:
- Check the [Markdown Guide](https://www.markdownguide.org/basic-syntax/)
- Contact: admin@aierxuan.com

---

**Last Updated**: 2025-10-11

