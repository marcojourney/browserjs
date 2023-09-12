"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUTF8Bytes = exports.withIframe = exports.transformSource = exports.loadSources = exports.isDesktopSafari = exports.isGecko = exports.isWebKit = exports.isChromium = exports.isEdgeHTML = exports.isTrident = exports.isAndroid = exports.getFullscreenElement = exports.getWebGLContext = exports.handleApplePayError = exports.getScreenFrame = exports.sources = exports.prepareForSources = exports.murmurX64Hash128 = exports.componentsToDebugString = exports.hashComponents = exports.getVisitorId = exports.getAttributes = exports.load = void 0;
const agent_1 = require("./agent");
Object.defineProperty(exports, "load", { enumerable: true, get: function () { return agent_1.load; } });
Object.defineProperty(exports, "getAttributes", { enumerable: true, get: function () { return agent_1.getAttributes; } });
Object.defineProperty(exports, "getVisitorId", { enumerable: true, get: function () { return agent_1.getVisitorId; } });
Object.defineProperty(exports, "hashComponents", { enumerable: true, get: function () { return agent_1.hashComponents; } });
Object.defineProperty(exports, "componentsToDebugString", { enumerable: true, get: function () { return agent_1.componentsToDebugString; } });
const hashing_1 = require("./utils/hashing");
// The default export is a syntax sugar (`import * as FP from '...' → import FP from '...'`).
// It should contain all the public exported values.
exports.default = { load: agent_1.load, hashComponents: agent_1.hashComponents, componentsToDebugString: agent_1.componentsToDebugString };
// The exports below are for private usage. They may change unexpectedly. Use them at your own risk.
/** Not documented, out of Semantic Versioning, usage is at your own risk */
exports.murmurX64Hash128 = hashing_1.x64hash128;
var agent_2 = require("./agent");
Object.defineProperty(exports, "prepareForSources", { enumerable: true, get: function () { return agent_2.prepareForSources; } });
var sources_1 = require("./sources");
Object.defineProperty(exports, "sources", { enumerable: true, get: function () { return sources_1.sources; } });
var screen_frame_1 = require("./sources/screen_frame");
Object.defineProperty(exports, "getScreenFrame", { enumerable: true, get: function () { return screen_frame_1.getScreenFrame; } });
var apple_pay_1 = require("./sources/apple_pay");
Object.defineProperty(exports, "handleApplePayError", { enumerable: true, get: function () { return apple_pay_1.getStateFromError; } });
var webgl_1 = require("./sources/webgl");
Object.defineProperty(exports, "getWebGLContext", { enumerable: true, get: function () { return webgl_1.getWebGLContext; } });
var browser_1 = require("./utils/browser");
Object.defineProperty(exports, "getFullscreenElement", { enumerable: true, get: function () { return browser_1.getFullscreenElement; } });
Object.defineProperty(exports, "isAndroid", { enumerable: true, get: function () { return browser_1.isAndroid; } });
Object.defineProperty(exports, "isTrident", { enumerable: true, get: function () { return browser_1.isTrident; } });
Object.defineProperty(exports, "isEdgeHTML", { enumerable: true, get: function () { return browser_1.isEdgeHTML; } });
Object.defineProperty(exports, "isChromium", { enumerable: true, get: function () { return browser_1.isChromium; } });
Object.defineProperty(exports, "isWebKit", { enumerable: true, get: function () { return browser_1.isWebKit; } });
Object.defineProperty(exports, "isGecko", { enumerable: true, get: function () { return browser_1.isGecko; } });
Object.defineProperty(exports, "isDesktopSafari", { enumerable: true, get: function () { return browser_1.isDesktopSafari; } });
var entropy_source_1 = require("./utils/entropy_source");
Object.defineProperty(exports, "loadSources", { enumerable: true, get: function () { return entropy_source_1.loadSources; } });
Object.defineProperty(exports, "transformSource", { enumerable: true, get: function () { return entropy_source_1.transformSource; } });
var dom_1 = require("./utils/dom");
Object.defineProperty(exports, "withIframe", { enumerable: true, get: function () { return dom_1.withIframe; } });
var data_1 = require("./utils/data");
Object.defineProperty(exports, "getUTF8Bytes", { enumerable: true, get: function () { return data_1.getUTF8Bytes; } });
