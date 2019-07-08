module.exports = {
  'Demo test' : function (browser) {
    browser
      .url('https://google.com')
      .waitForElementVisible('body', 1000)
      .pause(5000)
      .end();
  }
}
