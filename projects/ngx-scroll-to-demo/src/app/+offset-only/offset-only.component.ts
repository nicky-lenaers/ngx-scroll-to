import { Component } from '@angular/core';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';

/** Offset Only Component */
@Component({
  selector: 'app-offset-only',
  templateUrl: './offset-only.component.html',
  styleUrls: ['./offset-only.component.scss']
})
export class OffsetOnlyComponent {

  constructor(private scrollToService: ScrollToService) {
  }

  scrollToOffsetOnly(offset: number = 0) {
    this.scrollToService.scrollTo({
      easing: 'easeOutElastic',
      duration: 1000,
      offset
    });
  }

  scrollToOffsetOnlyInContainer() {
    this.scrollToService.scrollTo({
      container: '#scrollable-container',
      easing: 'easeInOutQuart',
      offset: 300
    });
  }
}
