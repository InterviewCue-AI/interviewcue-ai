# Contributing

Thank you for helping improve the InterviewCue AI public marketing site.

## Useful contributions

- corrections to verifiable public product facts;
- accessibility and semantic HTML improvements;
- Astro static-build or performance fixes;
- metadata, structured-data, sitemap, or internal-link corrections;
- documentation improvements;
- focused content corrections backed by reliable sources.

The product application, customer systems, and private operations are outside this repository.

## Development workflow

1. Create a focused branch.
2. Install dependencies with `npm ci`.
3. Make the smallest change that fully addresses the issue.
4. Run:

   ```bash
   npm run check:content
   npm run check:seo
   npm run build:prod
   ```

5. Explain the evidence for factual or SEO-related changes in the pull request.

Do not include credentials, private endpoints, customer data, analytics exports, internal reports, or third-party copyrighted assets.

## Content changes

Follow [docs/content-guidelines.md](docs/content-guidelines.md). Use primary sources for changeable platform or competitor claims. Do not add unverified rankings, ratings, customer counts, founders, credentials, or product capabilities.

## Licensing

By contributing source code, you agree that your code contribution may be distributed under the repository's MIT code license. Marketing content, brand material, and assets remain governed by the exclusions in [LICENSE.md](LICENSE.md). Do not submit material you do not have permission to contribute.
