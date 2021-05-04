/** Named Easing Function */
export type ScrollToAnimationEasing = 'easeInQuad'
  | 'easeOutQuad'
  | 'easeInOutQuad'
  | 'easeInCubic'
  | 'easeOutCubic'
  | 'easeInOutCubic'
  | 'easeInQuart'
  | 'easeOutQuart'
  | 'easeInOutQuart'
  | 'easeInQuint'
  | 'easeOutQuint'
  | 'easeInOutQuint'
  | 'easeOutElastic';

/**
 * The Easing Function controlling the Easing
 * Animation over Time.
 */
export type ScrollToAnimationEasingFunction = (time: number) => number;

/** The collection of named Easing Functions */
export interface ScrollToAnimationEasingCollection {
  [key: string]: ScrollToAnimationEasingFunction;
}
