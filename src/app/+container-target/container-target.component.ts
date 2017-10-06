import { Component, OnInit } from '@angular/core';

import { ScrollToService } from '../modules/scroll-to/scroll-to.service';

@Component({
  selector: 'ngx-container-target',
  templateUrl: './container-target.component.html',
  styleUrls: ['./container-target.component.scss']
})
export class ContainerTargetComponent implements OnInit {

  constructor(private _scrollToService: ScrollToService) { }

  public ngOnInit() {

    setTimeout(() => {

      this._scrollToService.scrollTo({
        container: 'body',
        target: '#content'
      });

    }, 2000);
  }

}
