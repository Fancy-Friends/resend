/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/triggers/email-received.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/triggers/email-received.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- resend
 */

/**
 * Resend's webhook trigger — the delivery contract.
 *
 * Kept beside the service descriptor rather than inside a node, because a
 * signature scheme is a fact about RESEND. Two Resend triggers must not be
 * able to disagree about how a delivery is verified.
 */

import { verifyDelivery, type HmacScheme, type InboundDelivery, type TriggerDescriptor, type WebhookVerification } from "@particle-academy/fancy-connector-core";
import { resendFaker } from "../faker.js";

export const RESEND_EMAIL_RECEIVED_SIGNATURE_HEADER = "svix-signature";
/** The provider's documented replay window, in seconds. */
export const RESEND_EMAIL_RECEIVED_TOLERANCE = 300;

export const RESEND_EMAIL_RECEIVED_SCHEME: HmacScheme = {
  algorithm: "SHA-256",
  payload: (raw, timestamp, id) => `${id}.${timestamp}.${raw}`,
  tolerance: RESEND_EMAIL_RECEIVED_TOLERANCE,
  encoding: "base64",
  secretEncoding: "base64",
  secretPrefix: "whsec_",
};

/**
 * Split `v1,…` into its parts.
 *
 * EVERY signature the header carries is collected, and the delivery passes
 * when ANY matches: a provider rolling a secret signs once per active secret,
 * and a first-only rule refused the whole roll as a wrong secret.
 *
 * `v1,<base64> v1,<base64>` -- several during a secret rotation, and Svix says
 * yours must match ONE of them. Every `v1` is offered to the verifier; the
 * first-only rule that Stripe's header once carried refused a whole roll.
 */
export function parseResendSignature(raw: string): {
  signatures: string[];
  timestamp?: string;
} {
  const result: { signatures: string[]; timestamp?: string } = { signatures: [] };

  for (const part of raw.split(" ")) {
    const [key, value] = part.trim().split(",", 2);
    if (value === undefined) continue;

    if (key === "v1") {
      result.signatures.push(value);
    }
  }

  return result;
}

export const RESEND_EMAIL_RECEIVED: TriggerDescriptor = {
  service: "resend",
  operation: "email_received",
  delivery: "webhook",
  setup:
    "Point a receiving domain's MX record at Resend, then in the Resend dashboard (Webhooks → Add webhook) point an endpoint at the route your host mounts for this trigger and subscribe it to email.received. Put the endpoint's signing secret -- shown as whsec_… -- on the connection as `webhookSecret`, exactly as shown.",
  verification: {
    signatureHeader: RESEND_EMAIL_RECEIVED_SIGNATURE_HEADER,
    scheme: RESEND_EMAIL_RECEIVED_SCHEME,
    timestampHeader: "svix-timestamp",
    idHeader: "svix-id",
    parse: parseResendSignature,
  },
  faker: resendFaker,
};

/**
 * Verify one inbound Resend delivery.
 *
 * The host calls this BEFORE starting a run, with the body exactly as
 * received. Re-serialised JSON changes key order and whitespace, and produces
 * a mismatch that looks precisely like a wrong secret — hours of debugging the
 * wrong thing.
 *
 * The secret is the connection's `webhookSecret`.
 */
export function verifyResendDelivery(
  delivery: InboundDelivery,
  webhookSecret: string | undefined,
  now?: number,
): Promise<WebhookVerification> {
  return verifyDelivery(RESEND_EMAIL_RECEIVED, delivery, webhookSecret, now);
}
