import { AppPage } from './app.po';

describe('ScrollTo App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display package title', () => {
    page.navigateTo();
    expect(page.getHeadingText()).toEqual('ngx-scroll-to');
  });
});
