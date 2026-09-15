/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/fixtures/ by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/fixtures/ (or weaver's template/) and regenerate:
 *
 *     npm run provider -- resend
 */

/**
 * The golden fixtures.
 *
 * Deterministic on purpose: the same seed produces the same bytes in
 * TypeScript, PHP and Python, so this file and its twins in the other packages
 * assert the SAME values. That turns the faker into a parity test rather than
 * a convenience — which matters, because cross-runtime drift does not fail
 * loudly. It completes, down one path, with no error.
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { fakeRequest } from "@particle-academy/fancy-connector-core";

import { resendFaker } from "../src/faker.js";

test("attachment_get fakes the shape Resend publishes", () => {
  const config = {};

  const faked = resendFaker("attachment_get", fakeRequest("resend", "attachment_get", config));

  assert.deepEqual(faked, {
    "object": "attachment",
    "id": "4d5c5b85-03bf-aed3-8752-ca5edf9e240f",
    "filename": "avatar.png",
    "size": 4096,
    "content_type": "image/png",
    "content_disposition": "inline",
    "content_id": "img001",
    "download_url": "https://inbound-cdn.resend.com/4ef9a417-02e9-4d39-ad75-9611e0fcc33c/attachments/2a0c9ce0-3112-4728-976e-47ddcd16a318?signature=fake",
    "expires_at": "2026-10-17T14:29:41.521Z"
  });
});

test("attachment_list fakes the shape Resend publishes", () => {
  const config = {};

  const faked = resendFaker("attachment_list", fakeRequest("resend", "attachment_list", config));

  assert.deepEqual(faked, {
    "object": "list",
    "has_more": false,
    "data": [
      {
        "id": "38bf1686-9798-4b7f-33db-a1397c815b8a",
        "filename": "avatar.png",
        "size": 4096,
        "content_type": "image/png",
        "content_disposition": "inline",
        "content_id": "img001",
        "download_url": "https://inbound-cdn.resend.com/4ef9a417-02e9-4d39-ad75-9611e0fcc33c/attachments/2a0c9ce0-3112-4728-976e-47ddcd16a318?signature=fake",
        "expires_at": "2026-10-17T14:29:41.521Z"
      }
    ]
  });
});

test("email_get fakes the shape Resend publishes", () => {
  const config = {};

  const faked = resendFaker("email_get", fakeRequest("resend", "email_get", config));

  assert.deepEqual(faked, {
    "object": "email",
    "id": "03782c4e-d8cc-67ae-494d-a59f39ab17e5",
    "to": [
      "inbox@yourdomain.test"
    ],
    "from": "ada@example.test",
    "created_at": "2026-09-15T12:00:11.894Z",
    "subject": "Sending this example",
    "html": "Congrats on receiving your <strong>first email</strong>!",
    "html_format": "data_uri",
    "text": null,
    "headers": {
      "from": "Ada Lovelace <ada@example.test>",
      "return-path": "ada@example.test",
      "mime-version": "1.0"
    },
    "bcc": [],
    "cc": [],
    "reply_to": [],
    "received_for": [],
    "message_id": "<111-222-333@email.example.test>",
    "raw": {
      "download_url": "https://example.resend.com/receiving/raw/054da427-439a-4e91-b785-e4fb1966285f?Signature=fake",
      "expires_at": "2026-09-15T13:00:11.894Z"
    },
    "attachments": [
      {
        "id": "db5dad5f-b039-6a53-3792-0331f64b82e9",
        "filename": "avatar.png",
        "content_type": "image/png",
        "content_disposition": "inline",
        "content_id": "img001",
        "size": 4096
      }
    ]
  });
});

test("email_send fakes the shape Resend publishes", () => {
  const config = {};

  const faked = resendFaker("email_send", fakeRequest("resend", "email_send", config));

  assert.deepEqual(faked, {
    "id": "bcbfbc06-2cd4-91e0-f2ac-2bb0911a0bea"
  });
});

test("email_received fakes the shape Resend publishes", () => {
  const config = {};

  const faked = resendFaker("email_received", fakeRequest("resend", "email_received", config));

  assert.deepEqual(faked, {
    "type": "email.received",
    "created_at": "2026-09-15T12:00:12.126Z",
    "data": {
      "email_id": "641e64e0-b8c4-b6d7-baee-092374d69089",
      "created_at": "2026-09-15T12:00:11.894Z",
      "from": "ada@example.test",
      "to": [
        "inbox@yourdomain.test"
      ],
      "bcc": [],
      "cc": [],
      "received_for": [],
      "message_id": "<111-222-333@email.example.test>",
      "subject": "Sending this example",
      "attachments": [
        {
          "id": "344f752a-87a1-170a-80ec-d7663b0810e1",
          "filename": "avatar.png",
          "content_type": "image/png",
          "content_disposition": "inline",
          "content_id": "img001"
        }
      ]
    }
  });
});

test("an operation with no fixture throws rather than inventing a shape", () => {
  assert.throws(() => resendFaker("no_such_operation", fakeRequest("resend", "no_such_operation", {})), /no fake response/);
});
