import { Component } from '@angular/core';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';

/** Container Target Component */
@Component({
  selector: 'app-container-target',
  templateUrl: './container-target.component.html',
  styleUrls: ['./container-target.component.scss']
})
export class ContainerTargetComponent {

  constructor(private scrollToService: ScrollToService) {
  }

  scrollToElementInAnotherContainer(container, event) {

    const sub = this.scrollToService.scrollTo({
      container: '#another-scroll-container',
      target: 'another-scroll-container-destination',
      easing: 'easeOutElastic',
      duration: 3000
    });

    sub.subscribe(
      value => console.log(value),
      err => {
        throw new Error(err);
      }
    );
  }
}
