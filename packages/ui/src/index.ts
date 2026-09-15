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
 * Resend's node kinds for fancy-flow.
 *
 * Install this on every host. The TypeScript executors live in the js
 * package's `./flow` subpath; PHP and Python hosts run their own and need only
 * this.
 */

export * from "./service.js";
export * from "./kinds/attachment-get.js";
export * from "./kinds/attachment-list.js";
export * from "./kinds/email-get.js";
export * from "./kinds/email-send.js";
export * from "./kinds/email-received.js";

import type { NodeKindDefinition } from "@particle-academy/fancy-flow/engine";
import { resendAttachmentGetKind } from "./kinds/attachment-get.js";
import { resendAttachmentListKind } from "./kinds/attachment-list.js";
import { resendEmailGetKind } from "./kinds/email-get.js";
import { resendEmailSendKind } from "./kinds/email-send.js";
import { resendEmailReceivedTriggerKind } from "./kinds/email-received.js";

/** Every Resend kind, for a host that registers the lot. */
export const RESEND_KINDS: NodeKindDefinition[] = [
  resendAttachmentGetKind,
  resendAttachmentListKind,
  resendEmailGetKind,
  resendEmailSendKind,
  resendEmailReceivedTriggerKind,
];
