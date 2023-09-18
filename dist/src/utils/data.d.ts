/**
 * Does the same as Array.prototype.includes but has better typing
 */
export declare function includes<THaystack>(haystack: ArrayLike<THaystack>, needle: unknown): needle is THaystack;
/**
 * Like `!includes()` but with proper typing
 */
export declare function excludes<THaystack, TNeedle>(haystack: ArrayLike<THaystack>, needle: TNeedle): needle is Exclude<TNeedle, THaystack>;
/**
 * Be careful, NaN can return
 */
export declare function toInt(value: unknown): number;
/**
 * Be careful, NaN can return
 */
export declare function toFloat(value: unknown): number;
export declare function replaceNaN<T, U>(value: T, replacement: U): T | U;
export declare function countTruthy(values: unknown[]): number;
export declare function round(value: number, base?: number): number;
/**
 * Parses a CSS selector into tag name with HTML attributes.
 * Only single element selector are supported (without operators like space, +, >, etc).
 *
 * Multiple values can be returned for each attribute. You decide how to handle them.
 */
export declare function parseSimpleCssSelector(selector: string): [tag: string | undefined, attributes: Record<string, string[]>];
export declare function areSetsEqual(set1: Set<unknown>, set2: Set<unknown>): boolean;
export declare function maxInIterator<T>(iterator: Iterator<T>, getItemScore: (item: T) => number): T | undefined;
/**
 * Converts a string to UTF8 bytes
 *
 * Warning for package users:
 * This function is out of Semantic Versioning, i.e. can change unexpectedly. Usage is at your own risk.
 */
export declare function getUTF8Bytes(input: string): Uint8Array;
