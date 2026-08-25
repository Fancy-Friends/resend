# Changelog

All notable changes to `@particle-academy/resend-ui`, `@particle-academy/resend-js`,
`particle-academy/resend-php` and `fancy-resend`.

The four packages share one version, because they are generated from one
`provider/` definition and a version that meant something different in each
would be a version nobody could reason about.

## [0.3.1] — 2026-08-24

### Fixed

- **`@particle-academy/resend-js` now accepts a RANGE of `@particle-academy/resend-ui`, not one exact version.**

It peer-depended on `@particle-academy/resend-ui` at exactly the release it shipped with. That is the
strict form of the thing the kit's own rule forbids — a first-party sibling gets
a range — and the same block applied the rule correctly to its other two
dependencies. It was this one pair that slipped.

What it cost: ship `@particle-academy/resend-ui` with a fixed help string and every consumer on the
previous `@particle-academy/resend-js` had an **unmet peer**, which npm 7+ errors on. A documentation
patch could not be delivered without a matching runtime release, and a routine
`npm update` that moved the ui package alone broke the install.

The coupling is real and is not being loosened away. The ui package emits the
config schema and the js package implements against it, so a ui that adds a
field to a js that ignores it is silently wrong. But a PATCH is non-additive by
definition and a MINOR is where a field can appear — so `>=0.3.1 <0.4.0` is the
coupling that actually exists rather than the strictest one expressible.

Nothing else changed. `particle-academy/resend-php` and `fancy-resend` are unaffected; neither has an
equivalent edge.

## [0.3.0] — 2026-08-24

### Added

- **The README now says how to SET THIS CONNECTOR UP**, in the package itself.

Until now it explained what the four packages are, what they cost and why the
repo is generated — and said nothing about credentials, scopes, sandboxes or
operations. Somebody who installed it could not learn from it which credentials
a connection needs, where a human GETS them, which scopes to request, or what
the connector can actually do. All of that was already in the definition; the
one document a consumer reads was the one that omitted everything actionable.

The new **Setting it up** section carries:

- every credential, with the text saying where the value comes from, whether it
  is **per installation** or **per connected account**, and whether it is secret;
- the OAuth authorize and token URLs and the exact scopes, verbatim;
- the access-token lifetime, and where refresh tokens ROTATE, the two things a
  host must not do — retry a failed refresh, or refresh concurrently — because a
  replay revokes the entire grant and nothing in the failure says why;
- the estate in this provider's own terms, including the cases where a
  successful-looking run reaches nobody, or reaches the real one;
- every action and trigger with its method, path, inputs, and whether it is safe
  to replay;
- a trigger's provider-side setup, which nobody can derive from anything else.

It is **generated from `provider/manifest.json`**, so it cannot drift from what
the packages do — which is the point at a few hundred providers, where a
hand-written setup section is a few hundred documents going quietly stale.

No code changed. This release exists because a registry and an installing agent
read the PUBLISHED artifact, and the artifact carried the old README.

## [0.2.0] — 2026-08-24

### Changed

- **`@particle-academy/resend-ui` is now an OPTIONAL PEER dependency of `@particle-academy/resend-js`, not a hard one.**

`./flow` needs it; nothing else does. It was a hard dependency, and because
`@particle-academy/resend-ui` itself peer-depends on `fancy-flow` — which npm 7+ installs
automatically — `npm install @particle-academy/resend-js` pulled the **entire flow engine**
onto disk for a consumer who only wanted to call the API. Roughly **18 MB
became 874 KB**, and the package works exactly as before:

```js
import { resend… } from "@particle-academy/resend-js";
// an injected transport, no flow engine anywhere
```

**This is breaking if you use `@particle-academy/resend-js/flow`.** Add `@particle-academy/resend-ui` to your own
dependencies — it was always being installed for you, and now it is declared.
Everything importing only the main entry point is unaffected.

The fix is on this edge rather than on `@particle-academy/resend-ui` → `fancy-flow`: the ui package
genuinely requires fancy-flow, since it calls `defineConnectorKind`, and marking
that peer optional would be a lie about what it needs.

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
[0.2.0]: https://github.com/Fancy-Friends/resend/releases/tag/v0.2.0
[0.3.0]: https://github.com/Fancy-Friends/resend/releases/tag/v0.3.0
[0.3.1]: https://github.com/Fancy-Friends/resend/releases/tag/v0.3.1
