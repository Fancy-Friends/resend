<?php

declare(strict_types=1);

namespace ParticleAcademy\Resend\Flow;

use FancyFlow\Attributes\FlowNode;
use FancyFlow\Contracts\NodeExecutor;
use FancyFlow\Runtime\ExecutionContext;
use FancyFlow\Runtime\Port;
use FancyFlow\Runtime\RunEvent;
use ParticleAcademy\Connectors\ConnectorClient;
use ParticleAcademy\Resend\Actions\EmailGet;
use ParticleAcademy\Resend\Resend;

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
 * Get received email, run on a fancy-flow-php host.
 *
 * The PHP twin of `resendEmailGetExecutor` in @particle-academy/resend-js: the
 * same request, built from the node's config by the same `Actions\EmailGet` a
 * host would call directly, and the same value on `out` — the client's `{data,
 * mode, connection}`.
 *
 * The client resolves the connection and the estate from the config. With
 * nothing configured that is FAKE, so a node dropped on a canvas runs against
 * the faker rather than Resend. To reach a real estate, pass a
 * `ConnectorClient` that knows the host's connections — or bind one in the
 * container, which resolves the constructor by type.
 */
#[FlowNode(
    name: '@particle-academy/resend_email_get',
    aliases: [
        'resend_email_get',
    ],
    category: 'io',
    label: 'Get received email',
    description: 'Read a received email in full: its bodies, its headers and the list of its attachments.',
    icon: '📨',
    inputs: [
        [
            'id' => 'in',
        ],
    ],
    outputs: [
        [
            'id' => 'out',
        ],
    ],
    sideEffects: 'none',
    outputShape: [
        [
            'path' => 'mode',
            'type' => 'string',
            'description' => 'Which estate this ran against. Resend has no sandbox, so: fake or live.',
        ],
        [
            'path' => 'connection',
            'type' => 'string',
            'description' => 'The connection id that was used.',
        ],
        [
            'path' => 'data.id',
            'type' => 'string',
            'description' => 'The received email\'s id (a UUID).',
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
            'path' => 'data.reply_to',
            'type' => 'array',
            'description' => 'Reply-To addresses; empty when none.',
        ],
        [
            'path' => 'data.subject',
            'type' => 'string',
            'description' => 'The subject line.',
        ],
        [
            'path' => 'data.created_at',
            'type' => 'string',
            'description' => 'ISO 8601, when Resend received it.',
        ],
        [
            'path' => 'data.html',
            'type' => 'string',
            'description' => 'The HTML body, when the email carried one.',
        ],
        [
            'path' => 'data.html_format',
            'type' => 'string',
            'description' => 'How inline images are referenced in `html`: data_uri or cid.',
        ],
        [
            'path' => 'data.text',
            'type' => 'string',
            'description' => 'The plain-text body. NULL when the email carried only HTML -- branch on it before reading.',
        ],
        [
            'path' => 'data.headers',
            'type' => 'object',
            'description' => 'The email\'s headers as a map, lower-cased names (from, return-path, mime-version, …).',
        ],
        [
            'path' => 'data.received_for',
            'type' => 'array',
            'description' => 'Addresses the email was forwarded for, when it reached Resend through a forward.',
        ],
        [
            'path' => 'data.message_id',
            'type' => 'string',
            'description' => 'The RFC 5322 Message-ID, angle brackets included. Dedupe across providers on this.',
        ],
        [
            'path' => 'data.raw.download_url',
            'type' => 'string',
            'description' => 'A signed URL for the raw MIME message. Expires -- see raw.expires_at. NULL when Resend kept no raw copy.',
        ],
        [
            'path' => 'data.raw.expires_at',
            'type' => 'string',
            'description' => 'ISO 8601 expiry of raw.download_url, about an hour after the read.',
        ],
        [
            'path' => 'data.attachments',
            'type' => 'array',
            'description' => 'The attachments\' METADATA -- id, filename, content_type, content_disposition, content_id, size -- never the bytes. attachment_get turns an id into a download URL.',
        ],
    ],
)]
final class EmailGetExecutor implements NodeExecutor
{
    public function __construct(private readonly ?ConnectorClient $client = null) {}

    public function execute(ExecutionContext $ctx): mixed
    {
        $config = $ctx->config();

        $result = ($this->client ?? new ConnectorClient)->call(
            Resend::descriptor(),
            EmailGet::OPERATION,
            $config,
            [
                'method' => EmailGet::METHOD,
                'path' => EmailGet::path($config),
                'query' => EmailGet::body($config),
            ],
            $ctx->input('in'),
        );

        $id = is_array($result->data) ? ($result->data['id'] ?? null) : null;
        $ctx->emit(RunEvent::log(
            'info',
            'resend email_get'.(is_scalar($id) ? ' '.$id : '').' ('.$result->mode->value.')',
            $ctx->node->id,
        ));

        return Port::only('out', $result->toArray());
    }
}
