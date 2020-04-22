import { AfterViewInit, Component, ElementRef, VERSION, ViewChild } from '@angular/core';
import { ScrollToConfigOptions, ScrollToService } from '@nicky-lenaers/ngx-scroll-to';

@Component({
  selector: 'app-container-offset',
  templateUrl: './container-offset.component.html',
  styleUrls: ['./container-offset.component.scss']
})
export class ContainerOffsetComponent implements AfterViewInit {

  @ViewChild('dialogContentForScroll') dialogContent: ElementRef;
  scrollPosition: number;
  name = 'Angular ';

  constructor(private readonly scrollToService: ScrollToService) {
    this.scrollPosition = 107;
    this.name += VERSION.full;
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
