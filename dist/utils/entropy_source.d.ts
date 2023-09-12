import { MaybePromise } from './async';
/**
 * A functions that returns data with entropy to identify visitor.
 *
 * See https://github.com/fingerprintjs/fingerprintjs/blob/master/contributing.md#how-to-make-an-entropy-source
 * to learn how entropy source works and how to make your own.
 */
export type Source<TOptions, TValue> = (options: TOptions) => MaybePromise<TValue | (() => MaybePromise<TValue>)>;
/**
 * Generic dictionary of unknown sources
 */
export type UnknownSources<TOptions> = Record<string, Source<TOptions, unknown>>;
/**
 * Converts an entropy source type into the component type
 */
export type SourceValue<TSource extends Source<any, any>> = TSource extends Source<any, infer T> ? T : never;
/**
 * Result of getting entropy data from a source
 */
export type Component<T> = ({
    value: T;
} | {
    error: unknown;
}) & {
    duration: number;
};
/**
 * Generic dictionary of unknown components
 */
export type UnknownComponents = Record<string, Component<unknown>>;
/**
 * Converts an entropy source list type to a corresponding component list type.
 *
 * Warning for package users:
 * This type is out of Semantic Versioning, i.e. can change unexpectedly. Usage is at your own risk.
 */
export type SourcesToComponents<TSources extends UnknownSources<any>> = {
    [K in keyof TSources]: Component<SourceValue<TSources[K]>>;
};
/**
 * Loads the given entropy source. Returns a function that gets an entropy component from the source.
 *
 * The result is returned synchronously to prevent `loadSources` from
 * waiting for one source to load before getting the components from the other sources.
 */
export declare function loadSource<TOptions, TValue>(source: Source<TOptions, TValue>, sourceOptions: TOptions): () => Promise<Component<TValue>>;
/**
 * Loads the given entropy sources. Returns a function that collects the entropy components.
 *
 * The result is returned synchronously in order to allow start getting the components
 * before the sources are loaded completely.
 *
 * Warning for package users:
 * This function is out of Semantic Versioning, i.e. can change unexpectedly. Usage is at your own risk.
 */
export declare function loadSources<TSourceOptions, TSources extends UnknownSources<TSourceOptions>, TExclude extends string>(sources: TSources, sourceOptions: TSourceOptions, excludeSources: readonly TExclude[]): () => Promise<Omit<SourcesToComponents<TSources>, TExclude>>;
/**
 * Modifies an entropy source by transforming its returned value with the given function.
 * Keeps the source properties: sync/async, 1/2 stages.
 *
 * Warning for package users:
 * This function is out of Semantic Versioning, i.e. can change unexpectedly. Usage is at your own risk.
 */
export declare function transformSource<TOptions, TValueBefore, TValueAfter>(source: Source<TOptions, TValueBefore>, transformValue: (value: TValueBefore) => TValueAfter): Source<TOptions, TValueAfter>;
