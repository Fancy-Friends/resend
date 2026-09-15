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
 * Turn one attachment of a received email into a signed download URL.
 *
 * GET /emails/receiving/{emailId}/attachments/{attachmentId} —
 * https://resend.com/docs/api-reference/emails/retrieve-received-email-attachment
 *
 * Notice what is NOT here: no key, no base URL, no mode check, no retry loop,
 * no fake/real branch. This describes the request; callConnector resolves the
 * connection, picks the estate, and either calls Resend or calls the faker.
 */

import {
  callConnector,
  type ConnectorResult,
  type RequestedMode,
  type Transport,
} from "@particle-academy/fancy-connector-core";
import { RESEND } from "../service.js";

export const ATTACHMENT_GET_OPERATION = "attachment_get";

export type AttachmentGetOptions = {
  /** The node's resolved config. Keys: emailId, attachmentId. */
  config: Record<string, unknown>;
  credentials?: Record<string, string | undefined>;
  mode?: RequestedMode;
  connectionId?: string | null;
  input?: unknown;
  attempts?: number;
  /** Override the transport. The only way to exercise this without a network. */
  transport?: Transport;
};

export async function resendAttachmentGet(options: AttachmentGetOptions): Promise<ConnectorResult> {
  const config = options.config ?? {};

  if (config.emailId === undefined || config.emailId === null || config.emailId === "") {
    throw new Error(`attachment_get: "emailId" is required (Email ID).`);
  }

  if (config.attachmentId === undefined || config.attachmentId === null || config.attachmentId === "") {
    throw new Error(`attachment_get: "attachmentId" is required (Attachment ID).`);
  }

  return callConnector(RESEND, {
    operation: ATTACHMENT_GET_OPERATION,
    config,
    input: options.input,
    ...(options.credentials === undefined ? {} : { credentials: options.credentials }),
    ...(options.mode === undefined ? {} : { mode: options.mode }),
    ...(options.connectionId === undefined ? {} : { connectionId: options.connectionId }),
    ...(options.attempts === undefined ? {} : { attempts: options.attempts }),
    ...(options.transport === undefined ? {} : { transport: options.transport }),
    request: {
      method: "GET",
      path: `/emails/receiving/${encodeURIComponent(String(config.emailId))}/attachments/${encodeURIComponent(String(config.attachmentId))}`,
      query: {},
    },
  });
}
