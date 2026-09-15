# GENERATED FILE — do not edit.
#
# Emitted from provider/actions/attachment-get.json by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/actions/attachment-get.json (or weaver's template/) and regenerate:
#
# npm run provider -- resend

"""Turn one attachment of a received email into a signed download URL.

GET /emails/receiving/{emailId}/attachments/{attachmentId} —
https://resend.com/docs/api-reference/emails/retrieve-received-email-attachment

This describes the request. `call` resolves the connection, picks the
estate, and either calls Resend or calls the faker.
"""

from __future__ import annotations

from typing import Any
from urllib.parse import quote

from .._runtime import CallResult, ConnectorConfigError, Mode, call
from ..service import descriptor

OPERATION = "attachment_get"
METHOD = "GET"
PATH = "/emails/receiving/{emailId}/attachments/{attachmentId}"
SIDE_EFFECTS = "none"


def body(config: dict[str, Any]) -> dict[str, Any]:
    """Build the JSON body for one call, failing loudly and specifically."""
    if config.get("emailId") is None or config.get("emailId") == "":
        raise ConnectorConfigError(
            "attachment_get: \"emailId\" is required (Email ID)."
        )

    if config.get("attachmentId") is None or config.get("attachmentId") == "":
        raise ConnectorConfigError(
            "attachment_get: \"attachmentId\" is required (Attachment ID)."
        )

    out: dict[str, Any] = {}

    return out



def path(config: dict[str, Any]) -> str:
    """The request path, with each config value URL-ENCODED into it.

    `PATH` above is the TEMPLATE, which is what the descriptor advertises;
    this is what a caller sends. A value interpolated raw changes WHICH URL is
    called — a range like `Sheet1!A:B`, or a sheet named `Q1/Q2` — and the
    provider answers 404 about the document rather than about the encoding.
    """
    return (
        "/emails/receiving/"
        + quote(str(config.get("emailId") or ""), safe="")
        + "/attachments/"
        + quote(str(config.get("attachmentId") or ""), safe="")
    )

def attachment_get(
    config: dict[str, Any],
    *,
    credentials: dict[str, str | None] | None = None,
    mode: Mode = "auto",
    connection_id: str | None = None,
    attempts: int = 3,
) -> CallResult:
    """Turn one attachment of a received email into a signed download URL."""
    return call(
        descriptor(),
        operation=OPERATION,
        method=METHOD,
        path=PATH,
        json_body=body(config),
        config=config,
        credentials=credentials,
        mode=mode,
        connection_id=connection_id,
        attempts=attempts,
    )
