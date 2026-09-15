<?php

declare(strict_types=1);

/*
 * Resend — the published Composer package.
 *
 * GENERATED — do not edit. Fix weaver's template/ and regenerate.
 *
 * This runs against the PUBLISHED package, installed by name from the
 * registry into a project that has never seen this repo. Every other test
 * here imports from ../src and therefore cannot see the packaging.
 */

$autoload = getcwd().'/vendor/autoload.php';

if (! is_file($autoload)) {
    fwrite(STDERR, 'No vendor/autoload.php in '.getcwd().PHP_EOL);
    fwrite(STDERR, 'Run this from a project that has composer-required the published package:'.PHP_EOL);
    fwrite(STDERR, '    composer require particle-academy/resend-php'.PHP_EOL);
    exit(2);
}

require $autoload;

use ParticleAcademy\Connectors\FakeValues;
use ParticleAcademy\Resend\ResendFaker;

$goldens = [
    [
        'operation' => 'attachment_get',
        'config' => [],
        'expected' => [
            'object' => 'attachment',
            'id' => '4d5c5b85-03bf-aed3-8752-ca5edf9e240f',
            'filename' => 'avatar.png',
            'size' => 4096,
            'content_type' => 'image/png',
            'content_disposition' => 'inline',
            'content_id' => 'img001',
            'download_url' => 'https://inbound-cdn.resend.com/4ef9a417-02e9-4d39-ad75-9611e0fcc33c/attachments/2a0c9ce0-3112-4728-976e-47ddcd16a318?signature=fake',
            'expires_at' => '2026-10-17T14:29:41.521Z',
        ],
    ],
    [
        'operation' => 'attachment_list',
        'config' => [],
        'expected' => [
            'object' => 'list',
            'has_more' => false,
            'data' => [
                [
                    'id' => '38bf1686-9798-4b7f-33db-a1397c815b8a',
                    'filename' => 'avatar.png',
                    'size' => 4096,
                    'content_type' => 'image/png',
                    'content_disposition' => 'inline',
                    'content_id' => 'img001',
                    'download_url' => 'https://inbound-cdn.resend.com/4ef9a417-02e9-4d39-ad75-9611e0fcc33c/attachments/2a0c9ce0-3112-4728-976e-47ddcd16a318?signature=fake',
                    'expires_at' => '2026-10-17T14:29:41.521Z',
                ],
            ],
        ],
    ],
    [
        'operation' => 'email_get',
        'config' => [],
        'expected' => [
            'object' => 'email',
            'id' => '03782c4e-d8cc-67ae-494d-a59f39ab17e5',
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
                    'id' => 'db5dad5f-b039-6a53-3792-0331f64b82e9',
                    'filename' => 'avatar.png',
                    'content_type' => 'image/png',
                    'content_disposition' => 'inline',
                    'content_id' => 'img001',
                    'size' => 4096,
                ],
            ],
        ],
    ],
    [
        'operation' => 'email_send',
        'config' => [],
        'expected' => [
            'id' => 'bcbfbc06-2cd4-91e0-f2ac-2bb0911a0bea',
        ],
    ],
    [
        'operation' => 'email_received',
        'config' => [],
        'expected' => [
            'type' => 'email.received',
            'created_at' => '2026-09-15T12:00:12.126Z',
            'data' => [
                'email_id' => '641e64e0-b8c4-b6d7-baee-092374d69089',
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
                        'id' => '344f752a-87a1-170a-80ec-d7663b0810e1',
                        'filename' => 'avatar.png',
                        'content_type' => 'image/png',
                        'content_disposition' => 'inline',
                        'content_id' => 'img001',
                    ],
                ],
            ],
        ],
    ],
];

foreach ($goldens as $golden) {
    $operation = $golden['operation'];
    $config = $golden['config'];

    $fake = new FakeValues(FakeValues::seedForCall('resend', $operation, $config));
    $faked = ResendFaker::respond($operation, ['config' => $config, 'fake' => $fake]);

    if ($faked !== $golden['expected']) {
        fwrite(STDERR, "the PUBLISHED package produced different bytes for {$operation}\n");
        fwrite(STDERR, '  got:      '.json_encode($faked)."\n");
        fwrite(STDERR, '  expected: '.json_encode($golden['expected'])."\n");
        exit(1);
    }

    echo "  ok   {$operation}\n";
}

echo "\n  ".count($goldens)." operations verified against the published package.\n";
