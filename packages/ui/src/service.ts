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
 * Resend's identity on the authoring surface, shared by every Resend node.
 *
 * This file must import nothing from the js package: a PHP or Python project
 * installs the ui package and never that one, and the import would be a
 * dangling module the moment it did.
 *
 * ## The sandbox trap
 *
 * Resend has NO test estate, and somebody checked. Its simulator RECIPIENTS --
 * delivered@resend.dev, bounced@resend.dev, complained@resend.dev,
 * suppressed@resend.dev -- are not one: the send is real, it is billed, and it
 * counts against the quota. Modelling them as a sandbox would put a live send
 * behind a control labelled "test", so `mode` does not offer sandbox at all
 * and `fake` is the primary development mode rather than the fallback.
 */

import type { ConnectorDomain, ConnectorMeta } from "@particle-academy/fancy-flow/connectors";

/**
 * The connector API version this package was GENERATED against.
 *
 * A literal, never imported — an imported constant lets an upgrade rewrite the
 * very claim it exists to detect.
 */
export const CONNECTOR_API_VERSION = 1;

/** The parts of a connector's identity that belong to the SERVICE, not the node. */
export const RESEND_SERVICE = {
  service: "resend",
  serviceTitle: "Resend",
  domain: "email",
  sandbox: "none",
} as const satisfies Pick<ConnectorMeta, "service" | "serviceTitle" | "domain" | "sandbox">;

/**
 * Every connector domain weaver knows, pinned against fancy-flow's union.
 *
 * A closed set copied into three codebases stays correct only while something
 * MAKES it: this line fails to compile the moment weaver carries a value
 * fancy-flow does not, including the values no provider uses yet.
 */
const WEAVER_DOMAINS: readonly ConnectorDomain[] = [
  "payments",
  "commerce",
  "messaging",
  "email",
  "crm",
  "support",
  "storage",
  "calendar",
  "productivity",
  "database",
  "devtools",
  "analytics",
  "marketing",
  "ai",
  "forms",
  "hr",
  "geo"
];
void WEAVER_DOMAINS;

/** The credentials a Resend connection holds. */
export const RESEND_CREDENTIALS = [
  {
    "key": "apiKey",
    "label": "API key",
    "scope": "account",
    "secret": true,
    "help": "re_... from the Resend dashboard. There is only one estate, so this key sends real email."
  }
] as const;

/** Build a Resend node's connector metadata from the operation it performs. */
export function resendMeta(
  role: ConnectorMeta["role"],
  operation: string,
  docs: string,
): ConnectorMeta {
  return { ...RESEND_SERVICE, role, operation, docs };
}
