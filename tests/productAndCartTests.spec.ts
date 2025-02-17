import {expect, test} from "@playwright/test";
import {base, cart, dashboard, licenses} from "../pageObject";

test.describe('Dashboard', () => {

  test.beforeEach(async ({page}) => {
    await dashboard.goToDashboard(page)
  })

  test('Navigate to the cPanel store', async ({page}) => {
    await dashboard.openAccountDropdown(page)
    const loginButton = dashboard.getLoginButton(page)
    //check that user is not logged in
    expect(loginButton).toBeDefined()
  })

  test('Order a Product', async ({page}) => {
    const orderSummaryTitle = 'Order Summary'
    const billingCycleText = '$17.49 USD Monthly'
    const totalDueSum =  base.calculateTotalDue(billingCycleText)
    const productName = 'cPanel Solo® Cloud (1 Account)'
    await dashboard.openLicensesPage(page)
    await licenses.orderProduct(page, licenses.productIds.solo)
    const orderSummary = licenses.getOrderSummary(page)
    await expect(orderSummary).toHaveText(orderSummaryTitle)
    const totalDue = licenses.getTotalDue(page)
    await expect(totalDue).toHaveText(totalDueSum)
    const productNameElement = licenses.getOrderedProductName(page)
    await expect(productNameElement).toHaveText(productName)
    const billingCycle = licenses.getBillingCycle(page)
    await expect(billingCycle).toHaveText(billingCycleText)
  })
})

test.describe('Pre-order page', () => {
  const monthlyPrices = ['$17.49 USD Monthly', '$26.00 USD Monthly']
  const licensesTitleText = 'cPanel Licenses'
  const configureTitleText = 'Configure'
  const reviewTitleText = 'Review & Checkout'

  test.beforeEach(async ({page}) => {
    await licenses.goToLicensesPage(page)
    const licensesTitle = licenses.getLicensesTitle(page, licensesTitleText )
    await expect(licensesTitle).toBeVisible()
    await licenses.orderProduct(page, licenses.productIds.solo)
    const configureTitle = licenses.getLicensesTitle(page, configureTitleText )
    await expect(configureTitle).toBeVisible()
    await page.waitForLoadState('networkidle')
  })

  test('Enter IP Address', async ({page}) => {
    const continueButton = licenses.getContinueButton(page)
    await expect(continueButton).toBeDisabled()
    await licenses.typeIPAddress(page, licenses.defaultIPAddress)
    const loader = licenses.getLoader(page)
    await expect(loader).toBeVisible()
    await expect(continueButton).toBeEnabled()
  })

  test('Select Addons', async ({page}) => {
    const monthlySumInOrder = base.calculateMonthlySum(monthlyPrices)
    const totalDueSum = base.calculateTotalDue(monthlySumInOrder)
    await licenses.selectAddons(page, 0, licenses.checkboxNames.cloudLinux)
    const totalDue = licenses.getTotalDue(page)
    await expect(totalDue).toHaveText(totalDueSum)
    const monthlyPrice = licenses.getMonthlyPriceInOrder(page)
    await expect(monthlyPrice).toHaveText(monthlySumInOrder)
  })

  test('Continue to Checkout, Verify Product and Price', async ({page}) => {
    const cartCount = '2'
    const cartTitles = [
      'cPanel Solo® Cloud (1 Account)',
      'Monthly CloudLinux'
    ]
    const subtotalSum = base.calculateTotalDue(monthlyPrices)
    await licenses.typeIPAddress(page, licenses.defaultIPAddress)
    await licenses.selectAddons(page, 0, licenses.checkboxNames.cloudLinux)
    const continueButton = licenses.getContinueButton(page)
    await continueButton.click()
    await page.waitForLoadState('networkidle')
    const reviewTitle = licenses.getLicensesTitle(page, reviewTitleText )
    await expect(reviewTitle).toBeVisible()
    const cartCountItem = cart.getCartCount(page)
    await expect(cartCountItem).toHaveText(cartCount)
    await cart.checkCartItemTitles(page, cartTitles)
    const subtotal = cart.getSubtotalSum(page)
    await expect(subtotal).toHaveText(subtotalSum)
    await cart.checkMonthlyPricesInCartItems(page, monthlyPrices)
    const totalDue = cart.getTotalDue(page)
    await expect(totalDue).toHaveText(subtotalSum)
  })

  test('Proceed to Checkout, Verify Checkout Information', async ({page}) => {
    const tableInfo = [
      ['cPanel Solo® Cloud (1 Account)', 'Monthly', licenses.defaultIPAddress, '$17.49 USD', '$5.25 USD'],
      ['Monthly CloudLinux', 'Monthly', licenses.defaultIPAddress, '$26.00 USD', '$7.80 USD'],
    ]
    const signUpBlocks = [
      'Personal Information',
      'Billing Address',
      'Account Security',
      'Terms & Conditions',
      'Payment Details'
    ]
    const totalCartPrice = base.calculateTotalDue(monthlyPrices)
    const checkoutPageHeader = 'Checkout'
    await licenses.typeIPAddress(page, licenses.defaultIPAddress)
    await licenses.selectAddons(page, 0, licenses.checkboxNames.cloudLinux)
    const continueButton = licenses.getContinueButton(page)
    await continueButton.click()
    await page.waitForLoadState('networkidle')
    await cart.proceedToCheckout(page)
    await page.waitForLoadState('networkidle')
    const pageHeader = cart.getCheckoutHeader(page)
    await expect(pageHeader).toHaveText(checkoutPageHeader)
    await cart.checkOrderTableInfo(page, tableInfo)
    const totalDue = cart.getTotalCardPrice(page)
    await expect(totalDue).toHaveText(totalCartPrice)
    await cart.checkSignUpBlocks(page, signUpBlocks)
    const completeOrderButton = cart.getCompleteOrderButton(page)
    await expect(completeOrderButton).toBeVisible()
    await expect(completeOrderButton).toBeDisabled()
  })
})


