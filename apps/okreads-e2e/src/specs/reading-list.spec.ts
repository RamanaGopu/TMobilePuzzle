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

  it('Then: I should be able to mark as read the item added to reading list', async () => {
    await browser.get('/');
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

    const markAsRead = await $$('[data-testing="mark-as-read"]');
    await markAsRead[0].click();

    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="finished-text"]:first-child'),
        'Finished'
      )
    );

    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-book-item"]'),
        'Finished Reading on'
      )
    );
  });
});
