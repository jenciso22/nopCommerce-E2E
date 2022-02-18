import { ClientFunction } from "testcafe";
import homePage from "../pages/HomePage";
import registerPage from "../pages/RegisterPage";
import { URLS } from "../data/Constants";
import LoginPage from "../pages/LoginPage";
import CustomerPage from "../pages/CustomerPage";


const getURL = ClientFunction(() => window.location.href);
var randomNumber = Math.floor(Math.random() * 10000)
var userEmail = 'moataz'+randomNumber+'@test.com'

fixture('Registration Feature')
    .page `${URLS.NEW_URL}`


test('Assert Home Page Test', async t => {
    await t 
        .expect(getURL()).eql(URLS.NEW_URL)
        .takeScreenshot()
        .expect(homePage.subTitleHeader.exists).ok()
} )

test("User Registration and Login Test", async t => {

    await t
        .click(homePage.registerLink)
        .expect(getURL()).contains('register')
        .click(registerPage.genderOption)
        .typeText(registerPage.firstName, 'Moatz')
        .typeText(registerPage.lastName, 'Lasting')
        await registerPage.selectDay('5')
        await registerPage.selectMonth('November')
        await registerPage.selectYear('1995')
        await t
            .typeText(registerPage.email, userEmail)
            .typeText(registerPage.password, '123456')
            .typeText(registerPage.confirmPassword, '123456')
            .click(registerPage.registerButton)
            .expect(registerPage.successfulMessage.exists).ok()
            //Logout
            .click(homePage.logoutLink)
            //Login with register account
            .click(homePage.loginLink)
            .expect(LoginPage.accountHeader.exists).ok()
            .typeText(LoginPage.emapilInput,userEmail)
            .typeText(LoginPage.passwordInput,'123456')
            .click(LoginPage.submitButton)
            //Go to my account
            .click(homePage.myAccountLink)
            //check Orders is displayed
            .expect(CustomerPage.ordersLink.exists).ok()
            .click(CustomerPage.ordersLink)
            .expect(CustomerPage.noOrdersLabel.exists).ok()
            .takeScreenshot()
    
});






