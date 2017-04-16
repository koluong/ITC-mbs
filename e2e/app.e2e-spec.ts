import { LeafMapPage } from './app.po';

describe('leaf-map App', () => {
  let page: LeafMapPage;

  beforeEach(() => {
    page = new LeafMapPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
