import { $ } from '@wdio/globals'
import Page from './page.js';
// import  {Encryption} from '../Data/utility/crypto.js'
let loginxpath = await import('../pageobjects/elementIdentifiers/' + global.wdioEnvParameters.config.appName + '/login.json', { assert: { type: 'json' } })
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
    get menubars(){
        return $()
    }
    get genericpath(){
        return $(loginxpath.logininput);
    }
    async setinputvalues(details){
        console.log(details.username,details.password);
        if (details.username == '' || details.password == ''){
            console.log("Please check the User name or password in "+global.wdioEnvParameters.config.appName+"JSON")
        }else{
            let cred = Object.keys(details);
            console.log("The deatils"+cred);
            cred.forEach((cred) => {
                this.inputUsername.setValue(details[cred]);
                this.inputPassword.setValue(details[cred])
                
              })
        }
        
       
    }

    async screenresolution(){
        await this.setscreen;
    }
    
    async scriptTimeout(){
        await browser.setTimeout({ 'script': 60000 });
        await browser.executeAsync((done) => {
            console.log('this should not fail')
            setTimeout(done, 59000)
        })
    }

    async implicitTimeout(){
        await browser.setTimeout({ 'implicit': 5000 })
    }

    async pageLoadtimeout(){
        await browser.setTimeout({ 'pageLoad': 10000 });
    }

    async valiaterrl(){
        await expect(browser).toHaveUrl('/login');
    }
    async getscreensize(){
        const windowSize = await browser.getWindowSize();
        console.log(windowSize);
    }

    async keypress(){
        // import { Key } from 'webdriverio' use it on top
        await browser.keys([Key.Ctrl, 'a']);
        await browser.keys([Key.Ctrl, 'c']);
    }

    async pause(time){
        await browser.pause(time);
    }

    async reloadsecession(){
        await browser.reloadSession();
    }
    
    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open('login');
    }
}

export default new LoginPage();