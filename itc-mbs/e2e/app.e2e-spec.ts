import { ItcMbsPage } from './app.po';

describe('itc-mbs App', () => {
  let page: ItcMbsPage;

  beforeEach(() => {
    page = new ItcMbsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
