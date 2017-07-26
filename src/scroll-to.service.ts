import { Injectable, ElementRef, Renderer2, PLATFORM_ID, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { ScrollToAnimationEasing } from './models/scroll-to-easing.model';
import { ScrollToAnimationOptions } from './models/scroll-to-options.model';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { stripHash, isString, isNumber, isElementRef, isWindow } from './scroll-to.helpers';
import { ScrollToTarget } from './models/scroll-to-target.model';
import { ScrollToAnimation } from './statics/scroll-to-animation';

@Injectable()
export class ScrollToService {

	private _animation: ScrollToAnimation;

	constructor(
		@Inject(DOCUMENT) private _document: any,
		@Inject(PLATFORM_ID) private _platform_id: any
	) {
	}

	/**
	 * Fire when the event proposition if fulfilled/triggered.
	 *
	 * @param event 				Native Browser Event
	 * @returns void
	 */
	public ɵonTrigger(event: Event, target: ScrollToTarget, renderer2: Renderer2, config: ScrollToAnimationOptions): void {

		const target_node = this._getTargetNode(target)

		const container = this._getFirstScrollableParent(<HTMLElement>event.target);
		const listenerTarget = this._getListenerTarget(container);

		if (this._animation) this._animation.stop();

		const is_window = isWindow(listenerTarget);
		const to: number = is_window ? target_node.offsetTop : target_node.getBoundingClientRect().top;

		this._animation = new ScrollToAnimation(container, listenerTarget, is_window, to, config, isPlatformBrowser(this._platform_id));
		const animation$: Observable<number> = this._animation.start();

		const stop_events: string[] = ['mousewheel', 'DOMMouseScroll', 'touchstart'];

		// Listen for Stop Events
		stop_events.forEach(_event => {
			renderer2.listen(listenerTarget, _event, () => this._animation && this._animation.stop());
		});
	}

	/**
	 * Find the first scrollable parent node of an element.
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
