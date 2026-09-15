/*
 * Resend — the published npm packages.
 *
 * GENERATED — do not edit. Fix weaver's template/ and regenerate.
 *
 * This runs against the PUBLISHED package, installed by name from the
 * registry into a project that has never seen this repo. Every other test
 * here imports from ../src and therefore cannot see the packaging.
 */

import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { resendFaker } from "@particle-academy/resend-js";
import { RESEND_KINDS } from "@particle-academy/resend-ui";
import { fakeRequest } from "@particle-academy/fancy-connector-core";

/*
 * WHERE did that come from?
 *
 * Node resolves a bare specifier from the importing MODULE's directory, not
 * the working directory. So running this script across from a checkout
 * resolves out of the REPO's node_modules and silently tests the source
 * again — which it did, and passed, before CI caught it.
 *
 * Two things are checked, because neither is enough alone: that the package
 * came from an INSTALL rather than from source, and that this script is not
 * sitting inside the provider repo it is supposed to be testing.
 */
const resolved = import.meta.resolve("@particle-academy/resend-js");
const here = dirname(fileURLToPath(import.meta.url));

assert.ok(
  !existsSync(join(here, "..", "packages", "js", "package.json")),
  `${here} is inside the provider repo, so a bare import resolves the repo's ` +
    "own node_modules. Copy this script into a project that installed the " +
    "published package and run it there.",
);
assert.match(resolved, /node_modules/, `resolved ${resolved}, which is not an installed package`);
console.log(`  ok   resolved from ${resolved}`);

const GOLDENS = [
  {
    "operation": "attachment_get",
    "config": {},
    "expected": {
      "object": "attachment",
      "id": "4d5c5b85-03bf-aed3-8752-ca5edf9e240f",
      "filename": "avatar.png",
      "size": 4096,
      "content_type": "image/png",
      "content_disposition": "inline",
      "content_id": "img001",
      "download_url": "https://inbound-cdn.resend.com/4ef9a417-02e9-4d39-ad75-9611e0fcc33c/attachments/2a0c9ce0-3112-4728-976e-47ddcd16a318?signature=fake",
      "expires_at": "2026-10-17T14:29:41.521Z"
    }
  },
  {
    "operation": "attachment_list",
    "config": {},
    "expected": {
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
    }
  },
  {
    "operation": "email_get",
    "config": {},
    "expected": {
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
    }
  },
  {
    "operation": "email_send",
    "config": {},
    "expected": {
      "id": "bcbfbc06-2cd4-91e0-f2ac-2bb0911a0bea"
    }
  },
  {
    "operation": "email_received",
    "config": {},
    "expected": {
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
    }
  }
];

for (const { operation, config, expected } of GOLDENS) {
  const faked = resendFaker(operation, fakeRequest("resend", operation, config));

  assert.deepEqual(
    faked,
    expected,
    `the PUBLISHED package produced different bytes for ${operation} than the repo does`,
  );
  console.log(`  ok   ${operation}`);
}

// The ui package is a separate tarball, and js depends on it by its
// published name — so this also proves that dependency resolves.
assert.equal(RESEND_KINDS.length, 5);
for (const kind of RESEND_KINDS) {
  const keys = kind.configSchema.map((field) => field.key);
  assert.equal(keys[0], "connection");
  assert.equal(keys[1], "mode");
  assert.ok(kind.outputShape.length > 0, `${kind.name} declares no output shape`);
}
console.log(`  ok   ui kinds resolve from ${"@particle-academy/resend-ui"}`);

console.log(`\n  ${GOLDENS.length} operations verified against the published packages.`);
