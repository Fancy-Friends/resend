# Resend

Resend for [fancy-flow][flow] — as **four imported, versioned packages**, one
per runtime. Not vendored source: a copy cannot be upgraded, and third-party APIs
change.

[flow]: https://github.com/Particle-Academy/fancy-flow

| Runtime | Package | Install |
|---|---|---|
| Authoring surface (every host) | `@particle-academy/resend-ui` | `npm install @particle-academy/resend-ui` |
| Node | `@particle-academy/resend-js` | `npm install @particle-academy/resend-js` |
| PHP 8.4+ | `particle-academy/resend-php` | `composer require particle-academy/resend-php` |
| Python 3.11+ | `fancy-resend` | `pip install fancy-resend` |

The `ui` package is the editor surface and is React on every host — a PHP or
Python project installs it *and* its own runtime package, and never the `js` one.

## What it costs you

One dependency: `@particle-academy/fancy-connector-core` (or
`particle-academy/fancy-connector-core` on Composer), which the `js` and `php`
packages pull in themselves. The Python package has **zero** runtime
dependencies.

**No Resend SDK.** Plain HTTP, deliberately: a vendor SDK is third-party code
subject to the kit's full approval bar, and one per provider is hundreds of
dependencies nobody is tracking.

## Setting it up

Everything below is generated from `provider/manifest.json`, so it cannot disagree with what the packages do.

### Credentials

A Resend connection holds 1 value.

Every value here is `account` scope: one per connected account, not one per installation.

| Field | Scope | Secret | Where it comes from |
|---|---|---|---|
| **API key** | per connected account | **secret** | re_... from the Resend dashboard. There is only one estate, so this key sends real email. |

### The estate

**Resend has no test estate, and somebody checked.** Everything this connector does is real. Use the faker to build against it.

> Resend has NO test estate, and somebody checked. Its simulator RECIPIENTS -- delivered@resend.dev, bounced@resend.dev, complained@resend.dev, suppressed@resend.dev -- are not one: the send is real, it is billed, and it counts against the quota. Modelling them as a sandbox would put a live send behind a control labelled "test", so `mode` does not offer sandbox at all and `fake` is the primary development mode rather than the fallback.

## What it can do

### Actions

#### `email_send` — Send email

Send an email through Resend.

`POST /emails` · idempotent — safe to replay

| Input | Required | What it is |
|---|---|---|
| `from` | yes | Must be an address on a domain you have verified with Resend. An unverified sender is refused at send time, not at setup. |
| `to` | yes | One address, a comma-separated list, or an expression. Resend's simulator addresses (delivered@resend.dev, bounced@resend.dev) are LIVE sends that are billed and counted — they are not a sandbox. |
| `subject` | no | Subject |
| `html` | no | HTML body |
| `text` | no | Plain-text body |
| `replyTo` | no | Reply-To |
| `headers` | no | Sent as the email's own headers. The usual use is a threading or reference id. |

## Run it before you have credentials

Every operation ships a **faker**, whether or not Resend has a sandbox. Set a
node's mode to `fake` and it returns the shape Resend actually publishes — the
same field names, deterministically — so you can wire the downstream nodes before
touching an account, a key, or a network.

## This repository is generated

`provider/` is the source. Everything under `packages/` is emitted from it and
**must not be hand-edited** — CI regenerates and diffs on every push, and the
next protocol sync destroys anything it finds. See [`AGENTS.md`](AGENTS.md).

## Two namespaces, which do not match on purpose

The repo is `github.com/Fancy-Friends/resend`; the packages publish under
`particle-academy`. Nothing derives one from the other — the names come from
weaver's `friends.json` and nowhere else.

## Licence

MIT.
