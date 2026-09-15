<?php

declare(strict_types=1);

namespace ParticleAcademy\Resend;

use ParticleAcademy\Connectors\FakeRequest;

/*
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/fixtures/ by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/fixtures/ (or weaver's template/) and regenerate:
 *
 *     npm run provider -- resend
 */
/**
 * The Resend faker — the PHP twin of the js package's `src/faker.ts`.
 *
 * Bit-for-bit identical: the same FNV-1a seed and the same xorshift32
 * sequence, so a golden fixture asserts the exact faked payload and BOTH
 * runtimes have to produce it. That turns the faker into a parity test rather
 * than a convenience.
 */
final class ResendFaker
{
    /** @param array<string,mixed> $request */
    public static function respond(string $operation, array $request): mixed
    {
        /** @var array<string,mixed> $config */
        $config = $request['config'] ?? [];
        /** @var FakeValuesLike $fake */
        $fake = $request['fake'];

        return match ($operation) {
            'attachment_get' => self::AttachmentGet($config, $fake),
            'attachment_list' => self::AttachmentList($config, $fake),
            'email_get' => self::EmailGet($config, $fake),
            'email_send' => self::EmailSend($config, $fake),
            'email_received' => self::EmailReceived($config, $fake),
            default => throw new \InvalidArgumentException(
                // A faker asked for an operation it has no shape for must SAY so.
                // Making something up would produce a green run whose output
                // silently has none of the fields the author is about to reference.
                'resend: no fake response is defined for "'.$operation.'". '
                    .'Add a fixture under provider/fixtures/ and regenerate — a connector without a faker '
                    .'cannot be developed against, tested, or demonstrated.'
            ),
        };
    }

    /** @param array<string,mixed> $config */
    private static function AttachmentGet(array $config, mixed $fake): array|\stdClass
    {
        return [
        'object' => 'attachment',
        'id' => ((($v = $config['attachmentId'] ?? null) !== null && $v !== '') ? (string) $v : $fake->hex(8).'-'.$fake->hex(4).'-'.$fake->hex(4).'-'.$fake->hex(4).'-'.$fake->hex(12)),
        'filename' => 'avatar.png',
        'size' => 4096,
        'content_type' => 'image/png',
        'content_disposition' => 'inline',
        'content_id' => 'img001',
        'download_url' => 'https://inbound-cdn.resend.com/4ef9a417-02e9-4d39-ad75-9611e0fcc33c/attachments/2a0c9ce0-3112-4728-976e-47ddcd16a318?signature=fake',
        'expires_at' => '2026-10-17T14:29:41.521Z',
    ];
    }

    /** @param array<string,mixed> $config */
    private static function AttachmentList(array $config, mixed $fake): array|\stdClass
    {
        return [
        'object' => 'list',
        'has_more' => false,
        'data' => [
            [
                'id' => $fake->hex(8).'-'.$fake->hex(4).'-'.$fake->hex(4).'-'.$fake->hex(4).'-'.$fake->hex(12),
                'filename' => 'avatar.png',
                'size' => 4096,
                'content_type' => 'image/png',
                'content_disposition' => 'inline',
                'content_id' => 'img001',
                'download_url' => 'https://inbound-cdn.resend.com/4ef9a417-02e9-4d39-ad75-9611e0fcc33c/attachments/2a0c9ce0-3112-4728-976e-47ddcd16a318?signature=fake',
                'expires_at' => '2026-10-17T14:29:41.521Z',
            ],
        ],
    ];
    }

    /** @param array<string,mixed> $config */
    private static function EmailGet(array $config, mixed $fake): array|\stdClass
    {
        return [
        'object' => 'email',
        'id' => ((($v = $config['emailId'] ?? null) !== null && $v !== '') ? (string) $v : $fake->hex(8).'-'.$fake->hex(4).'-'.$fake->hex(4).'-'.$fake->hex(4).'-'.$fake->hex(12)),
        'to' => [
            'inbox@yourdomain.test',
        ],
        'from' => 'ada@example.test',
        'created_at' => '2026-09-15T12:00:11.894Z',
        'subject' => 'Sending this example',
        'html' => 'Congrats on receiving your <strong>first email</strong>!',
        'html_format' => 'data_uri',
        'text' => null,
        'headers' => [
            'from' => 'Ada Lovelace <ada@example.test>',
            'return-path' => 'ada@example.test',
            'mime-version' => '1.0',
        ],
        'bcc' => [],
        'cc' => [],
        'reply_to' => [],
        'received_for' => [],
        'message_id' => '<111-222-333@email.example.test>',
        'raw' => [
            'download_url' => 'https://example.resend.com/receiving/raw/054da427-439a-4e91-b785-e4fb1966285f?Signature=fake',
            'expires_at' => '2026-09-15T13:00:11.894Z',
        ],
        'attachments' => [
            [
                'id' => $fake->hex(8).'-'.$fake->hex(4).'-'.$fake->hex(4).'-'.$fake->hex(4).'-'.$fake->hex(12),
                'filename' => 'avatar.png',
                'content_type' => 'image/png',
                'content_disposition' => 'inline',
                'content_id' => 'img001',
                'size' => 4096,
            ],
        ],
    ];
    }

    /** @param array<string,mixed> $config */
    private static function EmailSend(array $config, mixed $fake): array|\stdClass
    {
        return [
        'id' => $fake->hex(8).'-'.$fake->hex(4).'-'.$fake->hex(4).'-'.$fake->hex(4).'-'.$fake->hex(12),
    ];
    }

    /** @param array<string,mixed> $config */
    private static function EmailReceived(array $config, mixed $fake): array|\stdClass
    {
        $boundEmailid = $fake->hex(8).'-'.$fake->hex(4).'-'.$fake->hex(4).'-'.$fake->hex(4).'-'.$fake->hex(12);

        return [
        'type' => 'email.received',
        'created_at' => '2026-09-15T12:00:12.126Z',
        'data' => [
            'email_id' => $boundEmailid,
            'created_at' => '2026-09-15T12:00:11.894Z',
            'from' => 'ada@example.test',
            'to' => [
                'inbox@yourdomain.test',
            ],
            'bcc' => [],
            'cc' => [],
            'received_for' => [],
            'message_id' => '<111-222-333@email.example.test>',
            'subject' => 'Sending this example',
            'attachments' => [
                [
                    'id' => $fake->hex(8).'-'.$fake->hex(4).'-'.$fake->hex(4).'-'.$fake->hex(4).'-'.$fake->hex(12),
                    'filename' => 'avatar.png',
                    'content_type' => 'image/png',
                    'content_disposition' => 'inline',
                    'content_id' => 'img001',
                ],
            ],
        ],
    ];
    }
}
