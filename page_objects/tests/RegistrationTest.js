import { ClientFunction } from "testcafe";
import homePage from "../pages/HomePage";
import registerPage from "../pages/RegisterPage";
import { URLS } from "../data/Constants";
import LoginPage from "../pages/LoginPage";
import CustomerPage from "../pages/CustomerPage";

const dataSet = require('../data/data.json')
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

dataSet.forEach(data => {    // TDD with the DATA SET (data.json)
test("User Registration and Login Test", async t => {

    await t
        .click(homePage.registerLink)
        .expect(getURL()).contains('register')
        .click(registerPage.genderOption)
        .typeText(registerPage.firstName, data.firstname)
        .typeText(registerPage.lastName, data.lastname)
        await registerPage.selectDay(data.birthday)
        await registerPage.selectMonth(data.birthmonth)
        await registerPage.selectYear(data.birthyear)
        await t
            .typeText(registerPage.email,data.email+randomNumber+'@test.com')
            .typeText(registerPage.password,data.password)
            .typeText(registerPage.confirmPassword,data.password)
            .click(registerPage.registerButton)
            .expect(registerPage.successfulMessage.exists).ok()
            //Logout
            .click(homePage.logoutLink)
            //Login with register account
            .click(homePage.loginLink)
            .expect(LoginPage.accountHeader.exists).ok()
            .typeText(LoginPage.emapilInput,data.email+randomNumber+'@test.com')
            .typeText(LoginPage.passwordInput,data.password)
            .click(LoginPage.submitButton)
            //Go to my account
            .click(homePage.myAccountLink)
            //check Orders is displayed
            .expect(CustomerPage.ordersLink.exists).ok()
            .click(CustomerPage.ordersLink)
            .expect(CustomerPage.noOrdersLabel.exists).ok()
            .takeScreenshot()
    
})});






