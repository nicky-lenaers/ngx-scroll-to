import { ElementRef } from '@angular/core';

import { ScrollToAnimationEasingCollection } from './scroll-to-easing.interface';
import { ScrollToDefaultConfigOptions } from './scroll-to-config.interface';

/** Default values for Component Input */
export const DEFAULTS: ScrollToDefaultConfigOptions = {
  target: null,
  action: 'click',
  duration: 650,
  easing: 'easeInOutQuad',
  offset: 0,
  offsetMap: new Map()
};

/** Easing Colleciton */
export const EASING: ScrollToAnimationEasingCollection = {
  easeInQuad: (time: number) => {
    return time * time;
  },
  easeOutQuad: (time: number) => {
    return time * (2 - time);
  },
  easeInOutQuad: (time: number) => {
    return time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time;
  },
  easeInCubic: (time: number) => {
    return time * time * time;
  },
  easeOutCubic: (time: number) => {
    return (--time) * time * time + 1;
  },
  easeInOutCubic: (time: number) => {
    return time < 0.5 ? 4 * time * time * time : (time - 1) * (2 * time - 2) * (2 * time - 2) + 1;
  },
  easeInQuart: (time: number) => {
    return time * time * time * time;
  },
  easeOutQuart: (time: number) => {
    return 1 - (--time) * time * time * time;
  },
  easeInOutQuart: (time: number) => {
    return time < 0.5 ? 8 * time * time * time * time : 1 - 8 * (--time) * time * time * time;
  },
  easeInQuint: (time: number) => {
    return time * time * time * time * time;
  },
  easeOutQuint: (time: number) => {
    return 1 + (--time) * time * time * time * time;
  },
  easeInOutQuint: (time: number) => {
    return time < 0.5 ? 16 * time * time * time * time * time : 1 + 16 * (--time) * time * time * time * time;
  },
  easeOutElastic: (time: number) => {
    return Math.pow(2, -10 * time) * Math.sin((time - 1 / 4) * (2 * Math.PI) / 1) + 1;
  }
};

/**
 * Set of allowed events as triggers
 * for the Animation to start.
 */
export const EVENTS: string[] = [
  'click',
  'mouseenter',
  'mouseover',
  'mousedown',
  'mouseup',
  'dblclick',
  'contextmenu',
  'wheel',
  'mouseleave',
  'mouseout'
];

/**
 * Strip hash (#) from value.
 *
 * @param value 				The given string value
 * @returns 					The stripped string value
 */
export function stripHash(value: string): string {
  return value.substring(0, 1) === '#' ? value.substring(1) : value;
}

/**
 * Test if a given value is a string.
 *
 * @param value 					The given value
 * @returns 						Whether the given value is a string
 */
export function isString(value: any): value is string {
  return typeof value === 'string' || value instanceof String;
}

/**
 * Test if a given Element is the Window.
 *
 * @param container 				The given Element
 * @returns 						Whether the given Element is Window
 */
export function isWindow(container: any): container is Window {
  return container === window;
}

/**
 * Test if a given value is of type ElementRef.
 *
 * @param value 					The given value
 * @returns               Whether the given value is a number
 */
export function isElementRef(value: any): value is ElementRef {
  return value instanceof ElementRef;
}

/**
 * Whether or not the given value is a Native Element.
 *
 * @param value           The given value
 * @returns               Whether or not the value is a Native Element
 */
export function isNativeElement(value: any): value is HTMLElement {
  return value instanceof HTMLElement;
}

/**
 * Test if a given value is type number.
 *
 * @param value 					The given value
 * @returns 						Whether the given value is a number
 */
export function isNumber(value: any): value is number {
  return !isNaN(parseFloat(value)) && isFinite(value);
}
