import { TestVaadinPage } from './app.po';

describe('test-vaadin App', function() {
  let page: TestVaadinPage;

  beforeEach(() => {
    page = new TestVaadinPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
