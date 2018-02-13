import { Component } from '@angular/core';

import { ScrollToService } from '../modules/scroll-to/scroll-to.service';

@Component({
  selector: 'ngx-offset-only',
  templateUrl: './offset-only.component.html',
  styleUrls: ['./offset-only.component.scss']
})
export class OffsetOnlyComponent {

  constructor(private _scrollToService: ScrollToService) {}

  public scrollToOffsetOnly(offset: number = 0) {
    this._scrollToService.scrollTo({
      easing: 'easeOutElastic',
      duration: 1000,
      offset
    });
  }

  public scrollToOffsetOnlyInContainer() {
    this._scrollToService.scrollTo({
      container: '#scrollable-container',
      easing: 'easeInOutQuart',
      offset: 300
    });
  }
}
