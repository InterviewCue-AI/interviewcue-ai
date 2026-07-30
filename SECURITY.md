# Security policy

This repository contains the static InterviewCue AI marketing site. It does not contain the product backend or customer database.

## Reporting a vulnerability

Do not open a public issue for credentials, exposed private endpoints, personal data, or an exploitable vulnerability. Email [support@interviewcue.ai](mailto:support@interviewcue.ai) with:

- the affected file, URL, or commit;
- reproduction steps;
- likely impact;
- any suggested mitigation;
- whether a credential or personal record may have been exposed.

Please avoid accessing, modifying, or retaining data that is not your own.

## Repository safety rules

- Never commit `.env` files, API keys, tokens, private keys, customer records, or analytics exports.
- Treat all `PUBLIC_` environment variables as browser-visible.
- Rotate or revoke an exposed credential immediately; deleting a later commit is not sufficient.
- Keep optional public form endpoints protected with server-side validation, rate limiting, and abuse controls.

Security reports are reviewed on a best-effort basis. This file does not define a vulnerability-reward program or response-time guarantee.
