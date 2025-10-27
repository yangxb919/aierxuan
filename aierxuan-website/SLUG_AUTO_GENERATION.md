# 🔗 Automatic URL Slug Generation

## Overview

The blog editor now features intelligent, SEO-friendly URL slug auto-generation based on the article title. This follows WordPress-style best practices for creating clean, readable URLs.

---

## ✨ Features

### 1. **Automatic Generation**
- ✅ Slug is automatically generated from the **English title**
- ✅ Updates in real-time as you type the title
- ✅ Only auto-generates if slug hasn't been manually edited

### 2. **SEO-Friendly Formatting**
The slug generator applies these transformations:

| Input | Transformation | Output |
|-------|----------------|--------|
| `My Awesome Blog Post` | Lowercase + hyphens | `my-awesome-blog-post` |
| `Industrial Automation 101` | Remove special chars | `industrial-automation-101` |
| `What's New in 2024?` | Remove punctuation | `whats-new-in-2024` |
| `Multiple    Spaces` | Single hyphens | `multiple-spaces` |
| `  Leading/Trailing  ` | Trim edges | `leading-trailing` |
| `Very Long Title That Exceeds...` | Max 100 chars | `very-long-title-that-exc...` |

### 3. **Manual Override**
- ✅ Can manually edit the slug at any time
- ✅ System detects manual edits and stops auto-generation
- ✅ "Regenerate" button to restore auto-generation

### 4. **Visual Feedback**
- ✅ Shows preview of final URL: `/blog/your-slug`
- ✅ Warning indicator when manually edited
- ✅ Disabled state when no title exists

---

## 🎯 How It Works

### Algorithm

```typescript
function generateSlug(title: string): string {
  return title
    .toLowerCase()                    // Convert to lowercase
    .trim()                           // Remove leading/trailing spaces
    .replace(/\s+/g, '-')            // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, '')        // Remove special characters
    .replace(/\-\-+/g, '-')          // Replace multiple hyphens
    .replace(/^-+/, '')              // Remove leading hyphens
    .replace(/-+$/, '')              // Remove trailing hyphens
    .substring(0, 100)               // Limit to 100 characters
}
```

### Behavior Flow

```
User types title → Auto-generate slug → Update slug field
                                              ↓
                                    User can manually edit
                                              ↓
                                    Auto-generation stops
                                              ↓
                                    Click "Regenerate" button
                                              ↓
                                    Resume auto-generation
```

---

## 📖 Usage Examples

### Example 1: Basic Usage

**Step 1**: Enter title
```
Title: "Getting Started with Industrial Automation"
```

**Step 2**: Slug auto-generates
```
Slug: getting-started-with-industrial-automation
URL:  /blog/getting-started-with-industrial-automation
```

### Example 2: Special Characters

**Input**:
```
Title: "Top 10 PLCs for 2024 - A Complete Guide!"
```

**Output**:
```
Slug: top-10-plcs-for-2024-a-complete-guide
URL:  /blog/top-10-plcs-for-2024-a-complete-guide
```

### Example 3: Non-English Characters

**Input**:
```
Title: "Industrie 4.0 & IoT: Die Zukunft"
```

**Output**:
```
Slug: industrie-40-iot-die-zukunft
URL:  /blog/industrie-40-iot-die-zukunft
```

### Example 4: Manual Override

**Step 1**: Auto-generated
```
Title: "Understanding Programmable Logic Controllers"
Slug:  understanding-programmable-logic-controllers
```

**Step 2**: Manual edit
```
User edits slug to: plc-guide
Status: ⚠️ Manually edited
```

**Step 3**: Regenerate
```
Click "Regenerate" button
Slug:  understanding-programmable-logic-controllers (restored)
Status: Auto-generated from English title
```

---

## 🎨 UI Components

### Slug Input Field

```
┌─────────────────────────────────────────────────────────┐
│ Slug (URL)                                              │
├─────────────────────────────────────────────────────────┤
│ [my-blog-post-title                    ] [🔄 Regenerate]│
├─────────────────────────────────────────────────────────┤
│ Auto-generated from English title.                      │
│ Will be: /blog/my-blog-post-title                       │
└─────────────────────────────────────────────────────────┘
```

### Manual Edit Warning

```
┌─────────────────────────────────────────────────────────┐
│ Slug (URL)                                              │
├─────────────────────────────────────────────────────────┤
│ [custom-slug                           ] [🔄 Regenerate]│
├─────────────────────────────────────────────────────────┤
│ ⚠️ Manually edited. Click "Regenerate" to auto-generate│
│ from title.                                             │
└─────────────────────────────────────────────────────────┘
```

---

## 🔍 SEO Best Practices

### ✅ Good Slugs

```
✓ short-and-descriptive
✓ industrial-automation-guide
✓ plc-programming-basics
✓ top-10-sensors-2024
✓ how-to-choose-hmi
```

**Why they're good**:
- Short and memorable
- Include keywords
- Easy to read
- No special characters
- Descriptive of content

### ❌ Bad Slugs (Avoided by Auto-Generation)

```
✗ My%20Blog%20Post%20!!!
✗ article_12345
✗ untitled-1
✗ a
✗ this-is-a-very-long-slug-that-goes-on-and-on-and-contains-way-too-many-words-and-should-be-shortened
```

**Why they're bad**:
- Special characters
- Non-descriptive
- Too short or too long
- Not human-readable

---

## 🛠️ Technical Details

### State Management

```typescript
const [slugManuallyEdited, setSlugManuallyEdited] = useState(false)
```

- Tracks whether user has manually edited the slug
- Prevents auto-generation from overwriting manual edits
- Resets when "Regenerate" button is clicked

### Auto-Generation Trigger

```typescript
if (field === 'title' && currentLang === 'en' && !slugManuallyEdited) {
  const newSlug = generateSlug(value)
  setFormData(prev => ({ ...prev, slug: newSlug }))
}
```

- Only triggers on English title changes
- Only when slug hasn't been manually edited
- Updates slug in real-time

### Manual Edit Detection

```typescript
onChange={(e) => {
  setFormData({ ...formData, slug: e.target.value })
  setSlugManuallyEdited(true)  // Mark as manually edited
}}
```

---

## 🧪 Testing Scenarios

### Test Case 1: Auto-Generation
1. Open new blog post
2. Enter English title: "Test Post"
3. ✅ Verify slug auto-fills: "test-post"

### Test Case 2: Real-Time Update
1. Type title character by character
2. ✅ Verify slug updates with each keystroke

### Test Case 3: Manual Override
1. Auto-generate slug from title
2. Manually edit slug field
3. ✅ Verify warning appears
4. Change title again
5. ✅ Verify slug doesn't auto-update

### Test Case 4: Regenerate
1. Manually edit slug
2. Click "Regenerate" button
3. ✅ Verify slug regenerates from current title
4. ✅ Verify warning disappears

### Test Case 5: Special Characters
1. Enter title with special chars: "Test! @#$ Post?"
2. ✅ Verify slug: "test-post"

### Test Case 6: Multiple Languages
1. Switch to Russian, enter title
2. ✅ Verify slug doesn't change
3. Switch back to English, edit title
4. ✅ Verify slug updates

---

## 📊 Character Handling

| Character Type | Example | Handling |
|----------------|---------|----------|
| **Alphanumeric** | `a-z, A-Z, 0-9` | Kept (lowercase) |
| **Spaces** | ` ` | Converted to `-` |
| **Hyphens** | `-` | Kept (single only) |
| **Underscores** | `_` | Kept |
| **Punctuation** | `!@#$%^&*()` | Removed |
| **Quotes** | `"'` | Removed |
| **Slashes** | `/\` | Removed |
| **Brackets** | `[]{}()` | Removed |
| **Accents** | `é, ñ, ü` | Kept as-is |

---

## 💡 Tips for Content Creators

### Writing Good Titles for SEO

1. **Include Keywords**: Use terms people search for
   ```
   ✓ "Industrial Automation Best Practices"
   ✗ "Some Thoughts on Factories"
   ```

2. **Be Specific**: Describe the content accurately
   ```
   ✓ "PLC Programming Tutorial for Beginners"
   ✗ "Programming Guide"
   ```

3. **Keep It Concise**: Aim for 50-60 characters
   ```
   ✓ "Top 10 HMI Displays for Manufacturing"
   ✗ "The Complete Comprehensive Guide to Choosing..."
   ```

4. **Use Natural Language**: Write for humans first
   ```
   ✓ "How to Choose the Right Sensor"
   ✗ "Sensor Selection Methodology Optimization"
   ```

---

## 🔧 Customization

### Adjust Maximum Length

Edit `generateSlug` function:
```typescript
.substring(0, 100)  // Change 100 to desired length
```

### Change Separator

Replace hyphens with underscores:
```typescript
.replace(/\s+/g, '_')  // Use underscore instead of hyphen
```

### Allow Additional Characters

Modify the regex:
```typescript
.replace(/[^\w\-\.]+/g, '')  // Also keep periods
```

---

## 📝 Summary

The automatic slug generation feature provides:

✅ **SEO-Friendly URLs**: Clean, readable, keyword-rich  
✅ **User-Friendly**: Automatic with manual override option  
✅ **Smart Detection**: Knows when to auto-generate vs. preserve edits  
✅ **Visual Feedback**: Clear indicators of auto vs. manual mode  
✅ **Best Practices**: Follows WordPress and industry standards  

**Result**: Professional, SEO-optimized URLs with minimal effort! 🎉

---

**Last Updated**: 2025-10-11

