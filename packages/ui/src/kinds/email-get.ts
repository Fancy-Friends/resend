/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/email-get.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/email-get.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- resend
 */

/**
 * Get received email — Read a received email in full: its bodies, its headers
 * and the list of its attachments.
 *
 * https://resend.com/docs/api-reference/emails/retrieve-received-email
 */

import type { NodeKindDefinition } from "@particle-academy/fancy-flow/engine";
import { defineConnectorKind, summarize, type OutputField } from "@particle-academy/fancy-flow/connectors";
import { resendMeta } from "../service.js";

export const RESEND_EMAIL_GET_KIND = "@particle-academy/resend_email_get";
export const RESEND_EMAIL_GET_OPERATION = "email_get";

export const RESEND_EMAIL_GET_META = resendMeta("action", "a received email", "https://resend.com/docs/api-reference/emails/retrieve-received-email");

/**
 * What this node emits — the "ingredients" a downstream node can reference.
 *
 * fancy-flow reads `outputShape` off the kind and offers it in the variable
 * picker, so declaring it is the whole of the work: an author configuring the
 * next node picks `{{ $json.data.id }}` off a list instead of typing a path
 * and hoping.
 */
export const RESEND_EMAIL_GET_OUTPUT: OutputField[] = [
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
    "description": "The received email's id (a UUID)."
  },
  {
    "path": "data.from",
    "type": "string",
    "description": "The sender's address, bare."
  },
  {
    "path": "data.to",
    "type": "array",
    "description": "Recipient addresses."
  },
  {
    "path": "data.cc",
    "type": "array",
    "description": "Carbon-copy addresses; empty when none."
  },
  {
    "path": "data.bcc",
    "type": "array",
    "description": "Blind-copy addresses; empty when none."
  },
  {
    "path": "data.reply_to",
    "type": "array",
    "description": "Reply-To addresses; empty when none."
  },
  {
    "path": "data.subject",
    "type": "string",
    "description": "The subject line."
  },
  {
    "path": "data.created_at",
    "type": "string",
    "description": "ISO 8601, when Resend received it."
  },
  {
    "path": "data.html",
    "type": "string",
    "description": "The HTML body, when the email carried one."
  },
  {
    "path": "data.html_format",
    "type": "string",
    "description": "How inline images are referenced in `html`: data_uri or cid."
  },
  {
    "path": "data.text",
    "type": "string",
    "description": "The plain-text body. NULL when the email carried only HTML -- branch on it before reading."
  },
  {
    "path": "data.headers",
    "type": "object",
    "description": "The email's headers as a map, lower-cased names (from, return-path, mime-version, …)."
  },
  {
    "path": "data.received_for",
    "type": "array",
    "description": "Addresses the email was forwarded for, when it reached Resend through a forward."
  },
  {
    "path": "data.message_id",
    "type": "string",
    "description": "The RFC 5322 Message-ID, angle brackets included. Dedupe across providers on this."
  },
  {
    "path": "data.raw.download_url",
    "type": "string",
    "description": "A signed URL for the raw MIME message. Expires -- see raw.expires_at. NULL when Resend kept no raw copy."
  },
  {
    "path": "data.raw.expires_at",
    "type": "string",
    "description": "ISO 8601 expiry of raw.download_url, about an hour after the read."
  },
  {
    "path": "data.attachments",
    "type": "array",
    "description": "The attachments' METADATA -- id, filename, content_type, content_disposition, content_id, size -- never the bytes. attachment_get turns an id into a download URL."
  }
];

export const resendEmailGetKind: NodeKindDefinition = defineConnectorKind(RESEND_EMAIL_GET_META, {
  name: RESEND_EMAIL_GET_KIND,
  aliases: ["resend_email_get"],
  label: "Get received email",
  description: "Read a received email in full: its bodies, its headers and the list of its attachments.",
  icon: "📨",
  inputs: [{ id: "in" }],
  outputs: [{ id: "out" }],
  sideEffects: "none",
  outputShape: RESEND_EMAIL_GET_OUTPUT,
  configSchema: [
    {
      "type": "text",
      "key": "emailId",
      "label": "Email ID",
      "required": true,
      "description": "The received email's id -- `data.email_id` on an email.received delivery. Not the message_id: that is the RFC 5322 header, which Resend does not look up by."
    }
  ],
  defaultConfig: {
    "mode": "auto"
  },
  renderBody: ({ config }) =>
    summarize(RESEND_EMAIL_GET_META, config as Record<string, unknown>, "a received email"),
});
