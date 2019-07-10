const user = {
  name: 'Ilya',
  surname: 'Suglobov',
  email: 'app.ilya.testing@gmail.com',
  password: '>!E4E2Mo'
};

const note = {
  title: 'Important Note',
  text: 'I need to buy a new laptop as soon as possible. ' +
    'I think it should be a Mac Book. As it is really fast and productive system.',
  color: 'background-color: rgb(180, 72, 174);'
};

const tags = ['Important', 'Not important', 'For me Only'];
const editedTag = 'For my Wife';

const colors = ['fff', 'f28b82', 'cbf0f8', 'fff475', 'ccff90', 'e6c9a8', 'e8eaed', 'fbbc04', '0076b4', 'b448ae'];

module.exports = {
  'should login correctly with the test user data' : function (client) {
    client
      .init()
      .waitForElementVisible('.login', 1000)
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

  'should add a new note correctly with data' : function (client) {
    client
      .click('.note-form__keep')
      .waitForElementVisible('.form', 3000)
      .setValue('.form__title', note.title)
      .setValue('.form__text', note.text)
      .pause(1000)
      .click('.options__color');

    // select colors
    for (let i = 0; i < colors.length; i++) {
      client
        .click(`.add${i}`)
        .pause(1000);
    }

    // select tags
    client
      .click('.options__tags');
    for (let i = 0; i < tags.length - 1; i++) {
      client
        .click(`.option-${i}`)
        .pause(1000);
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

  'should logout correctly' : function (client) {
    client
      .click('.user-box__logout')
      .waitForElementVisible('.login', 1000)
      .end();
  }
};
