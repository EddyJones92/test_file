import { Locator, Page } from '@playwright/test'
import LicensesVariables from './licensesVariables'

export default class LicensesMethods extends LicensesVariables {
	async orderProduct(page: Page, id: string) {
		await page.locator(`[id=${id}-order-button]`).click()
	}

	async goToLicensesPage(page: Page) {
		await page.goto('/store/cpanel-licenses')
	}

	async typeIPAddress(page: Page, ipAddress: string) {
		const IPField = page.locator('#customfield11')
		await IPField.fill(ipAddress)
		await IPField.press('Enter')
	}

	getLicensesTitle(page: Page, title: string): Locator {
		return page.locator('.header-lined h1', { hasText: title })
	}

	getOrderSummary(page: Page): Locator {
		return page.locator('#orderSummary h2')
	}

	getTotalDue(page: Page): Locator {
		return page.locator('.total-due-today .amt')
	}

	getOrderedProductName(page: Page): Locator {
		return page.locator('.product-name')
	}

	getContinueButton(page: Page): Locator {
		return page.locator('#btnCompleteProductConfig')
	}

	getBillingCycle(page: Page): Locator {
		return page.locator('#inputBillingcycle option')
	}

	getLoader(page: Page): Locator {
		return page.locator('#customfield11Loader')
	}

	async selectAddons(page: Page, orderIndex: number, checkboxName: string) {
		await page.locator('.panel-add').nth(orderIndex).click()
		const checkbox = page.locator(`[name="${checkboxName}"]`)
		await checkbox.isChecked()
	}

	getMonthlyPriceInOrder(page: Page): Locator {
		return page.locator('.summary-totals .pull-right').nth(1)
	}
}
