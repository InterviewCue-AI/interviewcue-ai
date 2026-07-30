# Public release process

This repository is maintained as a reviewed public mirror. Its history is intentionally separate from private development history.

## Isolation rule

Never merge, rebase, or push a private development branch into the public repository. Each public update must be copied through an explicit allowlist into the public branch and reviewed as a standalone change.

Deleting a sensitive file in a later commit does not remove it from Git history. If a credential is ever exposed, rotate or revoke it immediately before considering history cleanup.

## Approved source categories

- Astro pages, layouts, components, styles, and public TypeScript helpers.
- Public MDX articles and guides.
- Build-required local images and icons.
- Sanitized build and validation scripts.
- Placeholder environment documentation.
- Public architecture, product-fact, contribution, security, and GEO documentation.

## Excluded categories

- `.env` files and credentials.
- Internal hostnames, private IP addresses, and operator-specific paths.
- Live form or automation endpoints that are not intended as reusable public configuration.
- Customer, analytics, waitlist, prompt-monitoring, or crawler-log exports.
- Internal strategy, planning, daily reports, handoff notes, and private audit baselines.
- Private media-generation integrations.

## Release checklist

1. Confirm the private source worktree is understood and unrelated edits are excluded.
2. Copy only approved paths into the isolated public worktree.
3. Replace deployment-specific values with documented environment variables.
4. Review the entire staged tree, not only the latest diff.
5. Scan for tokens, credentials, private keys, private IPv4 ranges, internal domains, live automation URLs, email exports, and absolute user paths.
6. Run `npm ci`, `npm run check:content`, `npm run check:seo`, and `npm run build:prod`.
7. Commit on the public-history branch and push only that branch to the public remote.
8. Clone the public repository into a clean directory and repeat the scan and build checks.

The canonical website remains the product source of truth. Public repository documentation should be updated when verified product facts change.
