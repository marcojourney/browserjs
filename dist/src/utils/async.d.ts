export type MaybePromise<T> = Promise<T> | T;
export declare function wait<T = void>(durationMs: number, resolveWith?: T): Promise<T>;
/**
 * Allows asynchronous actions and microtasks to happen.
 */
export declare function releaseEventLoop(): Promise<void>;
export declare function requestIdleCallbackIfAvailable(fallbackTimeout: number, deadlineTimeout?: number): Promise<void>;
export declare function isPromise<T>(value: PromiseLike<T> | unknown): value is PromiseLike<T>;
/**
 * Calls a maybe asynchronous function without creating microtasks when the function is synchronous.
 * Catches errors in both cases.
 *
 * If just you run a code like this:
 * ```
 * console.time('Action duration')
 * await action()
 * console.timeEnd('Action duration')
 * ```
 * The synchronous function time can be measured incorrectly because another microtask may run before the `await`
 * returns the control back to the code.
 */
export declare function awaitIfAsync<TResult, TError = unknown>(action: () => MaybePromise<TResult>, callback: (...args: [success: true, result: TResult] | [success: false, error: TError]) => unknown): void;
/**
 * If you run many synchronous tasks without using this function, the JS main loop will be busy and asynchronous tasks
 * (e.g. completing a network request, rendering the page) won't be able to happen.
 * This function allows running many synchronous tasks such way that asynchronous tasks can run too in background.
 */
export declare function mapWithBreaks<T, U>(items: readonly T[], callback: (item: T, index: number) => U, loopReleaseInterval?: number): Promise<U[]>;
/**
 * Makes the given promise never emit an unhandled promise rejection console warning.
 * The promise will still pass errors to the next promises.
 *
 * Otherwise, promise emits a console warning unless it has a `catch` listener.
 */
export declare function suppressUnhandledRejectionWarning(promise: PromiseLike<unknown>): void;
