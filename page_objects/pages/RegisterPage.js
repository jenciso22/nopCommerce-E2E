import {Selector, t} from "testcafe";

class RegisterPage{
    constructor(){ 
        this.genderOption = Selector('#gender-male')
        this.firstName = Selector('#FirstName')
        this.lastName = Selector('#LastName')
        this.dateOfBirthDayList = Selector("select[name='DateOfBirthDay']")
        this.dateOfBirthMonthList = Selector("select[name='DateOfBirthMonth']")
        this.dateOfBirthYearList = Selector("select[name='DateOfBirthYear']")
        this.email = Selector('#Email')
        this.password = Selector('#Password')
        this.confirmPassword = Selector('#ConfirmPassword')
        this.registerButton = Selector('#register-button.button-1.register-next-step-button')
        this.successfulMessage = Selector('div.result').withText('Your registration completed')

    }


    async selectDay(day){
        const DayOption = this.dateOfBirthDayList.find('option')
        await t 
            .click(this.dateOfBirthDayList)
            .click(DayOption.withText(day))
    }

    async selectMonth(month){
        const MonthOption = this.dateOfBirthMonthList.find('option')
        await t 
            .click(this.dateOfBirthMonthList)
            .click(MonthOption.withText(month))
    }

    async selectYear(year){
        const YearOption = this.dateOfBirthYearList.find('option')
        await t 
            .click(this.dateOfBirthYearList)
            .click(YearOption.withText(year))
    }

}

export default new RegisterPage();


// # <-- ID
// . <-- Class