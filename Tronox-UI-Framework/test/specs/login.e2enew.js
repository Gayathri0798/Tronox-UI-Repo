// import LoginPage from '../pageobjects/login.page.js'
let login = await import('../Data/' + global.wdioEnvParameters.config.appName + '/login.json', { assert: { type: 'json' } })
import LoginPage from '../pageobjects/commonutilities.js';
login=login.default;
const app = global.wdioEnvParameters.config.appName;
import allure from "@wdio/allure-reporter"

describe('Test scanerios for Login application '+global.wdioEnvParameters.config.appName+'', () => {
    beforeEach(async function () {
        allure.addFeature('Feature Name');
        allure.addSeverity('Blocker');
        await LoginPage.open();
      });
    

    it('TC001 Set timeout with to freeze screen', async () => {
        await LoginPage.screenresolution();
        console.log("URL path is"+await browser.getWindowHandle())
        await LoginPage.scriptTimeout();
    });

    it.only('Login with valid user name and password', async()=>{
        await LoginPage.screenresolution();
        await LoginPage.setinputvalues(login.validusername);
        // await LoginPage.setinputvalues(login.validusername);
    })

    it('Login with valid user name and password', async()=>{
        await LoginPage.screenresolution();
        await browser.pause(3000)
        // await LoginPage.setinputvalues(login.validusername);
        await $('//a[@title="Login"]').click();
        await $('//form[@autocomplete="on"]/div/input[@autocomplete="off"]').setValue('8904035627');
        await $('//form[@autocomplete="on"]/div/button[text()="Request OTP"]').click()
        await browser.pause(5000)
    })

    
})