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
 * Send an email through Resend.
 *
 * POST /emails — https://resend.com/docs/api-reference/emails/send-email
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

export const EMAIL_SEND_OPERATION = "email_send";

export type EmailSendOptions = {
  /** The node's resolved config. Keys: from, to, subject, html, text, replyTo, headers. */
  config: Record<string, unknown>;
  credentials?: Record<string, string | undefined>;
  mode?: RequestedMode;
  connectionId?: string | null;
  input?: unknown;
  /** Derived from the run and the step, never fresh. See the note above. */
  idempotencyKey?: string;
  attempts?: number;
  /** Override the transport. The only way to exercise this without a network. */
  transport?: Transport;
};

export async function resendEmailSend(options: EmailSendOptions): Promise<ConnectorResult> {
  const config = options.config ?? {};

  if (config.from === undefined || config.from === null || config.from === "") {
    throw new Error(`email_send: "from" is required (From).`);
  }

  if (config.to === undefined || config.to === null || config.to === "") {
    throw new Error(`email_send: "to" is required (To).`);
  }

  if (!((config.html !== undefined && config.html !== null && config.html !== "") || (config.text !== undefined && config.text !== null && config.text !== ""))) {
    throw new Error(`email_send: needs an "html" or "text" body — an empty email is never intended.`);
  }

  return callConnector(RESEND, {
    operation: EMAIL_SEND_OPERATION,
    config,
    input: options.input,
    ...(options.credentials === undefined ? {} : { credentials: options.credentials }),
    ...(options.mode === undefined ? {} : { mode: options.mode }),
    ...(options.connectionId === undefined ? {} : { connectionId: options.connectionId }),
    ...(options.attempts === undefined ? {} : { attempts: options.attempts }),
    ...(options.transport === undefined ? {} : { transport: options.transport }),
    ...(options.idempotencyKey === undefined ? {} : { idempotencyKey: options.idempotencyKey }),
    request: {
      method: "POST",
      path: "/emails",
      json: {
        "from": String(config.from),
        "to": toList(config.to),
        "subject": config.subject !== undefined && config.subject !== null && config.subject !== "" ? String(config.subject) : "",
        ...(config.html !== undefined && config.html !== null && config.html !== "" ? { "html": String(config.html) } : {}),
        ...(config.text !== undefined && config.text !== null && config.text !== "" ? { "text": String(config.text) } : {}),
        ...(config.replyTo !== undefined && config.replyTo !== null && config.replyTo !== "" ? { "reply_to": String(config.replyTo) } : {}),
        "headers": headersMap(config.headers),
      },
    },
  });
}

/** One value, a ","-separated string, or an array — all end up a list. */
function toList(value: unknown): string[] {
  const items = Array.isArray(value)
    ? value.map(String)
    : typeof value === "string"
      ? value.split(",")
      : [];

  return items.map((item) => item.trim()).filter(Boolean);
}

/** `{ k: "v" }` → `{ "headers": { "k": "v" } }` — a JSON body wants the real object. */
function headersMap(value: unknown): Record<string, string> {
  if (!value || typeof value !== "object") return {};

  const out: Record<string, string> = {};
  for (const [key, item] of Object.entries(value as Record<string, unknown>)) {
    if (item !== undefined && item !== null && item !== "") out[key] = String(item);
  }

  return out;
}
