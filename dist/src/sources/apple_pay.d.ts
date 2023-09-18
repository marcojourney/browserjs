export declare const enum ApplePayState {
    Disabled = 0,
    /** Apple Pay is enabled on the user device */
    Enabled = 1,
    /** The browser doesn't have the API to work with Apple Pay */
    NoAPI = -1,
    /** Using Apple Pay isn't allowed because the page context isn't secure (not HTTPS) */
    NotAvailableInInsecureContext = -2,
    /**
     * Using Apple Pay isn't allowed because the code runs in a frame,
     * and the frame origin doesn't match the top level page origin.
     */
    NotAvailableInFrame = -3
}
export default function getApplePayState(): ApplePayState;
/**
 * The return type is a union instead of the enum, because it's too challenging to embed the const enum into another
 * project. Turning it into a union is a simple and an elegant solution.
 *
 * Warning for package users:
 * This function is out of Semantic Versioning, i.e. can change unexpectedly. Usage is at your own risk.
 */
export declare function getStateFromError(error: unknown): -2 | -3;
