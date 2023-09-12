type WritableCSSProperties = {
    [K in keyof CSSStyleDeclaration]: CSSStyleDeclaration[K] extends string ? K : never;
}[Extract<keyof CSSStyleDeclaration, string>];
type WritableCSSStyles = Partial<Pick<CSSStyleDeclaration, WritableCSSProperties>>;
type Preset = [style?: WritableCSSStyles, text?: string];
/**
 * Settings of text blocks to measure. The keys are random but persistent words.
 */
export declare const presets: Record<string, Preset>;
/**
 * The result is a dictionary of the width of the text samples.
 * Heights aren't included because they give no extra entropy and are unstable.
 *
 * The result is very stable in IE 11, Edge 18 and Safari 14.
 * The result changes when the OS pixel density changes in Chromium 87. The real pixel density is required to solve,
 * but seems like it's impossible: https://stackoverflow.com/q/1713771/1118709.
 * The "min" and the "mono" (only on Windows) value may change when the page is zoomed in Firefox 87.
 */
export default function getFontPreferences(): Promise<Record<string, number>>;
export {};
