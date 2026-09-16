# GENERATED FILE — do not edit.
#
# Emitted from provider/fixtures/ by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/fixtures/ (or weaver's template/) and regenerate:
#
# npm run provider -- resend

"""The Resend faker.

Bit-for-bit identical to the TypeScript and PHP fakers: the same FNV-1a seed
and the same xorshift32 sequence, so a golden fixture asserts the exact
faked payload and ALL THREE runtimes have to produce it. That turns the
faker into a parity test rather than a convenience — which matters, because
cross-runtime drift does not fail loudly. It completes, down one path, with
no error.
"""

from __future__ import annotations

from typing import Any

from ._fake import FakeValues


def _as_number(value: Any) -> float | None:
    """The coercion an `"as": "integer" | "number"` config binding uses: a value
    that IS a number, never int(float(...))'s uncaught ValueError on one that
    merely looks like text (a text field's auto-generated example, before an
    author has typed a real one).
    """
    try:
        return float(value)
    except (TypeError, ValueError):
        return None


def _attachment_get(config: dict[str, Any], fake: FakeValues) -> Any:
    return {
        "object": "attachment",
        "id": (
            str(_v)
            if (_v := config.get("attachmentId")) is not None and _v != ""
            else "-".join([fake.hex(8), fake.hex(4), fake.hex(4), fake.hex(4), fake.hex(12)])
        ),
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


def _attachment_list(config: dict[str, Any], fake: FakeValues) -> Any:
    return {
        "object": "list",
        "has_more": False,
        "data": [
            {
                "id": "-".join(
                    [fake.hex(8), fake.hex(4), fake.hex(4), fake.hex(4), fake.hex(12)]
                ),
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


def _email_get(config: dict[str, Any], fake: FakeValues) -> Any:
    return {
        "object": "email",
        "id": (
            str(_v)
            if (_v := config.get("emailId")) is not None and _v != ""
            else "-".join([fake.hex(8), fake.hex(4), fake.hex(4), fake.hex(4), fake.hex(12)])
        ),
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
                "id": "-".join(
                    [fake.hex(8), fake.hex(4), fake.hex(4), fake.hex(4), fake.hex(12)]
                ),
                "filename": "avatar.png",
                "content_type": "image/png",
                "content_disposition": "inline",
                "content_id": "img001",
                "size": 4096,
            },
        ],
    }


def _email_send(config: dict[str, Any], fake: FakeValues) -> Any:
    return {
        "id": "-".join([fake.hex(8), fake.hex(4), fake.hex(4), fake.hex(4), fake.hex(12)]),
    }


def _email_received(config: dict[str, Any], fake: FakeValues) -> Any:
    bound_emailid = "-".join([fake.hex(8), fake.hex(4), fake.hex(4), fake.hex(4), fake.hex(12)])

    return {
        "type": "email.received",
        "created_at": "2026-09-15T12:00:12.126Z",
        "data": {
            "email_id": bound_emailid,
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
                    "id": "-".join(
                        [fake.hex(8), fake.hex(4), fake.hex(4), fake.hex(4), fake.hex(12)]
                    ),
                    "filename": "avatar.png",
                    "content_type": "image/png",
                    "content_disposition": "inline",
                    "content_id": "img001",
                },
            ],
        },
    }


def respond(operation: str, request: dict[str, Any]) -> Any:
    """Dispatch to the fixture for one operation."""
    config: dict[str, Any] = request.get("config") or {}
    fake: FakeValues = request["fake"]

    if operation == "attachment_get":
        return _attachment_get(config, fake)

    if operation == "attachment_list":
        return _attachment_list(config, fake)

    if operation == "email_get":
        return _email_get(config, fake)

    if operation == "email_send":
        return _email_send(config, fake)

    if operation == "email_received":
        return _email_received(config, fake)

    # A faker asked for an operation it has no shape for must SAY so. Making
    # something up would produce a green run whose output silently has none of
    # the fields the author is about to reference.
    raise ValueError(
        f'resend: no fake response is defined for "{operation}". '
        "Add a fixture under provider/fixtures/ and regenerate — a connector without a faker "
        "cannot be developed against, tested, or demonstrated."
    )
