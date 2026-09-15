<?php

declare(strict_types=1);

namespace ParticleAcademy\Resend\Triggers;

use ParticleAcademy\Connectors\DeliveryMechanism;
use ParticleAcademy\Connectors\WebhookVerifier;

/*
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/triggers/email-received.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/triggers/email-received.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- resend
 */
/**
 * Resend's webhook trigger — the delivery contract.
 *
 * Kept beside the service descriptor rather than inside a node, because a
 * signature scheme is a fact about RESEND. The twin of the js package's
 * trigger module.
 */
final class EmailReceived
{
    public const OPERATION = 'email_received';
    public const DELIVERY = DeliveryMechanism::Webhook;

    public const SETUP = 'Point a receiving domain\'s MX record at Resend, then in the Resend dashboard (Webhooks → Add webhook) point an endpoint at the route your host mounts for this trigger and subscribe it to email.received. Put the endpoint\'s signing secret -- shown as whsec_… -- on the connection as `webhookSecret`, exactly as shown.';

    /** Header carrying the signature. */
    public const SIGNATURE_HEADER = 'svix-signature';

    /** Header carrying the timestamp Resend signs. */
    public const TIMESTAMP_HEADER = 'svix-timestamp';

    /** Header carrying the delivery's id, which Resend signs. A delivery without it is refused. */
    public const ID_HEADER = 'svix-id';

    /** The provider's documented replay window, in seconds. */
    public const TOLERANCE = 300;

    /** The credential holding the signing secret. */
    public const SECRET_CREDENTIAL = 'webhookSecret';

    /**
     * Split `v1,…` into its parts.
     *
     * EVERY signature the header carries is collected, and the delivery passes
     * when ANY matches: a provider rolling a secret signs once per active secret,
     * and a first-only rule refused the whole roll as a wrong secret.
     *
     * `v1,<base64> v1,<base64>` -- several during a secret rotation, and Svix says
     * yours must match ONE of them. Every `v1` is offered to the verifier; the
     * first-only rule that Stripe's header once carried refused a whole roll.
     *
     * @return array{signatures: list<string>, timestamp: ?string}
     */
    public static function parseSignature(string $raw): array
    {
        $result = ['signatures' => [], 'timestamp' => null];

        foreach (explode(' ', $raw) as $part) {
            $pair = explode(',', trim($part), 2);
            if (count($pair) !== 2) {
                continue;
            }

            if ($pair[0] === 'v1') {
                $result['signatures'][] = $pair[1];
            }
        }

        return $result;
    }

    /** The exact bytes Resend signs. */
    public static function signedPayload(string $raw, ?string $timestamp, ?string $id = null): string
    {
        return ($id ?? '').'.'.($timestamp ?? '').'.'.$raw;
    }

    /**
     * Verify one inbound Resend delivery.
     *
     * The host calls this BEFORE starting a run, with the body exactly as
     * received. Re-serialised JSON changes key order and whitespace and produces a
     * mismatch that looks precisely like a wrong secret — hours spent debugging
     * the wrong thing.
     *
     * @param array<string,string|list<string>> $headers
     * @return array{ok: bool, reason: ?string}
     */
    public static function verifyDelivery(
        string $raw,
        array $headers,
        ?string $webhookSecret,
        ?int $now = null,
    ): array {
        $header = WebhookVerifier::header($headers, self::SIGNATURE_HEADER);
        $parsed = $header === null
            ? ['signatures' => [], 'timestamp' => null]
            : self::parseSignature($header);
        $timestamp = $parsed['timestamp'] ?? WebhookVerifier::header($headers, self::TIMESTAMP_HEADER);

        // The id is part of the signed content: a delivery without it is
        // refused by name, never signed with a hole in it.
        $id = WebhookVerifier::header($headers, self::ID_HEADER);
        if ($id === null || $id === '') {
            return ['ok' => false, 'reason' => 'delivery carried no id header'];
        }

        return WebhookVerifier::verify(
            raw: $raw,
            signature: $parsed['signatures'],
            secret: $webhookSecret,
            payload: self::signedPayload(...),
            algorithm: 'sha256',
            tolerance: self::TOLERANCE,
            timestamp: $timestamp,
            now: $now,
            encoding: 'base64',
            secretEncoding: 'base64',
            secretPrefix: 'whsec_',
            id: $id,
        );
    }
}
