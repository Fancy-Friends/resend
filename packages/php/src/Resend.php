<?php

declare(strict_types=1);

namespace ParticleAcademy\Resend;

use ParticleAcademy\Connectors\Mode;
use ParticleAcademy\Connectors\PreparedRequest;
use ParticleAcademy\Connectors\SandboxKind;
use ParticleAcademy\Connectors\ServiceDescriptor;

/*
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/manifest.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/manifest.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- resend
 */
/**
 * Resend, as one service descriptor shared by every Resend operation.
 *
 * The PHP twin of the js package's `src/service.ts`.
 *
 * ## The sandbox trap, written down where it is used
 *
 * Resend has NO test estate, and somebody checked. Its simulator RECIPIENTS --
 * delivered@resend.dev, bounced@resend.dev, complained@resend.dev,
 * suppressed@resend.dev -- are not one: the send is real, it is billed, and it
 * counts against the quota. Modelling them as a sandbox would put a live send
 * behind a control labelled "test", so `mode` does not offer sandbox at all
 * and `fake` is the primary development mode rather than the fallback.
 */
final class Resend
{
    // The connector API version this package was GENERATED against. A
    // literal, never imported: an imported constant lets an upgrade rewrite
    // the very claim it exists to detect.
    public const CONNECTOR_API_VERSION = 1;

    public const SERVICE = 'resend';

    public const LIVE_URL = 'https://api.resend.com';

    // Resend honours this for 24 hours. It is what makes a retried durable
    // run resend nothing instead of mailing the recipient twice -- the
    // difference between `idempotent` and `unsafe-to-replay` is that this
    // one is merely embarrassing, not financial, but the header costs
    // nothing and removes it entirely.
    public const IDEMPOTENCY_HEADER = 'Idempotency-Key';

    /** @var list<string> Credential keys a remote call cannot proceed without. */
    public const REQUIRES = [
        'apiKey',
    ];

    public static function descriptor(): ServiceDescriptor
    {
        return new ServiceDescriptor(
            service: self::SERVICE,
            title: 'Resend',
            sandbox: SandboxKind::None,
            baseUrls: [
                Mode::Live->value => self::LIVE_URL,
            ],
            requires: self::REQUIRES,
            authorize: self::authorize(...),
            faker: ResendFaker::respond(...),
            idempotencyHeader: self::IDEMPOTENCY_HEADER,
        );
    }

    /**
     * Apply Resend's auth scheme to an outgoing request.
     *
     *
     *
     * @param array<string,string> $credentials
     */
    public static function authorize(array $credentials, PreparedRequest $request, Mode $mode): void
    {
        $request->withHeader('User-Agent', 'fancy-flow-connector');

        $request->withHeader('Authorization', 'Bearer '.($credentials['apiKey'] ?? ''));
    }
}
