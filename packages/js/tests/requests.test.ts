/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/ by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/ (or weaver's template/) and regenerate:
 *
 *     npm run provider -- resend
 */

/**
 * What Resend actually receives.
 *
 * Every assertion below is about the request rather than the response, and
 * none of it touches the network: the transport is a stub that records what it
 * was handed.
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import type { PreparedRequest } from "@particle-academy/fancy-connector-core";

import { resendEmailSend } from "../src/actions/email-send.js";

/** Capture the prepared request instead of sending it. */
function capture() {
  const seen: PreparedRequest[] = [];

  return {
    seen,
    transport: async (request: PreparedRequest) => {
      seen.push(request);

      return { status: 200, body: JSON.stringify({ id: "captured" }), headers: {} };
    },
  };
}

const CREDENTIALS = {
  "apiKey": "test_apiKey"
};

test("email_send sends POST /emails", async () => {
  const { seen, transport } = capture();

  await resendEmailSend({
    config: {
      "from": "example-from",
      "to": "to-one, to-two",
      "subject": "example-subject",
      "html": "example-html",
      "text": "example-text",
      "replyTo": "example-replyTo",
      "headers": {
        "order_id": "7"
      }
    },
    credentials: CREDENTIALS,
    mode: "live",
    transport,
  });

  assert.equal(seen.length, 1);
  assert.equal(seen[0]!.method, "POST");
  assert.ok(new URL(seen[0]!.url).pathname.endsWith("/emails"), seen[0]!.url);

  assert.deepEqual(JSON.parse(String(seen[0]!.body ?? "{}")), {
    "from": "example-from",
    "to": [
      "to-one",
      "to-two"
    ],
    "subject": "example-subject",
    "html": "example-html",
    "text": "example-text",
    "reply_to": "example-replyTo",
    "headers": {
      "order_id": "7"
    }
  });
});

test("the credential is placed the way the provider wants it", async () => {
  const { seen, transport } = capture();

  await resendEmailSend({
    config: {
      "from": "example-from",
      "to": "to-one, to-two",
      "subject": "example-subject",
      "html": "example-html",
      "text": "example-text",
      "replyTo": "example-replyTo",
      "headers": {
        "order_id": "7"
      }
    },
    credentials: CREDENTIALS,
    mode: "live",
    transport,
  });

  assert.equal(seen[0]!.headers.Authorization, "Bearer test_apiKey");
});

/**
 * The idempotency key reaches the provider.
 *
 * This header is what makes `unsafe-to-replay` survivable rather than merely
 * declared: a retried durable run sends the SAME key, so the provider returns
 * the original result instead of creating a second one. A key the request
 * quietly drops shows up as a double charge.
 */
test("the Idempotency-Key header carries the key", async () => {
  const { seen, transport } = capture();

  await resendEmailSend({
    config: {
      "from": "example-from",
      "to": "to-one, to-two",
      "subject": "example-subject",
      "html": "example-html",
      "text": "example-text",
      "replyTo": "example-replyTo",
      "headers": {
        "order_id": "7"
      }
    },
    credentials: CREDENTIALS,
    mode: "live",
    idempotencyKey: "run-1:node-a",
    transport,
  });

  assert.equal(seen[0]!.headers["Idempotency-Key"], "run-1:node-a");
});

test("a missing required field is refused BEFORE anything is sent", async () => {
  // Nothing was attempted, so there is nothing to classify — and the message names
  // the field, rather than letting the provider answer three frames later with
  // "invalid request".
  const { seen, transport } = capture();

  await assert.rejects(
    resendEmailSend({
      config: {
        "to": "to-one, to-two",
        "subject": "example-subject",
        "html": "example-html",
        "text": "example-text",
        "replyTo": "example-replyTo",
        "headers": {
          "order_id": "7"
        }
      },
      credentials: CREDENTIALS,
      mode: "live",
      transport,
    }),
    new RegExp("from"),
  );

  assert.equal(seen.length, 0, "the request must not have been sent");
});
