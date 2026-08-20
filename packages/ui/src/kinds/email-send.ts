/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/email-send.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/email-send.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- resend
 */

/**
 * Send email — Send an email through Resend.
 *
 * https://resend.com/docs/api-reference/emails/send-email
 */

import type { NodeKindDefinition } from "@particle-academy/fancy-flow/engine";
import { defineConnectorKind, summarize, type OutputField } from "@particle-academy/fancy-flow/connectors";
import { resendMeta } from "../service.js";

export const RESEND_EMAIL_SEND_KIND = "@particle-academy/resend_email_send";
export const RESEND_EMAIL_SEND_OPERATION = "email_send";

export const RESEND_EMAIL_SEND_META = resendMeta("action", "send an email", "https://resend.com/docs/api-reference/emails/send-email");

/**
 * What this node emits — the "ingredients" a downstream node can reference.
 *
 * fancy-flow reads `outputShape` off the kind and offers it in the variable
 * picker, so declaring it is the whole of the work: an author configuring the
 * next node picks `{{ $json.data.id }}` off a list instead of typing a path
 * and hoping.
 */
export const RESEND_EMAIL_SEND_OUTPUT: OutputField[] = [
  {
    "path": "mode",
    "type": "string",
    "description": "Which estate this ran against. Resend has no sandbox, so: fake or live."
  },
  {
    "path": "connection",
    "type": "string",
    "description": "The connection id that was used."
  },
  {
    "path": "data.id",
    "type": "string",
    "description": "Resend's id for the email (a UUID). Look the send up with it, or dedupe on it."
  }
];

export const resendEmailSendKind: NodeKindDefinition = defineConnectorKind(RESEND_EMAIL_SEND_META, {
  name: RESEND_EMAIL_SEND_KIND,
  aliases: ["resend_email_send"],
  label: "Send email",
  description: "Send an email through Resend.",
  icon: "✉",
  inputs: [{ id: "in" }],
  outputs: [{ id: "out" }],
  sideEffects: "idempotent",
  outputShape: RESEND_EMAIL_SEND_OUTPUT,
  configSchema: [
    {
      "type": "text",
      "key": "from",
      "label": "From",
      "placeholder": "Team <team@yourdomain.com>",
      "description": "Must be an address on a domain you have verified with Resend. An unverified sender is refused at send time, not at setup.",
      "required": true
    },
    {
      "type": "expression",
      "key": "to",
      "label": "To",
      "example": "{{ $json.email }}",
      "description": "One address, a comma-separated list, or an expression. Resend's simulator addresses (delivered@resend.dev, bounced@resend.dev) are LIVE sends that are billed and counted — they are not a sandbox.",
      "required": true
    },
    {
      "type": "expression",
      "key": "subject",
      "label": "Subject",
      "example": "Your order {{ $json.order_id }}"
    },
    {
      "type": "textarea",
      "key": "html",
      "label": "HTML body",
      "rows": 6
    },
    {
      "type": "textarea",
      "key": "text",
      "label": "Plain-text body",
      "rows": 4
    },
    {
      "type": "text",
      "key": "replyTo",
      "label": "Reply-To",
      "placeholder": "support@yourdomain.com"
    },
    {
      "type": "keyvalue",
      "key": "headers",
      "label": "Custom headers",
      "keyPlaceholder": "X-Entity-Ref-ID",
      "valuePlaceholder": "{{ $json.order_id }}",
      "description": "Sent as the email's own headers. The usual use is a threading or reference id."
    }
  ],
  defaultConfig: {
    "mode": "auto"
  },
  renderBody: ({ config }) =>
    summarize(RESEND_EMAIL_SEND_META, config as Record<string, unknown>, "send an email"),
});
