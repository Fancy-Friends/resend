# Changelog

All notable changes to `@particle-academy/resend-ui`, `@particle-academy/resend-js`,
`particle-academy/resend-php` and `fancy-resend`.

The four packages share one version, because they are generated from one
`provider/` definition and a version that meant something different in each
would be a version nobody could reason about.

## [0.1.0] — 2026-08-20

First release. Ported from the vendored connector at
`px-ui-sandbox/resources/flow-nodes/_resend`.

### Added

- `email_send` — send an email. `POST /emails`, JSON body.
- A faker for it, so the node runs on a canvas with no key, no network and no
  Resend account.
- Webhook signature verification is NOT included; see below.

### The reason this provider exists in the set

**Resend has no test estate.** Roughly a third of the providers worth
connecting do not — and for every one of them "just try it" means writing to
production. So `mode` here offers `fake` and `live` and nothing else: offering
a choice the provider cannot honour is an invitation to pick it and read an
error.

Resend's simulator recipients (`delivered@resend.dev`, `bounced@resend.dev`, …)
look like a sandbox and are not one. Those sends are real, billed, and counted
against the quota. Modelling them as an estate would put a live send behind a
control labelled "test".

### Two places this deliberately diverges from what it ported

- **The faker returns only `id`.** The predecessor's returned `from`, `to`,
  `subject`, `created_at` and `last_event` too. Those belong to
  `GET /emails/{id}`; `POST /emails` answers with one field. A faker richer
  than the provider lets an author wire a path that works against the fake and
  is `undefined` on the first real send.
- **An idempotency key is sent.** The predecessor accepted one and did not
  supply it. The generated executor derives it from the run and the node, so a
  resumed durable run mails nobody twice.

### Not here yet

Resend signs its webhooks with **Svix**, and three things about that scheme are
outside the generator's verification vocabulary today: the signed payload is
`{svix-id}.{svix-timestamp}.{body}` and `{svix-id}` is not a payload slot; the
signature header carries a space-separated list of `v1,<sig>` pairs, which is
neither `compound` nor `prefixed`; and the secret is base64 *after* its
`whsec_` prefix and must be decoded to raw bytes before it is used as the HMAC
key. Adding it means extending the vocabulary in three directions at once, and
it is the next thing that will genuinely stress it — Stripe is currently the
only webhook the vocabulary has ever described.

[0.1.0]: https://github.com/Fancy-Friends/resend/releases/tag/v0.1.0
