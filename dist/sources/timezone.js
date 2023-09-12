"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("../utils/data");
function getTimezone() {
    var _a;
    const DateTimeFormat = (_a = window.Intl) === null || _a === void 0 ? void 0 : _a.DateTimeFormat;
    if (DateTimeFormat) {
        const timezone = new DateTimeFormat().resolvedOptions().timeZone;
        if (timezone) {
            return timezone;
        }
    }
    // For browsers that don't support timezone names
    // The minus is intentional because the JS offset is opposite to the real offset
    const offset = -getTimezoneOffset();
    return `UTC${offset >= 0 ? '+' : ''}${Math.abs(offset)}`;
}
exports.default = getTimezone;
function getTimezoneOffset() {
    const currentYear = new Date().getFullYear();
    // The timezone offset may change over time due to daylight saving time (DST) shifts.
    // The non-DST timezone offset is used as the result timezone offset.
    // Since the DST season differs in the northern and the southern hemispheres,
    // both January and July timezones offsets are considered.
    return Math.max(
    // `getTimezoneOffset` returns a number as a string in some unidentified cases
    (0, data_1.toFloat)(new Date(currentYear, 0, 1).getTimezoneOffset()), (0, data_1.toFloat)(new Date(currentYear, 6, 1).getTimezoneOffset()));
}
