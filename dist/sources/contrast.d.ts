export declare const enum ContrastPreference {
    Less = -1,
    None = 0,
    More = 1,
    ForcedColors = 10
}
/**
 * @see https://www.w3.org/TR/mediaqueries-5/#prefers-contrast
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-contrast
 */
export default function getContrastPreference(): number | undefined;
