"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("../utils/data");
/**
 * This is a crude and primitive touch screen detection. It's not possible to currently reliably detect the availability
 * of a touch screen with a JS, without actually subscribing to a touch event.
 *
 * @see http://www.stucox.com/blog/you-cant-detect-a-touchscreen/
 * @see https://github.com/Modernizr/Modernizr/issues/548
 */
function getTouchSupport() {
    const n = navigator;
    let maxTouchPoints = 0;
    let touchEvent;
    if (n.maxTouchPoints !== undefined) {
        maxTouchPoints = (0, data_1.toInt)(n.maxTouchPoints);
    }
    else if (n.msMaxTouchPoints !== undefined) {
        maxTouchPoints = n.msMaxTouchPoints;
    }
    try {
        document.createEvent('TouchEvent');
        touchEvent = true;
    }
    catch (_a) {
        touchEvent = false;
    }
    const touchStart = 'ontouchstart' in window;
    return {
        maxTouchPoints,
        touchEvent,
        touchStart,
    };
}
exports.default = getTouchSupport;
