<?php

declare(strict_types=1);

namespace ParticleAcademy\Resend\Actions;

use ParticleAcademy\Resend\Resend;
use ParticleAcademy\Connectors\ConnectorConfigException;

/*
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/attachment-list.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/attachment-list.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- resend
 */
/**
 * List a received email's attachments, each with a signed download URL.
 *
 * GET /emails/receiving/{emailId}/attachments —
 * https://resend.com/docs/api-reference/emails/list-received-email-attachments
 *
 * This describes the request. The connector client resolves the connection,
 * picks the estate, and either calls Resend or calls the faker.
 */
final class AttachmentList
{
    public const OPERATION = 'attachment_list';
    public const METHOD = 'GET';
    public const PATH = '/emails/receiving/{emailId}/attachments';
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
            throw new ConnectorConfigException('attachment_list: "emailId" is required (Email ID).');
        }

        $limit = $config['limit'] ?? null;
        if (($limit !== null && $limit !== '') && ! (is_numeric($limit) && (float) $limit === floor((float) $limit) && (float) $limit >= 1 && (float) $limit <= 100)) {
            throw new ConnectorConfigException(
                'attachment_list: "limit" must be a integer, got '.json_encode($limit).'.'
            );
        }

        $body = [];

        $value = $config['limit'] ?? null;
        if ($value !== null && $value !== '') {
            $body['limit'] = (int) $value;
        }

        $value = $config['after'] ?? null;
        if ($value !== null && $value !== '') {
            $body['after'] = (string) $value;
        }

        $value = $config['before'] ?? null;
        if ($value !== null && $value !== '') {
            $body['before'] = (string) $value;
        }

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
        return '/emails/receiving/'.rawurlencode((string) ($config['emailId'] ?? '')).'/attachments';
    }
}
