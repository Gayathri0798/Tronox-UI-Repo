import { $ } from '@wdio/globals'
import Page from './page.js';
import  {Encryption} from '../Data/utility/crypto.js'
let loginxpath = await import('../pageobjects/elementIdentifiers/' + global.wdioEnvParameters.config.appName + '/login.json', { assert: { type: 'json' } })
import reusablemethods from '../pageobjects/reusablemethods.js'
const reusable = new reusablemethods();
/**
 * sub page containing specific selectors and methods for a specific page
 */
loginxpath = loginxpath.default;
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    get inputUsername () {
        return $(loginxpath.logininput);
    }

    get inputPassword () {
        return $(loginxpath.loginpassword);
    }

    get btnSubmit () {
        return $(loginxpath.loginbutton);
    }

    get errormsg () {
        console.log(loginxpath.errormessage)
        return $(loginxpath.errormessage);
    }

    get logout () {
        console.log(loginxpath.logoutdropdown)
        return $(loginxpath.logoutdropdown);
    }
    get logoutbtn(){
        console.log(loginxpath.logoutbtn)
        return $(loginxpath.logoutbtn);
    }
    get setscreen(){
        return browser.setWindowSize(1400, 1400);
    }
    get submitbuttonclick(){
        return this.btnSubmit.click();
    }
    get forgotusernameerror(){
        return $(loginxpath.errormeggaseusername);
    }
    get forgotpassworderror(){
        return $(loginxpath.errormeggasepassword);
    }
    get carwaleloginclick(){
        return $(loginxpath.carwaleloginbutton);
    }
    
    get clickonmenubar(){
        return $(loginxpath.menubarlocation);
    }

    get Customeroption(){
        return $(loginxpath.customeroption);
    }

    get customerdata(){
    return $$(loginxpath.mastercustomertable);
    }

    async populateLoginFields(username,password,appnameused)
    {
            await this.setscreen;
            await this.inputUsername.setValue(username);

            const encrypter = new Encryption("secret");

            //const encrypted = encrypter.encrypt(password);
            let dencrypted = "";
            if(password !== "")
                dencrypted = encrypter.dencrypt(password);

            console.log("Encrypted Value:", password);
            console.log("Decrypted Value:", dencrypted);

            await this.inputPassword.setValue(dencrypted);
    }
    async submitCredendtials(){
        await this.submitbuttonclick;
    }
    async verifyLandingPage(checkTitle){
        await browser.pause(6000);
        await expect(browser).toHaveTitle(checkTitle);
    }

       async verifyErrorMessage(errordetails){
            await expect(this.errormsg).toHaveText(errordetails)
    }

    async logoutsecession(){
        await this.logout.waitForExist();
        await this.logout.click(); 
        await this.logoutbtn.click();
        await expect(browser).toHaveTitle('Login'); 
    }
    async forgotdetails(forgoterror){
        await expect(this.forgotusernameerror).toHaveText(forgoterror)
    }
    async forgotpassworddetails(forgotpassworderror){
        await expect(this.forgotpassworderror).toHaveText(forgotpassworderror)
    }

    async tablevalidation(){
        await this.clickonmenubar.click();
        await this.Customeroption.click();
        await reusable.findMultipleElementsInTables(this.customerdata);
    }
    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open('login');
    }
}

export default new LoginPage();