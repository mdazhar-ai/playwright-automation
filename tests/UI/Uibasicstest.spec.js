import { test, expect } from '@playwright/test';
import { HomePage } from '../../page/Homepage.js';

test('Amnet Digital Title Test', async ({ page }) => {

    const homePage = new HomePage(page);

    // Open URL
    await homePage.open();

    // Maximize
    await homePage.maximize();

    await page.waitForTimeout(3000);

    // Title
    const title = await homePage.getTitle();
    console.log('Page Title:', title);

    await expect(page).toHaveTitle(
        'Artificial Intelligence (AI) and Data Analytics Services Provider'
    );

    // Click
    await homePage.clickSwiftAI();

    await page.waitForTimeout(3000);

});