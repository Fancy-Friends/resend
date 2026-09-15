/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/attachment-get.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/attachment-get.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- resend
 */

/**
 * Get attachment — Turn one attachment of a received email into a signed
 * download URL.
 *
 * https://resend.com/docs/api-reference/emails/retrieve-received-email-attachment
 */

import type { NodeKindDefinition } from "@particle-academy/fancy-flow/engine";
import { defineConnectorKind, summarize, type OutputField } from "@particle-academy/fancy-flow/connectors";
import { resendMeta } from "../service.js";

export const RESEND_ATTACHMENT_GET_KIND = "@particle-academy/resend_attachment_get";
export const RESEND_ATTACHMENT_GET_OPERATION = "attachment_get";

export const RESEND_ATTACHMENT_GET_META = resendMeta("action", "an attachment download URL", "https://resend.com/docs/api-reference/emails/retrieve-received-email-attachment");

/**
 * What this node emits — the "ingredients" a downstream node can reference.
 *
 * fancy-flow reads `outputShape` off the kind and offers it in the variable
 * picker, so declaring it is the whole of the work: an author configuring the
 * next node picks `{{ $json.data.id }}` off a list instead of typing a path
 * and hoping.
 */
export const RESEND_ATTACHMENT_GET_OUTPUT: OutputField[] = [
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
    "description": "The attachment's id, echoed back."
  },
  {
    "path": "data.filename",
    "type": "string",
    "description": "The original filename."
  },
  {
    "path": "data.size",
    "type": "number",
    "description": "Size in bytes."
  },
  {
    "path": "data.content_type",
    "type": "string",
    "description": "The MIME type."
  },
  {
    "path": "data.content_disposition",
    "type": "string",
    "description": "inline or attachment."
  },
  {
    "path": "data.content_id",
    "type": "string",
    "description": "The Content-ID an inline image is referenced by in the HTML; null otherwise."
  },
  {
    "path": "data.download_url",
    "type": "string",
    "description": "A signed URL for the bytes. Download before download_url expires; the connector never carries the bytes."
  },
  {
    "path": "data.expires_at",
    "type": "string",
    "description": "ISO 8601 expiry of download_url."
  }
];

export const resendAttachmentGetKind: NodeKindDefinition = defineConnectorKind(RESEND_ATTACHMENT_GET_META, {
  name: RESEND_ATTACHMENT_GET_KIND,
  aliases: ["resend_attachment_get"],
  label: "Get attachment",
  description: "Turn one attachment of a received email into a signed download URL.",
  icon: "📎",
  inputs: [{ id: "in" }],
  outputs: [{ id: "out" }],
  sideEffects: "none",
  outputShape: RESEND_ATTACHMENT_GET_OUTPUT,
  configSchema: [
    {
      "type": "text",
      "key": "emailId",
      "label": "Email ID",
      "required": true,
      "description": "The received email's id -- `data.email_id` on the delivery, or `email.id` after the trigger's read."
    },
    {
      "type": "text",
      "key": "attachmentId",
      "label": "Attachment ID",
      "required": true,
      "description": "From `email.attachments[].id` on the trigger, or from attachment_list."
    }
  ],
  defaultConfig: {
    "mode": "auto"
  },
  renderBody: ({ config }) =>
    summarize(RESEND_ATTACHMENT_GET_META, config as Record<string, unknown>, "an attachment download URL"),
});
