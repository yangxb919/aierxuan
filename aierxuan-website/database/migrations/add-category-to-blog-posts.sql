-- Migration: Add category column to blog_posts table
-- This fixes the error: column blog_posts.category does not exist

-- Add category column to blog_posts
ALTER TABLE blog_posts
ADD COLUMN IF NOT EXISTS category VARCHAR(50) DEFAULT 'news';

-- Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);

-- Add check constraint to ensure valid categories
ALTER TABLE blog_posts
ADD CONSTRAINT IF NOT EXISTS blog_posts_category_check
CHECK (category IN ('news', 'products', 'industry', 'technology'));

-- Update existing posts to have a default category
UPDATE blog_posts
SET category = 'news'
WHERE category IS NULL;

-- Make category NOT NULL after setting defaults
ALTER TABLE blog_posts
ALTER COLUMN category SET NOT NULL;
