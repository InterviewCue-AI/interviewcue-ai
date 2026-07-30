# SEO and GEO approach

Last reviewed: 2026-07-30.

InterviewCue treats generative engine optimization (GEO) as an extension of sound technical search, clear entity facts, useful content, and verifiable evidence. This repository does not treat a checklist score, schema block, `llms.txt`, or GitHub presence as a guarantee of AI citations.

## Implemented technical foundations

| Mechanism | Implementation | Validation |
| --- | --- | --- |
| Static, text-readable pages | Astro static output | Inspect files in `dist/` |
| Page titles and descriptions | `src/components/SEO.astro` | Inspect built `<head>` |
| Canonical URLs | `src/components/SEO.astro`, `src/lib/seo.ts` | Compare with production origin |
| Social metadata | Open Graph and Twitter fields in `SEO.astro` | Inspect built `<head>` |
| Sitemap | `@astrojs/sitemap` plus `scripts/build-static.mjs` | Open `/sitemap.xml` |
| Robots policy | `src/pages/robots.txt.ts` | Open `/robots.txt` |
| Structured data | Schema builders in `src/lib/seo.ts` | Inspect server-delivered JSON-LD |
| Content metadata | Typed collection schema in `src/content.config.ts` | Run `npm run check:content` |
| Keyword registry | Public validation registry and script | Run `npm run check:seo` |

## Entity consistency

The same stable identifiers should appear across the canonical site and public repository:

- name: InterviewCue AI;
- alternate name: InterviewCue;
- canonical website: https://www.interviewcue.ai;
- category: web-based AI interview coach and interview-preparation platform for tech-industry roles;
- contact: support@interviewcue.ai.

See [product facts](product-facts.md) for the bounded source-of-truth map. Unsupported founders, ratings, awards, prices, social profiles, and customer counts must not be added to visible copy or structured data.

## Crawler access

The generated robots file currently allows all user agents and advertises the sitemap. That is only one access layer: a CDN, firewall, authentication rule, hosting outage, or IP policy may still prevent a crawler from fetching the site.

OpenAI distinguishes its search crawler from model-training controls. Current platform behavior should always be checked against the [OpenAI publishers and developers FAQ](https://help.openai.com/en/articles/12627856-publishers-and-developers-faq).

Google states that AI features use existing Search foundations rather than a special AI schema or text file. See [Google Search guidance for AI features](https://developers.google.com/search/docs/appearance/ai-features).

## Citation-ready content

Content is reviewed for reader value before keyword coverage. Strong passages should:

- answer a real interview-preparation question directly;
- distinguish fact, first-party product description, and editorial judgment;
- provide a source and review date for changeable claims;
- include original examples, rubrics, or methods when available;
- identify limitations and avoid universal claims;
- link naturally to the most relevant canonical product or guide page.

Public GitHub documentation is supporting evidence and implementation context. It should not duplicate entire website pages or present the repository as a second canonical product website.

## GitHub evidence layer

The repository landing page is optimized within the controls GitHub exposes: a product-first README, a concise About description, a canonical homepage link, relevant topics, bounded product facts, source-linked product answers, and a root-level citation file. These elements improve clarity and GitHub discovery, but they do not guarantee external indexing or AI citations.

GitHub controls the repository page's HTML template, canonical behavior, heading structure, structured data, response headers, and crawler policy. Repository maintainers cannot use a file in this repository to alter `github.com` robots rules or platform metadata. See [GitHub GEO readiness](github-geo-readiness.md) for the current platform evidence, implemented design, and maintenance checklist.

## `llms.txt`

`llms.txt` is optional and experimental. This repository does not claim that it is required for ranking or citation. If the canonical site later publishes one, it should be generated from stable, indexable URLs and kept consistent with the sitemap and visible product facts.

## Measurement

Readiness checks are diagnostics, not outcome metrics. Progress should be evaluated in this order:

1. Repeated, dated AI citations or recommendations for a versioned prompt set.
2. AI referral sessions, landing pages, and conversions.
3. Verified search/retrieval crawler activity in CDN or server logs.
4. Search index coverage and conventional organic performance.
5. Deterministic metadata, crawlability, schema, and content checks.

AI answers vary by product, model, account, location, and date. Store those conditions with each observation.
