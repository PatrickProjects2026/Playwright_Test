const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('RECHECK test pro - README.html UI & Data Verification', () => {

  // Load the local HTML file before each test
  test.beforeEach(async ({ page }) => {
    const filePath = path.resolve(__dirname, 'readme.html');
    await page.goto(`file://${filePath}`);
  });

  test('1. Verify page title and header content', async ({ page }) => {
    // Check document title
    await expect(page).toHaveTitle('README');

    // Check main heading
    const h1 = page.locator('h1');
    await expect(h1).toHaveText('README');

    // Check description paragraphs
    const p1 = page.locator('p').first();
    await expect(p1).toHaveText('This is a sample README file for the project.');
  });

  test('2. Verify interactive select dropdown options', async ({ page }) => {
    const selectLocator = page.locator('table select');
    
    // Check that dropdown exists and is visible
    await expect(selectLocator).toBeVisible();

    // Verify option values
    await expect(selectLocator.locator('option')).toHaveText(['logs', 'readme']);

    // Test selecting an option
    await selectLocator.selectOption('readme');
    expect(await selectLocator.inputValue()).toBe('readme');
  });

  test('3. Verify RECHECK test pro metadata rows', async ({ page }) => {
    // Locate all table rows
    const rows = page.locator('table tr');

    // Verify Title row contains "RECHECK test pro"
    const titleRow = rows.filter({ hasText: 'Title' });
    await expect(titleRow.locator('td').nth(1)).toHaveText('RECHECK test pro');
    await expect(titleRow.locator('td').nth(2)).toHaveText('[cite: 1]');

    // Verify Action row[cite: 1]
    const actionRow = rows.filter({ hasText: 'Action' });
    await expect(actionRow.locator('td').nth(1)).toHaveText('Checks commands using');
  });

  test('4. Verify command flags configuration rows (-read, -write, -start)', async ({ page }) => {
    // Verify -read command row[cite: 1]
    const readRow = page.locator('tr', { hasText: '-read' });
    await expect(readRow.locator('td').nth(1)).toHaveText('log, me');
    await expect(readRow.locator('td').nth(2)).toHaveText('(file)[cite: 1]');

    // Verify -write command row[cite: 1]
    const writeRow = page.locator('tr', { hasText: '-write' });
    await expect(writeRow.locator('td').nth(1)).toHaveText('readme');

    // Verify -start command row[cite: 1]
    const startRow = page.locator('tr', { hasText: '-start' });
    await expect(startRow.locator('td').nth(1)).toHaveText('all');
    await expect(startRow.locator('td').nth(2)).toHaveText('step[cite: 1]');
  });

  test('5. Verify technical metrics and language specs', async ({ page }) => {
    // Verify File extension (json)[cite: 1]
    const extRow = page.locator('tr', { hasText: 'File extension' });
    await expect(extRow.locator('td').nth(1)).toHaveText('json');

    // Verify File size (-3kb)[cite: 1]
    const sizeRow = page.locator('tr', { hasText: 'File size' });
    await expect(sizeRow.locator('td').nth(1)).toHaveText('-3kb');

    // Verify Language specs[cite: 1]
    const langRow = page.locator('tr', { hasText: 'Lang' });
    await expect(langRow.locator('td').nth(1)).toHaveText('Language');
    await expect(langRow.locator('td').nth(2)).toHaveText('ps, cplus, .net[cite: 1]');
  });

  test('6. Verify visual styling and container layout', async ({ page }) => {
    const container = page.locator('.container');
    await expect(container).toBeVisible();

    // Check computed background color of the body (Dark theme check: #0f172a)
    const bodyBg = await page.evaluate(() => window.getComputedStyle(document.body).backgroundColor);
    expect(bodyBg).toBe('rgb(15, 23, 42)');
  });

});