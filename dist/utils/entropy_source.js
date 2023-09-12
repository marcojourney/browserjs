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
exports.transformSource = exports.loadSources = exports.loadSource = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const async_1 = require("./async");
const data_1 = require("./data");
function isFinalResultLoaded(loadResult) {
    return typeof loadResult !== 'function';
}
/**
 * Loads the given entropy source. Returns a function that gets an entropy component from the source.
 *
 * The result is returned synchronously to prevent `loadSources` from
 * waiting for one source to load before getting the components from the other sources.
 */
function loadSource(source, sourceOptions) {
    const sourceLoadPromise = new Promise((resolveLoad) => {
        const loadStartTime = Date.now();
        // `awaitIfAsync` is used instead of just `await` in order to measure the duration of synchronous sources
        // correctly (other microtasks won't affect the duration).
        (0, async_1.awaitIfAsync)(source.bind(null, sourceOptions), (...loadArgs) => {
            const loadDuration = Date.now() - loadStartTime;
            // Source loading failed
            if (!loadArgs[0]) {
                return resolveLoad(() => ({ error: loadArgs[1], duration: loadDuration }));
            }
            const loadResult = loadArgs[1];
            // Source loaded with the final result
            if (isFinalResultLoaded(loadResult)) {
                return resolveLoad(() => ({ value: loadResult, duration: loadDuration }));
            }
            // Source loaded with "get" stage
            resolveLoad(() => new Promise((resolveGet) => {
                const getStartTime = Date.now();
                (0, async_1.awaitIfAsync)(loadResult, (...getArgs) => {
                    const duration = loadDuration + Date.now() - getStartTime;
                    // Source getting failed
                    if (!getArgs[0]) {
                        return resolveGet({ error: getArgs[1], duration });
                    }
                    // Source getting succeeded
                    resolveGet({ value: getArgs[1], duration });
                });
            }));
        });
    });
    (0, async_1.suppressUnhandledRejectionWarning)(sourceLoadPromise);
    return function getComponent() {
        return sourceLoadPromise.then((finalizeSource) => finalizeSource());
    };
}
exports.loadSource = loadSource;
/**
 * Loads the given entropy sources. Returns a function that collects the entropy components.
 *
 * The result is returned synchronously in order to allow start getting the components
 * before the sources are loaded completely.
 *
 * Warning for package users:
 * This function is out of Semantic Versioning, i.e. can change unexpectedly. Usage is at your own risk.
 */
function loadSources(sources, sourceOptions, excludeSources) {
    const includedSources = Object.keys(sources).filter((sourceKey) => (0, data_1.excludes)(excludeSources, sourceKey));
    // Using `mapWithBreaks` allows asynchronous sources to complete between synchronous sources
    // and measure the duration correctly
    const sourceGettersPromise = (0, async_1.mapWithBreaks)(includedSources, (sourceKey) => loadSource(sources[sourceKey], sourceOptions));
    (0, async_1.suppressUnhandledRejectionWarning)(sourceGettersPromise);
    return function getComponents() {
        return __awaiter(this, void 0, void 0, function* () {
            const sourceGetters = yield sourceGettersPromise;
            const componentPromises = yield (0, async_1.mapWithBreaks)(sourceGetters, (sourceGetter) => {
                const componentPromise = sourceGetter();
                (0, async_1.suppressUnhandledRejectionWarning)(componentPromise);
                return componentPromise;
            });
            const componentArray = yield Promise.all(componentPromises);
            // Keeping the component keys order the same as the source keys order
            const components = {};
            for (let index = 0; index < includedSources.length; ++index) {
                components[includedSources[index]] = componentArray[index];
            }
            return components;
        });
    };
}
exports.loadSources = loadSources;
/**
 * Modifies an entropy source by transforming its returned value with the given function.
 * Keeps the source properties: sync/async, 1/2 stages.
 *
 * Warning for package users:
 * This function is out of Semantic Versioning, i.e. can change unexpectedly. Usage is at your own risk.
 */
function transformSource(source, transformValue) {
    const transformLoadResult = (loadResult) => {
        if (isFinalResultLoaded(loadResult)) {
            return transformValue(loadResult);
        }
        return () => {
            const getResult = loadResult();
            if ((0, async_1.isPromise)(getResult)) {
                return getResult.then(transformValue);
            }
            return transformValue(getResult);
        };
    };
    return (options) => {
        const loadResult = source(options);
        if ((0, async_1.isPromise)(loadResult)) {
            return loadResult.then(transformLoadResult);
        }
        return transformLoadResult(loadResult);
    };
}
exports.transformSource = transformSource;
