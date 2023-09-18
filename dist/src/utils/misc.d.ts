/**
 * Converts an error object to a plain object that can be used with `JSON.stringify`.
 * If you just run `JSON.stringify(error)`, you'll get `'{}'`.
 */
export declare function errorToObject(error: Readonly<Error>): Record<string, unknown>;
