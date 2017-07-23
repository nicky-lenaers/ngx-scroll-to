import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
// import { ScrollToModule } from '../../src/scroll-to.module';

@NgModule({
	imports: [
		// ScrollToModule.forRoot(),
		BrowserModule
	],
	declarations: [
		AppComponent
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule { }
