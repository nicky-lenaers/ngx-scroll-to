import { ElementRef } from '@angular/core';
import { ScrollToAnimationEasing, ScrollToAnimationEasingCollection } from './models/scroll-to-easing.model';

/**
 * Definition of Easing Colleciton.
 */
export let easing: ScrollToAnimationEasingCollection = {
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
 * Test if a given value is a string.
 *
 * @param value 					The given value
 * @returns 						Whether the given value is a string
 */
export function isString(value: string | ElementRef): value is string {
	return typeof value === 'string' || value instanceof String;
}

/**
 * Test if a given Element is the Window.
 *
 * @param container 				The given Element
 * @returns 						Whether the given Element is Window
 */
export function isWindow(container: HTMLElement | Window): container is Window {
	return container === window;
}
