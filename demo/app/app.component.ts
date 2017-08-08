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

	public visible: boolean;
	public show2: boolean;

	constructor(private _scrollToService: ScrollToService) {
		this.visible = false;
		this.show2 = false;
	}

	public toggle() {
		this.visible = ! this.visible;
	}

	public goto(event: Event) {

		this.show2 = true;

		this._scrollToService.scrollTo(event, {
			target: 'end2'
		})
	}
}
