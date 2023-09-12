import { MaybePromise } from './async';
/**
 * Creates and keeps an invisible iframe while the given function runs.
 * The given function is called when the iframe is loaded and has a body.
 * The iframe allows to measure DOM sizes inside itself.
 *
 * Notice: passing an initial HTML code doesn't work in IE.
 *
 * Warning for package users:
 * This function is out of Semantic Versioning, i.e. can change unexpectedly. Usage is at your own risk.
 */
export declare function withIframe<T>(action: (iframe: HTMLIFrameElement, iWindow: Window) => MaybePromise<T>, initialHtml?: string, domPollInterval?: number): Promise<T>;
/**
 * Creates a DOM element that matches the given selector.
 * Only single element selector are supported (without operators like space, +, >, etc).
 */
export declare function selectorToElement(selector: string): HTMLElement;
/**
 * Adds CSS styles from a string in such a way that doesn't trigger a CSP warning (unsafe-inline or unsafe-eval)
 */
export declare function addStyleString(style: CSSStyleDeclaration, source: string): void;
