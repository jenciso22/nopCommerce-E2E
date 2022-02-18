import {Selector, t} from "testcafe";


class LoginPage{
    constructor(){
        this.emapilInput = Selector ('#Email')
        this.passwordInput = Selector ('#Password')
        this.submitButton = Selector ('button.button-1.login-button')
        this.accountHeader = Selector ('strong').withText('Returning Customer')

    }
}

export default new LoginPage();