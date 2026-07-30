# Content guidelines

InterviewCue content should solve a specific interview-preparation problem for software and internet-industry candidates. Search coverage is useful only when the page remains accurate, distinct, and valuable to a reader.

## Required frontmatter

Every blog article and guide must satisfy `src/content.config.ts`. Required editorial fields include:

- `title`
- `description`
- `publishDate`
- `category`
- `targetKeyword`

Published content also uses an author label, tags, secondary keywords, indexing state, and image metadata. Add `updatedDate` when a material review or correction occurs.

## Page intent

- Give each indexable page one primary search intent and one H1.
- Do not create multiple pages that compete for the same query without a clear canonical and internal-link hierarchy.
- Use headings to reflect the answer structure, not to repeat keywords.
- Prefer upgrading an existing useful page over publishing a thin variation.

## Claims and evidence

- Link to a primary or authoritative source for claims that can change.
- Record a review date for competitor features, platform behavior, hiring practices, prices, or policies.
- Label product statements as first-party descriptions.
- Do not invent customer counts, rankings, reviews, founders, credentials, benchmarks, or success rates.
- Explain the method and limitations behind comparisons, scoring systems, and recommendations.
- Use first-hand examples, answer rubrics, tradeoff analyses, and reproducible workflows when available.

The default `InterviewCue Team` author label is an editorial identifier, not evidence of a person's credentials. Do not attach expertise claims to it without a visible and verified author policy.

## Links and media

- Add useful internal links to a relevant product page, guide, and supporting article where context warrants them.
- Use descriptive link text rather than generic phrases.
- Provide business-relevant alt text for informative images; use empty alt text for purely decorative images.
- Keep image dimensions stable and use compressed local assets.
- Do not hotlink third-party images or publish assets without appropriate rights.

## Validation

Before committing content, run:

```bash
npm run check:content
npm run check:seo
npm run build:prod
```

`check:content` verifies required metadata, keyword placement, and blog image references. `check:seo` verifies that published slugs have a bounded keyword registry. Passing these checks does not replace editorial review.
