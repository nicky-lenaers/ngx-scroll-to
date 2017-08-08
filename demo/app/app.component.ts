import { Component } from '@angular/core';
import { ScrollToService } from '../../src/scroll-to.service';
import { ScrollToTarget } from '../../src/models/scroll-to-targets.model';
import { ScrollToConfig } from '../../src/models/scroll-to-config.model';

@Component({
    selector: 'my-app',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {

	constructor(private _scrollToService: ScrollToService) { }
}
