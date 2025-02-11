
// import LoginPage from '../pageobjects/login.page.js'
// let login = await import('../Data/' + global.wdioEnvParameters.config.appName + '/Homepage.json', { assert: { type: 'json' } })
// login=login.default;
// const app = global.wdioEnvParameters.config.appName;
import allure from "@wdio/allure-reporter"
// import {logger}  from '../../logerror/logfile.js';
import master from '../../Validation/Validation.js';
import Jamaica from '../pageobjects/Homepage.js'
let homepage = await import('../Data/' + global.wdioEnvParameters.config.appName + '/Homepage.json', { assert: { type: 'json' } })
homepage=homepage.default;
import page from '../pageobjects/page.js'
const openurl =  new page();
// import reusablemethods from "../pageobjects/reusablemethods.js";
describe.only('Test scanerios for Home application for '+global.wdioEnvParameters.config.appName+'', () => {
    beforeEach(async function () {
        allure.addFeature('Feature Name');
        allure.addSeverity('Blocker');
        await master.masterdatavalidation();
        await openurl.open();
      });
 
    it('TC001 Home page validation bar validation', async()=>{
        await browser.setWindowSize(1850, 1850);
        await browser.pause(5000);
        await Jamaica.jamaicaweb(homepage.menu1, homepage.menu2, homepage.menu3, homepage.menu4);
    })


})