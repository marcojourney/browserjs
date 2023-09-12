"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/color-gamut
 */
function getColorGamut() {
    // rec2020 includes p3 and p3 includes srgb
    for (const gamut of ['rec2020', 'p3', 'srgb']) {
        if (matchMedia(`(color-gamut: ${gamut})`).matches) {
            return gamut;
        }
    }
    return undefined;
}
exports.default = getColorGamut;
