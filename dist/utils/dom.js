"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addStyleString = exports.selectorToElement = exports.withIframe = void 0;
const async_1 = require("./async");
const data_1 = require("./data");
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
function withIframe(action, initialHtml, domPollInterval = 50) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const d = document;
        // document.body can be null while the page is loading
        while (!d.body) {
            yield (0, async_1.wait)(domPollInterval);
        }
        const iframe = d.createElement('iframe');
        try {
            yield new Promise((_resolve, _reject) => {
                let isComplete = false;
                const resolve = () => {
                    isComplete = true;
                    _resolve();
                };
                const reject = (error) => {
                    isComplete = true;
                    _reject(error);
                };
                iframe.onload = resolve;
                iframe.onerror = reject;
                const { style } = iframe;
                style.setProperty('display', 'block', 'important'); // Required for browsers to calculate the layout
                style.position = 'absolute';
                style.top = '0';
                style.left = '0';
                style.visibility = 'hidden';
                if (initialHtml && 'srcdoc' in iframe) {
                    iframe.srcdoc = initialHtml;
                }
                else {
                    iframe.src = 'about:blank';
                }
                d.body.appendChild(iframe);
                // WebKit in WeChat doesn't fire the iframe's `onload` for some reason.
                // This code checks for the loading state manually.
                // See https://github.com/fingerprintjs/fingerprintjs/issues/645
                const checkReadyState = () => {
                    var _a, _b;
                    // The ready state may never become 'complete' in Firefox despite the 'load' event being fired.
                    // So an infinite setTimeout loop can happen without this check.
                    // See https://github.com/fingerprintjs/fingerprintjs/pull/716#issuecomment-986898796
                    if (isComplete) {
                        return;
                    }
                    // Make sure iframe.contentWindow and iframe.contentWindow.document are both loaded
                    // The contentWindow.document can miss in JSDOM (https://github.com/jsdom/jsdom).
                    if (((_b = (_a = iframe.contentWindow) === null || _a === void 0 ? void 0 : _a.document) === null || _b === void 0 ? void 0 : _b.readyState) === 'complete') {
                        resolve();
                    }
                    else {
                        setTimeout(checkReadyState, 10);
                    }
                };
                checkReadyState();
            });
            while (!((_b = (_a = iframe.contentWindow) === null || _a === void 0 ? void 0 : _a.document) === null || _b === void 0 ? void 0 : _b.body)) {
                yield (0, async_1.wait)(domPollInterval);
            }
            return yield action(iframe, iframe.contentWindow);
        }
        finally {
            (_c = iframe.parentNode) === null || _c === void 0 ? void 0 : _c.removeChild(iframe);
        }
    });
}
exports.withIframe = withIframe;
/**
 * Creates a DOM element that matches the given selector.
 * Only single element selector are supported (without operators like space, +, >, etc).
 */
function selectorToElement(selector) {
    const [tag, attributes] = (0, data_1.parseSimpleCssSelector)(selector);
    const element = document.createElement(tag !== null && tag !== void 0 ? tag : 'div');
    for (const name of Object.keys(attributes)) {
        const value = attributes[name].join(' ');
        // Changing the `style` attribute can cause a CSP error, therefore we change the `style.cssText` property.
        // https://github.com/fingerprintjs/fingerprintjs/issues/733
        if (name === 'style') {
            addStyleString(element.style, value);
        }
        else {
            element.setAttribute(name, value);
        }
    }
    return element;
}
exports.selectorToElement = selectorToElement;
/**
 * Adds CSS styles from a string in such a way that doesn't trigger a CSP warning (unsafe-inline or unsafe-eval)
 */
function addStyleString(style, source) {
    // We don't use `style.cssText` because browsers must block it when no `unsafe-eval` CSP is presented: https://csplite.com/csp145/#w3c_note
    // Even though the browsers ignore this standard, we don't use `cssText` just in case.
    for (const property of source.split(';')) {
        const match = /^\s*([\w-]+)\s*:\s*(.+?)(\s*!([\w-]+))?\s*$/.exec(property);
        if (match) {
            const [, name, value, , priority] = match;
            style.setProperty(name, value, priority || ''); // The last argument can't be undefined in IE11
        }
    }
}
exports.addStyleString = addStyleString;
