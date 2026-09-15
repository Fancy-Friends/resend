# Changelog

All notable changes to `@particle-academy/resend-ui`, `@particle-academy/resend-js`,
`particle-academy/resend-php` and `fancy-resend`.

The four packages share one version, because they are generated from one
`provider/` definition and a version that meant something different in each
would be a version nobody could reason about.

## [0.4.0] — 2026-09-15

### Added

- **`email_received` trigger — inbound email.** Resend delivers an `email.received` webhook when mail arrives at one of your receiving addresses, signed by Svix: `{svix-id}.{svix-timestamp}.{body}` under HMAC-SHA256, the signature base64 in `svix-signature` as a space-separated list of `v1,<sig>` of which ANY may match, and a `whsec_<base64>` secret whose HMAC key is the DECODED remainder. The connection stores the secret exactly as the dashboard shows it; the verifier strips the prefix and decodes it, and refuses a secret without its prefix, or one that is not base64, by name rather than failing like a wrong secret. A delivery without its `svix-id` is refused by name too. Five-minute replay window.
- **The trigger reads the email FIRST.** The webhook carries metadata only — no body, no headers, no attachment bytes — so the trigger's `then` block runs `email_get` with the delivery's `email_id` before the run starts and publishes the result under `email`: bodies, headers, message id, the raw download URL and the attachment list. A failed read fails the run rather than starting a flow that assumes the email was there. `verdicts` is published as an explicit `null`: Resend exposes no SPF, DKIM or DMARC verdicts, and a flow looking for them must find a null, not a missing key. Fake mode composes the faked delivery with the faked read, so `email.id` equals `data.email_id` on the canvas exactly as it does live.
- **`email_get`, `attachment_list`, `attachment_get`.** A received email in full (`GET /emails/receiving/{id}`); its attachments with signed download URLs (`…/attachments`, with `limit`, `after`, `before`); one attachment as a signed download URL with its id and expiry beside it (`…/attachments/{id}`). The bytes never pass through the connector.
- **`webhookSecret` credential**, optional, used only by the trigger.

### Changed

- **Requires `fancy-connector-core` ≥ 0.9.0** — `particle-academy/fancy-connector-core` for php, `@particle-academy/fancy-connector-core` for js. The Svix scheme needs the core's `secretEncoding` / `secretPrefix`, its `{id}` payload slot and its any-of signature rule, all added in 0.9.0; `CONNECTOR_API_VERSION` is unchanged at 1.

## [0.3.4] — 2026-09-12

### Changed

- **Requires `fancy-connector-core` ≥ 0.4.0** — `particle-academy/fancy-connector-core` for php, `@particle-academy/fancy-connector-core` for js. The flow executors now pass a provider's declared `idempotencyMaxLength` through to the core's key derivation, and a named argument an older core does not accept is a fatal rather than a no-op, so the floor moves with it. This connector declares no limit and passes nothing, so nothing else changes for it; the bump is the floor alone.

## [0.3.3] — 2026-09-11

### Added

- **`fancy-flow-php` executors for every node.** `src/Flow/` carries one `#[FlowNode]` class per action and trigger, and `ResendFlow::EXECUTORS` lists them.

A Laravel host running fancy-flow-php could show this connector's nodes in its editor and could not run them: `particle-academy/resend-php` shipped the request builders and no executor. Each one is the PHP twin of the executor in `@particle-academy/resend-js` — the same kind, the same request, the same value on `out` — and an unsafe-to-replay action derives its idempotency key from the run and the node, so a retried durable run sends the key it sent the first time.

Register them by adding `vendor/particle-academy/resend-php/packages/php/src/Flow` to `config('fancy-flow.discover')`. `particle-academy/fancy-flow-php` is SUGGESTED, not required, and conflicts outside `>=0.51.0 <2.0`, the range the executors were tested under. Nothing outside `Flow\` needs it.

### Fixed

- **Fake mode through `ConnectorClient` threw.** `Resend::descriptor()` handed the connector core its faker as `ResendFaker::respond(...)`, which takes `($operation, $request)`; the core calls a faker `($operation, $config, $fake, $input)`. So `$config` arrived as `$request` and every fake call died on "Call to a member function … on null". The descriptor now translates between the two. Calling `ResendFaker::respond()` directly — what this package's own tests do, which is why they never saw it — is unchanged.

## [0.3.2] — 2026-09-06

### Changed

- **Published through npm Trusted Publishing, so these packages now carry PROVENANCE.**

Every earlier release went out under a scope-wide npm token. This one is
published by an OIDC exchange from the release workflow itself, and npm records
which workflow in which repository built it. `npm view @particle-academy/resend-ui@0.3.2`
shows the attestation; releases before this one have none.

What it buys a consumer: the tarball on the registry can be tied to a public
commit and a public workflow run, rather than to whoever held a token. What it
does not buy: nothing about the code changed, and the runtime behaviour of all
four packages is identical to 0.3.1.

The release exists to establish that the publisher is configured for this
package. Trusted Publishers are per package, so a green run for one says nothing
about the next — this is the first of forty-six, and it is deliberately one
rather than four.

- **`repository.directory` in the npm packages.**

`@particle-academy/resend-ui` and `@particle-academy/resend-js` live at
`packages/ui` and `packages/js` inside the provider repo. npm's `repository`
field now says so, which makes the "Repository" link on each package page point
at the package rather than at the repository root.

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
