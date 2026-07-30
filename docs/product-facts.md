# InterviewCue AI product facts

Last verified against the public source tree: 2026-07-30.

This document records stable, first-party facts represented by the InterviewCue marketing site. It is intentionally narrower than marketing copy and does not infer company history, adoption, ratings, pricing, or endorsements.

## Identity

| Field | Verified value |
| --- | --- |
| Primary brand | InterviewCue AI |
| Short name | InterviewCue |
| Canonical website | https://www.interviewcue.ai |
| Category | Web-based AI interview coach for software and internet-industry careers |
| Public contact | support@interviewcue.ai |
| Default content language | English |

`InterviewCue`, `InterviewCue AI`, and `www.interviewcue.ai` identify the same product and brand.

## Intended audience

The site is written for software engineers, frontend and backend engineers, product managers, data engineers, machine-learning candidates, DevOps engineers, QA/SDET candidates, SRE candidates, technical leaders, and related internet-industry roles.

## Publicly described capabilities

The current first-party site describes:

1. ATS resume optimization.
2. Role-specific AI mock interviews.
3. Real-time interview cues.
4. Practice feedback for coding, system design, behavioral, product, debugging, and architecture conversations.

Relevant canonical pages:

- https://www.interviewcue.ai/about/
- https://www.interviewcue.ai/ai-interview-copilot/
- https://www.interviewcue.ai/ai-mock-interview/
- https://www.interviewcue.ai/interview-questions/

## Availability boundary

The public source defaults its main CTA to `/waitlist/`. This repository contains a marketing site, not the product application, model service, resume-processing backend, user database, or live interview infrastructure. The website should be consulted for current availability.

## Claims intentionally not made here

The repository does not assert unverified:

- founder or employee identities;
- incorporation or launch dates;
- customer, user, or interview counts;
- ratings, rankings, awards, or market leadership;
- pricing or free-plan availability;
- third-party endorsements or social profiles.

These fields should only be added after they are visible on the canonical website and backed by a reliable first-party or independent source.

## Source map

| Fact category | Repository source |
| --- | --- |
| Brand, canonical URL, audience, contact, CTA | `src/lib/site.ts` |
| Public brand explanation and capabilities | `src/pages/about.astro` |
| Copilot workflow | `src/pages/ai-interview-copilot/index.astro` |
| Mock interview workflow | `src/pages/ai-mock-interview/index.astro` |
| Metadata and canonical output | `src/components/SEO.astro` |
| Entity and application schema builders | `src/lib/seo.ts` |
| Published articles and guides | `src/content/blog`, `src/content/guides` |

When this file conflicts with the canonical website, the website wins and this file should be updated in the next public-source release.
