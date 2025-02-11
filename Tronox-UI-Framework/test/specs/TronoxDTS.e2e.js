import BasePage from "../../common.js"
let dataset = await import('../Data/'+ global.wdioEnvParameters.config.appName +'/Physicalinventory.json', { assert: { type: 'json' } });
let locators = await import('../pageobjects/elementIdentifiers/'+ global.wdioEnvParameters.config.appName +'/physicalinventoryxpath.json', { assert: { type: 'json' } })
locators=locators.default;
dataset=dataset.default;

const Base = new BasePage();

describe('SAP Furio app Automation', ()=>{
    before(async()=>{
        await browser.url(global.wdioEnvParameters.config.baseUrl);
        await browser.maximizeWindow();
    })

    it('S4_DTS_PP_Manage Process Orders',async()=>{ 
        await Base.waitForDisplayedAndSetValue($(locators.Usernameoktaxpath), dataset.logincred.username);
        await Base.waitForDisplayedAndSetValue($(locators.Passwordoktaxpath), dataset.logincred.password);
        await Base.waitForDisplayedAndClick($(locators.Submitbuttonxpath), dataset.logincred.submitbtn, 5000);
        await Base.waitForDisplayedAndSetValue($(locators.Codepathxpath), dataset.logincred.code); // OTP_____________________
        await Base.waitForDisplayedAndClick($(locators.verifybuttonxpath), 5000);
        await browser.pause(10000)
    
        // Launch Firio app launch
        const dashboard = $(locators.dashboardElement);
        await dashboard.scrollIntoView();
        await Base.waitForDisplayedAndClick(dashboard, 5000);
        await browser.pause(5000);
        
        // window handle
        const newwindow = await browser.getWindowHandles();
        await browser.switchToWindow(newwindow[1]);
        await browser.pause(10000);
    
        // Click on the DTS COR2 Tile
        const COR2tile = $(locators.COR2tileselectionxpath);
        await COR2tile.scrollIntoView();
        await Base.waitForDisplayedAndClick(COR2tile, 5000);
        await browser.pause(5000);
    
        // Switch to the iframe to enter data
        const iframe3 = await browser.$(locators.iframexpath);
        await browser.switchToFrame(iframe3);
        await browser.pause(3000);

        // Enter the Process order
        const f4btn = await $(locators.COR2processorderxpath);
        await browser.keys('F4');
        await browser.pause(5000);

        // Click on the 3rd tab
        await Base.waitForDisplayedAndClick($(locators.COR2clickon3tabxpath), 5000);
        await browser.pause(3000);

        // Enter the plant number
        await Base.waitForDisplayedAndSetValue($(locators.COR2enterplantnumber), dataset.COR2data.plantnumber);
        await browser.pause(3000);

        // Enter the schedule date
        await Base.waitForDisplayedAndSetValue($(locators.CORS2schedulefinishxpath), dataset.COR2data.scheduledate);
        await browser.pause(3000);

        // Click on the find button
        await Base.waitForDisplayedAndClick($(locators.COR2findbtnxpath), 3000);
        await browser.takeScreenshot();
        await browser.pause(10000);
        await browser.takeScreenshot();

    }) 

    it('S4_DTS_PP_Change Process Order_COR2_Final delivery for month end',async()=>{

        await Base.waitForDisplayedAndSetValue($(locators.Usernameoktaxpath), dataset.logincred.username);
        await Base.waitForDisplayedAndSetValue($(locators.Passwordoktaxpath), dataset.logincred.password);
        await Base.waitForDisplayedAndClick($(locators.Submitbuttonxpath), dataset.logincred.submitbtn, 5000);
        await Base.waitForDisplayedAndSetValue($(locators.Codepathxpath), dataset.logincred.code); // OTP_____________________
        await Base.waitForDisplayedAndClick($(locators.verifybuttonxpath), 5000);
        await browser.pause(10000)
    
        // Launch Firio app launch
        const dashboard = $(locators.dashboardElement);
        await dashboard.scrollIntoView();
        await Base.waitForDisplayedAndClick(dashboard, 5000);
        await browser.pause(5000);
        
        // window handle
        const newwindow = await browser.getWindowHandles();
        await browser.switchToWindow(newwindow[1]);
        await browser.pause(10000);
    
        // Click on the DTS COR2 Tile
        const COR2tile = $(locators.COR2tileselectionxpath);
        await COR2tile.scrollIntoView();
        await Base.waitForDisplayedAndClick(COR2tile, 5000);
        await browser.pause(5000);
    
        // Switch to the iframe to enter data
        const iframe3 = await browser.$(locators.iframexpath);
        await browser.switchToFrame(iframe3);
        await browser.pause(3000);

        // Enter the Process order
        const f4btn = await $(locators.COR2processorderxpath);
        await Base.waitForDisplayedAndSetValue(f4btn, dataset.COR2data.processorder);
        await browser.keys('Enter');
        await browser.pause(5000);
        
        // Click on the good delivery tab
        await Base.waitForDisplayedAndClick($(locators.COR2clickongoodsdeliveryxpath), 5000);
        await browser.pause(3000);

        // Click on the Final delivery check box
        await Base.waitForDisplayedAndClick($(locators.COR2finaldeliveryxpath), 5000);
        await browser.pause(2000);

        // click on the save button
        await Base.waitForDisplayedAndClick($(locators.COR2savebtnxpath), 5000);
        await browser.pause(5000);



    })

})    