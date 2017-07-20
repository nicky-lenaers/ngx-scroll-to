# ngx-scroll-to

Scroll to any element to enhance scroll-based features in you app.<br>
Works for **Angular 4+**, both **AoT** and **SSR**. No dependencies.

Current Angular Version

[![npm version](https://badge.fury.io/js/%40angular%2Fcore.svg)](https://www.npmjs.com/~angular)

## Installation
```sh
$ npm install @nicky-lenaers/ngx-scroll-to
```

## Usage
#### 1. Import the Angular Module
```ts
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

# License
 [MIT](/LICENSE)