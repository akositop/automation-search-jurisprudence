// src/login.js
const { Builder, By, Key, until } = require('selenium-webdriver');
const config = require('./config');

async function login() {
  let driver;

  if (config.browser === 'edge') {
    driver = await new Builder().forBrowser('MicrosoftEdge').build();
  } else if (config.browser === 'chrome') {
    require('chromedriver');
    driver = await new Builder().forBrowser('chrome').build();
  } else if (config.browser === 'firefox') {
    require('geckodriver');
    driver = await new Builder().forBrowser('firefox').build();
  }

  try {
    await driver.get(config.url);

    // Wait for the username field to be visible and enter the username
    await driver.wait(until.elementLocated(By.id('user_username')), 10000);
    await driver.findElement(By.id('user_username')).sendKeys(config.username);

    // Enter the password
    await driver.findElement(By.id('user_password')).sendKeys(config.password, Key.RETURN);

    // Wait for a successful login indication (e.g., the presence of a logout button)
    await driver.wait(until.elementLocated(By.xpath('/html/body/section/header/ul/li[4]/a')), 10000);
    
    //Click the Jurisprudence
    await driver.findElement(By.xpath("/html/body/section/section/section/div[1]/div[2]/div[1]/div/div[2]/a")).click();

    
    console.log('Login successful');
  } catch (error) {
    console.error('Login failed', error);
  } finally {
    await driver.quit();
  }
}

module.exports = { login };
