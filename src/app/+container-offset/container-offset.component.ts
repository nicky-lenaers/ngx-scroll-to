import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

import { ScrollToService } from '../modules/scroll-to/scroll-to.service';
import { ScrollToConfigOptions } from '../modules/scroll-to/models/scroll-to-config.model';

@Component({
  selector: 'ngx-container-offset',
  templateUrl: './container-offset.component.html',
  styleUrls: ['./container-offset.component.scss']
})
export class ContainerOffsetComponent implements AfterViewInit {

  @ViewChild('dialogContentForScroll') dialogContent: ElementRef;
  scrollPosition: number;
  name = 'Angular 5';

  constructor(private readonly scrollToService: ScrollToService) {
    this.scrollPosition = 107;
  }

  ngAfterViewInit(): void {

    const dialogElement = this.dialogContent.nativeElement as HTMLElement;

    dialogElement.onscroll = () => {
      this.scrollPosition = dialogElement.scrollTop;
    };

    this.scrollToService.scrollTo({
      offset: this.scrollPosition,
      container: dialogElement
    } as ScrollToConfigOptions);

  }
}
