import { Injectable, ElementRef, PLATFORM_ID, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { TimeOut } from './decorators/scroll-to-timeout.decorator';
import { ScrollToAnimationEasing } from './models/scroll-to-easing.model';
import { ScrollToConfig } from './models/scroll-to-config.model';
import { ScrollToTarget } from './models/scroll-to-targets.model';
import { ScrollToListenerTarget } from './models/scroll-to-targets.model';
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
	 * @todo type 'any' in Observable should become custom type like 'ScrollToEvent' (base class), see issue comment:
	 * 	- https://github.com/nicky-lenaers/ngx-scroll-to/issues/10#issuecomment-317198481
	 *
	 * @param event         Native Browser Event
	 * @param config        Configuration Object
	 * @returns             Observable
	 */
  @TimeOut()
  public scrollTo(event: any, config: ScrollToConfig): Observable<any> {

    if (!isPlatformBrowser(this._platform_id)) return new ReplaySubject().asObservable();

    return this._start(event, config);
  }

	/**
	 * Start a new Animation.
	 *
	 * @todo Emit proper events from subscription
	 *
	 * @param event         Native Browser Event
	 * @param config        Configuration Object
	 * @returns             Observable
	 */
  private _start(event: any, config: ScrollToConfig): Observable<number> {

    // Merge config with default values
    const merged_config = mergeConfigWithDefaults(config);

    if (this._animation) this._animation.stop();

    const container = this._getFirstScrollableParent(event.target as HTMLElement);
    const target_node = this._getTargetNode(merged_config.target);
    const listenerTarget = this._getListenerTarget(container);
    const is_window = isWindow(listenerTarget);
    const to: number = is_window ? target_node.offsetTop : target_node.getBoundingClientRect().top;

    // Create Animation
    this._animation = new ScrollToAnimation(container, listenerTarget, is_window, to, merged_config, isPlatformBrowser(this._platform_id));

    const stop_events: string[] = ['mousewheel', 'DOMMouseScroll', 'touchstart'];
    const stop_event_handler = () => this._animation.stop();

    // Add Stop Event Listeners
    this._addStopEventListeners(stop_events, listenerTarget, stop_event_handler);

    // Start Animation
    const animation$ = this._animation.start();

    const subscription = animation$
      .subscribe(
      () => { },
      () => { },
      () => {
        this._removeStopEventListeners(stop_events, listenerTarget, stop_event_handler);
        subscription.unsubscribe();
      }
      );

    return animation$;
  }

	/**
	 * Add listeners for the Animation Stop Event.
	 *
	 * @param events            List of events to listen to
	 * @param listenerTarget    Target to attach the listener on
	 * @param handler           Handler for when the listener fires
	 * @returns                 void
	 */
  private _addStopEventListeners(events: string[], listenerTarget: ScrollToListenerTarget, handler: EventListenerOrEventListenerObject): void {
    events.forEach(event => listenerTarget.addEventListener(event, handler));
  }

	/**
	 * Remove listeners for the Animation Stop Event.
	 *
	 * @param events            List of events to listen to
	 * @param listenerTarget    Target to attach the listener on
	 * @param handler           Handler for when the listener fires
	 * @returns                 void
	 */
  private _removeStopEventListeners(events: string[], listenerTarget: ScrollToListenerTarget, handler: EventListenerOrEventListenerObject): void {
    events.forEach(event => listenerTarget.removeEventListener(event, handler));
  }

	/**
	 * Find the first scrollable parent node of an element.
	 *
	 * @param nativeElement     The element to search from
	 * @return                  The first scrollable parent element
	 */
  private _getFirstScrollableParent(nativeElement: HTMLElement): HTMLElement {

    let style: CSSStyleDeclaration = window.getComputedStyle(nativeElement);

    const overflow_regex: RegExp = /(auto|scroll)/;

    if (style.position === 'fixed') throw new Error(`Scroll item cannot be positioned 'fixed'`);

    // Recursive Loop Parents
    for (let parent = nativeElement; parent = parent.parentElement; null) {

      // Recalculate Style
      style = window.getComputedStyle(parent);

      // Skip Absolute Positioning
      if (style.position === 'absolute') continue;

      // Skip Hidden Overflow
      if (style.overflow === 'hidden' || style.overflowY === 'hidden') continue;

      // Test Overflow
      if (overflow_regex.test(style.overflow + style.overflowY + style.overflowX)) return parent;

      // Return Body
      if (parent.tagName === 'BODY') return parent;
    }

    throw new Error(`No scrollable parent found for element ${nativeElement.nodeName}`);
  }

	/**
	 * Get the Target Node to scroll to.
	 *
	 * @param id          The given ID of the node, either a string or an element reference
	 * @returns           Target Node
	 */
  private _getTargetNode(id: ScrollToTarget): HTMLElement {

    let target_node: HTMLElement;

    if (isString(id)) {

      target_node = this._document.getElementById(stripHash(id));

    } else if (isNumber(id)) {

      target_node = this._document.getElementById(String(id));

    } else if (isElementRef(id)) {

      target_node = id.nativeElement;

    }

    if (!target_node) throw new Error('Unable to find Target Element');

    return target_node;

  }

	/**
	 * Retrieve the Listener target.
	 *
	 * @param container           The HTML Container element
	 * @returns                   Listener
	 */
  private _getListenerTarget(container: HTMLElement): ScrollToListenerTarget {
    return container.tagName.toUpperCase() === 'BODY' ? window : container;
  }

}
