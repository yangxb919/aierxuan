# AIERXUAN Professional Blog Writing Skill v2.0
## SEO-Optimized B2B Content with Authority & Differentiation

---

## Skill Overview

This skill creates high-quality, SEO-optimized blog articles that address the following critical requirements:
1. **Natural keyword integration** with semantic variations
2. **Automated internal linking** with topic cluster updates
3. **Schema markup** for rich snippets
4. **Authority-backed data** with proper citations
5. **Deep industry insights** beyond surface-level content
6. **Evidence-based brand positioning** for AIERXUAN
7. **Unique value proposition** to stand out from competitors

---

## CRITICAL: Pre-Writing Checklist

Before writing ANY article, you MUST:

### 1. Check Topic Cluster Strategy
```
Read: /Users/yangxiaobo/Desktop/AIERXUAN/seo/topic-cluster-strategy.md
```
- Verify the article is in the planned list
- Identify which cluster it belongs to
- Note related articles for internal linking
- Check for content overlap with existing articles

### 2. Review Existing Articles
```
Read all completed articles in: /Users/yangxiaobo/Desktop/AIERXUAN/articles/
```
- Avoid repeating definitions or explanations
- Reference existing content instead of duplicating
- Ensure unique angle for this article

### 3. Identify Internal Link Opportunities
- List 3-5 existing articles to link TO
- Plan 2-3 future articles that will link BACK

---

## Article URL Format

All blog articles follow this URL pattern:
```
https://aierxuanlaptop.com/{lang}/blog/{slug}

Examples:
- /en/blog/oem-vs-odm-manufacturing-complete-guide-2025
- /en/blog/what-is-oem-manufacturing-complete-explanation-b2b-buyers
- /en/blog/oem-laptop-manufacturers-top-suppliers-2025
```

**Slug Rules:**
- Lowercase letters, numbers, hyphens only
- No special characters or spaces
- Derived from English title using slugify()

---

## SECTION 1: Keyword Strategy (Solving Keyword Stuffing)

### 1.1 Primary Keyword Placement
- **Title (H1)**: Include primary keyword naturally
- **First 100 words**: Use primary keyword once
- **H2 headings**: Use in 2-3 of 5-7 H2s
- **Conclusion**: Use once in final section

### 1.2 Semantic Variations (CRITICAL)
For EVERY primary keyword, create 5-8 semantic variations:

**Example: "OEM Manufacturing"**
```
Primary: OEM manufacturing
Variations:
- contract manufacturing for laptops
- private label computer production
- original equipment manufacturing
- outsourced laptop production
- third-party manufacturing services
- brand manufacturing partnerships
- custom manufacturing solutions
```

**Example: "OEM vs ODM"**
```
Primary: OEM vs ODM
Variations:
- original equipment vs original design manufacturing
- contract manufacturing comparison
- manufacturing model differences
- OEM and ODM explained
- choosing between OEM and ODM
- manufacturing partnership types
```

### 1.3 LSI Keywords Integration
Include related terms naturally throughout:
- Industry terms: MOQ, NRE, tooling, lead time
- Process terms: prototyping, mass production, QC
- Business terms: procurement, sourcing, supply chain
- Technical terms: specifications, certifications, compliance

### 1.4 Keyword Density Rules
- Primary keyword: 0.5-1% (NOT 2%+)
- Each semantic variation: 1-2 mentions
- Total keyword family: 2-3% combined
- **Never repeat exact phrase more than 3 times**

---

## SECTION 2: Internal Linking Strategy (Solving Link Gap)

### 2.1 Mandatory Internal Links
Every article MUST include:
- **3-5 internal links** to existing AIERXUAN content
- **2-3 "Coming Soon" placeholders** for planned articles

### 2.2 Link Placement Strategy
```markdown
## Introduction
[Link to pillar content or foundational article]

## Main Content Sections
[Link to related supporting articles]
[Link to comparison or how-to guides]

## FAQ Section
[Link to detailed guides for complex answers]

## Related Articles Section
[3-5 links to cluster articles]
```

### 2.3 Anchor Text Best Practices
```markdown
GOOD (Descriptive):
"Learn more about [OEM vs ODM differences](/en/blog/oem-vs-odm-manufacturing-complete-guide-2025)"

BAD (Generic):
"Click [here](/en/blog/oem-vs-odm-manufacturing-complete-guide-2025) to learn more"

GOOD (Natural):
"As we explained in our [complete guide to OEM manufacturing](/en/blog/what-is-oem-manufacturing-complete-explanation-b2b-buyers), the process involves..."

BAD (Forced):
"For OEM manufacturing information, see [OEM manufacturing guide](/en/blog/what-is-oem-manufacturing-complete-explanation-b2b-buyers)."
```

### 2.4 Post-Writing: Update Topic Cluster Strategy

**CRITICAL: After completing EVERY article, you MUST:**

1. Update `/Users/yangxiaobo/Desktop/AIERXUAN/seo/topic-cluster-strategy.md`:
   - Change status from `⬜` to `✅`
   - Add file path: `/articles/{filename}.md`
   - Add completion date
   - Update "已完成文章" count
   - Update progress percentage

2. Example update:
```markdown
BEFORE:
| ⬜ | Custom Laptop Manufacturing: Complete Guide for Brands 2025 | - | - |

AFTER:
| ✅ | Custom Laptop Manufacturing: Complete Guide for Brands 2025 | `/articles/custom-laptop-manufacturing-complete-guide-2025.md` | 2025-01-02 |
```

3. Update the quick statistics section:
```markdown
### 快速统计
- **已完成文章**: X 篇 (update count)
- **待完成文章**: Y 篇 (update count)
```

---

## SECTION 3: Schema Markup (Solving Rich Snippet Gap)

### 3.1 Required Schema Types

Every article MUST include these schema markups in the frontmatter or metadata:

#### Article Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Article Title Here",
  "description": "Meta description here",
  "author": {
    "@type": "Organization",
    "name": "AIERXUAN",
    "url": "https://aierxuanlaptop.com"
  },
  "publisher": {
    "@type": "Organization",
    "name": "AIERXUAN",
    "logo": {
      "@type": "ImageObject",
      "url": "https://aierxuanlaptop.com/logo.png"
    }
  },
  "datePublished": "2025-01-02",
  "dateModified": "2025-01-02",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://aierxuanlaptop.com/en/blog/article-slug"
  }
}
```

#### FAQ Schema (CRITICAL for SERP features)
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the minimum order quantity for OEM laptops?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AIERXUAN offers flexible MOQ starting from 100 units for standard configurations..."
      }
    }
  ]
}
```

#### Organization Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "AIERXUAN",
  "url": "https://aierxuanlaptop.com",
  "logo": "https://aierxuanlaptop.com/logo.png",
  "description": "Professional OEM/ODM laptop and mini PC manufacturer",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "CN"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "sales",
    "email": "sales@aierxuanlaptop.com"
  }
}
```

### 3.2 Schema Placement in Markdown
Add schema as YAML frontmatter:
```yaml
---
title: "Article Title"
slug: "article-slug"
seo_title: "SEO Title | AIERXUAN"
seo_desc: "155-160 character meta description"
schema:
  article: true
  faq: true
  organization: true
faq_items:
  - question: "Question 1?"
    answer: "Answer 1"
  - question: "Question 2?"
    answer: "Answer 2"
---
```

---

## SECTION 4: Authority & Data Citations (Solving Credibility Gap)

### 4.1 Required Data Sources
Every article MUST cite at least 3 authoritative sources:

**Industry Reports:**
- IDC (International Data Corporation)
- Gartner
- Counterpoint Research
- TrendForce
- Canalys

**Government/Standards:**
- FCC regulations
- CE marking requirements
- RoHS compliance data
- ISO standards documentation

**Trade Publications:**
- DigiTimes
- EE Times
- Tom's Hardware (for technical specs)
- AnandTech

### 4.2 Citation Format
```markdown
GOOD:
According to IDC's Q3 2024 report, global laptop shipments reached 64.2 million units,
with OEM/ODM manufacturers accounting for 78% of production capacity.
[Source: IDC Worldwide Quarterly Personal Computing Device Tracker, October 2024]

BAD:
Laptop shipments are growing. (no source)

GOOD:
The average lead time for OEM laptop production has decreased from 45 days in 2020
to 21 days in 2024, based on AIERXUAN's internal production data across 500+ orders.
[Source: AIERXUAN Production Analytics, 2024]

BAD:
Lead times are typically 2-4 weeks. (vague, no source)
```

### 4.3 AIERXUAN Data Disclosure
When citing AIERXUAN data, be specific and transparent:

```markdown
GOOD:
Based on AIERXUAN's 2024 production records:
- Average defect rate: 0.3% (across 127,000 units)
- On-time delivery rate: 98.2% (based on 342 orders)
- Average lead time: 12 days (for orders 100-500 units)

BAD:
AIERXUAN has <0.5% defect rate. (no context)
```

### 4.4 Competitor Data Guidelines
When discussing competitors (Quanta, Compal, Wistron, etc.):

```markdown
GOOD:
Quanta Computer reported Q3 2024 revenue of NT$327.8 billion, with notebook
shipments of approximately 15 million units. The company's primary clients
include Apple, HP, and Dell.
[Source: Quanta Computer Q3 2024 Earnings Report]

BAD:
Quanta is one of the largest manufacturers. (no specifics)
```

---

## SECTION 5: Deep Industry Insights (Solving Surface-Level Content)

### 5.1 Expert-Level Content Requirements

Every article MUST include at least 2 of these elements:

#### A. Insider Knowledge
```markdown
GOOD:
"One often-overlooked factor in OEM selection is the manufacturer's component
sourcing relationships. Manufacturers with direct Intel or AMD partnerships
can secure allocation during chip shortages—AIERXUAN's Intel Partner status
meant zero production delays during the 2021-2022 semiconductor crisis."

BAD:
"It's important to choose a manufacturer with good component sourcing."
```

#### B. Process Deep-Dives
```markdown
GOOD:
"The OEM laptop production process involves 47 distinct quality checkpoints:
- Incoming component inspection (12 checks)
- SMT assembly verification (8 checks)
- Final assembly QC (15 checks)
- Burn-in testing (6 checks)
- Cosmetic inspection (6 checks)

At AIERXUAN, each checkpoint is documented with timestamp and operator ID,
enabling full traceability for any unit within 24 hours."

BAD:
"Quality control is performed at multiple stages."
```

#### C. Cost Breakdowns
```markdown
GOOD:
"Typical OEM laptop cost structure (14-inch business laptop):
- Components: 65-70% (CPU 15%, display 12%, memory 8%, storage 10%, others 20-25%)
- Assembly labor: 3-5%
- Testing & QC: 2-3%
- Packaging: 1-2%
- Manufacturer margin: 8-12%
- Logistics: 3-5%

For a $400 FOB unit, expect component costs of $260-280."

BAD:
"OEM manufacturing can save 20-40% compared to retail."
```

#### D. Timeline Specifics
```markdown
GOOD:
"Realistic OEM project timeline (new design):
- Week 1-2: Requirements gathering, NDA signing
- Week 3-4: Design review, component selection
- Week 5-8: Tooling development (if custom chassis)
- Week 9-10: EVT (Engineering Validation Test) samples
- Week 11-12: DVT (Design Validation Test) samples
- Week 13-14: PVT (Production Validation Test)
- Week 15+: Mass production

For ODM projects using existing designs, this compresses to 4-6 weeks total."

BAD:
"OEM projects typically take 3-6 months."
```

### 5.2 Addressing Real B2B Concerns

Target content for experienced procurement professionals:

```markdown
Topics they ACTUALLY care about:
✅ How to evaluate supplier financial stability (Dun & Bradstreet scores, payment terms)
✅ IP protection mechanisms (NDA templates, design escrow, tooling ownership)
✅ Quality acceptance criteria (AQL levels, defect classification)
✅ Supply chain risk mitigation (dual sourcing, safety stock requirements)
✅ Contract negotiation points (liability caps, warranty terms, force majeure)

Topics they DON'T need explained:
❌ Basic definition of OEM (they know this)
❌ Generic benefits of outsourcing (obvious)
❌ Simple comparison tables without context
```

---

## SECTION 6: Evidence-Based Brand Positioning (Solving Self-Promotion)

### 6.1 Proof Points Framework

Replace vague claims with specific evidence:

| Vague Claim | Evidence-Based Alternative |
|-------------|---------------------------|
| "Low MOQ" | "MOQ 100 units (vs. industry standard 500-1000). In 2024, 34% of our orders were under 200 units." |
| "Fast delivery" | "Average lead time: 12 days. 98.2% on-time delivery rate based on 342 orders in 2024." |
| "High quality" | "0.3% defect rate across 127,000 units. ISO 9001:2015 certified since 2018." |
| "Intel Partner" | "Intel Technology Provider Gold Partner since 2019. Direct allocation access during component shortages." |
| "Experienced" | "Founded 2012. 500+ B2B clients across 45 countries. 2.3M+ units shipped." |

### 6.2 Case Study Integration

Instead of claims, show results:

```markdown
GOOD:
"Case Study: European EdTech Company
Challenge: Needed 2,000 custom-branded laptops for school deployment in 6 weeks
Solution: AIERXUAN's ODM platform with custom BIOS, pre-loaded MDM software
Result: Delivered 2,147 units in 23 days, 0.2% DOA rate, €47/unit cost savings vs. previous supplier
Client: [Name withheld per NDA, reference available upon request]"

BAD:
"We've helped many educational institutions with their laptop needs."
```

### 6.3 Competitive Positioning

Position AIERXUAN honestly within the market:

```markdown
GOOD:
"Where AIERXUAN fits in the OEM landscape:

| Manufacturer Type | MOQ | Lead Time | Customization | Best For |
|-------------------|-----|-----------|---------------|----------|
| Tier 1 (Quanta, Compal) | 10,000+ | 8-12 weeks | Full custom | Major brands |
| Tier 2 (Regional ODMs) | 1,000-5,000 | 4-8 weeks | Moderate | Mid-size brands |
| **AIERXUAN** | **100-5,000** | **2-4 weeks** | **Full custom** | **SMBs, startups, niche brands** |
| Trading companies | 50-500 | 2-6 weeks | Limited | Small orders |

AIERXUAN occupies the 'flexible mid-market' position—offering Tier 1 customization
capabilities with Tier 3 MOQ flexibility."

BAD:
"AIERXUAN is the best choice for all your manufacturing needs."
```

---

## SECTION 7: Content Differentiation (Solving Sameness)

### 7.1 Unique Value Elements

Every article MUST include at least 2 unique elements:

#### A. Downloadable Resources
```markdown
**Free Download:** [Laptop OEM RFQ Template (Excel)]
- 47 specification fields
- Cost estimation calculator
- Supplier comparison matrix
- Used by 500+ procurement teams

**Free Download:** [Factory Audit Checklist (PDF)]
- 50 critical inspection points
- Photo documentation guide
- Scoring rubric
```

#### B. Interactive Tools (describe for future implementation)
```markdown
**Coming Soon:** OEM Cost Calculator
- Input your specifications
- Get instant cost estimates
- Compare OEM vs ODM pricing
```

#### C. Original Research
```markdown
**AIERXUAN 2024 OEM Trends Survey**
We surveyed 127 B2B buyers about their OEM experiences:
- 67% cited lead time as top concern
- 54% switched suppliers due to quality issues
- 41% prefer MOQ under 500 units
- Average RFQ response time expectation: 48 hours
[Full report available for download]
```

#### D. Expert Interviews/Quotes
```markdown
"The biggest mistake new brands make is underestimating tooling costs.
A custom chassis can add $15,000-50,000 to your first order."
— [Name], AIERXUAN Engineering Director, 15 years in laptop manufacturing
```

### 7.2 Avoiding Content Overlap

Before writing, check existing articles for:
- Duplicate definitions (reference instead of repeating)
- Similar comparison tables (expand or differentiate)
- Overlapping FAQ questions (use different angles)

```markdown
GOOD (Reference existing content):
"For a detailed explanation of OEM manufacturing fundamentals, see our
[Complete Guide to OEM Manufacturing](/en/blog/what-is-oem-manufacturing-complete-explanation-b2b-buyers).
This article focuses specifically on cost optimization strategies."

BAD (Duplicate content):
"OEM stands for Original Equipment Manufacturing. It means..."
[Same definition repeated in multiple articles]
```

---

## SECTION 8: Article Template

### 8.1 Frontmatter (Required)
```yaml
---
title: "Article Title with Primary Keyword"
slug: "article-slug-with-keywords"
seo_title: "SEO Title (50-60 chars) | AIERXUAN"
seo_desc: "Meta description with primary keyword, 155-160 characters, compelling CTA"
author: "AIERXUAN Team"
date: "2025-01-02"
updated: "2025-01-02"
category: "OEM Manufacturing" # or: ODM, Mini PC, Industry Insights, Guides
tags: ["oem", "manufacturing", "laptops", "b2b"]
reading_time: "12 min"
word_count: 3500
schema:
  article: true
  faq: true
  howto: false # set true for how-to guides
internal_links:
  - slug: "related-article-1"
    anchor: "descriptive anchor text"
  - slug: "related-article-2"
    anchor: "descriptive anchor text"
external_sources:
  - name: "IDC Q3 2024 Report"
    url: "https://www.idc.com/..."
  - name: "Gartner Market Analysis"
    url: "https://www.gartner.com/..."
---
```

### 8.2 Article Structure
```markdown
# [H1: Title with Primary Keyword]

![Hero Image](image.webp)
*Alt text: Descriptive text with keyword*

[Opening hook - 1-2 sentences addressing reader's problem]

**In this guide, you'll learn:**
- [Specific benefit 1 with outcome]
- [Specific benefit 2 with outcome]
- [Specific benefit 3 with outcome]
- [Specific benefit 4 with outcome]

**Reading time:** X minutes | **Audience:** [Specific role]

---

## Table of Contents
1. [Section 1 Title](#section-1)
2. [Section 2 Title](#section-2)
...

---

## [H2: Section 1 - Use semantic variation of keyword]

[Content with data citations, expert insights]

### [H3: Subsection if needed]

[Detailed content with examples]

> **Pro Tip:** [Actionable insider advice]

[Internal link to related article]

---

## [H2: Section 2 - Different semantic variation]

| Comparison Table |
|------------------|
| With specific data |

[Source citation]

---

## [H2: Practical Application Section]

### Step 1: [Action]
**What to do:** [Specific instructions]
**Why it matters:** [Business impact]
**AIERXUAN approach:** [How we handle this]

---

## Frequently Asked Questions

### [Question 1 - target featured snippet]?
[Comprehensive answer with specifics, 50-100 words]

### [Question 2]?
[Answer with data citation]

[5-8 FAQs total]

---

## Key Takeaways

- [Takeaway 1 with specific action]
- [Takeaway 2 with measurable outcome]
- [Takeaway 3 with next step]

---

## Ready to Start Your Project?

[Evidence-based CTA with specific proof points]

**Why choose AIERXUAN:**
- [Proof point 1 with data]
- [Proof point 2 with data]
- [Proof point 3 with data]

**Next Steps:**
1. [Download resource] - [Benefit]
2. [Request quote] - [Timeline]
3. [Schedule call] - [What to expect]

📧 sales@aierxuanlaptop.com
📞 WhatsApp: +XX XXX XXX XXXX

---

## Related Articles

- [Article 1 Title](/en/blog/slug-1) - [Why relevant]
- [Article 2 Title](/en/blog/slug-2) - [Why relevant]
- [Article 3 Title](/en/blog/slug-3) - [Why relevant]

---

*Last updated: [Date] | Sources: [List key sources]*
```

---

## SECTION 9: Post-Publication Checklist

### 9.1 Immediate Actions (Within 1 hour)

- [ ] Update topic-cluster-strategy.md with completion status
- [ ] Add internal links FROM this article TO existing articles
- [ ] Update existing articles to link TO this new article
- [ ] Verify all external links work
- [ ] Check schema markup renders correctly

### 9.2 Topic Cluster Update Template

After publishing, update `/Users/yangxiaobo/Desktop/AIERXUAN/seo/topic-cluster-strategy.md`:

```markdown
# Find the article in the appropriate cluster table and update:

BEFORE:
| ⬜ | Article Title | - | - |

AFTER:
| ✅ | Article Title | `/articles/article-slug.md` | YYYY-MM-DD |

# Update the statistics section:
### 快速统计
- **已完成文章**: [NEW COUNT] 篇
- **待完成文章**: [NEW COUNT] 篇

# Update the header:
> **最后更新**: YYYY-MM-DD | **已完成**: X/30 篇 | **进度**: XX%
```

### 9.3 Internal Link Backfill

For each existing article that should link to the new article:
1. Open the existing article
2. Find natural placement for new link
3. Add contextual internal link
4. Save changes

---

## SECTION 10: Quality Checklist

### Before Submission
- [ ] Primary keyword appears in title, first 100 words, 2-3 H2s, conclusion
- [ ] 5+ semantic variations used throughout
- [ ] 3-5 internal links included
- [ ] 2-3 external authoritative sources cited
- [ ] All data has specific sources
- [ ] AIERXUAN claims backed by evidence
- [ ] No duplicate content from existing articles
- [ ] FAQ section with 5-8 questions
- [ ] Schema markup frontmatter complete
- [ ] Downloadable resource or unique element included
- [ ] CTA with specific proof points
- [ ] Related articles section complete

### After Publication
- [ ] topic-cluster-strategy.md updated
- [ ] Existing articles updated with backlinks
- [ ] URL follows format: /en/blog/{slug}

---

## Quick Reference: Common Mistakes to Avoid

| Mistake | Solution |
|---------|----------|
| "OEM Manufacturing" repeated 15 times | Use 8+ semantic variations |
| "Typical savings: 20-40%" | "Based on 127 client projects, average savings: 23%" |
| "We're the best" | "98.2% on-time delivery rate (342 orders, 2024)" |
| Same OEM definition in 3 articles | Reference existing article, add new angle |
| Generic FAQ answers | Specific answers with data and examples |
| "Click here to learn more" | "Learn more about [OEM cost structures](/en/blog/...)" |
| No sources cited | Minimum 3 authoritative sources per article |

---

**Skill Version:** 2.0
**Last Updated:** 2025-01-02
**Purpose:** Create differentiated, authority-backed B2B content that ranks and converts
