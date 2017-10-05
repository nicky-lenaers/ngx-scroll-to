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

/**
 * The ScrollToService handles starting, interrupting
 * and ending the actual Scroll Animation. It provides
 * some utilities to find the proper HTML Element on a
 * given page to setup Event Listeners and calculate
 * distances for the Animation.
 */
@Injectable()
export class ScrollToService {

  /**
   * The animation that provides the scrolling
   * to happen smoothly over time. Defining it here
   * allows for usage of e.g. `start` and `stop`
   * methods within this Angular Service.
   */
  private _animation: ScrollToAnimation;

  /**
   * Construct and setup required paratemeters
   * @param _document         A Reference to the Document
   * @param _platformId       Angular Platform ID
   */
  constructor(
    @Inject(DOCUMENT) private _document: any,
    @Inject(PLATFORM_ID) private _platformId: any
  ) { }

  /**
   * Target an Element to scroll to. Notice that the `TimeOut` decorator
   * ensures the executing to take place in the next Angular lifecycle.
   * This allows for scrolling to elements that are e.g. initially hidden
   * by means of `*ngIf`, but ought to be scrolled to eventually.
   *
   * @todo type 'any' in Observable should become custom type like 'ScrollToEvent' (base class), see issue comment:
   * 	- https://github.com/nicky-lenaers/ngx-scroll-to/issues/10#issuecomment-317198481
   *
   * @param event         Native Browser Event
   * @param config        Configuration Object
   * @returns             Observable
   */
  @TimeOut()
  public scrollTo(config: ScrollToConfig, event: any = null): Observable<any> {

    if (!isPlatformBrowser(this._platformId)) return new ReplaySubject().asObservable();

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
    const mergedConfig = mergeConfigWithDefaults(config);

    if (this._animation) this._animation.stop();

    /**
     * @todo improve interface here, as it shouldn't allow ".container"
     * @todo abstract into a function 'getContainer'
     */
    let container: HTMLElement;

    if (mergedConfig.container) {
      container = this._document.getElementById(container);
      // always get container
    } else if (event) {
      container = this._getFirstScrollableParent(event.target as HTMLElement);
    } else {
      // no container and no event, throw error
      throw new Error('Unable to get Container Element');
    }

    const targetNode = this._getTargetNode(mergedConfig.target);
    const listenerTarget = this._getListenerTarget(container);
    const to: number = isWindow(listenerTarget) ? targetNode.offsetTop : targetNode.getBoundingClientRect().top;

    // Create Animation
    this._animation = new ScrollToAnimation(container, listenerTarget, isWindow(listenerTarget), to, mergedConfig, isPlatformBrowser(this._platformId));

    /**
     * @todo rename to interruptableEvents
     */
    const interruptiveEvents: string[] = ['mousewheel', 'DOMMouseScroll', 'touchstart'];
    const onInterrupt = () => this._animation.stop();

    // Add Stop Event Listeners
    this._addInterruptiveEventListeners(interruptiveEvents, listenerTarget, onInterrupt);

    // Start Animation
    const animation$ = this._animation.start();

    /**
     * @todo move into its own function. Since the `animation$` source
     * is returned, we can listen for events in the Directive to emit
     * to HTML attributes. The source can then be used inside a service
     * to subscribe to.
     */
    const subscription = animation$
      .subscribe(
        () => { },
        () => { },
        () => {
          this._removeInterruptiveEventListeners(interruptiveEvents, listenerTarget, onInterrupt);
          subscription.unsubscribe();
        }
      );

    return animation$;
  }

  /**
   * Add listeners for the Animation Interruptive Events
   * to the Listener Target.
   *
   * @param events            List of events to listen to
   * @param listenerTarget    Target to attach the listener on
   * @param handler           Handler for when the listener fires
   * @returns                 Void
   */
  private _addInterruptiveEventListeners(
    events: string[],
    listenerTarget: ScrollToListenerTarget,
    handler: EventListenerOrEventListenerObject): void {

    events.forEach(event => listenerTarget.addEventListener(event, handler));
  }

  /**
   * Remove listeners for the Animation Interrupt Event from
   * the Listener Target. Specifying the correct handler prevents
   * memory leaks and makes the allocated memory available for
   * Garbage Collection.
   *
   * @param events            List of Interruptive Events to remove
   * @param listenerTarget    Target to attach the listener on
   * @param handler           Handler for when the listener fires
   * @returns                 Void
   */
  private _removeInterruptiveEventListeners(
    events: string[],
    listenerTarget: ScrollToListenerTarget,
    handler: EventListenerOrEventListenerObject): void {

    events.forEach(event => listenerTarget.removeEventListener(event, handler));
  }

  /**
   * Find the first scrollable parent Node of a
   * given Element.
   *
   * @param nativeElement     The Element to search the DOM Tree upwards from
   * @returns                 The first scrollable parent HTML Element
   */
  private _getFirstScrollableParent(nativeElement: HTMLElement): HTMLElement {

    let style: CSSStyleDeclaration = window.getComputedStyle(nativeElement);

    const overflowRegex: RegExp = /(auto|scroll)/;

    if (style.position === 'fixed') throw new Error(`Scroll item cannot be positioned 'fixed'`);

    // Recursive Loop Parents
    for (let parent = nativeElement; parent = parent.parentElement; null) {

      // Recalculate Style
      style = window.getComputedStyle(parent);

      /**
       * @todo simplify/combine if statements
       */
      if (style.position === 'absolute') continue;
      if (style.overflow === 'hidden' || style.overflowY === 'hidden') continue;
      if (overflowRegex.test(style.overflow + style.overflowY + style.overflowX)) return parent;
      if (parent.tagName === 'BODY') return parent;
    }

    throw new Error(`No scrollable parent found for element ${nativeElement.nodeName}`);
  }

  /**
   * Get the Target Node to scroll to.
   *
   * @param id          The given ID of the node, either a string or an element reference
   * @returns           The Target Node to scroll to
   */
  private _getTargetNode(id: ScrollToTarget): HTMLElement {

    let targetNode: HTMLElement;

    if (isString(id)) {

      targetNode = this._document.getElementById(stripHash(id));

    } else if (isNumber(id)) {

      targetNode = this._document.getElementById(String(id));

    } else if (isElementRef(id)) {

      targetNode = id.nativeElement;

    }

    if (!targetNode) throw new Error('Unable to find Target Element');

    return targetNode;

  }

  /**
   * Retrieve the Listener target. This Listener Target is used
   * to attach Event Listeners on. In case of the target being
   * the Document Body, we need the actual `window` to listen
   * for events.
   *
   * @param container           The HTML Container element
   * @returns                   The Listener Target to attach events on
   */
  private _getListenerTarget(container: HTMLElement): ScrollToListenerTarget {
    return container.tagName.toUpperCase() === 'BODY' ? window : container;
  }

}
