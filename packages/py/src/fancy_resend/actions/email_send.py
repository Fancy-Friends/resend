# GENERATED FILE — do not edit.
#
# Emitted from provider/actions/email-send.json by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/actions/email-send.json (or weaver's template/) and regenerate:
#
# npm run provider -- resend

"""Send an email through Resend.

POST /emails — https://resend.com/docs/api-reference/emails/send-email

This describes the request. `call` resolves the connection, picks the
estate, and either calls Resend or calls the faker.
"""

from __future__ import annotations

from typing import Any

from .._runtime import CallResult, ConnectorConfigError, Mode, call
from ..service import descriptor

OPERATION = "email_send"
METHOD = "POST"
PATH = "/emails"
SIDE_EFFECTS = "idempotent"


def body(config: dict[str, Any]) -> dict[str, Any]:
    """Build the JSON body for one call, failing loudly and specifically."""
    if config.get("from") is None or config.get("from") == "":
        raise ConnectorConfigError(
            "email_send: \"from\" is required (From)."
        )

    if config.get("to") is None or config.get("to") == "":
        raise ConnectorConfigError(
            "email_send: \"to\" is required (To)."
        )

    if not (
        (config.get("html") is not None and config.get("html") != "")
        or (config.get("text") is not None and config.get("text") != "")
    ):
        raise ConnectorConfigError(
            "email_send: needs an \"html\" or \"text\" body — an empty email is never intended."
        )

    out: dict[str, Any] = {}
    _value = config.get("from")
    if _value is None or _value == "":
        raise ConnectorConfigError("email_send: \"from\" is required.")

    out["from"] = str(_value)
    _value = config.get("to")
    out["to"] = _to_list(config.get("to"))
    _value = config.get("subject")
    out["subject"] = str(_value) if _value is not None and _value != "" else ""
    _value = config.get("html")
    if _value is not None and _value != "":
        out["html"] = str(_value)
    _value = config.get("text")
    if _value is not None and _value != "":
        out["text"] = str(_value)
    _value = config.get("replyTo")
    if _value is not None and _value != "":
        out["reply_to"] = str(_value)
    out["headers"] = _headers_map(config.get("headers"))

    return out


def email_send(
    config: dict[str, Any],
    *,
    credentials: dict[str, str | None] | None = None,
    mode: Mode = "auto",
    connection_id: str | None = None,
    # Derived from the run and the step, never fresh. A retried durable run must
    # send the same key or Resend creates a second one.
    idempotency_key: str | None = None,
    attempts: int = 3,
) -> CallResult:
    """Send an email through Resend."""
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
        idempotency_key=idempotency_key,
        attempts=attempts,
    )


def _to_list(value: Any) -> list[str]:
    """One value, a ","-separated string, or a list — all end up a list."""
    if isinstance(value, list):
        items = [str(item) for item in value]
    elif isinstance(value, str):
        items = value.split(",")
    else:
        return []

    return [item.strip() for item in items if item.strip()]

def _headers_map(value: Any) -> dict[str, str]:
    """A JSON body wants the real nested object, not a JSON string."""
    if not isinstance(value, dict):
        return {}

    return {str(k): str(v) for k, v in value.items() if v is not None and v != ""}