/**
 * The order matches the CSS side order: top, right, bottom, left.
 *
 * @ignore Named array elements aren't used because of multiple TypeScript compatibility complaints from users
 */
export type FrameSize = [number | null, number | null, number | null, number | null];
export declare const screenFrameCheckInterval = 2500;
/**
 * For tests only
 */
export declare function resetScreenFrameWatch(): void;
/**
 * For tests only
 */
export declare function hasScreenFrameBackup(): boolean;
/**
 * Warning for package users:
 * This function is out of Semantic Versioning, i.e. can change unexpectedly. Usage is at your own risk.
 */
export declare function getScreenFrame(): () => Promise<FrameSize>;
/**
 * Sometimes the available screen resolution changes a bit, e.g. 1900x1440 → 1900x1439. A possible reason: macOS Dock
 * shrinks to fit more icons when there is too little space. The rounding is used to mitigate the difference.
 */
export declare function getRoundedScreenFrame(): () => Promise<FrameSize>;
