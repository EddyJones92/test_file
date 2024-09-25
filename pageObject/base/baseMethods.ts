export default class BaseMethods {
	calculateTotalDue(monthlyPrice: string | string[]): string {
		if (typeof monthlyPrice === 'string') {
			const price = monthlyPrice.replace(/[^0-9.]/g, '')
			return `$${(parseFloat(price) * 0.3).toFixed(2)} USD`
		}
		let totalDue = 0
		for (const monthly of monthlyPrice) {
			const price = monthly.replace(/[^0-9.]/g, '')
			totalDue += parseFloat(price) * 0.3
		}
		return `$${totalDue.toFixed(2)} USD`
	}

	calculateMonthlySum(monthlyPrices: string[]): string {
		let monthlySum = 0
		for (const monthly of monthlyPrices) {
			const price = monthly.replace(/[^0-9.]/g, '')
			monthlySum += parseFloat(price)
		}
		return `$${monthlySum.toFixed(2)} USD`
	}
}
