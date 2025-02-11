
import LoginPage from '../pageobjects/login.page.js'
let login = await import('../Data/' + global.wdioEnvParameters.config.appName + '/login.json', { assert: { type: 'json' } })
import loginPage from '../pageobjects/login.page.js';
login=login.default;
const app = global.wdioEnvParameters.config.appName;
import allure from "@wdio/allure-reporter"
import {logger}  from '../../logerror/logfile.js';
import master from '../../Validation/Validation.js';
describe('Test scanerios for Login application', () => {
    beforeEach(async function () {
        allure.addFeature('Feature Name');
        allure.addSeverity('Blocker');
       
        await LoginPage.open();
      });
    it.only('TC001 should login with valid credentials on click of submit button', async () => {
        console.log(login.validusername.username, login.validusername.password)
        await LoginPage.populateLoginFields(login.validusername.username, login.validusername.password);
        await LoginPage.submitCredendtials();
        await loginPage.verifyLandingPage();
        
    });

    it('TC002 should login with Invalid credentials i.e user name and password on Submit button', async () => {
        await LoginPage.populateLoginFields(login.Invalid.username, login.validusername.password);
        await LoginPage.submitCredendtials();
        await browser.pause(6000) 
        await LoginPage.verifyErrorMessage(login.Invalid.errormsg);
    })

    it('TC003 Logout Scanerio', async () => {
        await LoginPage.populateLoginFields(login.validusername.username, login.validusername.password);
        await LoginPage.submitCredendtials();
        await loginPage.verifyLandingPage();
        await LoginPage.logoutsecession() 
        await browser.pause(6000) 
    })
    it('TC004 Forgot Username in input Scanerio', async () => {
        await LoginPage.populateLoginFields(login.forgotname.username, login.validusername.password);
        await LoginPage.submitCredendtials();
        await LoginPage.forgotdetails(login.forgotname.errormsg1);
        await browser.pause(6000) 
    })

    it('TC005 Forgot password in input Scanerio', async () => {
        await LoginPage.populateLoginFields(login.validusername.username, login.forgotpassword.password);
        await LoginPage.submitCredendtials();
        await LoginPage.forgotpassworddetails(login.forgotpassword.errormsg2);
        await browser.pause(6000) 
    })
})

describe.only('Test scanerios for Login application '+global.wdioEnvParameters.config.appName+'', () => {
    beforeEach(async function () {
        allure.addFeature('Feature Name');
        allure.addSeverity('Blocker');
        await master.masterdatavalidation();
        await LoginPage.open();
      });
    it('TC001 should login with valid credentials on click of submit button', async () => {
        console.log(login.validusername.username, login.validusername.password,app)
        await LoginPage.populateLoginFields(login.validusername.username, login.validusername.password, app);
        await LoginPage.submitCredendtials();
        await loginPage.verifyLandingPage(login.validusername.checkTitle);
        logger.error("Login is working fine");
    });

    it('TC002 should login with Invalid credentials i.e user name and password on Submit button', async () => {
        await LoginPage.populateLoginFields(login.Invalid.username, login.validusername.password);
        await LoginPage.submitCredendtials();
        await browser.pause(6000) 
        console.log(login.Invalid.errormsg)
        await LoginPage.verifyErrorMessage(login.Invalid.errormsg);
    })

    it('TC003 Logout Scanerio', async () => {
        await LoginPage.populateLoginFields(login.validusername.username, login.validusername.password);
        await LoginPage.submitCredendtials();
        await loginPage.verifyLandingPage(login.validusername.checkTitle);
        await LoginPage.logoutsecession() 
        await browser.pause(6000) 
    })
    it('TC004 Forgot Username in input Scanerio', async () => {
        await LoginPage.populateLoginFields(login.forgotname.username, login.validusername.password);
        await LoginPage.submitCredendtials();
        await LoginPage.forgotdetails(login.forgotname.errormsg1);
        await browser.pause(6000) 
    })

    it('TC005 Forgot password in input Scanerio', async () => {
        await LoginPage.populateLoginFields(login.validusername.username, login.forgotpassword.password);
        await LoginPage.submitCredendtials();
        await LoginPage.forgotpassworddetails(login.forgotpassword.errormsg2); 
        await browser.pause(6000) 
    })

    it('TC006 customer table validation', async()=>{
        await LoginPage.populateLoginFields(login.validusername.username, login.validusername.password, app);
        await LoginPage.submitCredendtials();
        await browser.pause(3000);
        await loginPage.verifyLandingPage(login.validusername.checkTitle);
        await browser.pause(3000);
        await loginPage.tablevalidation();
        await browser.pause(3000);
    })
    
})