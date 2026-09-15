"""
Resend — the published PyPI wheel.

GENERATED — do not edit. Fix weaver's template/ and regenerate.

Runs against the PUBLISHED wheel, installed by name into a fresh venv.
Every other test here imports from ../src and cannot see the packaging —
a missing py.typed or an unshipped module passes there and breaks for
every user.
"""

from importlib.metadata import requires

from fancy_resend._fake import FakeValues, seed_for_call
from fancy_resend.faker import respond

GOLDENS = [
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
            "download_url": (
                                "https://inbound-cdn.resend.com/4ef9a417-02e9-4d39-ad75-9611"
                                "e0fcc33c/attachments/2a0c9ce0-3112-4728-976e-47ddcd16a318?s"
                                "ignature=fake"
                            ),
            "expires_at": "2026-10-17T14:29:41.521Z",
        },
    },
    {
        "operation": "attachment_list",
        "config": {},
        "expected": {
            "object": "list",
            "has_more": False,
            "data": [
                {
                    "id": "38bf1686-9798-4b7f-33db-a1397c815b8a",
                    "filename": "avatar.png",
                    "size": 4096,
                    "content_type": "image/png",
                    "content_disposition": "inline",
                    "content_id": "img001",
                    "download_url": (
                                        "https://inbound-cdn.resend.com/4ef9a417-02e9-4d39-a"
                                        "d75-9611e0fcc33c/attachments/2a0c9ce0-3112-4728-976"
                                        "e-47ddcd16a318?signature=fake"
                                    ),
                    "expires_at": "2026-10-17T14:29:41.521Z",
                },
            ],
        },
    },
    {
        "operation": "email_get",
        "config": {},
        "expected": {
            "object": "email",
            "id": "03782c4e-d8cc-67ae-494d-a59f39ab17e5",
            "to": [
                "inbox@yourdomain.test",
            ],
            "from": "ada@example.test",
            "created_at": "2026-09-15T12:00:11.894Z",
            "subject": "Sending this example",
            "html": "Congrats on receiving your <strong>first email</strong>!",
            "html_format": "data_uri",
            "text": None,
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
                "download_url": (
                                    "https://example.resend.com/receiving/raw/054da427-439a-"
                                    "4e91-b785-e4fb1966285f?Signature=fake"
                                ),
                "expires_at": "2026-09-15T13:00:11.894Z",
            },
            "attachments": [
                {
                    "id": "db5dad5f-b039-6a53-3792-0331f64b82e9",
                    "filename": "avatar.png",
                    "content_type": "image/png",
                    "content_disposition": "inline",
                    "content_id": "img001",
                    "size": 4096,
                },
            ],
        },
    },
    {
        "operation": "email_send",
        "config": {},
        "expected": {
            "id": "bcbfbc06-2cd4-91e0-f2ac-2bb0911a0bea",
        },
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
                    "inbox@yourdomain.test",
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
                        "content_id": "img001",
                    },
                ],
            },
        },
    },
]


def main() -> None:
    # Zero runtime dependencies is a design constraint, checked on the
    # INSTALLED distribution rather than on the pyproject that claimed it.
    declared = requires("fancy-resend")
    assert not declared, f"expected no runtime dependencies, got {declared}"
    print("  ok   zero runtime dependencies on the installed distribution")

    for golden in GOLDENS:
        operation, config = golden["operation"], golden["config"]
        fake = FakeValues(seed_for_call("resend", operation, config))
        faked = respond(operation, {"config": config, "fake": fake})

        assert faked == golden["expected"], (
            f"the PUBLISHED wheel produced different bytes for {operation} than the repo does"
        )
        print(f"  ok   {operation}")

    print(f"\n  {len(GOLDENS)} operations verified against the published wheel.")


if __name__ == "__main__":
    main()
