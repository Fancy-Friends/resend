/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/manifest.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/manifest.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- resend
 */

/**
 * Resend, as one service descriptor shared by every Resend operation.
 *
 * @particle-academy/fancy-connector-core carries what is true of ALL
 * connectors. This carries what is true of Resend: its base URL, its auth
 * scheme, its idempotency header, and its faker.
 *
 * ## The sandbox trap, written down where it is used
 *
 * Resend has NO test estate, and somebody checked. Its simulator RECIPIENTS --
 * delivered@resend.dev, bounced@resend.dev, complained@resend.dev,
 * suppressed@resend.dev -- are not one: the send is real, it is billed, and it
 * counts against the quota. Modelling them as a sandbox would put a live send
 * behind a control labelled "test", so `mode` does not offer sandbox at all
 * and `fake` is the primary development mode rather than the fallback.
 */

import type { ConnectorMode, PreparedRequest, ServiceDescriptor } from "@particle-academy/fancy-connector-core";

import { resendFaker } from "./faker.js";

/**
 * The connector API version this package was GENERATED against.
 *
 * A literal, never imported. An imported constant lets an upgrade rewrite the
 * very claim it exists to detect, after which the copy agrees with itself
 * forever.
 */
export const CONNECTOR_API_VERSION = 1;

export const RESEND_BASE_URLS = {
  "live": "https://api.resend.com"
} as const;

/** Credential keys a remote call cannot proceed without. */
export const RESEND_REQUIRES = [
  "apiKey"
] as const;

/**
 * Apply Resend's auth scheme to an outgoing request.
 *
 *
 *
 * The mode is passed in because for some providers auth and estate are the
 * same decision expressed in the URL; here it is unused, and saying so is
 * cheaper than wondering later whether it was forgotten.
 */
export function resendAuthorize(
  credentials: Record<string, string | undefined>,
  request: PreparedRequest,
  _mode: ConnectorMode,
): void {
  request.headers["User-Agent"] = "fancy-flow-connector";

  request.headers.Authorization = `Bearer ${credentials.apiKey ?? ""}`;
}

/** The Resend service, for the TypeScript runtime. */
export const RESEND: ServiceDescriptor = {
  service: "resend",
  title: "Resend",
  sandbox: "none",
  baseUrls: { ...RESEND_BASE_URLS },
  requires: [...RESEND_REQUIRES],
  authorize: resendAuthorize,
  // Resend honours this for 24 hours. It is what makes a retried durable run
  // resend nothing instead of mailing the recipient twice -- the difference
  // between `idempotent` and `unsafe-to-replay` is that this one is merely
  // embarrassing, not financial, but the header costs nothing and removes it
  // entirely.
  idempotencyHeader: "Idempotency-Key",
  faker: resendFaker,
};
