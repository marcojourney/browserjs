export declare const enum SpecialFingerprint {
    /** Making a fingerprint is skipped because the browser is known to always suspend audio context */
    KnownToSuspend = -1,
    /** The browser doesn't support audio context */
    NotSupported = -2,
    /** An unexpected timeout has happened */
    Timeout = -3
}
/**
 * A deep description: https://fingerprint.com/blog/audio-fingerprinting/
 * Inspired by and based on https://github.com/cozylife/audio-fingerprint
 */
export default function getAudioFingerprint(): number | (() => Promise<number>);
