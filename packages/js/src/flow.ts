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
  resendEmailSendKind,
} from "@particle-academy/resend-ui";

import { resendEmailSend } from "./actions/email-send.js";

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

/** The kinds a TypeScript host registers. */
export const RESEND_RUNNABLE_KINDS: NodeKindDefinition[] = [
  { ...resendEmailSendKind, executor: resendEmailSendExecutor },
];
