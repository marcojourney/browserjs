export type TouchSupport = {
    maxTouchPoints: number;
    /** The success or failure of creating a TouchEvent */
    touchEvent: boolean;
    /** The availability of the "ontouchstart" property */
    touchStart: boolean;
};
/**
 * This is a crude and primitive touch screen detection. It's not possible to currently reliably detect the availability
 * of a touch screen with a JS, without actually subscribing to a touch event.
 *
 * @see http://www.stucox.com/blog/you-cant-detect-a-touchscreen/
 * @see https://github.com/Modernizr/Modernizr/issues/548
 */
export default function getTouchSupport(): TouchSupport;
