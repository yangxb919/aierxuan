# Professional Blog Writing Skill - Instructions

## When to Use This Skill

Use this skill when:
- Writing new blog articles for AIERXUAN website
- Creating SEO-optimized B2B content
- Updating existing articles with better SEO practices

## How to Invoke

Simply ask to write a blog article, for example:
- "Write the article: Custom Laptop Manufacturing: Complete Guide for Brands 2025"
- "Create blog post about Mini PC wholesale"
- "Write the next article from the topic cluster strategy"

## Workflow

### Step 1: Pre-Writing Research
The skill will automatically:
1. Read `/Users/yangxiaobo/Desktop/AIERXUAN/seo/topic-cluster-strategy.md` to identify the article
2. Check existing articles in `/Users/yangxiaobo/Desktop/AIERXUAN/articles/` for overlap
3. Identify internal linking opportunities

### Step 2: Article Creation
The skill will create an article with:
- Natural keyword integration with semantic variations
- Authority-backed data with proper citations
- Deep industry insights
- Evidence-based AIERXUAN positioning
- Schema markup in frontmatter
- Internal links to existing content

### Step 3: Post-Writing Updates
After creating the article, the skill will:
1. Save article to `/Users/yangxiaobo/Desktop/AIERXUAN/articles/{slug}.md`
2. Update `/Users/yangxiaobo/Desktop/AIERXUAN/seo/topic-cluster-strategy.md`:
   - Change status from ⬜ to ✅
   - Add file path
   - Add completion date
   - Update statistics

### Step 4: Internal Link Backfill
The skill will identify existing articles that should link to the new article and suggest updates.

## Article URL Format

All articles follow this URL pattern:
```
https://aierxuanlaptop.com/{lang}/blog/{slug}
```

Example slugs:
- `oem-vs-odm-manufacturing-complete-guide-2025`
- `what-is-oem-manufacturing-complete-explanation-b2b-buyers`
- `custom-laptop-manufacturing-complete-guide-2025`

## Key Improvements Over Previous Skill

1. **Semantic Keyword Variations**: Uses 5-8 variations instead of repeating primary keyword
2. **Automated Internal Linking**: Updates topic cluster strategy after each article
3. **Schema Markup**: Includes Article, FAQ, and Organization schema
4. **Authority Citations**: Requires 3+ authoritative sources per article
5. **Evidence-Based Claims**: All AIERXUAN claims backed by specific data
6. **Content Differentiation**: Includes unique elements (downloads, tools, research)
7. **No Content Duplication**: References existing articles instead of repeating

## Files Modified

Each article creation will modify:
- `/Users/yangxiaobo/Desktop/AIERXUAN/articles/{new-article}.md` (created)
- `/Users/yangxiaobo/Desktop/AIERXUAN/seo/topic-cluster-strategy.md` (updated)
- Potentially existing articles (internal link backfill)
