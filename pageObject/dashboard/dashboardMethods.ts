import {expect, Page} from "@playwright/test"

export default class DashboardMethods {

  async goToDashboard(page: Page) {
    await page.goto('/')
    const pageHeader = page.locator('.breadcrumb-item')
    await expect(pageHeader).toBeVisible()
  }

  async openAccountDropdown(page: Page) {
    const accountButton = page.locator('#Secondary_Navbar-Account a', {hasText: 'Account'})
    await accountButton.click()
  }

  async getLoginButton(page: Page) {
    return page.locator('#Secondary_Navbar-Login')
  }

  async openLicensesPage(page: Page) {
    const licensesButton = page.locator('a', {hasText: 'Browse Products'}).nth(0)
    await licensesButton.click()
  }

}