const { By } = require('selenium-webdriver');
const { login } = require('./login');
const { logout } = require('./logout');
const queries = require('../configs/queries');

async function processSearch(query) {
  let driver;
  let promDate = query.promDate;
  try {
    // Process login and get the driver instance
    driver = await login();

    /* Start to Execute the steps going to the print */
    // Click the Jurisprudence link
    await driver.findElement(By.xpath("/html/body/section/section/section/div[1]/div[2]/div[1]/div/div[2]/a")).click();

    // Enter GR Number
    await driver.findElement(By.id('issue_no')).sendKeys(query.grNumber);

    // Click Search
    await driver.findElement(By.xpath("/html/body/section/div/div/div[2]/div[1]/div/form/footer/button[1]")).click();

    // Locate the table element
    const table = await driver.findElement(By.css('table.table.table-striped.m-b-none.sortable-theme-bootstrap'));

     // Find all rows in the table
     const rows = await table.findElements(By.css('tr'));

     for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
       const row = rows[rowIndex];
       
       // Find all cells in the current row
       const cells = await row.findElements(By.css('td, th')); // 'td' for data cells, 'th' for header cells

       for (let cellIndex = 0; cellIndex < cells.length; cellIndex++) {
         const cell = cells[cellIndex];
         const cellText = await cell.getText(); // Get text content of the cell
         console.log(`Row ${rowIndex + 1}, Cell ${cellIndex + 1}: ${cellText}`);
       }
     }
     //Click the final result
     await driver.findElement(By.xpath("/html/body/section/div/div/div[2]/div[2]/div/div/section/section/div/table/tbody/tr")).click();

    /* End to Execute the steps going to the print */

    //logout for test
    await logout(driver);
    console.log('Login successful, processed query:', query);
  } catch (error) {
    console.error('Processing failed', error);
  } finally {
    if (driver) {
      await driver.quit();
    }
  }
}

async function processSearches() {
  for (let query of queries.queries) {
    await processSearch(query);
  }
}

module.exports = { processSearches };