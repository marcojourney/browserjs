"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStateFromError = void 0;
function getApplePayState() {
    const { ApplePaySession } = window;
    if (typeof (ApplePaySession === null || ApplePaySession === void 0 ? void 0 : ApplePaySession.canMakePayments) !== 'function') {
        return -1 /* ApplePayState.NoAPI */;
    }
    try {
        return ApplePaySession.canMakePayments() ? 1 /* ApplePayState.Enabled */ : 0 /* ApplePayState.Disabled */;
    }
    catch (error) {
        return getStateFromError(error);
    }
}
exports.default = getApplePayState;
/**
 * The return type is a union instead of the enum, because it's too challenging to embed the const enum into another
 * project. Turning it into a union is a simple and an elegant solution.
 *
 * Warning for package users:
 * This function is out of Semantic Versioning, i.e. can change unexpectedly. Usage is at your own risk.
 */
function getStateFromError(error) {
    if (error instanceof Error) {
        // See full expected error messages in the test
        if (error.name === 'InvalidAccessError') {
            if (/\bfrom\b.*\binsecure\b/i.test(error.message)) {
                return -2 /* ApplePayState.NotAvailableInInsecureContext */;
            }
            if (/\bdifferent\b.*\borigin\b.*top.level\b.*\bframe\b/i.test(error.message)) {
                return -3 /* ApplePayState.NotAvailableInFrame */;
            }
        }
        if (error.name === 'SecurityError') {
            if (/\bthird.party iframes?.*\bnot.allowed\b/i.test(error.message)) {
                return -3 /* ApplePayState.NotAvailableInFrame */;
            }
        }
    }
    throw error;
}
exports.getStateFromError = getStateFromError;
