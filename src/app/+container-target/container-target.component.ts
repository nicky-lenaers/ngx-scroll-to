import { Component, OnInit, ElementRef } from '@angular/core';

import { ScrollToService } from '../modules/scroll-to/scroll-to.service';

@Component({
  selector: 'ngx-container-target',
  templateUrl: './container-target.component.html',
  styleUrls: ['./container-target.component.scss']
})
export class ContainerTargetComponent implements OnInit {

  constructor(private _scrollToService: ScrollToService) { }

  public ngOnInit() {

  }

  public scrollToElementInAnotherContainer(container, event) {

    const sub = this._scrollToService.scrollTo({
      container: '#another-scroll-container',
      target: 'another-scroll-container-destination',
      easing: 'easeOutElastic'
    });

    sub.subscribe(
      value => console.log(value),
      err => { throw new Error(err); }
    );
  }

}
