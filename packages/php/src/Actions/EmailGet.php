<?php

declare(strict_types=1);

namespace ParticleAcademy\Resend\Actions;

use ParticleAcademy\Resend\Resend;
use ParticleAcademy\Connectors\ConnectorConfigException;

/*
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/email-get.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/email-get.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- resend
 */
/**
 * Read a received email in full: its bodies, its headers and the list of its
 * attachments.
 *
 * GET /emails/receiving/{emailId} —
 * https://resend.com/docs/api-reference/emails/retrieve-received-email
 *
 * This describes the request. The connector client resolves the connection,
 * picks the estate, and either calls Resend or calls the faker.
 */
final class EmailGet
{
    public const OPERATION = 'email_get';
    public const METHOD = 'GET';
    public const PATH = '/emails/receiving/{emailId}';
    public const SIDE_EFFECTS = 'none';

    /**
     * Build the JSON body for one call.
     *
     * Validation fails loudly and specifically here, rather than three frames
     * later as an "invalid request" from Resend.
     *
     * @param array<string,mixed> $config
     * An EMPTY body is `{}`, not `[]` — and PHP cannot tell those apart, because
     * both are `array()` and `json_encode` picks the list. So an empty one is
     * returned as an object. TypeScript and Python have no such ambiguity, which
     * is why this is a difference only the byte-parity suite can see.
     *
     * @return array<string,mixed>|\stdClass
     */
    public static function body(array $config): array|\stdClass
    {
        if (($config['emailId'] ?? null) === null || ($config['emailId'] ?? null) === '') {
            throw new ConnectorConfigException('email_get: "emailId" is required (Email ID).');
        }

        $body = [];

        $body = $body === [] ? new \stdClass() : $body;
        return $body;
    }

    /**
     * The request path, with each config value URL-ENCODED into it.
     *
     * `PATH` above is the TEMPLATE, which is what the descriptor advertises;
     * this is what a caller sends. A value interpolated raw changes which URL
     * is called — a range like `Sheet1!A:B` or a sheet named `Q1/Q2` — and the
     * provider answers 404 about the document rather than about the encoding.
     *
     * @param array<string,mixed> $config
     */
    public static function path(array $config): string
    {
        return '/emails/receiving/'.rawurlencode((string) ($config['emailId'] ?? ''));
    }
}
