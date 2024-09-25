import { expect, Locator, Page } from '@playwright/test'

export default class CartMethods {
	getCartCount(page: Page): Locator {
		return page.locator('#cartItemCount')
	}

	async checkCartItemTitles(page: Page, titles: string[]) {
		const pageTitles = await page.locator('.item-title').allTextContents()
		for (const title of titles) {
			const index = titles.indexOf(title)
			expect(pageTitles[index]).toContain(title)
		}
	}

	getSubtotalSum(page: Page): Locator {
		return page.locator('#subtotal')
	}

	async checkMonthlyPricesInCartItems(page: Page, prices: string[]) {
		const monthlyPrices = await page.locator('.cycle').allTextContents()
		for (const price of prices) {
			const index = prices.indexOf(price)
			expect.soft(monthlyPrices[index]).toContain(price)
		}
	}

	async proceedToCheckout(page: Page) {
		await page.locator('#checkout').click()
	}

	getTotalDue(page: Page): Locator {
		return page.locator('#totalDueToday')
	}

	getCheckoutHeader(page: Page): Locator {
		return page.locator('.header-lined h1')
	}

	async checkOrderTableInfo(page: Page, info: string[][]) {
		const tableRows = await page.locator('table tbody tr').all()
		for (const row of tableRows) {
			const index = tableRows.indexOf(row)
			const cells = await row.locator('td').allTextContents()
			const rowInfo: string[] = info[index]
			for (const cell of cells) {
				const index = cells.indexOf(cell)
				expect.soft(cell).toContain(rowInfo[index])
			}
		}
	}

	getTotalCardPrice(page: Page): Locator {
		return page.locator('#totalCartPrice')
	}

	async checkSignUpBlocks(page: Page, blockNames: string[]) {
		for (const blockName of blockNames) {
			const block = page.getByText(blockName)
			await expect(block).toBeVisible()
		}
	}

	getCompleteOrderButton(page: Page): Locator {
		return page.locator('#btnCompleteOrder')
	}
}
