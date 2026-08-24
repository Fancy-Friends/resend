<?php

declare(strict_types=1);

namespace ParticleAcademy\Resend\Actions;

use ParticleAcademy\Resend\Resend;
use ParticleAcademy\Connectors\ConnectorConfigException;

/*
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/email-send.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/email-send.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- resend
 */
/**
 * Send an email through Resend.
 *
 * POST /emails — https://resend.com/docs/api-reference/emails/send-email
 *
 * This describes the request. The connector client resolves the connection,
 * picks the estate, and either calls Resend or calls the faker.
 */
final class EmailSend
{
    public const OPERATION = 'email_send';
    public const METHOD = 'POST';
    public const PATH = '/emails';
    public const SIDE_EFFECTS = 'idempotent';

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
        if (($config['from'] ?? null) === null || ($config['from'] ?? null) === '') {
            throw new ConnectorConfigException('email_send: "from" is required (From).');
        }

        if (($config['to'] ?? null) === null || ($config['to'] ?? null) === '') {
            throw new ConnectorConfigException('email_send: "to" is required (To).');
        }

        if (! ((($config['html'] ?? null) !== null && ($config['html'] ?? null) !== '') || (($config['text'] ?? null) !== null && ($config['text'] ?? null) !== ''))) {
            throw new ConnectorConfigException('email_send: needs an "html" or "text" body — an empty email is never intended.');
        }

        $body = [];

        $value = $config['from'] ?? null;
        $body['from'] = (string) $value;

        $value = $config['to'] ?? null;
        $body['to'] = self::toList($config['to'] ?? null);

        $value = $config['subject'] ?? null;
        $body['subject'] = ($value !== null && $value !== '') ? (string) $value : '';

        $value = $config['html'] ?? null;
        if ($value !== null && $value !== '') {
            $body['html'] = (string) $value;
        }

        $value = $config['text'] ?? null;
        if ($value !== null && $value !== '') {
            $body['text'] = (string) $value;
        }

        $value = $config['replyTo'] ?? null;
        if ($value !== null && $value !== '') {
            $body['reply_to'] = (string) $value;
        }

        $body['headers'] = self::headersMap($config['headers'] ?? null);

        $body = $body === [] ? new \stdClass() : $body;
        return $body;
    }

    /** One value, a ,-separated string, or an array — all end up a list. @return list<string> */
    private static function toList(mixed $value): array
    {
        if (is_array($value)) {
            $items = array_map(static fn (mixed $item): string => (string) $item, $value);
        } elseif (is_string($value)) {
            $items = explode(',', $value);
        } else {
            return [];
        }

        $items = array_map(trim(...), $items);

        return array_values(array_filter($items, static fn (string $item): bool => $item !== ''));
    }

    /** A JSON body wants the real nested object, not a JSON string. @return array<string,string> */
    private static function headersMap(mixed $value): array
    {
        if (! is_array($value)) {
            return [];
        }

        $out = [];

        foreach ($value as $key => $item) {
            if ($item !== null && $item !== '') {
                $out[(string) $key] = (string) $item;
            }
        }

        return $out;
    }
}
