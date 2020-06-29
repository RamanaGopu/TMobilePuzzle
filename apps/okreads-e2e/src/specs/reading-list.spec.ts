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

    const removeFromReadingList = await $('[data-testing="remove-from-reading-list"]');
    await removeFromReadingList.click();

    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('snack-bar-container'), 'Removed')
    );
    const readingItems_afterRemove = await $$('[data-testing="reading-book-item"]');
    expect(readingItems_afterRemove.length).to.be.equal(readingItems.length - 1, '1 item should removed');

    /* const undoBtn = $('snack-bar-container button');
    await undoBtn.click(); */
    browser.executeScript(`
        const button = document.querySelector('snack-bar-container button');
        button.click();`
    );
    
    const readingItems_afterUndo = await $$('[data-testing="reading-book-item"]');
    expect(readingItems_afterUndo.length).to.be.equal(readingItems.length, 'Undo should bring back removed item');

  });
});
