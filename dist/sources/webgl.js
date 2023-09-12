"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shouldAvoidDebugRendererInfo = exports.getWebGLContext = exports.getWebGlExtensions = exports.getWebGlBasics = exports.STATUS_GET_PARAMETER_NOT_A_FUNCTION = exports.STATUS_NO_GL_CONTEXT = void 0;
const browser_1 = require("../utils/browser");
/** WebGl context is not available */
exports.STATUS_NO_GL_CONTEXT = -1;
/** WebGL context `getParameter` method is not a function */
exports.STATUS_GET_PARAMETER_NOT_A_FUNCTION = -2;
const validContextParameters = new Set([
    10752, 2849, 2884, 2885, 2886, 2928, 2929, 2930, 2931, 2932, 2960, 2961, 2962, 2963, 2964, 2965, 2966, 2967, 2968,
    2978, 3024, 3042, 3088, 3089, 3106, 3107, 32773, 32777, 32777, 32823, 32824, 32936, 32937, 32938, 32939, 32968, 32969,
    32970, 32971, 3317, 33170, 3333, 3379, 3386, 33901, 33902, 34016, 34024, 34076, 3408, 3410, 3411, 3412, 3413, 3414,
    3415, 34467, 34816, 34817, 34818, 34819, 34877, 34921, 34930, 35660, 35661, 35724, 35738, 35739, 36003, 36004, 36005,
    36347, 36348, 36349, 37440, 37441, 37443, 7936, 7937, 7938,
    // SAMPLE_ALPHA_TO_COVERAGE (32926) and SAMPLE_COVERAGE (32928) are excluded because they trigger a console warning
    // in IE, Chrome ≤ 59 and Safari ≤ 13 and give no entropy.
]);
const validExtensionParams = new Set([
    34047,
    35723,
    36063,
    34852,
    34853,
    34854,
    34229,
    36392,
    36795,
    38449, // MAX_VIEWS_OVR
]);
const shaderTypes = ['FRAGMENT_SHADER', 'VERTEX_SHADER'];
const precisionTypes = ['LOW_FLOAT', 'MEDIUM_FLOAT', 'HIGH_FLOAT', 'LOW_INT', 'MEDIUM_INT', 'HIGH_INT'];
const rendererInfoExtensionName = 'WEBGL_debug_renderer_info';
/**
 * Gets the basic and simple WebGL parameters
 */
function getWebGlBasics({ cache }) {
    var _a, _b, _c, _d, _e, _f;
    const gl = getWebGLContext(cache);
    if (!gl) {
        return exports.STATUS_NO_GL_CONTEXT;
    }
    if (!isValidParameterGetter(gl)) {
        return exports.STATUS_GET_PARAMETER_NOT_A_FUNCTION;
    }
    const debugExtension = shouldAvoidDebugRendererInfo() ? null : gl.getExtension(rendererInfoExtensionName);
    return {
        version: ((_a = gl.getParameter(gl.VERSION)) === null || _a === void 0 ? void 0 : _a.toString()) || '',
        vendor: ((_b = gl.getParameter(gl.VENDOR)) === null || _b === void 0 ? void 0 : _b.toString()) || '',
        vendorUnmasked: debugExtension ? (_c = gl.getParameter(debugExtension.UNMASKED_VENDOR_WEBGL)) === null || _c === void 0 ? void 0 : _c.toString() : '',
        renderer: ((_d = gl.getParameter(gl.RENDERER)) === null || _d === void 0 ? void 0 : _d.toString()) || '',
        rendererUnmasked: debugExtension ? (_e = gl.getParameter(debugExtension.UNMASKED_RENDERER_WEBGL)) === null || _e === void 0 ? void 0 : _e.toString() : '',
        shadingLanguageVersion: ((_f = gl.getParameter(gl.SHADING_LANGUAGE_VERSION)) === null || _f === void 0 ? void 0 : _f.toString()) || '',
    };
}
exports.getWebGlBasics = getWebGlBasics;
/**
 * Gets the advanced and massive WebGL parameters and extensions
 */
function getWebGlExtensions({ cache }) {
    const gl = getWebGLContext(cache);
    if (!gl) {
        return exports.STATUS_NO_GL_CONTEXT;
    }
    if (!isValidParameterGetter(gl)) {
        return exports.STATUS_GET_PARAMETER_NOT_A_FUNCTION;
    }
    const extensions = gl.getSupportedExtensions();
    const contextAttributes = gl.getContextAttributes();
    // Features
    const attributes = [];
    const parameters = [];
    const extensionParameters = [];
    const shaderPrecisions = [];
    // Context attributes
    if (contextAttributes) {
        for (const attributeName of Object.keys(contextAttributes)) {
            attributes.push(`${attributeName}=${contextAttributes[attributeName]}`);
        }
    }
    // Context parameters
    const constants = getConstantsFromPrototype(gl);
    for (const constant of constants) {
        const code = gl[constant];
        parameters.push(`${constant}=${code}${validContextParameters.has(code) ? `=${gl.getParameter(code)}` : ''}`);
    }
    // Extension parameters
    if (extensions) {
        for (const name of extensions) {
            if (name === rendererInfoExtensionName && shouldAvoidDebugRendererInfo()) {
                continue;
            }
            const extension = gl.getExtension(name);
            if (!extension) {
                continue;
            }
            for (const constant of getConstantsFromPrototype(extension)) {
                const code = extension[constant];
                extensionParameters.push(`${constant}=${code}${validExtensionParams.has(code) ? `=${gl.getParameter(code)}` : ''}`);
            }
        }
    }
    // Shader precision
    for (const shaderType of shaderTypes) {
        for (const precisionType of precisionTypes) {
            const shaderPrecision = getShaderPrecision(gl, shaderType, precisionType);
            shaderPrecisions.push(`${shaderType}.${precisionType}=${shaderPrecision.join(',')}`);
        }
    }
    // Postprocess
    extensionParameters.sort();
    parameters.sort();
    return {
        contextAttributes: attributes,
        parameters: parameters,
        shaderPrecisions: shaderPrecisions,
        extensions: extensions,
        extensionParameters: extensionParameters,
    };
}
exports.getWebGlExtensions = getWebGlExtensions;
/**
 * This function usually takes the most time to execute in all the sources, therefore we cache its result.
 *
 * Warning for package users:
 * This function is out of Semantic Versioning, i.e. can change unexpectedly. Usage is at your own risk.
 */
function getWebGLContext(cache) {
    if (cache.webgl) {
        return cache.webgl.context;
    }
    const canvas = document.createElement('canvas');
    let context;
    canvas.addEventListener('webglCreateContextError', () => (context = undefined));
    for (const type of ['webgl', 'experimental-webgl']) {
        try {
            context = canvas.getContext(type);
        }
        catch (_a) {
            // Ok, continue
        }
        if (context) {
            break;
        }
    }
    cache.webgl = { context };
    return context;
}
exports.getWebGLContext = getWebGLContext;
/**
 * https://developer.mozilla.org/en-US/docs/Web/API/WebGLShaderPrecisionFormat
 * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getShaderPrecisionFormat
 * https://www.khronos.org/registry/webgl/specs/latest/1.0/#5.12
 */
function getShaderPrecision(gl, shaderType, precisionType) {
    const shaderPrecision = gl.getShaderPrecisionFormat(gl[shaderType], gl[precisionType]);
    return shaderPrecision ? [shaderPrecision.rangeMin, shaderPrecision.rangeMax, shaderPrecision.precision] : [];
}
function getConstantsFromPrototype(obj) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const keys = Object.keys(obj.__proto__);
    return keys.filter(isConstantLike);
}
function isConstantLike(key) {
    return typeof key === 'string' && !key.match(/[^A-Z0-9_x]/);
}
/**
 * Some browsers print a console warning when the WEBGL_debug_renderer_info extension is requested.
 * JS Agent aims to avoid printing messages to console, so we avoid this extension in that browsers.
 */
function shouldAvoidDebugRendererInfo() {
    return (0, browser_1.isGecko)();
}
exports.shouldAvoidDebugRendererInfo = shouldAvoidDebugRendererInfo;
/**
 * Some unknown browsers have no `getParameter` method
 */
function isValidParameterGetter(gl) {
    return typeof gl.getParameter === 'function';
}
