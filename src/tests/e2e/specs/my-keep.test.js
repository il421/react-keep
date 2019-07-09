const user = {
  name: 'Ilya',
  surname: 'Suglobov',
  email: 'app.ilya.testing@gmail.com',
  password: '>!E4E2Mo'

};

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

      .waitForElementVisible('.dashboard', 10000);
  },

  'should logout correctly' : function (client) {
    client
      .click('.user-box__logout')
      .waitForElementVisible('.login', 1000)
      .end();
  }
};
