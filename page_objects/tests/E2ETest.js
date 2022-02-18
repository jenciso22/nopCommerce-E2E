import checkoutPage from "../pages/CheckoutPage";
import cartPage from "../pages/CartPage";
import homePage from "../pages/HomePage";
import productDetailsPage from "../pages/ProductDetailsPage";
import registerPage from "../pages/RegisterPage";
import SearchResultPage from "../pages/SearchResultPage";
import myOrderPage from "../pages/MyOrderPage";
import { URLS } from "../data/Constants"
import { ClientFunction } from 'testcafe';


const getURL = ClientFunction(() => window.location.href);
var randomNumber = Math.floor(Math.random() * 10000)
var userEmail = 'moataz'+randomNumber+'@test.com'

fixture('E2E Fixture')
    .page `${URLS.NEW_URL}`


test('Assert Home Page Test', async t => {
    await t 
        .expect(getURL()).eql(URLS.NEW_URL)
        .takeScreenshot()
        .expect(homePage.subTitleHeader.exists).ok()
} )

test("Place Order E2E Tests", async t => {

    await t
        .maximizeWindow()
        .click(homePage.registerLink)
        .expect(getURL()).contains('register')
        .click(registerPage.genderOption)
        .typeText(registerPage.firstName, 'Moatz')
        .typeText(registerPage.lastName, 'Lasting')
        .typeText(registerPage.email, userEmail)
        .typeText(registerPage.password, '123456')
        .typeText(registerPage.confirmPassword, '123456')
        .click(registerPage.registerButton)
        .expect(registerPage.successfulMessage.exists).ok()
        await homePage.search('Apple MacBook Pro 13-inch')
        await t
            //search results
            .click(SearchResultPage.productTitle)
            .expect(getURL()).contains('apple-macbook-pro-13-inch')
            //product details
            .expect(productDetailsPage.productPrice.exists).ok()
            .selectText(productDetailsPage.productQuantity).pressKey("delete")
            .typeText(productDetailsPage.productQuantity, '3')
            .click(productDetailsPage.addToCart)
            .expect(productDetailsPage.successMessage.exists).ok()
            .wait(3000)
            //Cart and Checkout
            .click(homePage.cartLink)
            .click(cartPage.termsLabel)
            .click(cartPage.checkoutBtn)
            .expect(getURL()).contains('checkout')
            //Place Order
            await checkoutPage.selectCountry('Germany')
            await t
            .takeScreenshot()
            .typeText(checkoutPage.cityTxt, 'Berlin')
            .typeText(checkoutPage.addressTxt, '108 dd test')
            .typeText(checkoutPage.zipTxt, '12345')
            .typeText(checkoutPage.phoneTxt, '332434345')
            .click(checkoutPage.continueBtn)
            .click(checkoutPage.nextDayOption)
            .click(checkoutPage.nextShippingBtn)
            .click(checkoutPage.nextPaymentBtn)
            .click(checkoutPage.nextConfirmBtn)
            .click(checkoutPage.confirmOrderBtn)
            .expect(checkoutPage.orderConfirmationMessage.exists).ok()
            .click(checkoutPage.viewOrderDetailsLink)
            // My account
            .click(homePage.myAccountLink)
            .click(myOrderPage.orders)
    
});

test("Change Currency Test", async t => {
    await homePage.changeCurrency('Euro');
    await t
        .takeScreenshot
    
});

    