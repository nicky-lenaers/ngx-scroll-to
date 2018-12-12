import { Component } from '@angular/core';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';

/** Container Target Component */
@Component({
  selector: 'ngx-container-target',
  templateUrl: './container-target.component.html',
  styleUrls: ['./container-target.component.scss']
})
export class ContainerTargetComponent {

  constructor(private _scrollToService: ScrollToService) { }

  public scrollToElementInAnotherContainer(container, event) {

    const sub = this._scrollToService.scrollTo({
      container: '#another-scroll-container',
      target: 'another-scroll-container-destination',
      easing: 'easeOutElastic',
      duration: 3000
    });

    sub.subscribe(
      value => console.log(value),
      err => { throw new Error(err); }
    );
  }

}
