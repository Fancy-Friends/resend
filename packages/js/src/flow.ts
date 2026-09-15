/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/ + triggers/ by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/ + triggers/ (or weaver's template/) and regenerate:
 *
 *     npm run provider -- resend
 */

/**
 * Resend's node kinds with their TypeScript executors attached — for hosts
 * that EXECUTE on TS.
 *
 * The authoring surface in @particle-academy/resend-ui carries no executor:
 * the editor is React on every host, so a PHP or Python project installs the
 * ui package and never this one.
 */

import type { NodeExecutor, NodeKindDefinition } from "@particle-academy/fancy-flow/engine";
import {
  idempotencyKeyFor,
  NO_IDEMPOTENCY_KEY_WARNING,
  resolveConnection,
  triggerEvent,
  type RequestedMode,
} from "@particle-academy/fancy-connector-core";
import { RESEND } from "./service.js";

import {
  resendAttachmentGetKind,
  resendAttachmentListKind,
  resendEmailGetKind,
  resendEmailSendKind,
  resendEmailReceivedTriggerKind,
} from "@particle-academy/resend-ui";

import { resendAttachmentGet } from "./actions/attachment-get.js";
import { resendAttachmentList } from "./actions/attachment-list.js";
import { resendEmailGet } from "./actions/email-get.js";
import { resendEmailSend } from "./actions/email-send.js";
import { RESEND_EMAIL_RECEIVED } from "./triggers/email-received.js";

export const resendAttachmentGetExecutor: NodeExecutor = async (ctx) => {
  const config = ((ctx.node.data as { config?: Record<string, unknown> })?.config ?? {});

  const result = await resendAttachmentGet({
    config,
    input: ctx.inputs?.in,
  });

  ctx.emit({
    type: "log",
    level: "info",
    nodeId: ctx.node.id,
    message: `resend attachment_get ${(result.data as { id?: string })?.id} (${result.mode})`,
  });

  return { __port: "out", value: result };
};

export const resendAttachmentListExecutor: NodeExecutor = async (ctx) => {
  const config = ((ctx.node.data as { config?: Record<string, unknown> })?.config ?? {});

  const result = await resendAttachmentList({
    config,
    input: ctx.inputs?.in,
  });

  ctx.emit({
    type: "log",
    level: "info",
    nodeId: ctx.node.id,
    message: `resend attachment_list ${(result.data as { id?: string })?.id} (${result.mode})`,
  });

  return { __port: "out", value: result };
};

export const resendEmailGetExecutor: NodeExecutor = async (ctx) => {
  const config = ((ctx.node.data as { config?: Record<string, unknown> })?.config ?? {});

  const result = await resendEmailGet({
    config,
    input: ctx.inputs?.in,
  });

  ctx.emit({
    type: "log",
    level: "info",
    nodeId: ctx.node.id,
    message: `resend email_get ${(result.data as { id?: string })?.id} (${result.mode})`,
  });

  return { __port: "out", value: result };
};

export const resendEmailSendExecutor: NodeExecutor = async (ctx) => {
  const config = ((ctx.node.data as { config?: Record<string, unknown> })?.config ?? {});

  // Derived from the RUN and the NODE, never fresh. A retried durable run
  // must send the same key or Resend creates a second one — the exact
  // failure "idempotent" exists to prevent.
  const idempotencyKey = idempotencyKeyFor(ctx, ctx.node.id, {
    context: { service: "resend", operation: "email_send" },
  });
  if (idempotencyKey === null) {
    ctx.emit({
      type: "log",
      level: "warn",
      nodeId: ctx.node.id,
      message: `email_send: ${NO_IDEMPOTENCY_KEY_WARNING}`,
    });
  }

  const result = await resendEmailSend({
    config,
    input: ctx.inputs?.in,
    ...(idempotencyKey === null ? {} : { idempotencyKey }),
  });

  ctx.emit({
    type: "log",
    level: "info",
    nodeId: ctx.node.id,
    message: `resend email_send ${(result.data as { id?: string })?.id} (${result.mode})`,
  });

  return { __port: "out", value: result };
};

export const resendEmailReceivedTriggerExecutor: NodeExecutor = async (ctx) => {
  const config = ((ctx.node.data as { config?: Record<string, unknown> })?.config ?? {});
  const connection = resolveConnection({
    service: RESEND.service,
    operation: "email_received",
    sandbox: RESEND.sandbox,
    baseUrls: RESEND.baseUrls,
    requires: RESEND.requires,
    connectionId: typeof config.connection === "string" ? config.connection : null,
    requested: typeof config.mode === "string" ? (config.mode as RequestedMode) : null,
  });

  const event = triggerEvent(RESEND_EMAIL_RECEIVED, connection, ctx.inputs?.in, config);

  // The run's FIRST step. A Resend delivery only NAMES what arrived, so
  // `email_get` is read before anything downstream runs and published
  // under `email`. A failed read fails the run with the core's
  // classification: a delivery whose read failed must not start a flow
  // that assumes it succeeded. In fake mode the read is faked with the
  // delivery's own values, so the composite has the same shape on the
  // canvas as it does live.
  const thenEmailId = at(event, "data.email_id");
  if (thenEmailId === undefined || thenEmailId === null || thenEmailId === "") {
    throw new Error("email_received: the delivery carries no data.email_id, so email_get cannot run");
  }
  const read = await resendEmailGet({
    config: {
      ...(config.connection === undefined || config.connection === null ? {} : { connection: config.connection }),
      ...(config.mode === undefined || config.mode === null ? {} : { mode: config.mode }),
      emailId: thenEmailId,
    },
    input: event,
  });

  const value = {
    ...(event as Record<string, unknown>),
    email: read.data,
    verdicts: null,
  };

  return { __port: "out", value };
};

/** A dotted path into a delivery; undefined wherever it stops. */
function at(value: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>(
    (v, key) => (v !== null && typeof v === "object" ? (v as Record<string, unknown>)[key] : undefined),
    value,
  );
}

/** The kinds a TypeScript host registers. */
export const RESEND_RUNNABLE_KINDS: NodeKindDefinition[] = [
  { ...resendAttachmentGetKind, executor: resendAttachmentGetExecutor },
  { ...resendAttachmentListKind, executor: resendAttachmentListExecutor },
  { ...resendEmailGetKind, executor: resendEmailGetExecutor },
  { ...resendEmailSendKind, executor: resendEmailSendExecutor },
  { ...resendEmailReceivedTriggerKind, executor: resendEmailReceivedTriggerExecutor },
];
