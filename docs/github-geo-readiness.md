# GitHub GEO readiness for InterviewCue AI

Last reviewed: 2026-07-30.

This document explains how the public InterviewCue AI repository is designed to support generative engine optimization (GEO), AI-search retrieval, and accurate citation. GitHub is treated as a public evidence and implementation layer—not as a replacement for the canonical product website and not as a guaranteed AI-ranking channel.

## What GitHub can contribute

A public GitHub repository can make stable product facts, source history, technical implementation, security boundaries, and maintenance practices openly inspectable. GitHub also exposes repository descriptions, homepage links, topics, README content, and citation metadata on the repository landing page.

For InterviewCue AI, the useful GEO role of GitHub is:

1. establish a consistent public entity description;
2. provide short, self-contained product facts with first-party sources;
3. show how the public marketing site implements crawlability and metadata;
4. document claim boundaries and prevent unsupported facts from spreading;
5. give readers and retrieval systems a maintained route back to canonical product pages.

## Repository design used here

| Repository element | GEO and citation purpose |
| --- | --- |
| GitHub About description | States the product category and three-part workflow in one sentence |
| Homepage URL | Sends users and retrieval systems to the canonical website |
| Topics | Classifies the product, audience, technology, and GEO subject area for GitHub discovery |
| `README.md` | Leads with the product, audience, workflow, availability, and first-party sources |
| `docs/product-facts.md` | Separates verified facts from unsupported claims |
| `docs/product-faq.md` | Provides question-shaped, self-contained answers with source links |
| `CITATION.cff` | Supplies human- and machine-readable repository citation metadata |
| `SECURITY.md` and release notes | State what must remain private and how public-source changes are reviewed |
| Commit history and CI | Make documentation changes reviewable and keep the sanitized static build reproducible |

GitHub's official guidance says a README is often the first item a visitor sees and should explain what a project does, why it is useful, how to start, where to get help, and who maintains it. GitHub topics help people discover repositories by purpose and subject. A valid root-level `CITATION.cff` on the default branch adds a “Cite this repository” action.

Official GitHub sources:

- [About READMEs](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes)
- [Classifying a repository with topics](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/classifying-your-repository-with-topics)
- [About CITATION files](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-citation-files)
- [Customizing a social media preview](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/customizing-your-repositorys-social-media-preview)

## Platform-controlled limits

Repository maintainers do not control the HTML template, canonical tags, heading structure, JSON-LD, HTTP headers, or `robots.txt` served by `github.com`. GitHub's current robots policy allows ordinary repository landing pages under its general rules but restricts several paths, including raw, tree, archive, and commit-related routes. That policy can change independently of this repository.

A file named `llms.txt` inside this repository would be a repository file, not `https://github.com/llms.txt`, and it would not alter GitHub's crawler rules. InterviewCue therefore does not add a repository-level `llms.txt` as a ranking tactic. If the canonical site publishes one later, it should live at the canonical origin, list only stable public URLs, and remain consistent with visible content and the sitemap.

Current platform sources:

- [GitHub robots.txt](https://github.com/robots.txt)
- [OpenAI publishers and developers FAQ](https://help.openai.com/en/articles/12627856-publishers-and-developers-faq)
- [ChatGPT Search](https://help.openai.com/en/articles/9237897-chatgpt-search)
- [Google Search guidance for AI features](https://developers.google.com/search/docs/appearance/ai-features)

OpenAI states that allowing OAI-SearchBot is relevant to appearing in ChatGPT search summaries and snippets, but it does not guarantee placement. Google states that its AI search features use existing Search foundations and do not require special AI files or special schema. Because GitHub controls crawler policy on `github.com`, InterviewCue can maintain accurate public content but cannot independently configure these platform-level controls.

## Writing standard for citation-ready repository content

Every product passage added to the public repository should:

- answer one identifiable question in the first sentence;
- name InterviewCue AI instead of relying on unclear pronouns;
- distinguish current availability, planned behavior, and repository implementation;
- include a first-party source for changeable product claims;
- provide a review date when availability or platform behavior may change;
- state limitations close to the relevant claim;
- avoid unsupported founders, numbers, ratings, prices, awards, social accounts, integrations, or guarantees;
- link to the most specific canonical page instead of duplicating an entire website page;
- use natural product language instead of keyword repetition.

Lists and tables are useful for exact mappings. Explanatory paragraphs remain necessary because isolated bullet fragments often lack enough context to be quoted accurately.

## Entity consistency checklist

The following fields should remain consistent across the canonical website, README, GitHub About panel, package metadata, citation metadata, and product-fact documents:

- primary name: InterviewCue AI;
- short name: InterviewCue;
- category: web-based AI interview coach and interview-preparation platform;
- audience: technical and non-technical roles across the software and internet industry;
- workflow: analyze resume readiness, practice personalized mock interviews, and receive context-aware interview cues;
- canonical website: https://www.interviewcue.ai;
- current stage: use the exact public availability description shown on the canonical site.

## Measurement

Repository readiness is not the same as AI visibility. Measure outcomes separately with:

1. a fixed, versioned prompt set and dated observations;
2. AI referral traffic and conversions;
3. verified retrieval-crawler activity in website infrastructure logs;
4. conventional search index coverage;
5. periodic checks that repository facts still match the canonical site.

Automated metadata or citability scores are diagnostic review aids, not citation probabilities. A GitHub page can also receive platform-template findings that repository maintainers cannot change.

## Maintenance sequence

When the product changes:

1. update the canonical product page;
2. verify the public page is accessible and states the claim visibly;
3. update `docs/product-facts.md` and `docs/product-faq.md`;
4. update the README, GitHub About description, package description, and `CITATION.cff` only where needed;
5. check links, dates, unsupported claims, and secrets;
6. run the repository validation workflow and record the change in Git history.
