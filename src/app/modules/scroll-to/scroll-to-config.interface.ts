import { ElementRef } from '@angular/core';

import { ScrollToAnimationEasing } from './scroll-to-easing.interface';
import { ScrollToEvent } from './scroll-to-event.interface';

/** The target of the Scroll Animation */
export type ScrollToTarget = string | number | ElementRef | HTMLElement;

/**
 * The container on which the Scroll Animation
 * will happen.
 */
export type ScrollToContainer = string | number | ElementRef | HTMLElement;

/**
 * The Listener Target is responsive for listening
 * to events that could interrupt the Scroll Animation.
 */
export type ScrollToListenerTarget = HTMLElement | Window;

/**
 * A mapped list of breakpoints with accompanying
 * values for the offset of that specific breakpoint.
 */
export type ScrollToOffsetMap = Map<number, number>;

export interface ScrollToConfigOptionsBase {
  /** The Container to scroll */
  container?: ScrollToContainer;
  /** Duration of the Scroll Animation */
  duration?: number;
  /** The named Easing Function to use */
  easing?: ScrollToAnimationEasing;
  /** A mapped list of offsets */
  offsetMap?: ScrollToOffsetMap;
}

/** Configuration Options Target */
export interface ScrollToConfigOptionsTarget extends ScrollToConfigOptionsBase {
  /** The target to scroll to */
  target: ScrollToTarget;
  /** The offset from the top of the Element in pixels */
  offset?: number;
}

/** Configuration Options Offset Only */
export interface ScrollToConfigOptionsOffsetOnly extends ScrollToConfigOptionsBase {
  /** The offset from the top of the Element in pixels */
  offset: number;
}

/** The Configuration Object */
export type ScrollToConfigOptions = ScrollToConfigOptionsTarget | ScrollToConfigOptionsOffsetOnly;

/** The Default Configuration Object */
export interface ScrollToDefaultConfigOptions extends ScrollToConfigOptionsTarget {
  action: ScrollToEvent;
}

