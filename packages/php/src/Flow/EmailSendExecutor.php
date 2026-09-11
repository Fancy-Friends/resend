<?php

declare(strict_types=1);

namespace ParticleAcademy\Resend\Flow;

use FancyFlow\Attributes\FlowNode;
use FancyFlow\Contracts\NodeExecutor;
use FancyFlow\Runtime\ExecutionContext;
use FancyFlow\Runtime\Port;
use FancyFlow\Runtime\RunEvent;
use ParticleAcademy\Connectors\ConnectorClient;
use ParticleAcademy\Connectors\Idempotency;
use ParticleAcademy\Resend\Actions\EmailSend;
use ParticleAcademy\Resend\Resend;

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
 * Send email, run on a fancy-flow-php host.
 *
 * The PHP twin of `resendEmailSendExecutor` in @particle-academy/resend-js:
 * the same request, built from the node's config by the same
 * `Actions\EmailSend` a host would call directly, and the same value on `out`
 * — the client's `{data, mode, connection}`.
 *
 * The client resolves the connection and the estate from the config. With
 * nothing configured that is FAKE, so a node dropped on a canvas runs against
 * the faker rather than Resend. To reach a real estate, pass a
 * `ConnectorClient` that knows the host's connections — or bind one in the
 * container, which resolves the constructor by type.
 */
#[FlowNode(
    name: '@particle-academy/resend_email_send',
    aliases: [
        'resend_email_send',
    ],
    category: 'io',
    label: 'Send email',
    description: 'Send an email through Resend.',
    icon: '✉',
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
    sideEffects: 'idempotent',
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
            'description' => 'Resend\'s id for the email (a UUID). Look the send up with it, or dedupe on it.',
        ],
    ],
)]
final class EmailSendExecutor implements NodeExecutor
{
    public function __construct(private readonly ?ConnectorClient $client = null) {}

    public function execute(ExecutionContext $ctx): mixed
    {
        $config = $ctx->config();

        // Derived from the RUN and the NODE, never fresh. A retried durable run
        // must send the same key or Resend creates a second one — the exact
        // failure "idempotent" exists to prevent.
        $idempotencyKey = Idempotency::keyFor($ctx, $ctx->node->id, service: Resend::SERVICE, operation: EmailSend::OPERATION);
        if ($idempotencyKey === null) {
            $ctx->emit(RunEvent::log('warn', EmailSend::OPERATION.': '.Idempotency::NO_KEY_WARNING, $ctx->node->id));
        }

        $result = ($this->client ?? new ConnectorClient)->call(
            Resend::descriptor(),
            EmailSend::OPERATION,
            $config,
            [
                'method' => EmailSend::METHOD,
                'path' => EmailSend::PATH,
                'json' => EmailSend::body($config),
            ],
            $ctx->input('in'),
            idempotencyKey: $idempotencyKey,
        );

        $id = is_array($result->data) ? ($result->data['id'] ?? null) : null;
        $ctx->emit(RunEvent::log(
            'info',
            'resend email_send'.(is_scalar($id) ? ' '.$id : '').' ('.$result->mode->value.')',
            $ctx->node->id,
        ));

        return Port::only('out', $result->toArray());
    }
}
