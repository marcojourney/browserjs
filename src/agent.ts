import version from '../package.json'
import { requestIdleCallbackIfAvailable } from './utils/async'
import { SourcesToComponents, UnknownComponents } from './utils/entropy_source'
import { x64hash128 } from './utils/hashing'
import { errorToObject } from './utils/misc'
import loadBuiltinSources, { BuiltinComponents } from './sources'
import getConfidence, { Confidence } from './confidence'

/**
 * Options for Fingerprint class loading
 */
export interface LoadOptions {
  /**
   * When browser doesn't support `requestIdleCallback` a `setTimeout` will be used. This number is only for Safari and
   * old Edge, because Chrome/Blink based browsers support `requestIdleCallback`. The value is in milliseconds.
   * @default 50
   */
  delayFallback?: number
  /**
   * Whether to print debug messages to the console.
   * Required to ease investigations of problems.
   */
  debug?: boolean
  /**
   * Set `false` to disable the unpersonalized AJAX request that the agent sends to collect installation statistics.
   * It's always disabled in the version published to the FingerprintJS CDN.
   */
  monitoring?: boolean
}

/**
 * Options for getting visitor identifier
 */
export interface GetOptions {
  /**
   * Whether to print debug messages to the console.
   *
   * @deprecated Use the `debug` option of `load()` instead
   */
  debug?: boolean
}

/**
 * Result of getting a visitor identifier
 */
export interface GetResult {
  /**
   * The visitor identifier
   */
  visitorId: string
  /**
   * A confidence score that tells how much the agent is sure about the visitor identifier
   */
  confidence: Confidence
  /**
   * List of components that has formed the visitor identifier.
   *
   * Warning! The type of this property is specific but out of Semantic Versioning, i.e. may have incompatible changes
   * within a major version. If you want to avoid breaking changes, treat the property as having type
   * `UnknownComponents` that is more generic but guarantees backward compatibility within a major version.
   */
  components: BuiltinComponents
  /**
   * The fingerprinting algorithm version
   *
   * @see https://github.com/fingerprintjs/fingerprintjs#version-policy For more details
   */
  version: string
}

/**
 * Agent object that can get visitor identifier
 */
export interface Agent {
  /**
   * Gets the visitor identifier
   */
  get(options?: Readonly<GetOptions>): Promise<GetResult>
}

function componentsToCanonicalString(components: UnknownComponents) {
  let result = ''
  for (const componentKey of Object.keys(components).sort()) {
    const component = components[componentKey]
    const value = 'error' in component ? 'error' : JSON.stringify(component.value)
    result += `${result ? '|' : ''}${componentKey.replace(/([:|\\])/g, '\\$1')}:${value}`
  }
  return result
}

export function componentsToDebugString(components: UnknownComponents): string {
  return JSON.stringify(
    components,
    (_key, value) => {
      if (value instanceof Error) {
        return errorToObject(value)
      }
      return value
    },
    2,
  )
}

export function hashComponents(components: UnknownComponents): string {
  return x64hash128(componentsToCanonicalString(components))
}

/**
 * Makes a GetResult implementation that calculates the visitor id hash on demand.
 * Designed for optimisation.
 */
function makeLazyGetResult(components: BuiltinComponents): GetResult {
  let visitorIdCache: string | undefined

  // This function runs very fast, so there is no need to make it lazy
  const confidence = getConfidence(components)

  // A plain class isn't used because its getters and setters aren't enumerable.
  return {
    get visitorId(): string {
      if (visitorIdCache === undefined) {
        visitorIdCache = hashComponents(this.components)
      }
      return visitorIdCache
    },
    set visitorId(visitorId: string) {
      visitorIdCache = visitorId
    },
    confidence,
    components,
    version,
  }
}

/**
 * A delay is required to ensure consistent entropy components.
 * See https://github.com/fingerprintjs/fingerprintjs/issues/254
 * and https://github.com/fingerprintjs/fingerprintjs/issues/307
 * and https://github.com/fingerprintjs/fingerprintjs/commit/945633e7c5f67ae38eb0fea37349712f0e669b18
 */
export function prepareForSources(delayFallback = 50): Promise<void> {
  // A proper deadline is unknown. Let it be twice the fallback timeout so that both cases have the same average time.
  return requestIdleCallbackIfAvailable(delayFallback, delayFallback * 2)
}

/**
 * The function isn't exported from the index file to not allow to call it without `load()`.
 * The hiding gives more freedom for future non-breaking updates.
 *
 * A factory function is used instead of a class to shorten the attribute names in the minified code.
 * Native private class fields could've been used, but TypeScript doesn't allow them with `"target": "es5"`.
 */
function makeAgent(getComponents: () => Promise<BuiltinComponents>, debug?: boolean): Agent {
  // const creationTime = Date.now()

  return {
    async get(options) {
      // const startTime = Date.now()
      const components = await getComponents();
      
      const result = makeLazyGetResult(components)
      // console.log('components:', components);
      // console.log('result:', result);
      // if (debug || options?.debug) {
      //  console.log(`Copy the text below to get the debug data:
      //     \`\`\`
      //       version: ${result.version}
      //       userAgent: ${navigator.userAgent}
      //       timeBetweenLoadAndGet: ${startTime - creationTime}
      //       visitorId: ${result.visitorId}
      //       components: ${componentsToDebugString(components)}
      //     \`\`\``
      //   )
      // }

      return result
    },
  }
}

/**
 * 
 * @param getComponents 
 * @returns 
 */
function makeAttributes(getComponents: () => Promise<BuiltinComponents>): BuiltinComponents {
  return {
    async get(options) {
      const components = await getComponents();

      return components;
    },
  }
}

/**
 * Sends an unpersonalized AJAX request to collect installation statistics
 */
function monitor() {
  // The FingerprintJS CDN (https://github.com/fingerprintjs/cdn) replaces `window.__fpjs_d_m` with `true`
  if (window.__fpjs_d_m || Math.random() >= 0.001) {
    return
  }
  try {
    const request = new XMLHttpRequest()
    request.open('get', `https://m1.openfpcdn.io/fingerprintjs/v${version}/npm-monitoring`, true)
    request.send()
  } catch (error) {
    // console.error is ok here because it's an unexpected error handler
    // eslint-disable-next-line no-console
    console.error(error)
  }
}

/**
 * Builds an instance of Agent and waits a delay required for a proper operation.
 */
export async function load({ delayFallback, debug, monitoring = true }: Readonly<LoadOptions> = {}): Promise<Agent> {
  if (monitoring) {
    monitor()
  }
  await prepareForSources(delayFallback)

  /**
   * - applePay: { value: -1, duration: 0 }
   * - architecture: { value: 255, duration: 0 }
   * - audio: { value: 124.04347527516074, duration: 2 }
   * - canvas: { value: {...}, duration: 44 }
   * - colorDepth: { value: 24, duration: 0 }
   * - colorGamut: { value: 'srgb', duration: 0 }
   * - contrast: { value: 0, duration: 0 }
   * - cookiesEnabled: { value: true, duration: 1 }
   * - cpuClass: { value: undefined, duration: 0 }
   * - deviceMemory: { value: 8, duration: 0 }
   * - domBlockers: { value: undefined, duration: 34 }
   * - fontPreferences: { value: {...}, duration: 35 }
   * - fonts: { value: Array(18), duration: 48 }
   * - forcedColors: { value: false, duration: 0 }
   * - hardwareConcurrency: { value: 12, duration: 0 }
   * - hdr: { value: false, duration: 0 }
   * - indexedDB: { value: true, duration: 0 }
   * - invertedColors: { value: undefined, duration: 0 }
   * - languages: { value: Array(1), duration: 0 }
   * - localStorage: { value: true, duration: 0 }
   * - math: { value: {...}, duration: 0 }
   * - monochrome: { value: 0, duration: 0 }
   * - openDatabase: { value: true, duration: 0 }
   * - osCpu: { value: undefined, duration: 0 }
   * - pdfViewerEnabled: { value: true, duration: 0 }
   * - platform: { value: 'Win32', duration: 0 }
   * - plugins: { value: Array(5), duration: 0 }
   * - privateClickMeasurement: { value: undefined, duration: 0 }
   * - reducedMotion: { value: false, duration: 0 }
   * - screenFrame: { value: Array(4), duration: 0 }
   * - screenResolution: { value: Array(2), duration: 0 }
   * - sessionStorage: { value: true, duration: 0 }
   * - timezone: { value: 'Asia/Bangkok', duration: 0 }
   * - touchSupport: { value: {...}, duration
  */
  const getComponents = loadBuiltinSources({ cache: {}, debug })

  return makeAgent(getComponents, debug)
}

/**
 * Generate browser attributes base on browser behaviors.
 */
export async function getAttributes({ delayFallback }: Readonly<LoadOptions> = {}): Promise<BuiltinComponents> {
  await prepareForSources(delayFallback)

  const getComponents = loadBuiltinSources({ cache: {} })

  return makeAttributes(getComponents)
}

/**
 * 
 * @param attributes 
 * @returns 
 */
export function getVisitorId(attributes: SourcesToComponents): string {
  const result = makeLazyGetResult(attributes)
  return result?.visitorId
}
