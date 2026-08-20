<?php

declare(strict_types=1);

use ParticleAcademy\Resend\ResendFaker;
use ParticleAcademy\Connectors\FakeValues;

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
 * The golden fixtures — the SAME values the TypeScript and Python packages
 * assert.
 *
 * Bit-for-bit identical is the claim, and this is what checks it.
 * Cross-runtime drift does not fail loudly on its own: it completes, down one
 * path, with no error.
 */

it('email_send fakes the shape Resend publishes', function () {
    $config = [];
    $fake = new FakeValues(FakeValues::seedForCall('resend', 'email_send', $config));

    $faked = ResendFaker::respond('email_send', ['config' => $config, 'fake' => $fake]);

    expect($faked)->toBe([
        'id' => 'bcbfbc06-2cd4-91e0-f2ac-2bb0911a0bea',
    ]);
});

it('throws for an operation with no fixture rather than inventing a shape', function () {
    $fake = new FakeValues(FakeValues::seedForCall('resend', 'no_such_operation', []));

    expect(fn () => ResendFaker::respond('no_such_operation', ['config' => [], 'fake' => $fake]))
        ->toThrow(InvalidArgumentException::class);
});
