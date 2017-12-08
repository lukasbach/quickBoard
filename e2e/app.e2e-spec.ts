import { QuickBoardPage } from './app.po';

describe('quick-board App', () => {
  let page: QuickBoardPage;

  beforeEach(() => {
    page = new QuickBoardPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
