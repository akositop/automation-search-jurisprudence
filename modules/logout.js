const { By } = require('selenium-webdriver');

async function logout(driver) {
  try {
    // Get the logout element
    const element = await driver.findElement(By.css('a[href="/Logout"]'));
      
    // Scroll the element into view
    await driver.executeScript("arguments[0].scrollIntoView(true);", element);
    
    // Click the element
    await element.click();
    console.log('Sign Out link clicked successfully');
  }
  catch(error) {
    console.error(error);
  }
}

module.exports = { logout };