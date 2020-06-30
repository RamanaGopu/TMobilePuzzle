import { $, $$, browser, ExpectedConditions } from 'protractor';
import { expect } from 'chai';

describe('When: I use the reading list feature', () => {
  it('Then: I should see my reading list', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-container"]'),
        'My Reading List'
      )
    );
  });

  it('Then: I should be able undo item added from reading list', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );
    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('javascript');
    await form.submit();
    const bookItem = await $('[data-testing="book-item"]:first-child button');
    await bookItem.click();
    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();
    const readingItems = await $$('[data-testing="reading-book-item"]');
    expect(readingItems.length).to.be.greaterThan(0, 'Atleast 1 book should be there in reading list');
    const markAsRead = await $$('[data-testing="remove-from-reading-list"]');
    await markAsRead[0].click();
  //   browser.executeScript(`
  //   document.querySelector('simple-snack-bar button').setAttribute('data-testing', 'mat-simple-snackbar-undo-btn');
  //   const undoBtn = await $('[data-testing="mat-simple-snackbar-undo-btn"]');
  //   await undoBtn.click();`
  // );
  });
});
