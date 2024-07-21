const {
  Builder,
  By,
  Key,
  until
} = require('selenium-webdriver');
const config = require('../configs/config');

async function login() {
  let driver;
  try {
    // Will process what browsers will use
    if (config.browser === 'edge') {
      driver = await new Builder().forBrowser('MicrosoftEdge').build();
    } else if (config.browser === 'chrome') {
      require('chromedriver');
      driver = await new Builder().forBrowser('chrome').build();
    } else if (config.browser === 'firefox') {
      require('geckodriver');
      driver = await new Builder().forBrowser('firefox').build();
    }
  
    await driver.get(config.url);
  
    // Wait for the username field to be visible and enter the username
    await driver.wait(until.elementLocated(By.id('user_username')), 10000);
    await driver.findElement(By.id('user_username')).sendKeys(config.username);
  
    // Enter the password
    await driver.findElement(By.id('user_password')).sendKeys(config.password, Key.RETURN);
  
    // Wait for a successful login indication (e.g., the presence of a logout button)
    await driver.wait(until.elementLocated(By.xpath('/html/body/section/header/ul/li[4]/a')), 10000);
  
    console.log('Login successful');
    return driver; // Return the driver instance
  } catch(error) {
    console.error('Login failed', error);
    if (driver) {
      await driver.quit(); // Ensure the driver is closed in case of error
    }
    throw error; // Rethrow the error
  }
}

module.exports = { login };