<div align="center">
  <img src="https://user-images.githubusercontent.com/2785350/28428760-ae908006-6d7a-11e7-92ec-174bec80740e.png">
</div>
<div align="center">
  <h1>ngx-scroll-to</h1>
  <p>
    A simple Angular 4+ plugin enabling you to smooth scroll to any element on your page and enhance scroll-based features in your app. Works for <strong>Angular 4+</strong>, both <strong>AoT</strong> and <strong>SSR</strong>. No dependencies.
  </p>
</div>

<table>
  <tr>
    <th align="left">Subject</th>
    <th align="left">Type</th>
    <th align="left">Badge</th>
  </tr>
  <tr>
    <th align="left">CI / CD</th>
    <td align="left">Circle CI</td>
    <td align="left">
      <a href="https://circleci.com/gh/nicky-lenaers/ngx-scroll-to" target="_blank">
        <img src="https://img.shields.io/circleci/project/github/nicky-lenaers/ngx-scroll-to/master.svg?style=flat-square" alt="Circle CI">
      </a>
    </td>
  </tr>
  <tr>
    <th align="left">Releases</th>
    <td align="left">GitHub</td>
    <td align="left">
      <a href="https://github.com/nicky-lenaers/ngx-scroll-to/releases" target="_blank">
        <img src="https://img.shields.io/github/release/nicky-lenaers/ngx-scroll-to.svg?style=flat-square" alt="GitHub Release">
      </a>
    </td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>NPM</td>
    <td align="left">
      <a href="https://www.npmjs.com/package/@nicky-lenaers/ngx-scroll-to" target="_blank">
        <img src="https://img.shields.io/npm/v/@nicky-lenaers/ngx-scroll-to.svg?style=flat-square" alt="NPM Release">
      </a>
    </td>
  </tr>
  <tr>
    <th align="left" valign="top">Dependencies</th>
    <td align="left">Production</td>
    <td align="left">
      <a href="https://david-dm.org/nicky-lenaers/ngx-scroll-to" target="_blank">
        <img src="https://img.shields.io/david/nicky-lenaers/ngx-scroll-to.svg?style=flat-square" alt="Production Dependencies">
      </a>
    </td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td align="left">Peer</td>
    <td align="left">
      <a href="https://david-dm.org/nicky-lenaers/ngx-scroll-to?type=peer" target="_blank">
        <img src="https://img.shields.io/david/peer/nicky-lenaers/ngx-scroll-to.svg?style=flat-square" alt="Peer Dependencies">
      </a>
    </td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td align="left">Development</td>
    <td align="left">
      <a href="https://david-dm.org/nicky-lenaers/ngx-scroll-to?type=dev" target="_blank">
        <img src="https://img.shields.io/david/dev/nicky-lenaers/ngx-scroll-to.svg?style=flat-square" alt="Development Dependencies">
      </a>
    </td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td align="left">Optional</td>
    <td align="left">
      <a href="https://david-dm.org/nicky-lenaers/ngx-scroll-to?type=optional" target="_blank">
        <img src="https://img.shields.io/david/optional/nicky-lenaers/ngx-scroll-to.svg?style=flat-square" alt="Optional Dependencies">
      </a>
    </td>
  </tr>
  <tr>
    <th align="left" valign="top">Downloads</th>
    <td>NPM</td>
    <td>
      <a href="https://npmjs.org/@nicky-lenaers/ngx-scroll-to" target="_blank">
        <img src="https://img.shields.io/npm/dm/%40nicky-lenaers%2Fngx-scroll-to.svg?style=flat-square" alt="NPM Monthly Downloads">
      </a>
    </td>
  </tr>
  <tr>
    <th align="left" valign="top">License</th>
    <td>MIT</td>
    <td>
      <a href="https://github.com/nicky-lenaers/ngx-scroll-to/blob/master/LICENSE" target="_blank">
        <img src="https://img.shields.io/npm/l/@nicky-lenaers/ngx-scroll-to.svg?style=flat-square" alt="License">
      </a>
    </td>
  </tr>
</table>

Current Angular Version

[![npm version](https://img.shields.io/npm/v/%40angular%2Fcore.svg?style=flat-square)](https://www.npmjs.com/~angular)  

## Installation
```sh
$ npm install @nicky-lenaers/ngx-scroll-to
```

## Setup
```js
...
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
...

@NgModule({
  imports: [
    ...
    ScrollToModule.forRoot()
  ],
  ...
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Basic Usage - Directive to Target
**my.component.html**

```html
<!-- Works for including '#' -->
<button [ngx-scroll-to]="'#destination'">Go to destination</button>

<!-- Works for excluding '#' -->
<button [ngx-scroll-to]="'destination'">Go to destination</button>

<div id="destination">
  You've reached your destination.
</div>
```

## Basic Usage - Directive to Offset Only
Besides scrolling to a specific element, it is also possible to scroll a given offset only. This can be achieved by an empty target and an offset:

**my.component.html**

```html
<button 
  ngx-scroll-to 
  [ngx-scroll-to-offset]="200">
  Go down 200 pixels
</button>
```

## Basic Usage - Service to Target
**my.component.html**
```html
<button (click)="triggerScrollTo()">Go to destination</button>

<div id="destination">
  You've reached your destination.
</div>
```

**my.service.ts**

```js
import { Injectable } from '@angular/core';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';

@Injectable()
export class MyService {

  constructor(private _scrollToService: ScrollToService) { }

  public triggerScrollTo() {
    
    const config: ScrollToConfigOptions = {
      target: 'destination'
    };

    this._scrollToService.scrollTo(config);
  }
}
```

## Basic Usage - Service to Offset Only
Just like with the Directive, the Service can be used to scroll to an offset only instead of a given target element:

**my.component.html**
```html
<button (click)="triggerScrollToOffsetOnly(200)">Go down 200 pixels</button>
```

**my.service.ts**

```js
import { Injectable } from '@angular/core';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';

@Injectable()
export class MyService {

  constructor(private _scrollToService: ScrollToService) { }

  public triggerScrollToOffsetOnly(offset: number = 0) {
    
    const config: ScrollToConfigOptions = {
      offset
    };

    this._scrollToService.scrollTo(config);
  }
}
```

## Advanced Usage - Directive
**my.component.ts**
```js
import { ScrollToAnimationEasing, ScrollToEvent, ScrollToOffsetMap } from '@nicky-lenaers/ngx-scroll-to';

@Component({
  selector: 'my-component'
  templateUrl: './my.component.html'
})
export class MyComponent {

  public ngxScrollToDestination: string;
  public ngxScrollToEvent: ScrollToEvent;
  public ngxScrollToDuration: number;
  public ngxScrollToEasing: ScrollToAnimationEasing;
  public ngxScrollToOffset: number;
  public ngxScrollToOffsetMap: ScrollToOffsetMap;

  constructor() {

    this.ngxScrollToDestination = 'destination-1';
    this.ngxScrollToEvent = 'mouseenter';
    this.ngxScrollToDuration = 1500;
    this.ngxScrollToEasing = 'easeOutElastic';
    this.ngxScrollToOffset = 300;
    this.ngxScrollToOffsetMap = new Map();
    this.ngxScrollToOffsetMap
      .set(480, 100)
      .set(768, 200)
      .set(1240, 300)
      .set(1920, 400)

  }

  public toggleDestination() {
    this.ngxScrollToDestination = this.ngxScrollToDestination === 'destination-1' ? 'destination-2' : 'destination-1';
  }
}
```


**my.component.html**
```html
<button (click)="toggleDestination()">Toggle Destination</button>

<button 
  [ngx-scroll-to]="ngxScrollToDestination"
  [ngx-scroll-to-event]="ngxScrollToEvent"
  [ngx-scroll-to-duration]="ngxScrollToDuration"
  [ngx-scroll-to-easing]="ngxScrollToEasing"
  [ngx-scroll-to-offset]="ngxScrollToOffset"
  [ngx-scroll-to-offset-map]="ngxScrollToOffsetMap">
  Go to destination
</button>

<div id="destination-1">
  You've reached your first destination
</div>

<div id="destination-2">
  You've reached your second destination
</div>
```

## Advanced Usage - Service
**my.component.html**
```html
<button (click)="triggerScrollTo()">Go to destination</button>

<div id="custom-container">
  <div id="destination">
    You've reached your destination.
  </div>
</div>
```

**my.service.ts**

```js
import { Injectable } from '@angular/core';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';

@Injectable()
export class MyService {

  constructor(private _scrollToService: ScrollToService) { }

  public triggerScrollTo() {
    
    /**
     * @see NOTE:1
     */
    const config: ScrollToConfigOptions = {
      container: 'custom-container',
      target: 'destination',
      duration: 650,
      easing: 'easeOutElastic',
      offset: 20
    };

    this._scrollToService.scrollTo(config);
  }
}
```
**NOTE:1**

*The `container` property is an optional property. By default, `ngx-scroll-to` searches for the first scrollable parent `HTMLElement` with respect to the specified `target`. This should suffice in most cases. However, if multiple scrollable parents reside in the DOM tree, you have the degree of freedom the specify a specific container by using the `container` property, as used in the above example.*

## Directive Attributes Map
<table>
  <tr>
    <th align="left">Options</th>
    <th align="left">Type</th>
    <th align="left">Default</th>
  </tr>
  <tr>
    <td><a href="#ngx-scroll-to-details">ngx-scroll-to</a></td>
    <td><code>string</code> | <code>number</code> | <code>ElementRef</code> | <code>HTMLElement</code></td>
    <td><code>''</code></td>
  </tr>
  <tr>
    <td><a href="#ngx-scroll-to-event-details">ngx-scroll-to-event</a></td>
    <td><code>ScrollToEvent</code></td>
    <td><code>click</code></td>
  </tr>
  <tr>
    <td><a href="#ngx-scroll-to-duration-details">ngx-scroll-to-duration</a></td>
    <td><code>number</code></td>
    <td><code>650</code></td>
  </tr>
  <tr>
    <td><a href="#ngx-scroll-to-easing-details">ngx-scroll-to-easing</a></td>
    <td><code>ScrollToAnimationEasing</code></td>
    <td><code>easeInOutQuad</code></td>
  </tr>
  <tr>
    <td><a href="#ngx-scroll-to-offset-details">ngx-scroll-to-offset</a></td>
    <td><code>number</code></td>
    <td><code>0</code></td>
  </tr>
  <tr>
    <td><a href="#ngx-scroll-to-offset-map-details">ngx-scroll-to-offset-map</a></td>
    <td><code>ScrollToOffsetMap</code></td>
    <td><code>new Map()</code></td>
  </tr>
</table>

## Error Handling
In some occasions, one might misspell a target or container selector string. Even though `ngx-scoll-to` will not be able to initiate the scrolling animation, you can catch the internally generated error and handle it as you please on the `Observable` chain returned from the `scrollTo` method.

**faulty.service.ts**
```js
import { Injectable } from '@angular/core';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';

@Injectable()
export class FaultyService {

  constructor(private _scrollToService: ScrollToService) { }

  public triggerScrollTo() {
    
    this._scrollToService
      .scrollTo({
        target: 'faulty-id'
      })
      .subscribe(
        value => { console.log(value) },
        err => console.error(err) // Error is caught and logged instead of thrown
      );
  }
}
```

## Directive Attribute Map Details
#### <a name="ngx-scroll-to-details"></a>`[ngx-scroll-to]`
This value specifies the ID of the HTML Element to scroll to. Note the outer double quotes `""` and the inner single quotes `''` in the above example(s). This enables you to dynamically set the string value based on a class property of your Component.

#### <a name="ngx-scroll-to-event-details"></a>`[ngx-scroll-to-event]`
This value controls to event on which to trigger the scroll animation. Allowed values are:
- `click`
- `mouseenter`
- `mouseover`
- `mousedown`
- `mouseup`
- `dblclick`
- `contextmenu`
- `wheel`
- `mouseleave`
- `mouseout`

#### <a name="ngx-scroll-to-duration-details"></a>`[ngx-scroll-to-duration]`
This value controls to duration of your scroll animation. Note that this value is in milliseconds.

#### <a name="ngx-scroll-to-easing-details"></a>`[ngx-scroll-to-easing]`
This value controls a named easing logic function to control your animation easing. Allowed values are:
- `easeInQuad`
- `easeOutQuad`
- `easeInOutQuad`
- `easeInCubic`
- `easeOutCubic`
- `easeInOutCubic`
- `easeInQuart`
- `easeOutQuart`
- `easeInOutQuart`
- `easeInQuint`
- `easeOutQuint`
- `easeInOutQuint`
- `easeOutElastic`

#### <a name="ngx-scroll-to-offset-details"></a>`[ngx-scroll-to-offset]`
This value controls the offset with respect to the top of the destination HTML element. Note that this value is in pixels.

#### <a name="ngx-scroll-to-offset-map-details"></a>`[ngx-scroll-to-offset-map]`
This value allows you to control dynamic offsets based on the width of the device screen. The Map get's iterated over internally in a sequential fashion, meaning you need to supply key values in the order from low to high. The `key` of the `Map` defines the width treshold. The `value` of the `Map` defines the offset. Note that this value is in pixels.

# Contributing
Please see [Contributing Guidelines](.github/CONTRIBUTING.md).

# Code of Conduct
Please see [Code of Conduct](.github/CODE_OF_CONDUCT.md).

# License
 [MIT](/LICENSE)
