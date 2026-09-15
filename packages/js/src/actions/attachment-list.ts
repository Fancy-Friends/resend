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
 * List a received email's attachments, each with a signed download URL.
 *
 * GET /emails/receiving/{emailId}/attachments —
 * https://resend.com/docs/api-reference/emails/list-received-email-attachments
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

export const ATTACHMENT_LIST_OPERATION = "attachment_list";

export type AttachmentListOptions = {
  /** The node's resolved config. Keys: emailId, limit, after, before. */
  config: Record<string, unknown>;
  credentials?: Record<string, string | undefined>;
  mode?: RequestedMode;
  connectionId?: string | null;
  input?: unknown;
  attempts?: number;
  /** Override the transport. The only way to exercise this without a network. */
  transport?: Transport;
};

export async function resendAttachmentList(options: AttachmentListOptions): Promise<ConnectorResult> {
  const config = options.config ?? {};

  if (config.emailId === undefined || config.emailId === null || config.emailId === "") {
    throw new Error(`attachment_list: "emailId" is required (Email ID).`);
  }

  {
    const n = Number(config.limit);
    const given = config.limit !== undefined && config.limit !== null && config.limit !== "";
    if (given && !(Number.isInteger(n) && n >= 1 && n <= 100)) {
      throw new Error(
        `attachment_list: "limit" must be a integer, got ${JSON.stringify(config.limit)}.`,
      );
    }
  }

  return callConnector(RESEND, {
    operation: ATTACHMENT_LIST_OPERATION,
    config,
    input: options.input,
    ...(options.credentials === undefined ? {} : { credentials: options.credentials }),
    ...(options.mode === undefined ? {} : { mode: options.mode }),
    ...(options.connectionId === undefined ? {} : { connectionId: options.connectionId }),
    ...(options.attempts === undefined ? {} : { attempts: options.attempts }),
    ...(options.transport === undefined ? {} : { transport: options.transport }),
    request: {
      method: "GET",
      path: `/emails/receiving/${encodeURIComponent(String(config.emailId))}/attachments`,
      query: {
        ...(config.limit !== undefined && config.limit !== null && config.limit !== "" ? { "limit": Math.trunc(Number(config.limit)) } : {}),
        ...(config.after !== undefined && config.after !== null && config.after !== "" ? { "after": String(config.after) } : {}),
        ...(config.before !== undefined && config.before !== null && config.before !== "" ? { "before": String(config.before) } : {}),
      },
    },
  });
}
