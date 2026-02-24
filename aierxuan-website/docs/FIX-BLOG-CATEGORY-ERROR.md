# Fix Blog Category Error

## Problem
Error: `column blog_posts.category does not exist`

The blog page is trying to filter posts by category, but the `blog_posts` table doesn't have a `category` column.

## Solution

You need to add the `category` column to the `blog_posts` table in your Supabase database.

### Option 1: Using Supabase Dashboard (Recommended)

1. Go to your Supabase Dashboard: https://app.supabase.com/
2. Select your project: `dudvgnkvukujhqatolqm`
3. Navigate to **SQL Editor** in the left sidebar
4. Copy and paste the following SQL:

```sql
-- Add category column to blog_posts
ALTER TABLE blog_posts
ADD COLUMN IF NOT EXISTS category VARCHAR(50) DEFAULT 'news';

-- Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);

-- Add check constraint to ensure valid categories
ALTER TABLE blog_posts
ADD CONSTRAINT blog_posts_category_check
CHECK (category IN ('news', 'products', 'industry', 'technology'));

-- Update existing posts to have a default category
UPDATE blog_posts
SET category = 'news'
WHERE category IS NULL;

-- Make category NOT NULL after setting defaults
ALTER TABLE blog_posts
ALTER COLUMN category SET NOT NULL;
```

5. Click **Run** to execute the SQL
6. Refresh your website at http://localhost:3001/blog

### Option 2: Using Supabase CLI

If you have Docker running, you can use the Supabase CLI:

```bash
cd /Users/yangxiaobo/Desktop/AIERXUAN/aierxuan-website
supabase db execute --file database/migrations/add-category-to-blog-posts.sql
```

### Valid Category Values

After the migration, the `blog_posts` table will support these category values:
- `news` - Company news and announcements
- `products` - Product updates and launches
- `industry` - Industry insights and trends
- `technology` - Technical articles and guides

### Testing

After running the migration:

1. Visit http://localhost:3001/blog
2. The error should be gone
3. You should see the category filter working
4. All existing posts will be categorized as "news" by default

### Update Existing Posts

To change the category of existing posts, you can run SQL like:

```sql
UPDATE blog_posts
SET category = 'products'
WHERE slug = 'your-post-slug';
```

Or update via the Supabase Dashboard table editor.
