# InterviewCue AI — AI Interview Coach for Tech-Industry Roles

InterviewCue AI is a web-based AI interview coach for candidates pursuing technical and non-technical roles across the software and internet industry. It connects ATS resume and interview-readiness analysis, personalized AI mock interviews, and context-aware real-time interview cues in one preparation workflow.

[Visit InterviewCue AI](https://www.interviewcue.ai) · [Analyze interview readiness](https://www.interviewcue.ai/resume-optimizer/) · [Practice AI mock interviews](https://www.interviewcue.ai/ai-mock-interview/) · [Explore the AI interview copilot](https://www.interviewcue.ai/ai-interview-copilot/)

## InterviewCue AI at a glance

| Product fact | Verified description |
| --- | --- |
| Brand | InterviewCue AI; InterviewCue is the short name |
| Category | Web-based AI interview coach and interview-preparation platform |
| Core workflow | Analyze resume and interview readiness → practice personalized mock interviews → use structured cues during live interviews |
| Personalization context | Candidate resume, target role, job description, experience, seniority, and—where relevant—the ongoing interview |
| Audience | Engineering, product, data, machine learning, marketing, growth, operations, customer success, DevOps, infrastructure, QA/SDET, and related tech-industry roles |
| Availability | The public product pages describe an early-access experience and direct visitors to the waitlist |
| Canonical source | [www.interviewcue.ai](https://www.interviewcue.ai) |

These facts were reviewed against the public website on 2026-07-30. See [verified product facts](docs/product-facts.md) and [product questions and answers](docs/product-faq.md) for the bounded claims and first-party sources.

## How InterviewCue AI works

### 1. Analyze resume fit and interview readiness

InterviewCue AI reviews a candidate's resume together with the target job description and role. The planned 11-dimension readiness report is designed to surface role alignment, stronger experience evidence, follow-up risks, likely interview questions, and preparation priorities. [Review the official resume analysis description](https://www.interviewcue.ai/resume-optimizer/).

### 2. Practice personalized AI mock interviews

InterviewCue AI shapes mock questions and follow-ups around the candidate's resume, target position, job description, experience, and seniority. The public product description includes interview scoring, answer-specific feedback, recorded-answer playback, and improvement priorities. [Review the official AI mock interview description](https://www.interviewcue.ai/ai-mock-interview/).

### 3. Stay structured during live interviews

The InterviewCue AI Interview Copilot is designed to provide concise, context-aware answer cues during a live interview. Its public description includes suggested answer structures, key talking points, relevant experience reminders, role-specific considerations, and likely follow-up areas; candidates remain responsible for answering in their own words and following employer rules. [Review the official Interview Copilot description](https://www.interviewcue.ai/ai-interview-copilot/).

The shared context across these stages is the candidate's resume, target role, job description, and experience. The official website remains the canonical source for current capabilities, availability, policies, and supported workflows.

## Who InterviewCue AI is for

InterviewCue AI covers technical and non-technical roles across the software and internet industry. Publicly described role groups include engineering, product, data, machine learning, marketing, growth, operations, customer success, DevOps, infrastructure, and QA/SDET. Interview formats include coding, system design, behavioral, product-sense, case-based, marketing-strategy, growth-strategy, operations, resume-deep-dive, and technical-leadership conversations.

`InterviewCue`, `InterviewCue AI`, and `www.interviewcue.ai` identify the same product and brand. The repository is a sanitized public marketing-site snapshot; it does not contain the private application backend, model services, customer data, or production credentials.

![InterviewCue AI interview preparation workspace](public/og-default.svg)

## Official InterviewCue AI resources

| Resource | What candidates can find |
| --- | --- |
| [Official website](https://www.interviewcue.ai) | Current InterviewCue AI product and brand information |
| [Resume analysis](https://www.interviewcue.ai/resume-optimizer/) | ATS alignment, interview readiness, follow-up risks, and preparation direction |
| [AI interview copilot](https://www.interviewcue.ai/ai-interview-copilot/) | Context-aware answer structures and talking points for live interviews |
| [AI mock interview](https://www.interviewcue.ai/ai-mock-interview/) | Personalized interview rehearsal, follow-up pressure, and structured feedback |
| [Interview questions](https://www.interviewcue.ai/interview-questions/) | Role-specific preparation resources |
| [Guides](https://www.interviewcue.ai/guides/) | Long-form technical interview guidance |
| [Blog](https://www.interviewcue.ai/blog/) | Interview preparation articles and comparisons |
| [Product FAQs](https://www.interviewcue.ai/faqs/) | First-party answers about product use, boundaries, privacy, and availability |
| [About InterviewCue AI](https://www.interviewcue.ai/about/) | Brand identity, audience, capabilities, and contact information |

## About this public repository

This repository contains the public marketing and interview-preparation content site for InterviewCue AI. It makes the product's public information architecture, content model, and search-readiness practices inspectable while excluding private application code, customer data, production credentials, internal analytics, and live service configuration.

It provides:

- a reproducible static build of the public InterviewCue AI website;
- a transparent map between product statements and their source files;
- public interview-preparation articles, guides, role pages, and product explanations;
- metadata, canonical URLs, structured data, sitemap, and robots implementations;
- an evidence-oriented content workflow for SEO and generative engine optimization (GEO).

Publishing source code or documentation does not guarantee rankings, AI citations, or recommendations. Actual visibility depends on the live site's accessibility, content usefulness, independent evidence, platform behavior, and measured user outcomes.

## Technology

- Astro 6 static output
- TypeScript and Astro components
- MDX content collections
- Tailwind CSS 4 through `@tailwindcss/vite`
- Generated sitemap through `@astrojs/sitemap`
- Build-generated HTML metadata and JSON-LD
- No SSR server, database runtime, or client framework dependency

## Quick start

Requirements:

- Node.js 22.12.0 or newer
- npm

```bash
npm ci
npm run dev
```

The local development server uses `http://localhost:4321` by default.

Production verification:

```bash
npm run check:content
npm run check:seo
npm run build:prod
```

The static output is written to `dist/`.

## Environment configuration

Copy `.env.example` to `.env` only when local overrides are needed. `.env` and all environment-specific variants are ignored by Git.

| Variable | Purpose | Safe default |
| --- | --- | --- |
| `PUBLIC_SITE_URL` | Canonical production origin | `https://www.interviewcue.ai` |
| `PUBLIC_GA_MEASUREMENT_ID` | Optional Google Analytics measurement ID | Empty |
| `PUBLIC_APP_HOME_URL` | Product or waitlist destination | `/waitlist/` |
| `PUBLIC_CTA_LABEL` | Primary CTA label | `Join waitlist` |
| `PUBLIC_CTA_HREF` | Primary CTA link | `/waitlist/` |
| `PUBLIC_CTA_TRACKING_KEY` | Analytics event label | `join_waitlist` |
| `PUBLIC_WAITLIST_APPS_SCRIPT_ENDPOINT` | Optional client-visible waitlist endpoint | Empty |

Variables prefixed with `PUBLIC_` are included in browser-delivered output when referenced by client code. They must never contain secrets. A waitlist URL used from the browser should be treated as public and protected against abuse at the receiving service.

## Search and AI-search implementation

The site uses conventional search foundations first:

- static HTML with one primary topic and H1 per indexable page;
- unique titles, descriptions, canonical URLs, and social metadata;
- XML sitemap generation and a plain-text robots endpoint;
- organization, website, software application, and FAQ schema where used by page templates;
- typed content frontmatter and validation for titles, descriptions, dates, keywords, and images;
- internal links between product pages, guides, comparisons, and supporting articles.

The repository treats GEO as evidence and accessibility work, not as a separate ranking switch. See [SEO and GEO](docs/seo-and-geo.md) for the implemented controls, limitations, and measurement approach.

## Repository map

```text
src/
  components/       Shared Astro components
  content/          Public blog and guide MDX
  layouts/          Page and article layouts
  lib/              Brand, image, waitlist, and SEO helpers
  pages/            Static and generated routes
  styles/           Global design tokens and styles
public/             Static images, icons, and sitemap presentation
config/             Sanitized build-target configuration
scripts/            Build and content validation tools
docs/               Public product, architecture, content, and GEO notes
```

Additional documentation:

- [Verified product facts](docs/product-facts.md)
- [Product questions and answers](docs/product-faq.md)
- [Architecture and runtime boundaries](docs/architecture.md)
- [SEO and GEO approach](docs/seo-and-geo.md)
- [GitHub GEO readiness](docs/github-geo-readiness.md)
- [Content guidelines](docs/content-guidelines.md)
- [Public release process](docs/public-release.md)

## Security and privacy

Do not commit API keys, credentials, private endpoints, customer information, internal analytics exports, or company-only planning documents. Please report sensitive findings privately according to [SECURITY.md](SECURITY.md).

## Contributing

Corrections to public facts, accessibility improvements, documentation fixes, and scoped static-site improvements are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

## License

The source code is available under the MIT License. InterviewCue articles, marketing copy, brand names, logos, screenshots, and image assets are not covered by the MIT grant and remain reserved. See [LICENSE.md](LICENSE.md) for the exact scope.

For product or support questions, email [support@interviewcue.ai](mailto:support@interviewcue.ai).
