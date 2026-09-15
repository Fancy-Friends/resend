# GENERATED FILE — do not edit.
#
# Emitted from provider/fixtures/ by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/fixtures/ (or weaver's template/) and regenerate:
#
# npm run provider -- resend

"""The golden fixtures — the SAME values the TypeScript and PHP packages
assert.

Bit-for-bit identical is the claim, and this is what checks it for Python.
Cross-runtime drift does not fail loudly on its own: it completes, down one
path, with no error.
"""

import pytest

from fancy_resend._fake import FakeValues, seed_for_call
from fancy_resend.faker import respond


def test_attachment_get_fakes_the_published_shape() -> None:
    config = {}
    fake = FakeValues(seed_for_call("resend", "attachment_get", config))

    faked = respond("attachment_get", {"config": config, "fake": fake})

    assert faked == {
        "object": "attachment",
        "id": "4d5c5b85-03bf-aed3-8752-ca5edf9e240f",
        "filename": "avatar.png",
        "size": 4096,
        "content_type": "image/png",
        "content_disposition": "inline",
        "content_id": "img001",
        "download_url": (
                            "https://inbound-cdn.resend.com/4ef9a417-02e9-4d39-ad75-9611e0fc"
                            "c33c/attachments/2a0c9ce0-3112-4728-976e-47ddcd16a318?signature"
                            "=fake"
                        ),
        "expires_at": "2026-10-17T14:29:41.521Z",
    }


def test_attachment_list_fakes_the_published_shape() -> None:
    config = {}
    fake = FakeValues(seed_for_call("resend", "attachment_list", config))

    faked = respond("attachment_list", {"config": config, "fake": fake})

    assert faked == {
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
                                    "https://inbound-cdn.resend.com/4ef9a417-02e9-4d39-ad75-"
                                    "9611e0fcc33c/attachments/2a0c9ce0-3112-4728-976e-47ddcd"
                                    "16a318?signature=fake"
                                ),
                "expires_at": "2026-10-17T14:29:41.521Z",
            },
        ],
    }


def test_email_get_fakes_the_published_shape() -> None:
    config = {}
    fake = FakeValues(seed_for_call("resend", "email_get", config))

    faked = respond("email_get", {"config": config, "fake": fake})

    assert faked == {
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
                                "https://example.resend.com/receiving/raw/054da427-439a-4e91"
                                "-b785-e4fb1966285f?Signature=fake"
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
    }


def test_email_send_fakes_the_published_shape() -> None:
    config = {}
    fake = FakeValues(seed_for_call("resend", "email_send", config))

    faked = respond("email_send", {"config": config, "fake": fake})

    assert faked == {
        "id": "bcbfbc06-2cd4-91e0-f2ac-2bb0911a0bea",
    }


def test_email_received_fakes_the_published_shape() -> None:
    config = {}
    fake = FakeValues(seed_for_call("resend", "email_received", config))

    faked = respond("email_received", {"config": config, "fake": fake})

    assert faked == {
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
    }


def test_an_operation_with_no_fixture_raises_rather_than_inventing_a_shape() -> None:
    fake = FakeValues(seed_for_call("resend", "no_such_operation", {}))

    with pytest.raises(ValueError, match="no fake response"):
        respond("no_such_operation", {"config": {}, "fake": fake})
