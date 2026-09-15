<?php

declare(strict_types=1);

namespace ParticleAcademy\Resend\Flow;

use FancyFlow\Attributes\FlowNode;
use FancyFlow\Contracts\NodeExecutor;
use FancyFlow\Runtime\ExecutionContext;
use FancyFlow\Runtime\Port;
use FancyFlow\Runtime\RunEvent;
use ParticleAcademy\Connectors\ConnectorClient;
use ParticleAcademy\Resend\Actions\AttachmentList;
use ParticleAcademy\Resend\Resend;

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
 * List attachments, run on a fancy-flow-php host.
 *
 * The PHP twin of `resendAttachmentListExecutor` in
 * @particle-academy/resend-js: the same request, built from the node's config
 * by the same `Actions\AttachmentList` a host would call directly, and the
 * same value on `out` — the client's `{data, mode, connection}`.
 *
 * The client resolves the connection and the estate from the config. With
 * nothing configured that is FAKE, so a node dropped on a canvas runs against
 * the faker rather than Resend. To reach a real estate, pass a
 * `ConnectorClient` that knows the host's connections — or bind one in the
 * container, which resolves the constructor by type.
 */
#[FlowNode(
    name: '@particle-academy/resend_attachment_list',
    aliases: [
        'resend_attachment_list',
    ],
    category: 'io',
    label: 'List attachments',
    description: 'List a received email\'s attachments, each with a signed download URL.',
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
            'path' => 'data.has_more',
            'type' => 'boolean',
            'description' => 'Whether another page exists beyond this one.',
        ],
        [
            'path' => 'data.data',
            'type' => 'array',
            'description' => 'The attachments on this page: id, filename, size, content_type, content_disposition, content_id, download_url, expires_at. Resend\'s own envelope, so the list is at data.data.',
        ],
    ],
)]
final class AttachmentListExecutor implements NodeExecutor
{
    public function __construct(private readonly ?ConnectorClient $client = null) {}

    public function execute(ExecutionContext $ctx): mixed
    {
        $config = $ctx->config();

        $result = ($this->client ?? new ConnectorClient)->call(
            Resend::descriptor(),
            AttachmentList::OPERATION,
            $config,
            [
                'method' => AttachmentList::METHOD,
                'path' => AttachmentList::path($config),
                'query' => AttachmentList::body($config),
            ],
            $ctx->input('in'),
        );

        $id = is_array($result->data) ? ($result->data['id'] ?? null) : null;
        $ctx->emit(RunEvent::log(
            'info',
            'resend attachment_list'.(is_scalar($id) ? ' '.$id : '').' ('.$result->mode->value.')',
            $ctx->node->id,
        ));

        return Port::only('out', $result->toArray());
    }
}
