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
 * The Resend faker.
 *
 * Shapes, not behaviour: the goal is that a downstream node sees the field
 * NAMES Resend actually publishes, so an author can wire {{ $json.data.id }}
 * against a fake and have it keep working against the real thing.
 *
 * Deterministic — same inputs, same output. A faker returning a fresh uuid
 * every call cannot be asserted on, so its fixtures degrade to "it did not
 * throw", which is the assertion that catches nothing.
 */

import type { ConnectorFaker, FakeRequest } from "@particle-academy/fancy-connector-core";

function fakeAttachmentGet({ config, fake }: FakeRequest): unknown {
  return {
    "object": "attachment",
    "id": (config.attachmentId !== undefined && config.attachmentId !== null && config.attachmentId !== "" ? String(config.attachmentId) : `${fake.hex(8)}-${fake.hex(4)}-${fake.hex(4)}-${fake.hex(4)}-${fake.hex(12)}`),
    "filename": "avatar.png",
    "size": 4096,
    "content_type": "image/png",
    "content_disposition": "inline",
    "content_id": "img001",
    "download_url": "https://inbound-cdn.resend.com/4ef9a417-02e9-4d39-ad75-9611e0fcc33c/attachments/2a0c9ce0-3112-4728-976e-47ddcd16a318?signature=fake",
    "expires_at": "2026-10-17T14:29:41.521Z",
  };
}

function fakeAttachmentList({ config, fake }: FakeRequest): unknown {
  return {
    "object": "list",
    "has_more": false,
    "data": [
      {
        "id": `${fake.hex(8)}-${fake.hex(4)}-${fake.hex(4)}-${fake.hex(4)}-${fake.hex(12)}`,
        "filename": "avatar.png",
        "size": 4096,
        "content_type": "image/png",
        "content_disposition": "inline",
        "content_id": "img001",
        "download_url": "https://inbound-cdn.resend.com/4ef9a417-02e9-4d39-ad75-9611e0fcc33c/attachments/2a0c9ce0-3112-4728-976e-47ddcd16a318?signature=fake",
        "expires_at": "2026-10-17T14:29:41.521Z",
      },
    ],
  };
}

function fakeEmailGet({ config, fake }: FakeRequest): unknown {
  return {
    "object": "email",
    "id": (config.emailId !== undefined && config.emailId !== null && config.emailId !== "" ? String(config.emailId) : `${fake.hex(8)}-${fake.hex(4)}-${fake.hex(4)}-${fake.hex(4)}-${fake.hex(12)}`),
    "to": [
      "inbox@yourdomain.test",
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
      "mime-version": "1.0",
    },
    "bcc": [],
    "cc": [],
    "reply_to": [],
    "received_for": [],
    "message_id": "<111-222-333@email.example.test>",
    "raw": {
      "download_url": "https://example.resend.com/receiving/raw/054da427-439a-4e91-b785-e4fb1966285f?Signature=fake",
      "expires_at": "2026-09-15T13:00:11.894Z",
    },
    "attachments": [
      {
        "id": `${fake.hex(8)}-${fake.hex(4)}-${fake.hex(4)}-${fake.hex(4)}-${fake.hex(12)}`,
        "filename": "avatar.png",
        "content_type": "image/png",
        "content_disposition": "inline",
        "content_id": "img001",
        "size": 4096,
      },
    ],
  };
}

function fakeEmailSend({ config, fake }: FakeRequest): unknown {
  return {
    "id": `${fake.hex(8)}-${fake.hex(4)}-${fake.hex(4)}-${fake.hex(4)}-${fake.hex(12)}`,
  };
}

function fakeEmailReceived({ config, fake }: FakeRequest): unknown {
  const boundEmailid = `${fake.hex(8)}-${fake.hex(4)}-${fake.hex(4)}-${fake.hex(4)}-${fake.hex(12)}`;

  return {
    "type": "email.received",
    "created_at": "2026-09-15T12:00:12.126Z",
    "data": {
      "email_id": boundEmailid,
      "created_at": "2026-09-15T12:00:11.894Z",
      "from": "ada@example.test",
      "to": [
        "inbox@yourdomain.test",
      ],
      "bcc": [],
      "cc": [],
      "received_for": [],
      "message_id": "<111-222-333@email.example.test>",
      "subject": "Sending this example",
      "attachments": [
        {
          "id": `${fake.hex(8)}-${fake.hex(4)}-${fake.hex(4)}-${fake.hex(4)}-${fake.hex(12)}`,
          "filename": "avatar.png",
          "content_type": "image/png",
          "content_disposition": "inline",
          "content_id": "img001",
        },
      ],
    },
  };
}

export const resendFaker: ConnectorFaker = (operation, request) => {
  switch (operation) {
    case "attachment_get":
      return fakeAttachmentGet(request);

    case "attachment_list":
      return fakeAttachmentList(request);

    case "email_get":
      return fakeEmailGet(request);

    case "email_send":
      return fakeEmailSend(request);

    case "email_received":
      return fakeEmailReceived(request);

    default:
      // A faker asked for an operation it has no shape for must SAY so. Making
      // something up would produce a green run whose output silently has none
      // of the fields the author is about to reference.
      throw new Error(
        `resend: no fake response is defined for "${operation}". ` +
          "Add a fixture under provider/fixtures/ and regenerate — a connector without a faker " +
          "cannot be developed against, tested, or demonstrated.",
      );
  }
};
