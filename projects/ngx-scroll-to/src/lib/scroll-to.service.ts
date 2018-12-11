import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';

import {
  ScrollToConfigOptions,
  ScrollToTarget,
  ScrollToListenerTarget,
  ScrollToConfigOptionsTarget
} from './scroll-to-config.interface';
import { ScrollToAnimation } from './scroll-to-animation';
import {
  stripHash,
  isString,
  isNumber,
  isElementRef,
  isWindow,
  DEFAULTS,
  isNativeElement
} from './scroll-to-helpers';
import { Observable, ReplaySubject, throwError } from 'rxjs/index';

/**
 * The Scroll To Service handles starting, interrupting
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
   * Interruptive Events allow to scrolling animation
   * to be interrupted before it is finished. The list
   * of Interruptive Events represents those.
   */
  private _interruptiveEvents: string[];

  /**
   * Construct and setup required paratemeters.
   *
   * @param _document         A Reference to the Document
   * @param _platformId       Angular Platform ID
   */
  constructor(
    @Inject(DOCUMENT) private _document: any,
    @Inject(PLATFORM_ID) private _platformId: any
  ) {
    this._interruptiveEvents = ['mousewheel', 'DOMMouseScroll', 'touchstart'];
  }

  /**
   * Target an Element to scroll to. Notice that the `TimeOut` decorator
   * ensures the executing to take place in the next Angular lifecycle.
   * This allows for scrolling to elements that are e.g. initially hidden
   * by means of `*ngIf`, but ought to be scrolled to eventually.
   *
   * @todo type 'any' in Observable should become custom type like 'ScrollToEvent' (base class), see issue comment:
   * 	- https://github.com/nicky-lenaers/ngx-scroll-to/issues/10#issuecomment-317198481
   *
   * @param options         Configuration Object
   * @returns               Observable
   */
  public scrollTo(options: ScrollToConfigOptions): Observable<any> {

    if (!isPlatformBrowser(this._platformId)) return new ReplaySubject().asObservable();

    return this._start(options);
  }

  /**
   * Start a new Animation.
   *
   * @todo Emit proper events from subscription
   *
   * @param options         Configuration Object
   * @returns               Observable
   */
  private _start(options: ScrollToConfigOptions): Observable<number> {

    // Merge config with default values
    const mergedConfigOptions = {
      ...DEFAULTS as ScrollToConfigOptions,
      ...options
    } as ScrollToConfigOptionsTarget;

    if (this._animation) this._animation.stop();

    const targetNode = this._getNode(mergedConfigOptions.target);
    if (mergedConfigOptions.target && !targetNode) return throwError('Unable to find Target Element');

    const container: HTMLElement = this._getContainer(mergedConfigOptions, targetNode);
    if (mergedConfigOptions.container && !container) return throwError('Unable to find Container Element');

    const listenerTarget = this._getListenerTarget(container) || window;

    let to = container ? container.getBoundingClientRect().top : 0;

    if (targetNode) {
      to = isWindow(listenerTarget) ? targetNode.offsetTop : targetNode.getBoundingClientRect().top;
    }

    // Create Animation
    this._animation = new ScrollToAnimation(
      container,
      listenerTarget,
      isWindow(listenerTarget),
      to,
      mergedConfigOptions,
      isPlatformBrowser(this._platformId)
    );
    const onInterrupt = () => this._animation.stop();
    this._addInterruptiveEventListeners(listenerTarget, onInterrupt);

    // Start Animation
    const animation$ = this._animation.start();
    this._subscribeToAnimation(animation$, listenerTarget, onInterrupt);

    return animation$;
  }

  /**
   * Subscribe to the events emitted from the Scrolling
   * Animation. Events might be used for e.g. unsubscribing
   * once finished.
   *
   * @param animation$              The Animation Observable
   * @param listenerTarget          The Listener Target for events
   * @param onInterrupt             The handler for Interruptive Events
   * @returns                       Void
   */
  private _subscribeToAnimation(
    animation$: Observable<any>,
    listenerTarget: ScrollToListenerTarget,
    onInterrupt: EventListenerOrEventListenerObject
  ) {
    const subscription = animation$
      .subscribe(
        () => { },
        () => { },
        () => {
          this._removeInterruptiveEventListeners(this._interruptiveEvents, listenerTarget, onInterrupt);
          subscription.unsubscribe();
        }
      );
  }

  /**
   * Get the container HTML Element in which
   * the scrolling should happen.
   *
   * @param options         The Merged Configuration Object
   * @param targetNode    the targeted HTMLElement
   * @returns
   */
  private _getContainer(options: ScrollToConfigOptions, targetNode: HTMLElement): HTMLElement | null {

    let container: HTMLElement | null = null;

    if (options.container) {
      container = this._getNode(options.container, true);
    } else if (targetNode) {
      container = this._getFirstScrollableParent(targetNode);
    }

    return container;
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
    listenerTarget: ScrollToListenerTarget,
    handler: EventListenerOrEventListenerObject): void {

    if (!listenerTarget) listenerTarget = window;

    this._interruptiveEvents
      .forEach(event => listenerTarget
        .addEventListener(event, handler, this._supportPassive() ? { passive: true } : false));
  }

  /**
   * Feature-detect support for passive event listeners.
   *
   * @returns       Whether or not passive event listeners are supported
   */
  private _supportPassive(): boolean {

    let supportsPassive = false;

    try {
      const opts = Object.defineProperty({}, 'passive', {
        get: function () {
          supportsPassive = true;
        }
      });
      window.addEventListener('testPassive', null, opts);
      window.removeEventListener('testPassive', null, opts);
    } catch (e) { }

    return supportsPassive;
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

    if (!listenerTarget) listenerTarget = window;
    events.forEach(event => listenerTarget.removeEventListener(event, handler));
  }

  /**
   * Find the first scrollable parent Node of a given
   * Element. The DOM Tree gets searched upwards
   * to find this first scrollable parent. Parents might
   * be ignored by CSS styles applied to the HTML Element.
   *
   * @param nativeElement     The Element to search the DOM Tree upwards from
   * @returns                 The first scrollable parent HTML Element
   */
  private _getFirstScrollableParent(nativeElement: HTMLElement): HTMLElement {

    let style: CSSStyleDeclaration = window.getComputedStyle(nativeElement);

    const overflowRegex: RegExp = /(auto|scroll|overlay)/;

    if (style.position === 'fixed') return null;

    for (let parent = nativeElement; parent = parent.parentElement; null) {

      style = window.getComputedStyle(parent);

      if (style.position === 'absolute'
        || style.overflow === 'hidden'
        || style.overflowY === 'hidden') continue;

      if (overflowRegex.test(style.overflow + style.overflowY)
        || parent.tagName === 'BODY') return parent;
    }

    return null;
  }

  /**
   * Get the Target Node to scroll to.
   *
   * @param id              The given ID of the node, either a string or
   *                        an element reference
   * @param allowBodyTag    Indicate whether or not the Document Body is
   *                        considered a valid Target Node
   * @returns               The Target Node to scroll to
   */
  private _getNode(id: ScrollToTarget, allowBodyTag: boolean = false): HTMLElement {

    let targetNode: HTMLElement;

    if (isString(id)) {
      if (allowBodyTag && (id === 'body' || id === 'BODY')) {
        targetNode = this._document.body;
      } else {
        targetNode = this._document.getElementById(stripHash(id));
      }
    } else if (isNumber(id)) {
      targetNode = this._document.getElementById(String(id));
    } else if (isElementRef(id)) {
      targetNode = id.nativeElement;
    } else if (isNativeElement(id)) {
      targetNode = id;
    }

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
    if (!container) return null;
    return this._isDocumentBody(container) ? window : container;
  }

  /**
   * Test if a given HTML Element is the Document Body.
   *
   * @param element             The given HTML Element
   * @returns                   Whether or not the Element is the
   *                            Document Body Element
   */
  private _isDocumentBody(element: HTMLElement): element is HTMLBodyElement {
    return element.tagName.toUpperCase() === 'BODY';
  }
}
