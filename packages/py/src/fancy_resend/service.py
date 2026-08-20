# GENERATED FILE — do not edit.
#
# Emitted from provider/manifest.json by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/manifest.json (or weaver's template/) and regenerate:
#
# npm run provider -- resend

"""Resend, as one service descriptor shared by every Resend operation.

The Python twin of the js and php packages' service modules.

## The sandbox trap, written down where it is used

Resend has NO test estate, and somebody checked. Its simulator RECIPIENTS --
delivered@resend.dev, bounced@resend.dev, complained@resend.dev,
suppressed@resend.dev -- are not one: the send is real, it is billed, and it
counts against the quota. Modelling them as a sandbox would put a live send
behind a control labelled "test", so `mode` does not offer sandbox at all
and `fake` is the primary development mode rather than the fallback.
"""

from __future__ import annotations

from ._runtime import PreparedRequest, ServiceDescriptor
from .faker import respond

# The connector API version this package was GENERATED against. A literal,
# never imported: an imported constant lets an upgrade rewrite the very claim
# it exists to detect, after which the copy agrees with itself forever.
CONNECTOR_API_VERSION = 1

SERVICE = "resend"
TITLE = "Resend"
SANDBOX = "none"
BASE_URLS = {
    "live": "https://api.resend.com",
}

"""Credential keys a remote call cannot proceed without."""
REQUIRES = [
    "apiKey",
]

# Resend honours this for 24 hours. It is what makes a retried durable run
# resend nothing instead of mailing the recipient twice -- the difference
# between `idempotent` and `unsafe-to-replay` is that this one is merely
# embarrassing, not financial, but the header costs nothing and removes it
# entirely.
IDEMPOTENCY_HEADER = "Idempotency-Key"


def authorize(
    credentials: dict[str, str | None],
    request: PreparedRequest,
    mode: str,
) -> None:
    """Apply Resend's auth scheme to an outgoing request.
    
    
    """
    request.headers["User-Agent"] = "fancy-flow-connector"

    request.headers["Authorization"] = f"Bearer {credentials.get('apiKey') or ''}"


def descriptor() -> ServiceDescriptor:
    """The Resend service, for the Python runtime."""
    return ServiceDescriptor(
        service=SERVICE,
        title=TITLE,
        sandbox=SANDBOX,
        base_urls=BASE_URLS,
        requires=REQUIRES,
        authorize=authorize,
        faker=respond,
        idempotency_header=IDEMPOTENCY_HEADER,
    )
