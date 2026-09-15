<?php

declare(strict_types=1);

namespace ParticleAcademy\Resend\Flow;

use FancyFlow\Attributes\FlowNode;
use FancyFlow\Contracts\NodeExecutor;
use FancyFlow\Runtime\ExecutionContext;
use FancyFlow\Runtime\Port;
use FancyFlow\Runtime\RunEvent;
use ParticleAcademy\Connectors\ConnectorClient;
use ParticleAcademy\Resend\Actions\AttachmentGet;
use ParticleAcademy\Resend\Resend;

/*
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/attachment-get.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/attachment-get.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- resend
 */
/**
 * Get attachment, run on a fancy-flow-php host.
 *
 * The PHP twin of `resendAttachmentGetExecutor` in
 * @particle-academy/resend-js: the same request, built from the node's config
 * by the same `Actions\AttachmentGet` a host would call directly, and the same
 * value on `out` — the client's `{data, mode, connection}`.
 *
 * The client resolves the connection and the estate from the config. With
 * nothing configured that is FAKE, so a node dropped on a canvas runs against
 * the faker rather than Resend. To reach a real estate, pass a
 * `ConnectorClient` that knows the host's connections — or bind one in the
 * container, which resolves the constructor by type.
 */
#[FlowNode(
    name: '@particle-academy/resend_attachment_get',
    aliases: [
        'resend_attachment_get',
    ],
    category: 'io',
    label: 'Get attachment',
    description: 'Turn one attachment of a received email into a signed download URL.',
    icon: '📎',
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
            'description' => 'The attachment\'s id, echoed back.',
        ],
        [
            'path' => 'data.filename',
            'type' => 'string',
            'description' => 'The original filename.',
        ],
        [
            'path' => 'data.size',
            'type' => 'number',
            'description' => 'Size in bytes.',
        ],
        [
            'path' => 'data.content_type',
            'type' => 'string',
            'description' => 'The MIME type.',
        ],
        [
            'path' => 'data.content_disposition',
            'type' => 'string',
            'description' => 'inline or attachment.',
        ],
        [
            'path' => 'data.content_id',
            'type' => 'string',
            'description' => 'The Content-ID an inline image is referenced by in the HTML; null otherwise.',
        ],
        [
            'path' => 'data.download_url',
            'type' => 'string',
            'description' => 'A signed URL for the bytes. Download before download_url expires; the connector never carries the bytes.',
        ],
        [
            'path' => 'data.expires_at',
            'type' => 'string',
            'description' => 'ISO 8601 expiry of download_url.',
        ],
    ],
)]
final class AttachmentGetExecutor implements NodeExecutor
{
    public function __construct(private readonly ?ConnectorClient $client = null) {}

    public function execute(ExecutionContext $ctx): mixed
    {
        $config = $ctx->config();

        $result = ($this->client ?? new ConnectorClient)->call(
            Resend::descriptor(),
            AttachmentGet::OPERATION,
            $config,
            [
                'method' => AttachmentGet::METHOD,
                'path' => AttachmentGet::path($config),
                'query' => AttachmentGet::body($config),
            ],
            $ctx->input('in'),
        );

        $id = is_array($result->data) ? ($result->data['id'] ?? null) : null;
        $ctx->emit(RunEvent::log(
            'info',
            'resend attachment_get'.(is_scalar($id) ? ' '.$id : '').' ('.$result->mode->value.')',
            $ctx->node->id,
        ));

        return Port::only('out', $result->toArray());
    }
}
