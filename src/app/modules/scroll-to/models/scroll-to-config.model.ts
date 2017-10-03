import { ScrollToAnimationEasing } from './scroll-to-easing.model';
import { ScrollToTarget } from './scroll-to-targets.model';
import { ScrollToEvent } from './scroll-to-event.model';

export type ScrollToOffsetMap = Map<number, number>;

/**
 * @todo move ScrollToTarget to this file (no need for seperate file, since it is a config option)
 */
export type ScrollToConfigOptional<T> = {
  [Option in keyof T]?: T[Option];
}

export interface ScrollToConfigMandatory {
  target: ScrollToTarget;
}

export interface ScrollToConfigMandatoryPartial {
  event: ScrollToEvent;
}

export interface ScrollToConfigPartial {
  duration: number;
  easing: ScrollToAnimationEasing;
  offset: number;
  offsetMap: ScrollToOffsetMap;
}

export interface ScrollToConfig extends ScrollToConfigOptional<ScrollToConfigPartial>, ScrollToConfigMandatory {
  [key: string]: ScrollToTarget | ScrollToAnimationEasing | ScrollToOffsetMap | number;
}
export interface ɵScrollToDefaultOptions extends ScrollToConfigMandatory, ScrollToConfigMandatoryPartial, ScrollToConfigPartial {
  [key: string]: ScrollToTarget | ScrollToAnimationEasing | ScrollToOffsetMap | number;
}
