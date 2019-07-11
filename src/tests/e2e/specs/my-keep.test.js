import { user, note, updatedNote, colors, tags } from '../../fixtures/e2e.js';

module.exports = {
  'should login correctly with the test user data' : function (client) {
    client
      .init()
      .waitForElementVisible('.login', 10000)
      .click('.login__btn')
      .windowHandles(function(result) {
        const handle = result.value[1];
        client.switchWindow(handle);
      })
      .waitForElementVisible('#identifierId', 10000)
      .clearValue('#identifierId')
      .setValue('#identifierId', user.email)
      .click('.RveJvd')

      .pause(3000)

      .waitForElementVisible('.whsOnd', 10000)

      .clearValue('.whsOnd')
      .setValue('.whsOnd', user.password)
      .click('.RveJvd')

      .windowHandles(function(result) {
        const handle = result.value[0];
        client.switchWindow(handle);
      })

      .waitForElementVisible('.dashboard', 10000)
      .assert.containsText('.user-box__name', `${user.name} ${user.surname}`);
  },

  'should open/close sidebar correctly' : function (client) {
    client
      // open and close sidebar via close btn
      .click('.header__sidebar')
      .waitForElementVisible('.sidebar--show', 2000)
      .pause(2000)
      .click('.sidebar__close-button')
      .waitForElementNotPresent('.sidebar--show', 2000)

      // open and close sidebar via clicking on sidebar cover
      .pause(2000)
      .click('.header__sidebar')
      .waitForElementVisible('.sidebar--show', 2000)
      .pause(2000)
      .click('.sidebar__cover')
      .waitForElementNotPresent('.sidebar--show', 2000);
  },

  'should add/edit tags correctly' : function (client) {
    const editedTag = 'For my Wife';

    client
      // open tags modal
      .pause(2000)
      .click('.header__sidebar')
      .waitForElementVisible('.sidebar--show', 2000)
      .pause(2000)
      .click('.tags__add-edit')
      .pause(2000)
      .waitForElementVisible('.tags__modal', 2000);

    // add new tags
    for (let i = 0; i < tags.length; i++) {
      client
        .setValue('#newTag', tags[i])
        .click('.tags__add-btn')
        .assert.containsText('.tags__name--0', tags[i]);
    }

    //edit tag
    client
      .click('.tags__item:first-child .tags__edit-btn')
      .waitForElementVisible('#editableTag', 2000)
      .setValue('#editableTag', editedTag)
      .click('.actions__edit')
      .assert.containsText('.tags__name--0', editedTag)

    //not edit tag
      .click('.tags__item:first-child .tags__edit-btn')
      .waitForElementVisible('#editableTag', 2000)
      .setValue('#editableTag', tags[0])
      .click('.actions__remove')
      .assert.containsText('.tags__name--0', editedTag)

    //remove tag
      .click('.tags__item:first-child .tags__remove-btn')
      .assert.containsText('.tags__name--0', tags[1])

      .moveToElement('.ReactModal__Overlay', 0, 0)
      .mouseButtonClick(0)
      .pause(2000);
  },

  'should add a new note correctly with data': function (client) {
    client
      .click('.note-form__keep')
      .waitForElementVisible('.form--add', 3000)
      .setValue('.form__title', note.title)
      .setValue('.form__text', note.text)
      .pause(1000)
      .click('.options__color');

    // select colors
    for (let i = 0; i < colors.length; i++) {
      client
        .click(`.add${i}`)
        .getAttribute('.note-form', 'style', function (result) {
          this.assert.equal(result.value, colors[i].style);
        })
        .pause(500);

    }

    // select tags
    client
      .click('.options__tags');
    for (let i = 0; i < tags.length - 1; i++) {
      client
        .click(`.option-${i}`)
        .assert.containsText('.tags-selection__option:first-child div', tags[1])
        .assert.containsText('.tags-selection__option:last-child div', tags[0])
        .pause(500);
    }

    // keep note, check data
    client
      .click('.actions__keep-note')
      .pause(2000)
      .waitForElementVisible('.note', 2000)
      .assert.containsText('.content__title', note.title)
      .assert.containsText('.content__text', note.text)
      .assert.containsText('.details__tags div:first-child', tags[1])
      .assert.containsText('.details__tags div:last-child', tags[0])


      .getAttribute('.note', 'style', function (result) {
        this.assert.equal(result.value, note.color);
      });
  },

  'should persist data in Firestore and fetch correct data after page refresh': function (client) {
    client
      .refresh()
      .waitForElementVisible('.note', 2000)
      .assert.containsText('.content__title', note.title)
      .assert.containsText('.content__text', note.text)
      .assert.containsText('.details__tags div:first-child', tags[1])
      .assert.containsText('.details__tags div:last-child', tags[0])


      .getAttribute('.note', 'style', function (result) {
        this.assert.equal(result.value, note.color);
      });
  },

  'should stand out as IMPORTANT note, persist in Firebase': function (client) {
    client
      .waitForElementPresent('.actions--casual', 2000)
      .click('.actions--casual')
      .pause(2000)
      .waitForElementNotPresent('.actions--casual', 2000)
      .waitForElementPresent('.actions--important', 2000)

      .refresh()
      .pause(2000)
      .waitForElementPresent('.actions--important', 2000);
  },

  'should update a note, persist updates in Firestore': function (client) {
    client
      .click('.note')
      .pause(2000)
      .waitForElementVisible('.form--update', 3000)

      .clearValue('.form--update .form__title')
      .setValue('.form--update .form__title', updatedNote.title)
      .clearValue('.form--update .form__text')
      .setValue('.form--update .form__text', updatedNote.text)
      .click('.form--update .options__color')
      .click('.form--update .update1')
      .pause(2000)
      .click('.form--update .options__tags')
      .click('.form--update .option-0')
      .pause(2000)

      .click('.form--update  .actions__keep-note')

      .waitForElementVisible('.note', 2000)
      .assert.containsText('.content__title', updatedNote.title)
      .assert.containsText('.content__text', updatedNote.text)
      .getAttribute('.note', 'style', function (result) {
        this.assert.equal(result.value, updatedNote.color);
      })

      .refresh()
      .waitForElementVisible('.note', 2000)
      .assert.containsText('.content__title', updatedNote.title)
      .assert.containsText('.content__text', updatedNote.text)
      .getAttribute('.note', 'style', function (result) {
        this.assert.equal(result.value, updatedNote.color);
      });
  },

  'should close - add and update forms correctly ': function (client) {
    client
      .click('.note')
      .waitForElementPresent('.form--update', 3000)
      .click('.form--update .actions__close-note')
      .waitForElementNotPresent('.form--update', 3000)

      .click('.note-form__keep')
      .waitForElementVisible('.form--add', 3000)
      .click('.form--add .actions__close-note')
      .waitForElementNotPresent('.form--add', 3000);
  },

  'should search note correctly ': function (client) {
    const textSearchQuery = 'nothing important';

    client
      .waitForElementPresent('.note', 3000)
      .waitForElementPresent('.search', 3000)

      // search by text
      .setValue('.search', textSearchQuery)
      .waitForElementNotPresent('.note', 3000)
      .clearValue('.search')
      .setValue('.search', updatedNote.text)
      .pause(2000)
      .waitForElementPresent('.note', 3000);
  },

  'should filter bt tags correctly': function (client) {
    client
      .waitForElementPresent('.note', 3000)

      .click('.header__sidebar')
      .waitForElementVisible('.sidebar--show', 2000)
      .pause(2000)

      .click('.tag-1')
      .waitForElementNotPresent('.note', 3000)

      .click('.tag-1')
      .waitForElementPresent('.note', 3000)

      .click('.sidebar__close-button')
      .pause(2000);
  },

  'should remove a note, including Firestore': function (client) {
    client
      .waitForElementPresent('.note', 3000)
      .click('.actions__remove-btn')
      .pause(1000)
      .waitForElementPresent('.note__confirm', 3000)

      .click('.button--nope')
      .waitForElementPresent('.note', 3000)
      .pause(2000)

      .click('.actions__remove-btn')
      .pause(1000)
      .waitForElementPresent('.note__confirm', 3000)

      .click('.button--yep')
      .waitForElementNotPresent('.note', 3000)
      .refresh()
      .waitForElementNotPresent('.note', 3000);
  },

  'should logout correctly': function (client) {
    client
      .click('.user-box__logout')
      .waitForElementVisible('.login', 1000)
      .end();
  }
};
