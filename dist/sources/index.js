"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sources = void 0;
const entropy_source_1 = require("../utils/entropy_source");
const audio_1 = require("./audio");
const fonts_1 = require("./fonts");
const plugins_1 = require("./plugins");
const canvas_1 = require("./canvas");
const touch_support_1 = require("./touch_support");
const os_cpu_1 = require("./os_cpu");
const languages_1 = require("./languages");
const color_depth_1 = require("./color_depth");
const device_memory_1 = require("./device_memory");
const screen_resolution_1 = require("./screen_resolution");
const screen_frame_1 = require("./screen_frame");
const hardware_concurrency_1 = require("./hardware_concurrency");
const timezone_1 = require("./timezone");
const session_storage_1 = require("./session_storage");
const local_storage_1 = require("./local_storage");
const indexed_db_1 = require("./indexed_db");
const open_database_1 = require("./open_database");
const cpu_class_1 = require("./cpu_class");
const platform_1 = require("./platform");
const vendor_1 = require("./vendor");
const vendor_flavors_1 = require("./vendor_flavors");
const cookies_enabled_1 = require("./cookies_enabled");
const dom_blockers_1 = require("./dom_blockers");
const color_gamut_1 = require("./color_gamut");
const inverted_colors_1 = require("./inverted_colors");
const forced_colors_1 = require("./forced_colors");
const monochrome_1 = require("./monochrome");
const contrast_1 = require("./contrast");
const reduced_motion_1 = require("./reduced_motion");
const hdr_1 = require("./hdr");
const math_1 = require("./math");
const font_preferences_1 = require("./font_preferences");
const pdf_viewer_enabled_1 = require("./pdf_viewer_enabled");
const architecture_1 = require("./architecture");
const apple_pay_1 = require("./apple_pay");
const private_click_measurement_1 = require("./private_click_measurement");
const webgl_1 = require("./webgl");
/**
 * The list of entropy sources used to make visitor identifiers.
 *
 * This value isn't restricted by Semantic Versioning, i.e. it may be changed without bumping minor or major version of
 * this package.
 *
 * Note: Rollup and Webpack are smart enough to remove unused properties of this object during tree-shaking, so there is
 * no need to export the sources individually.
 */
exports.sources = {
    // READ FIRST:
    // See https://github.com/fingerprintjs/fingerprintjs/blob/master/contributing.md#how-to-make-an-entropy-source
    // to learn how entropy source works and how to make your own.
    // The sources run in this exact order.
    // The asynchronous sources are at the start to run in parallel with other sources.
    fonts: fonts_1.default,
    domBlockers: dom_blockers_1.default,
    fontPreferences: font_preferences_1.default,
    audio: audio_1.default,
    screenFrame: screen_frame_1.getRoundedScreenFrame,
    canvas: canvas_1.default,
    osCpu: os_cpu_1.default,
    languages: languages_1.default,
    colorDepth: color_depth_1.default,
    deviceMemory: device_memory_1.default,
    screenResolution: screen_resolution_1.default,
    hardwareConcurrency: hardware_concurrency_1.default,
    timezone: timezone_1.default,
    sessionStorage: session_storage_1.default,
    localStorage: local_storage_1.default,
    indexedDB: indexed_db_1.default,
    openDatabase: open_database_1.default,
    cpuClass: cpu_class_1.default,
    platform: platform_1.default,
    plugins: plugins_1.default,
    touchSupport: touch_support_1.default,
    vendor: vendor_1.default,
    vendorFlavors: vendor_flavors_1.default,
    cookiesEnabled: cookies_enabled_1.default,
    colorGamut: color_gamut_1.default,
    invertedColors: inverted_colors_1.default,
    forcedColors: forced_colors_1.default,
    monochrome: monochrome_1.default,
    contrast: contrast_1.default,
    reducedMotion: reduced_motion_1.default,
    hdr: hdr_1.default,
    math: math_1.default,
    pdfViewerEnabled: pdf_viewer_enabled_1.default,
    architecture: architecture_1.default,
    applePay: apple_pay_1.default,
    privateClickMeasurement: private_click_measurement_1.default,
    // Some sources can affect other sources (e.g. WebGL can affect canvas), so it's important to run these sources
    // after other sources.
    webGlBasics: webgl_1.getWebGlBasics,
    webGlExtensions: webgl_1.getWebGlExtensions,
};
/**
 * Loads the built-in entropy sources.
 * Returns a function that collects the entropy components to make the visitor identifier.
 */
function loadBuiltinSources(options) {
    return (0, entropy_source_1.loadSources)(exports.sources, options, []);
}
exports.default = loadBuiltinSources;
