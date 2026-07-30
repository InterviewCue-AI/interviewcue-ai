# Architecture and runtime boundaries

InterviewCue's public marketing site is designed as a static Astro application. Pages, metadata, and content are rendered during the build and deployed as files.

## Request path

```text
MDX and Astro source
        |
        v
Astro static build ----> HTML, CSS, images, sitemap, robots.txt
                                  |
                                  v
                         Static hosting or CDN
```

There is no Node.js server, SSR process, database, or framework hydration requirement after deployment.

## Main layers

| Layer | Responsibility |
| --- | --- |
| `src/pages` | Routes and page-level composition |
| `src/layouts` | Shared document, article, and head structure |
| `src/components` | Global navigation, footer, analytics, SEO, and sections |
| `src/lib` | Brand facts, URL helpers, schema builders, images, and public form configuration |
| `src/content` | Typed MDX blog and guide collections |
| `src/styles` | Tailwind entry point, tokens, layout, and accessible visual states |
| `scripts` | Deterministic content checks and static builds |
| `public` | Versioned static assets copied into the deployment output |

## Build targets

`scripts/build-static.mjs` reads a sanitized target from `config/deploy.mjs`, provides public values to Astro, runs the static build, and adds presentation and `lastmod` data to generated sitemaps.

- `npm run build:dev` uses `http://localhost:4321` unless `PUBLIC_DEV_SITE_URL` is supplied.
- `npm run build:prod` uses `https://www.interviewcue.ai` unless `PUBLIC_SITE_URL` is supplied.

The production default keeps canonical links deterministic for repository verification. Deployers of a fork must set their own canonical origin.

## Client-side code

Client JavaScript is limited to interactions that require it, including analytics events, navigation behavior, reveal effects, and optional waitlist submission. Static content remains readable without a client framework.

## Optional integrations

Google Analytics is disabled unless `PUBLIC_GA_MEASUREMENT_ID` is provided. Waitlist submission is disabled unless `PUBLIC_WAITLIST_APPS_SCRIPT_ENDPOINT` is provided.

Both values are browser-visible configuration, not secrets. A public form endpoint must implement its own validation, rate limits, spam controls, and origin policy.

## Not included

The public repository intentionally excludes:

- production credentials and local `.env` files;
- product application and model-service code;
- customer or waitlist records;
- private analytics exports and SEO research;
- internal deployment hosts and network addresses;
- private image-generation tooling and operator-specific absolute paths;
- internal planning, handoff, and daily-report documents.
