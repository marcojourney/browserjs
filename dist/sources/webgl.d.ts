/**
 * WebGL basic features
 */
type WebGlBasicsPayload = {
    version: string;
    vendor: string;
    vendorUnmasked: string;
    renderer: string;
    rendererUnmasked: string;
    shadingLanguageVersion: string;
};
/**
 * WebGL extended features
 */
type WebGlExtensionsPayload = {
    contextAttributes: string[];
    parameters: string[];
    shaderPrecisions: string[];
    extensions: string[] | null;
    extensionParameters: string[];
};
type CanvasContext = WebGLRenderingContext & {
    readonly canvas: HTMLCanvasElement;
};
type Options = {
    cache: {
        webgl?: {
            context: CanvasContext | undefined;
        };
    };
};
/** WebGl context is not available */
export declare const STATUS_NO_GL_CONTEXT = -1;
/** WebGL context `getParameter` method is not a function */
export declare const STATUS_GET_PARAMETER_NOT_A_FUNCTION = -2;
export type SpecialStatus = typeof STATUS_NO_GL_CONTEXT | typeof STATUS_GET_PARAMETER_NOT_A_FUNCTION;
/**
 * Gets the basic and simple WebGL parameters
 */
export declare function getWebGlBasics({ cache }: Options): WebGlBasicsPayload | SpecialStatus;
/**
 * Gets the advanced and massive WebGL parameters and extensions
 */
export declare function getWebGlExtensions({ cache }: Options): WebGlExtensionsPayload | SpecialStatus;
/**
 * This function usually takes the most time to execute in all the sources, therefore we cache its result.
 *
 * Warning for package users:
 * This function is out of Semantic Versioning, i.e. can change unexpectedly. Usage is at your own risk.
 */
export declare function getWebGLContext(cache: Options['cache']): CanvasContext | undefined;
/**
 * Some browsers print a console warning when the WEBGL_debug_renderer_info extension is requested.
 * JS Agent aims to avoid printing messages to console, so we avoid this extension in that browsers.
 */
export declare function shouldAvoidDebugRendererInfo(): boolean;
export {};
