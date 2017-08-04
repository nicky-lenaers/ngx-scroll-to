import { Injectable, ElementRef, Renderer2, PLATFORM_ID, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { ScrollToAnimationEasing } from './models/scroll-to-easing.model';
import { ScrollToConfigOptions } from './models/scroll-to-options.model';
import { ScrollToTarget } from './models/scroll-to-target.model';
import { ScrollToAnimation } from './statics/scroll-to-animation';
import {
	stripHash,
	isString,
	isNumber,
	isElementRef,
	isWindow,
	mergeConfigWithDefaults
} from './statics/scroll-to-helpers';

@Injectable()
export class ScrollToService {

	private _animation: ScrollToAnimation;

	constructor(
		@Inject(DOCUMENT) private _document: any,
		@Inject(PLATFORM_ID) private _platform_id: any
	) {
	}

	/**
	 * Target an Element to scroll to.
	 *
	 * @todo implement
	 * @todo use setTimeout hack here (or better yet, decorator), because it is not triggered from inside directive (where the hack currently resides)
	 * @experimental
	 *
	 * @param event 				Native Browser Event
	 * @param config 				Configuration Object
	 * @returns 					Observable
	 */
	public scrollTo(event: Event, config: ScrollToConfigOptions): Observable<any> { // @todo type 'any' should become ScrollToEvent (base class)

		if (!isPlatformBrowser(this._platform_id)) return new Observable();

		this._document.addEventListener('mousewheel', () => {
			console.log('clicked');
		});

		return this._start(event, config);
	}

	/**
	 * Start a new Animation.
	 *
	 * @todo fix listeners using NOT the renderer2, just native window event listeners
	 * @todo pass events to 'start' function, s.t. in the animation the eventListeners can be removed
	 */
	private _start(event: Event, config: ScrollToConfigOptions): Observable<number> {

		// Merge config with default values
		const merged_config = mergeConfigWithDefaults(config);

		console.log(merged_config);
		if (this._animation) this._animation.stop();

		const container = this._getFirstScrollableParent(event.target as HTMLElement);
		const target_node = this._getTargetNode(merged_config.target);
		const listenerTarget = this._getListenerTarget(container);
		const is_window = isWindow(listenerTarget);
		const to: number = is_window ? target_node.offsetTop : target_node.getBoundingClientRect().top;

		this._animation = new ScrollToAnimation(container, listenerTarget, is_window, to, merged_config, isPlatformBrowser(this._platform_id));

		const stop_events: string[] = ['mousewheel', 'DOMMouseScroll', 'touchstart'];

		stop_events.forEach(_event => {
			// renderer2.listen(listenerTarget, _event, () => this._animation && this._animation.stop());
		});

		return this._animation.start();
	}

	/**
	 * Find the first scrollable parent node of an element.
	 *
	 * @todo remove overflow_regex pattern? this is just returning the parent even when it is hidden.
	 * 	this test is done earlier in the function already.
	 *
	 * @param nativeElement 			The element to search from
	 * @param includeHidden 			Whether to include hidden elements or not
	 * @return 							The first scrollable parent element
	 */
	private _getFirstScrollableParent(nativeElement: HTMLElement, includeHidden: boolean = true): HTMLElement {

		let style: CSSStyleDeclaration = window.getComputedStyle(nativeElement);

		const overflow_regex: RegExp = includeHidden ? /(auto|scroll|hidden)/ : /(auto|scroll)/;

		if (style.position === 'fixed') throw new Error(`Scroll item cannot be positioned 'fixed'`);

		// Recursive Loop Parents
		for (let parent = nativeElement; parent = parent.parentElement; null) {

			// Recalculate Style
			style = window.getComputedStyle(parent);

			// Skip Absolute Positioning
			if (style.position === 'absolute') continue;

			// Skip Hidden Overflow
			if (style.overflow === 'hidden' || style.overflowY === 'hidden') continue;

			// Return Body
			if (parent.tagName === 'BODY') return parent;

			// Test Overflow
			if (overflow_regex.test(style.overflow + style.overflowY + style.overflowX)) return parent;
		}

		throw new Error(`No scrollable parent found for element ${nativeElement.nodeName}`);
	}

	/**
	 * Get the Target Node to scroll to.
	 *
	 * @todo support nativeElement too
	 *
	 * @param id 			The given ID of the node, either a string or an element reference
	 * @returns 			Target Node
	 */
	private _getTargetNode(id: ScrollToTarget): HTMLElement {

		let node: HTMLElement;

		if (isString(id)) {

			node = this._document.getElementById(stripHash(id));

		} else if (isNumber(id)) {

			node = this._document.getElementById(String(id));

		} else if(isElementRef(id)) {

			node = id.nativeElement;

		} else {
			throw new Error(`Unable to find target Element with value ${id}`);
		}

		return node;

	}

	/**
	 * Retrieve the Listener target.
	 *
	 * @param container 				The HTML Container element
	 * @returns 						Listener
	 */
	private _getListenerTarget(container: HTMLElement): HTMLElement | Window {
		return container.tagName === 'BODY' ? window : container;
	}

}
