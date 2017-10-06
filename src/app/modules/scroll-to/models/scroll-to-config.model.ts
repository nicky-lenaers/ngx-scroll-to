import { ElementRef } from '@angular/core';

import { ScrollToAnimationEasing } from './scroll-to-easing.model';
import { ScrollToEvent } from './scroll-to-event.model';

export type ScrollToTarget = string | number | ElementRef;
export type ScrollToContainer = string | number | ElementRef;
export type ScrollToListenerTarget = HTMLElement | Window;
export type ScrollToOffsetMap = Map<number, number>;

export interface ScrollToConfigOptions {
  target: ScrollToTarget;
  container?: ScrollToContainer;
  event?: Event;
  duration?: number;
  easing?: ScrollToAnimationEasing;
  offset?: number;
  offsetMap?: ScrollToOffsetMap;
}

export interface ScrollToDefaultConfigOptions extends ScrollToConfigOptions {
  action: ScrollToEvent;
}

