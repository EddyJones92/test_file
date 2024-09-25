import DashboardMethods from "./dashboard/dashboardMethods";
import LicensesMethods from "./cPanelLicenses/licensesMethods";
import CartMethods from "./cart/cartMethods";
import BaseMethods from "./base/baseMethods";

export const dashboard = new DashboardMethods()
export const licenses = new LicensesMethods()
export const cart = new CartMethods()
export const base = new BaseMethods()