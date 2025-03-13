const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.name === 'chrome' && browser.isHeaded) {
          launchOptions.args.push(
            '--disable-features=PasswordManagerOnboarding,AutofillAssistant,PasswordCheck',
            '--disable-save-password-bubble',
            '--disable-password-manager'
          );
        }
        return launchOptions;
      });
    },
    chromeWebSecurity: false,
    video: true,
  },
});
