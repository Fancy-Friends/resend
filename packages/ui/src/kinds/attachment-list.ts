/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/attachment-list.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/attachment-list.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- resend
 */

/**
 * List attachments — List a received email's attachments, each with a signed
 * download URL.
 *
 * https://resend.com/docs/api-reference/emails/list-received-email-attachments
 */

import type { NodeKindDefinition } from "@particle-academy/fancy-flow/engine";
import { defineConnectorKind, summarize, type OutputField } from "@particle-academy/fancy-flow/connectors";
import { resendMeta } from "../service.js";

export const RESEND_ATTACHMENT_LIST_KIND = "@particle-academy/resend_attachment_list";
export const RESEND_ATTACHMENT_LIST_OPERATION = "attachment_list";

export const RESEND_ATTACHMENT_LIST_META = resendMeta("action", "an email's attachments", "https://resend.com/docs/api-reference/emails/list-received-email-attachments");

/**
 * What this node emits — the "ingredients" a downstream node can reference.
 *
 * fancy-flow reads `outputShape` off the kind and offers it in the variable
 * picker, so declaring it is the whole of the work: an author configuring the
 * next node picks `{{ $json.data.id }}` off a list instead of typing a path
 * and hoping.
 */
export const RESEND_ATTACHMENT_LIST_OUTPUT: OutputField[] = [
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
    "path": "data.has_more",
    "type": "boolean",
    "description": "Whether another page exists beyond this one."
  },
  {
    "path": "data.data",
    "type": "array",
    "description": "The attachments on this page: id, filename, size, content_type, content_disposition, content_id, download_url, expires_at. Resend's own envelope, so the list is at data.data."
  }
];

export const resendAttachmentListKind: NodeKindDefinition = defineConnectorKind(RESEND_ATTACHMENT_LIST_META, {
  name: RESEND_ATTACHMENT_LIST_KIND,
  aliases: ["resend_attachment_list"],
  label: "List attachments",
  description: "List a received email's attachments, each with a signed download URL.",
  icon: "📎",
  inputs: [{ id: "in" }],
  outputs: [{ id: "out" }],
  sideEffects: "none",
  outputShape: RESEND_ATTACHMENT_LIST_OUTPUT,
  configSchema: [
    {
      "type": "text",
      "key": "emailId",
      "label": "Email ID",
      "required": true,
      "description": "The received email's id -- `data.email_id` on the delivery, or `email.id` after the trigger's read."
    },
    {
      "type": "number",
      "key": "limit",
      "label": "Page size",
      "min": 1,
      "max": 100,
      "description": "Attachments per page, 1 to 100. Leave blank for all of them."
    },
    {
      "type": "text",
      "key": "after",
      "label": "After",
      "description": "An attachment id: the page after it. Not together with `before`."
    },
    {
      "type": "text",
      "key": "before",
      "label": "Before",
      "description": "An attachment id: the page before it. Not together with `after`."
    }
  ],
  defaultConfig: {
    "mode": "auto"
  },
  renderBody: ({ config }) =>
    summarize(RESEND_ATTACHMENT_LIST_META, config as Record<string, unknown>, "an email's attachments"),
});
