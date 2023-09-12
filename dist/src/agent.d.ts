import { SourcesToComponents, UnknownComponents } from './utils/entropy_source';
import { BuiltinComponents, sources } from './sources';
import { Confidence } from './confidence';
/**
 * Options for Fingerprint class loading
 */
export interface LoadOptions {
    /**
     * When browser doesn't support `requestIdleCallback` a `setTimeout` will be used. This number is only for Safari and
     * old Edge, because Chrome/Blink based browsers support `requestIdleCallback`. The value is in milliseconds.
     * @default 50
     */
    delayFallback?: number;
    /**
     * Whether to print debug messages to the console.
     * Required to ease investigations of problems.
     */
    debug?: boolean;
    /**
     * Set `false` to disable the unpersonalized AJAX request that the agent sends to collect installation statistics.
     * It's always disabled in the version published to the FingerprintJS CDN.
     */
    monitoring?: boolean;
}
/**
 * Options for getting visitor identifier
 */
export interface GetOptions {
    /**
     * Whether to print debug messages to the console.
     *
     * @deprecated Use the `debug` option of `load()` instead
     */
    debug?: boolean;
}
/**
 * Result of getting a visitor identifier
 */
export interface GetResult {
    /**
     * The visitor identifier
     */
    visitorId: string;
    /**
     * A confidence score that tells how much the agent is sure about the visitor identifier
     */
    confidence: Confidence;
    /**
     * List of components that has formed the visitor identifier.
     *
     * Warning! The type of this property is specific but out of Semantic Versioning, i.e. may have incompatible changes
     * within a major version. If you want to avoid breaking changes, treat the property as having type
     * `UnknownComponents` that is more generic but guarantees backward compatibility within a major version.
     */
    components: BuiltinComponents;
    /**
     * The fingerprinting algorithm version
     *
     * @see https://github.com/fingerprintjs/fingerprintjs#version-policy For more details
     */
    version: string;
}
/**
 * Agent object that can get visitor identifier
 */
export interface Agent {
    /**
     * Gets the visitor identifier
     */
    get(options?: Readonly<GetOptions>): Promise<GetResult>;
}
export declare function componentsToDebugString(components: UnknownComponents): string;
export declare function hashComponents(components: UnknownComponents): string;
/**
 * A delay is required to ensure consistent entropy components.
 * See https://github.com/fingerprintjs/fingerprintjs/issues/254
 * and https://github.com/fingerprintjs/fingerprintjs/issues/307
 * and https://github.com/fingerprintjs/fingerprintjs/commit/945633e7c5f67ae38eb0fea37349712f0e669b18
 */
export declare function prepareForSources(delayFallback?: number): Promise<void>;
/**
 * Builds an instance of Agent and waits a delay required for a proper operation.
 */
export declare function load({ delayFallback, debug, monitoring }?: Readonly<LoadOptions>): Promise<Agent>;
/**
 * Generate browser attributes base on browser behaviors.
 */
export declare function getAttributes({ delayFallback }?: Readonly<LoadOptions>): Promise<BuiltinComponents>;
/**
 *
 * @param attributes
 * @returns
 */
export declare function getVisitorId(attributes: SourcesToComponents<typeof sources>): string;
