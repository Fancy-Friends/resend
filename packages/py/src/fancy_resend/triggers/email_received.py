# GENERATED FILE — do not edit.
#
# Emitted from provider/triggers/email-received.json by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/triggers/email-received.json (or weaver's template/) and
# regenerate:
#
# npm run provider -- resend

"""Resend's webhook trigger — the delivery contract.

Kept beside the service descriptor rather than inside a node, because a
signature scheme is a fact about RESEND.
"""

from __future__ import annotations

from typing import Any

from .._runtime import Verification, verify_hmac
from ..faker import respond
from ..service import SERVICE

OPERATION = "email_received"
DELIVERY = "webhook"
SETUP = (
    "Point a receiving domain's MX record at Resend, then in the Resend dashboard (Webhooks → "
    "Add webhook) point an endpoint at the route your host mounts for this trigger and "
    "subscribe it to email.received. Put the endpoint's signing secret -- shown as whsec_… -- "
    "on the connection as `webhookSecret`, exactly as shown."
)

# The read the trigger runs FIRST — a Resend delivery only names what arrived.
THEN: dict[str, Any] = {
    "action": "email_get",
    "using": {"emailId": "data.email_id"},
    "as": "email",
    "also": {"verdicts": None},
}
SIGNATURE_HEADER = "svix-signature"
TIMESTAMP_HEADER = "svix-timestamp"
# The delivery's id is part of the signed content; a delivery without it is refused.
ID_HEADER = "svix-id"
ALGORITHM = "sha256"
SIGNATURE_ENCODING = "base64"
# How the SECRET is spelled — a base64 secret is decoded to key bytes before
# signing. Not a secret itself, whatever S105 reads into the name.
SECRET_ENCODING = "base64"  # noqa: S105
SECRET_PREFIX = "whsec_"  # noqa: S105

# The provider's documented replay window, in seconds.
TOLERANCE = 300

# WHICH credential holds the signing secret — a field name, not a secret.
# S105 reads any string assigned to a *_CREDENTIAL name as a hardcoded
# password; here the value is the key to look up on the connection.
SECRET_CREDENTIAL = "webhookSecret"  # noqa: S105


def parse_signature(raw: str) -> tuple[list[str], str | None]:
    """Split `v1,…` into (signatures, timestamp).
    
    EVERY signature the header carries is collected, and the delivery passes
    when ANY matches: a provider rolling a secret signs once per active secret,
    and a first-only rule refused the whole roll as a wrong secret.
    
    `v1,<base64> v1,<base64>` -- several during a secret rotation, and Svix says
    yours must match ONE of them. Every `v1` is offered to the verifier; the
    first-only rule that Stripe's header once carried refused a whole roll.
    """
    signatures: list[str] = []
    timestamp: str | None = None

    for part in raw.split(" "):
        pair = part.strip().split(",", 1)
        if len(pair) != 2:
            continue

        if pair[0] == "v1":
            signatures.append(pair[1])

    return signatures, timestamp


def _header(headers: dict[str, str], name: str) -> str | None:
    """One header, case-insensitively — proxies do not preserve case."""
    return next((v for k, v in headers.items() if k.lower() == name.lower()), None)


def signed_payload(raw: str, timestamp: str | None, delivery_id: str | None = None) -> str:
    """The exact bytes Resend signs."""
    return f"{delivery_id or ''}.{timestamp or ''}.{raw}"


def verify_delivery(
    raw: str,
    headers: dict[str, str],
    webhooksecret: str | None,
    now: int | None = None,
) -> Verification:
    """Verify one inbound Resend delivery.
    
    The host calls this BEFORE starting a run, with the body exactly as
    received. Re-serialised JSON changes key order and whitespace and produces a
    mismatch that looks precisely like a wrong secret — hours of debugging the
    wrong thing.
    """
    header = _header(headers, SIGNATURE_HEADER)
    signatures, timestamp = parse_signature(header) if header else ([], None)
    if timestamp is None:
        timestamp = _header(headers, TIMESTAMP_HEADER)
    # The id is part of the signed content: a delivery without it is refused by
    # name, never signed with a hole in it.
    delivery_id = _header(headers, ID_HEADER)
    if not delivery_id:
        return Verification(ok=False, reason="delivery carried no id header")

    return verify_hmac(
        raw=raw,
        signature=signatures,
        secret=webhooksecret,
        payload=signed_payload,
        algorithm=ALGORITHM,
        encoding=SIGNATURE_ENCODING,
        tolerance=TOLERANCE,
        timestamp=timestamp,
        now=now,
        secret_encoding=SECRET_ENCODING,
        secret_prefix=SECRET_PREFIX,
        id=delivery_id,
    )


def sample_event(config: dict[str, Any] | None = None) -> Any:
    """A faked sample event, so the trigger is runnable before any of the setup
    above.
    
    An author can see the real field names and wire the downstream nodes against
    them before the provider has ever been contacted.
    """
    from .._fake import FakeValues, seed_for_call

    resolved = config or {}
    fake = FakeValues(seed_for_call(SERVICE, OPERATION, resolved))

    event = respond(OPERATION, {"config": resolved, "fake": fake})

    # The run's FIRST step, as the executors do it: email_get with the
    # delivery's own values, published under "email". A delivery only names
    # what arrived.
    read_config: dict[str, Any] = {
        key: resolved[key] for key in ("connection", "mode") if resolved.get(key) is not None
    }
    read_config["emailId"] = _at(event, "data.email_id")
    read_fake = FakeValues(seed_for_call(SERVICE, THEN["action"], read_config))
    read = respond(THEN["action"], {"config": read_config, "fake": read_fake})

    return {
        **event,
        "email": read,
        "verdicts": None,
    }


def _at(value: Any, path: str) -> Any:
    """A dotted path into a delivery; None wherever it stops."""
    for key in path.split("."):
        if not isinstance(value, dict):
            return None
        value = value.get(key)
    return value
