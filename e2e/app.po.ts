import { browser, by, element } from 'protractor';

export class AppPage {

  public async navigateTo() {
    return await browser.get('/');
  }

  public async getHeadingText() {
    return await element(by.css('app-root h1')).getText();
  }
}
