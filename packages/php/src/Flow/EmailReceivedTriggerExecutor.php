<?php

declare(strict_types=1);

namespace ParticleAcademy\Resend\Flow;

use FancyFlow\Attributes\FlowNode;
use FancyFlow\Contracts\NodeExecutor;
use FancyFlow\Runtime\ExecutionContext;
use FancyFlow\Runtime\Port;
use ParticleAcademy\Connectors\ConnectionHost;
use ParticleAcademy\Connectors\ConnectorClient;
use ParticleAcademy\Connectors\TriggerEvent;
use ParticleAcademy\Resend\Actions\EmailGet;
use ParticleAcademy\Resend\Resend;
use ParticleAcademy\Resend\Triggers\EmailReceived;

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
 * Email received, run on a fancy-flow-php host.
 *
 * The PHP twin of `resendEmailReceivedTriggerExecutor` in
 * @particle-academy/resend-js. The delivery the HOST received and verified at
 * its own route only NAMES what arrived, so this executor reads it —
 * `email_get` — before anything downstream runs, and publishes the delivery
 * with the read under `email`. A failed read fails the run. With nothing
 * delivered, fake mode composes the faker's sample event with the faked read,
 * so a flow can be designed before the endpoint exists; any other mode
 * refuses, and says how to deliver one.
 */
#[FlowNode(
    name: '@particle-academy/resend_email_received_trigger',
    aliases: [
        'resend_email_received_trigger',
    ],
    category: 'trigger',
    label: 'Email received',
    description: 'Start when an email arrives at one of your Resend receiving addresses, with the email read in full.',
    icon: '📥',
    inputs: [],
    outputs: [
        [
            'id' => 'out',
        ],
    ],
    sideEffects: 'none',
    outputShape: [
        [
            'path' => 'type',
            'type' => 'string',
            'description' => 'Always email.received on this trigger.',
        ],
        [
            'path' => 'created_at',
            'type' => 'string',
            'description' => 'ISO 8601, when the webhook was sent.',
        ],
        [
            'path' => 'data.email_id',
            'type' => 'string',
            'description' => 'The received email\'s id. Resend redelivers on failure -- dedupe on this.',
        ],
        [
            'path' => 'data.created_at',
            'type' => 'string',
            'description' => 'ISO 8601, when Resend received the email.',
        ],
        [
            'path' => 'data.from',
            'type' => 'string',
            'description' => 'The sender\'s address, bare.',
        ],
        [
            'path' => 'data.to',
            'type' => 'array',
            'description' => 'Recipient addresses.',
        ],
        [
            'path' => 'data.cc',
            'type' => 'array',
            'description' => 'Carbon-copy addresses; empty when none.',
        ],
        [
            'path' => 'data.bcc',
            'type' => 'array',
            'description' => 'Blind-copy addresses; empty when none.',
        ],
        [
            'path' => 'data.received_for',
            'type' => 'array',
            'description' => 'Addresses the email was forwarded for, when it reached Resend through a forward.',
        ],
        [
            'path' => 'data.message_id',
            'type' => 'string',
            'description' => 'The RFC 5322 Message-ID, angle brackets included.',
        ],
        [
            'path' => 'data.subject',
            'type' => 'string',
            'description' => 'The subject line.',
        ],
        [
            'path' => 'data.attachments',
            'type' => 'array',
            'description' => 'Attachment metadata as the delivery carries it: id, filename, content_type, content_disposition, content_id. No size, no URL -- `email.attachments` has the size, attachment_get has the URL.',
        ],
        [
            'path' => 'email.id',
            'type' => 'string',
            'description' => 'The email, read in full after the delivery: its id, equal to data.email_id.',
        ],
        [
            'path' => 'email.from',
            'type' => 'string',
            'description' => 'The sender\'s address, bare.',
        ],
        [
            'path' => 'email.to',
            'type' => 'array',
            'description' => 'Recipient addresses.',
        ],
        [
            'path' => 'email.cc',
            'type' => 'array',
            'description' => 'Carbon-copy addresses; empty when none.',
        ],
        [
            'path' => 'email.bcc',
            'type' => 'array',
            'description' => 'Blind-copy addresses; empty when none.',
        ],
        [
            'path' => 'email.reply_to',
            'type' => 'array',
            'description' => 'Reply-To addresses; empty when none.',
        ],
        [
            'path' => 'email.subject',
            'type' => 'string',
            'description' => 'The subject line.',
        ],
        [
            'path' => 'email.created_at',
            'type' => 'string',
            'description' => 'ISO 8601, when Resend received it.',
        ],
        [
            'path' => 'email.html',
            'type' => 'string',
            'description' => 'The HTML body, when the email carried one.',
        ],
        [
            'path' => 'email.html_format',
            'type' => 'string',
            'description' => 'How inline images are referenced in `email.html`: data_uri or cid.',
        ],
        [
            'path' => 'email.text',
            'type' => 'string',
            'description' => 'The plain-text body. NULL when the email carried only HTML -- branch on it before reading.',
        ],
        [
            'path' => 'email.headers',
            'type' => 'object',
            'description' => 'The email\'s headers as a map, lower-cased names.',
        ],
        [
            'path' => 'email.received_for',
            'type' => 'array',
            'description' => 'Addresses the email was forwarded for.',
        ],
        [
            'path' => 'email.message_id',
            'type' => 'string',
            'description' => 'The RFC 5322 Message-ID, angle brackets included. Dedupe across providers on this.',
        ],
        [
            'path' => 'email.raw.download_url',
            'type' => 'string',
            'description' => 'A signed URL for the raw MIME message; expires at email.raw.expires_at. NULL when Resend kept no raw copy.',
        ],
        [
            'path' => 'email.raw.expires_at',
            'type' => 'string',
            'description' => 'ISO 8601 expiry of email.raw.download_url.',
        ],
        [
            'path' => 'email.attachments',
            'type' => 'array',
            'description' => 'The attachments\' metadata WITH size: id, filename, content_type, content_disposition, content_id, size. attachment_get turns an id into a download URL.',
        ],
        [
            'path' => 'verdicts',
            'type' => 'unknown',
            'description' => 'Always null. Resend exposes no SPF, DKIM or DMARC verdicts on a received email; the key is here so a flow that wants them finds an explicit nothing rather than a missing field.',
        ],
    ],
)]
final class EmailReceivedTriggerExecutor implements NodeExecutor
{
    public function __construct(private readonly ?ConnectionHost $host = null, private readonly ?ConnectorClient $client = null) {}

    public function execute(ExecutionContext $ctx): mixed
    {
        $config = $ctx->config();
        $service = Resend::descriptor();

        $connection = ($this->host ?? new ConnectionHost)->resolve(
            $service->service,
            EmailReceived::OPERATION,
            $config,
            $service->sandbox,
            $service->requires,
            $service->baseUrls,
        );

        $event = TriggerEvent::resolve(
            $service->service,
            EmailReceived::OPERATION,
            EmailReceived::DELIVERY,
            EmailReceived::SETUP,
            $service->faker,
            $connection,
            $ctx->input('in'),
            $config,
        );

        // The run's FIRST step. A Resend delivery only NAMES what arrived, so
        // `email_get` is read before anything downstream runs and published
        // under `email`. A failed read fails the run with the core's
        // classification: a delivery whose read failed must not start a flow
        // that assumes it succeeded. In fake mode the read is faked with the
        // delivery's own values, so the composite has the same shape on the
        // canvas as it does live.
        $thenEmailId = is_array($event) ? ($event['data']['email_id'] ?? null) : null;
        if ($thenEmailId === null || $thenEmailId === '') {
            throw new \RuntimeException('email_received: the delivery carries no data.email_id, so email_get cannot run');
        }
        $readConfig = [
            'emailId' => $thenEmailId,
        ];
        if (($config['connection'] ?? null) !== null) {
            $readConfig['connection'] = $config['connection'];
        }
        if (($config['mode'] ?? null) !== null) {
            $readConfig['mode'] = $config['mode'];
        }

        $read = ($this->client ?? new ConnectorClient)->call(
            $service,
            EmailGet::OPERATION,
            $readConfig,
            [
                'method' => EmailGet::METHOD,
                'path' => EmailGet::path($readConfig),
                'query' => EmailGet::body($readConfig),
            ],
            $event,
        );

        $value = is_array($event) ? $event : [];
        $value['email'] = $read->data;
        $value['verdicts'] = null;

        return Port::only('out', $value);
    }
}
