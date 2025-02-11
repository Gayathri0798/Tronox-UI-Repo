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
    it.skip('Login page Validation with Code', async()=>{
        const username = $('//input[@id="okta-signin-username"]');
        const password = $('//input[@id="okta-signin-password"]');
        const submitbtn = $('//input[@id="okta-signin-submit"]');
        const option2 = $('//a[contains(text(), "Or enter code")]');
        const sendcode = $('//input[@name="answer"]');
        const verifybutton = $('//a[@data-se="inline-totp-verify"]');
        await Base.waitForDisplayedAndSetValue(username, "rahul.jahagirdar@tronox.com");
        await Base.waitForDisplayedAndSetValue(password, "2s@10EC032");
        await Base.waitForDisplayedAndClick(submitbtn, "Submit", 5000);
        await browser.pause(5000);
        await Base.waitForDisplayedAndClick(option2, "code", 5000)
        await Base.waitForDisplayedAndSetValue(sendcode, "246954");
        await Base.waitForDisplayedAndClick(verifybutton, "verify", 5000);
        await browser.pause(20000);
    })

    it('Login page Validation with Code', async()=>{
        const username = $('//input[@id="okta-signin-username"]');
        const password = $('//input[@id="okta-signin-password"]');
        const submitbtn = $('//input[@id="okta-signin-submit"]');
        const option2 = $('//a[contains(text(), "Or enter code")]');
        const sendcode = $('//input[@name="answer"]');
        const verifybutton = $('//a[@data-se="inline-totp-verify"]');
        await Base.waitForDisplayedAndSetValue(username, "rahul.jahagirdar@tronox.com");
        await Base.waitForDisplayedAndSetValue(password, "2s@10EC032");
        await Base.waitForDisplayedAndClick(submitbtn, "Submit", 5000);
        await browser.pause(5000);
        await Base.waitForDisplayedAndClick(option2, "code", 5000)
        await Base.waitForDisplayedAndSetValue(sendcode, "246954");
        await Base.waitForDisplayedAndClick(verifybutton, "verify", 5000);
        await browser.pause(20000);
    })

    it('Goods Recipt',async()=>{
        const username = $('//input[@id="okta-signin-username"]');
        const password = $('//input[@id="okta-signin-password"]');
        const submitbtn = $('//input[@id="okta-signin-submit"]');
        const code = $('//input[@name="answer"]');
        const clickonverify = $('//input[@value="Verify"]');
        const dashboardElement = await $("//section[@id='main-content']/child::section/section/descendant::section[37]");
        await Base.waitForDisplayedAndSetValue(username, "rahul.jahagirdar@tronox.com");
        await Base.waitForDisplayedAndSetValue(password, "2s@10EC032");
        await Base.waitForDisplayedAndClick(submitbtn, "Submit", 5000);
        await Base.waitForDisplayedAndSetValue(code, "297191");
        await Base.waitForDisplayedAndClick(clickonverify, 5000);
        await browser.pause(10000)

        // Launch Firio app launch
        await dashboardElement.scrollIntoView();
        await Base.waitForDisplayedAndClick(dashboardElement, 5000);

        // window handle
        const newwindow = await browser.getWindowHandles();
        await browser.switchToWindow(newwindow[1]);
        await browser.pause(10000);

        // Selection of Inbound Value
        const postgoodsvalue = $('//span[text()="Post Goods Receipt"]');
        await Base.waitForDisplayedAndClick(postgoodsvalue, 8000);

        // Switch to iframe
        await browser.pause(10000);
        const iframe = $('//iframe[@id="application-Shell-startGUI"]');
        // await browser.pause(5000)
        const dropdownfield = $('//input[@id="M0:46:1:1::0:20"]');
        const selectInbound = $('//div[text()="Inbound Delivery"]');
        const selectdeliverynote = $('//input[@id="M0:46:1:2:1:1:2B256::0:50"]');
        const InboundId = $('//input[@id="M0:46:1:1:1::0:0"]');
        const selectOkbox = $('//span[@id="M0:46:1:4:1:33::0:0-txt"]');
        const postbutton  = $('//div[@id="M0:50::btn[11]"]');
        await Base.switchToIframe(iframe);
        await Base.waitForDisplayedAndClick(dropdownfield,5000);
        await Base.waitForDisplayedAndClick(selectInbound,5000);
        await Base.waitForDisplayedAndSetValue(InboundId, "180008984");
        await browser.keys('Enter');
        await browser.pause(5000);
        await Base.waitForDisplayedAndSetValue(selectdeliverynote, "Test Inbound Value");
        await browser.pause(5000);
        await Base.waitForDisplayedAndClick(selectOkbox);
        await Base.waitForDisplayedAndClick(postbutton);
        await browser.pause(10000)
    })



   // ========================================================================================================
    it('Create purchase order', async()=>{
                // Step 1: Navigate to the login page
                // await browser.url('https://tronox.okta.com/');
                // await browser.maximizeWindow();
         
                const username = $('//input[@id="okta-signin-username"]');
                const password = $('//input[@id="okta-signin-password"]');
                const submitbtn = $('//input[@id="okta-signin-submit"]');
                const code = $('//input[@name="answer"]');
                const clickonverify = $('//input[@value="Verify"]');
                const dashboardElement = await $("//section[@id='main-content']/child::section/section/descendant::section[37]");
                await Base.waitForDisplayedAndSetValue(username, "rahul.jahagirdar@tronox.com");
                await Base.waitForDisplayedAndSetValue(password, "2s@10EC032");
                await Base.waitForDisplayedAndClick(submitbtn, "Submit", 5000);
                await Base.waitForDisplayedAndSetValue(code, '537447'); // OTP_____________________
                await Base.waitForDisplayedAndClick(clickonverify, 5000);
                await browser.pause(10000)
         
                // Launch Firio app launch
                await dashboardElement.scrollIntoView();
                await Base.waitForDisplayedAndClick(dashboardElement, 5000);
                await browser.pause(5000);
         
                // window handle
                const newwindow = await browser.getWindowHandles();
                await browser.switchToWindow(newwindow[1]);
                await browser.pause(5000);
         
                // Tile Selection
                const element = $("//*[@id='dashboardGroups']/div/child::div/descendant::ul/descendant::div[43]/child::div/div");
                await element.scrollIntoView();
                await Base.waitForDisplayedAndClick(element, 5000);
                await browser.pause(10000);
         
                // Switch to iframe
                const iframe = await browser.$('//iframe[@id="application-Shell-startGUI"]');
                await browser.switchToFrame(iframe);
         
                // Ganesh code
                const supplier = await $("//input[@id='M0:46:1:1:2::0:49']");
                await Base.waitForDisplayedAndSetValue(supplier, "51003921");
                //await supplier.setValue('51003921');
                await browser.keys('Enter');
                await browser.pause(5000);
               
         
               // await Base.waitForDisplayedAndSetValue($("//div[@id='M0:46:1:2:2:1:1::0:7-scrl-cnt']/child::div/descendant::div[2]/child::table/tbody/tr/td/input"),"3000"); // Purch. organization
                const purOrganization = await $("//div[@id='M0:46:1:2:2:1:1::0:7-scrl-cnt']/descendant::table[1]/child::tbody/descendant::td[1]/child::input");
                await Base.waitForDisplayedAndSetValue(purOrganization, "3000");
              //  await purOrganization.setValue('3000'); //
                await browser.keys('Enter');
                await browser.pause(5000);
               
               // await Base.waitForDisplayedAndClick($("//div[text()='Europe']"), 5000);
         
               //await Base.waitForDisplayedAndSetValue($("//div[@id='M0:46:1:2:2:1:1::0:7-scrl-cnt']/child::div/descendant::div[4]/child::table/tbody/tr/td/input"),"103"); // Purchasing Group
                const purGroup = await $('//div[@id="M0:46:1:2:2:1:1::0:7-scrl-cnt"]/descendant::table[2]/child::tbody/descendant::td[1]/child::input');
                await Base.waitForDisplayedAndSetValue(purGroup, "103");
               // await purGroup.setValue('103'); //
                await browser.keys('Enter');
                await browser.pause(5000);
               
         
              //  await Base.waitForDisplayedAndSetValue($("//div[@id='M0:46:1:2:2:1:1::0:7-scrl-cnt']/child::div/descendant::div[6]/child::table/tbody/tr/td/input"),"3100"); // company Code
                const componyCode = await $('//div[@id="M0:46:1:2:2:1:1::0:7-scrl-cnt"]/descendant::table[3]/child::tbody/descendant::td[1]/child::input');
                await Base.waitForDisplayedAndSetValue(componyCode, "3100");
               // await componyCode.setValue('3100'); //
                await browser.keys('Enter');
                await browser.pause(5000);
              //  await Base.waitForDisplayedAndClick($("//div[text()='MRO Inventory']"), 5000);
         
               // await Base.waitForDisplayedAndClick($("//div[@id='M0:46:1:3:1::0:0']"), 5000);// Item Preview
                const previewItem = await $("//div[@id='M0:46:1:3']/child::div[1]/descendant::div[1]/child::div/div");
                await previewItem.scrollIntoView();
                await previewItem.click();
                await browser.pause(5000);
         
               // await Base.waitForDisplayedAndSetValue($("//span[contains(@id,'[1,5]_c-r')]"),"2050437"); //Material
                const materialno = await $("//*[@id='M0:46:1:3:2']/descendant::table[1]/descendant::tbody[1]/child::tr[2]/child::td[2]/child::div/descendant::table/descendant::tr[1]/child::td[2]/descendant::span[1]");
                await materialno.scrollIntoView();
                await Base.waitForDisplayedAndClick(materialno, 5000);
               // await materialno.click();
                const entermaterialno = await $("//*[@id='M0:46:1:3:2']/descendant::table[1]/descendant::tbody[1]/child::tr[2]/child::td[2]/child::div/descendant::table/descendant::tr[1]/child::td[2]/descendant::span[1]/child::input");
                await Base.waitForDisplayedAndSetValue(entermaterialno, "2050437");
               // await entermaterialno.setValue('2050437'); //
                await browser.keys('Enter');

                // await Base.waitForDisplayedAndSetValue($("//span[contains(@id,'[1,16]_c-r')]"),"3120"); // Plant
                const plant = await $("//*[@id='M0:46:1:3:2']/descendant::table[1]/descendant::tbody[1]/child::tr[2]/child::td[2]/child::div/descendant::table/descendant::tr[1]/child::td[13]/descendant::span[1]");
                await plant.scrollIntoView();
                await Base.waitForDisplayedAndClick(plant, 5000);
                const enterplant = await $("//*[@id='M0:46:1:3:2']/descendant::table[1]/descendant::tbody[1]/child::tr[2]/child::td[2]/child::div/descendant::table/descendant::tr[1]/child::td[13]/descendant::span[1]/child::input");
                await Base.waitForDisplayedAndSetValue(enterplant, "3120");
                // await enterplant.setValue('3120'); //
                 await browser.keys('Enter');
         
                const quantity = await $("//*[@id='M0:46:1:3:2']/descendant::table[1]/descendant::tbody[1]/child::tr[2]/child::td[2]/child::div/descendant::table/descendant::tr[1]/child::td[4]/descendant::span[1]");
                await quantity.scrollIntoView();
                await Base.waitForDisplayedAndClick(quantity, 5000);
                const enterquantity = await $("//*[@id='M0:46:1:3:2']/descendant::table[1]/descendant::tbody[1]/child::tr[2]/child::td[2]/child::div/descendant::table/descendant::tr[1]/child::td[4]/descendant::span[1]/child::input");
                await Base.waitForDisplayedAndSetValue(enterquantity, "10");
                 //await enterquantity.setValue('10'); //
                 await browser.keys('Enter');
          
                
             //  await Base.waitForDisplayedAndClick($("//span[@id='M0:46:1:4:2:1:2:1-next']"), 5000);// second screen
               const secondScreen = await $("//span[@id='M0:46:1:4:2:1:2:1-next']");
               await secondScreen.scrollIntoView();
               await Base.waitForDisplayedAndClick(secondScreen, 5000);
              //  await secondScreen.click();
                await browser.pause(5000);
         
             //  await Base.waitForDisplayedAndClick($("//div[@id='M0:46:1:4:2:1:2:1::0:18-title']"), 5000);// Confirmation Tab
               const confirmationTab = await $("//div[@id='M0:46:1:4:2:1:2:1::0:18-title']");
               await confirmationTab.scrollIntoView();
               await Base.waitForDisplayedAndClick(confirmationTab, 5000);
         
              // await Base.waitForDisplayedAndClick($("//span[@id='M0:46:1:4:2:1:2:1:2B274:1::0:16-btn']"), 5000);// Confirmation.cont dropdown
               const contConfirmation = await $("//span[@id='M0:46:1:4:2:1:2:1:2B274:1::0:16-btn']");
               await contConfirmation.scrollIntoView();
               await Base.waitForDisplayedAndClick(contConfirmation, 5000);
         
               //await Base.waitForDisplayedAndClick($("//div[@data-itemvalue2='Inbound Delivery']"), 5000);// selection of Confirmation.cont dropdown
               const selcConfirmationCont = await $("//div[@data-itemvalue2='Inbound Delivery']");
               await selcConfirmationCont.scrollIntoView();
               await Base.waitForDisplayedAndClick(selcConfirmationCont, 5000);
         
              // await Base.waitForDisplayedAndClick($("//div[@title='Save (Ctrl+S)']"), 5000);// Save Doc
              // await Base.waitForDisplayedAndClick($("//div[@id='M0:50::btn[11]']"), 5000);// Save Doc
                const seveDocument = await $("//div[@title='Save (Ctrl+S)']");
                await Base.waitForDisplayedAndClick(seveDocument, 5000);
                await browser.pause(2000);

                // window handle
                await browser.switchToWindow(newwindow[1]);
                await browser.pause(5000);
            
                // Switch to iframe
                await browser.switchToFrame(iframe);
            
                // Document No
                const createPurchaseOrderNo = await $("//div[@id='msgarea']/child::div[1]/div/descendant::span[3]").getText();
                const purchaseorderNo = createPurchaseOrderNo.replace(/\D/g, '');
                console.log("Order No:",purchaseorderNo);
    });

    it('Create Inbound Delivery',async()=>{
        const username = $('//input[@id="okta-signin-username"]');
        const password = $('//input[@id="okta-signin-password"]');
        const submitbtn = $('//input[@id="okta-signin-submit"]');
        const code = $('//input[@name="answer"]');
        const clickonverify = $('//input[@value="Verify"]');
        const dashboardElement = await $("//section[@id='main-content']/child::section/section/descendant::section[37]");
        await Base.waitForDisplayedAndSetValue(username, "rahul.jahagirdar@tronox.com");
        await Base.waitForDisplayedAndSetValue(password, "2s@10EC032");
        await Base.waitForDisplayedAndClick(submitbtn, "Submit", 5000);
        await Base.waitForDisplayedAndSetValue(code, "375887");
        await Base.waitForDisplayedAndClick(clickonverify, 5000);
        await browser.pause(10000)

        // Launch Firio app launch
        await dashboardElement.scrollIntoView();
        await Base.waitForDisplayedAndClick(dashboardElement, 5000);

        // window handle
        const newwindow = await browser.getWindowHandles();
        await browser.switchToWindow(newwindow[1]);
        await browser.pause(10000);

         // Selection of Inbound Delivery Tiles
         const inboundDeliveryTiles = $('//*[@id="dashboardGroups"]/div/child::div/descendant::ul/descendant::div[31]/child::div/div');
         await Base.waitForDisplayedAndClick(inboundDeliveryTiles, 8000);

          // Switch to the iframe
        const iframe = await browser.$('//iframe[@id="application-Shell-startGUI"]');
        await browser.switchToFrame(iframe);
 
        // Create InBound Delivery
        await Base.waitForDisplayedAndSetValue($("//input[@id='M0:46:::3:22']"),"4500015551");// Purchase order NO
        await browser.pause(5000);
        await browser.keys('Enter');
 
        await Base.waitForDisplayedAndClick($("//div[@title='Save (Ctrl+S)']"), 5000);// Save Doc
        await browser.pause(10000);
    });

    it('Integration Testing', async()=>{

        const username = $('//input[@id="okta-signin-username"]');
        const password = $('//input[@id="okta-signin-password"]');
        const submitbtn = $('//input[@id="okta-signin-submit"]');
        const code = $('//input[@name="answer"]');
        const clickonverify = $('//input[@value="Verify"]');
        const dashboardElement = await $("//section[@id='main-content']/child::section/section/descendant::section[37]");
        await Base.waitForDisplayedAndSetValue(username, "rahul.jahagirdar@tronox.com");
        await Base.waitForDisplayedAndSetValue(password, "2s@10EC032");
        await Base.waitForDisplayedAndClick(submitbtn, "Submit", 5000);
        await Base.waitForDisplayedAndSetValue(code, "057814");
        await Base.waitForDisplayedAndClick(clickonverify, 5000);
        await browser.pause(10000)

        // Launch Firio app launch
        await dashboardElement.scrollIntoView();
        await Base.waitForDisplayedAndClick(dashboardElement, 5000);

        // window handle
        const newwindow = await browser.getWindowHandles();
        await browser.switchToWindow(newwindow[1]);
        await browser.pause(10000);

        // Tile Selection
        const element = $("//*[@id='dashboardGroups']/div/child::div/descendant::ul/descendant::div[43]/child::div/div");
        await element.scrollIntoView();
        await Base.waitForDisplayedAndClick(element, 5000);
        await browser.pause(10000);
 
        // Switch to iframe
        const iframe = await browser.$('//iframe[@id="application-Shell-startGUI"]');
        await browser.switchToFrame(iframe);
 
        // Ganesh code
        const supplier = await $("//input[@id='M0:46:1:1:2::0:49']");
        await Base.waitForDisplayedAndSetValue(supplier, "51003921");
        //await supplier.setValue('51003921');
        await browser.keys('Enter');
        await browser.pause(5000);
       
 
       // await Base.waitForDisplayedAndSetValue($("//div[@id='M0:46:1:2:2:1:1::0:7-scrl-cnt']/child::div/descendant::div[2]/child::table/tbody/tr/td/input"),"3000"); // Purch. organization
        const purOrganization = await $("//div[@id='M0:46:1:2:2:1:1::0:7-scrl-cnt']/descendant::table[1]/child::tbody/descendant::td[1]/child::input");
        await Base.waitForDisplayedAndSetValue(purOrganization, "3000");
      //  await purOrganization.setValue('3000'); //
        await browser.keys('Enter');
        await browser.pause(5000);
       
       // await Base.waitForDisplayedAndClick($("//div[text()='Europe']"), 5000);
 
       //await Base.waitForDisplayedAndSetValue($("//div[@id='M0:46:1:2:2:1:1::0:7-scrl-cnt']/child::div/descendant::div[4]/child::table/tbody/tr/td/input"),"103"); // Purchasing Group
        const purGroup = await $('//div[@id="M0:46:1:2:2:1:1::0:7-scrl-cnt"]/descendant::table[2]/child::tbody/descendant::td[1]/child::input');
        await Base.waitForDisplayedAndSetValue(purGroup, "103");
       // await purGroup.setValue('103'); //
        await browser.keys('Enter');
        await browser.pause(5000);
       
 
      //  await Base.waitForDisplayedAndSetValue($("//div[@id='M0:46:1:2:2:1:1::0:7-scrl-cnt']/child::div/descendant::div[6]/child::table/tbody/tr/td/input"),"3100"); // company Code
        const componyCode = await $('//div[@id="M0:46:1:2:2:1:1::0:7-scrl-cnt"]/descendant::table[3]/child::tbody/descendant::td[1]/child::input');
        await Base.waitForDisplayedAndSetValue(componyCode, "3100");
       // await componyCode.setValue('3100'); //
        await browser.keys('Enter');
        await browser.pause(5000);
 
       // await Base.waitForDisplayedAndClick($("//div[@id='M0:46:1:3:1::0:0']"), 5000);// Item Preview
        const previewItem = await $("//div[@id='M0:46:1:3']/child::div[1]/descendant::div[1]/child::div/div");
        await previewItem.scrollIntoView();
        await previewItem.click();
        await browser.pause(5000);
 
       // await Base.waitForDisplayedAndSetValue($("//span[contains(@id,'[1,5]_c-r')]"),"2050437"); //Material
        const materialno = await $("//*[@id='M0:46:1:3:2']/descendant::table[1]/descendant::tbody[1]/child::tr[2]/child::td[2]/child::div/descendant::table/descendant::tr[1]/child::td[2]/descendant::span[1]");
        await materialno.scrollIntoView();
        await Base.waitForDisplayedAndClick(materialno, 5000);
        const entermaterialno = await $("//*[@id='M0:46:1:3:2']/descendant::table[1]/descendant::tbody[1]/child::tr[2]/child::td[2]/child::div/descendant::table/descendant::tr[1]/child::td[2]/descendant::span[1]/child::input");
        await Base.waitForDisplayedAndSetValue(entermaterialno, "2050437");
        await browser.keys('Enter');

        // await Base.waitForDisplayedAndSetValue($("//span[contains(@id,'[1,16]_c-r')]"),"3120"); // Plant
        const plant = await $("//*[@id='M0:46:1:3:2']/descendant::table[1]/descendant::tbody[1]/child::tr[2]/child::td[2]/child::div/descendant::table/descendant::tr[1]/child::td[13]/descendant::span[1]");
        await plant.scrollIntoView();
        await Base.waitForDisplayedAndClick(plant, 5000);
        const enterplant = await $("//*[@id='M0:46:1:3:2']/descendant::table[1]/descendant::tbody[1]/child::tr[2]/child::td[2]/child::div/descendant::table/descendant::tr[1]/child::td[13]/descendant::span[1]/child::input");
        await Base.waitForDisplayedAndSetValue(enterplant, "3120");
        // await enterplant.setValue('3120'); //
         await browser.keys('Enter');
 
        const quantity = await $("//*[@id='M0:46:1:3:2']/descendant::table[1]/descendant::tbody[1]/child::tr[2]/child::td[2]/child::div/descendant::table/descendant::tr[1]/child::td[4]/descendant::span[1]");
        await quantity.scrollIntoView();
        await Base.waitForDisplayedAndClick(quantity, 5000);
        const enterquantity = await $("//*[@id='M0:46:1:3:2']/descendant::table[1]/descendant::tbody[1]/child::tr[2]/child::td[2]/child::div/descendant::table/descendant::tr[1]/child::td[4]/descendant::span[1]/child::input");
        await Base.waitForDisplayedAndSetValue(enterquantity, "10");
         //await enterquantity.setValue('10'); //
         await browser.keys('Enter');
  
        
        //  await Base.waitForDisplayedAndClick($("//span[@id='M0:46:1:4:2:1:2:1-next']"), 5000);// second screen
        const secondScreen = await $("//span[@id='M0:46:1:4:2:1:2:1-next']");
        await secondScreen.scrollIntoView();
        await Base.waitForDisplayedAndClick(secondScreen, 5000);
        await browser.pause(5000);
    
        //  await Base.waitForDisplayedAndClick($("//div[@id='M0:46:1:4:2:1:2:1::0:18-title']"), 5000);// Confirmation Tab
        const confirmationTab = await $("//div[@id='M0:46:1:4:2:1:2:1::0:18-title']");
        await confirmationTab.scrollIntoView();
        await Base.waitForDisplayedAndClick(confirmationTab, 5000);
 
      // await Base.waitForDisplayedAndClick($("//span[@id='M0:46:1:4:2:1:2:1:2B274:1::0:16-btn']"), 5000);// Confirmation.cont dropdown
       const contConfirmation = await $("//span[@id='M0:46:1:4:2:1:2:1:2B274:1::0:16-btn']");
       await contConfirmation.scrollIntoView();
       await Base.waitForDisplayedAndClick(contConfirmation, 5000);
 
       //await Base.waitForDisplayedAndClick($("//div[@data-itemvalue2='Inbound Delivery']"), 5000);// selection of Confirmation.cont dropdown
       const selcConfirmationCont = await $("//div[@data-itemvalue2='Inbound Delivery']");
       await selcConfirmationCont.scrollIntoView();
       await Base.waitForDisplayedAndClick(selcConfirmationCont, 5000);
 
      // await Base.waitForDisplayedAndClick($("//div[@title='Save (Ctrl+S)']"), 5000);// Save Doc
      // await Base.waitForDisplayedAndClick($("//div[@id='M0:50::btn[11]']"), 5000);// Save Doc
        const seveDocument = await $("//div[@title='Save (Ctrl+S)']");
        await Base.waitForDisplayedAndClick(seveDocument, 5000);
        await browser.pause(2000);

        // window handle
        await browser.switchToWindow(newwindow[1]);
        await browser.pause(5000);
    
        // Switch to iframe
        await browser.switchToFrame(iframe);
    
        // Document No
        const createPurchaseOrderNo = await $("//div[@id='msgarea']/child::div[1]/div/descendant::span[3]").getText();
        const purchaseorderNo = Number(createPurchaseOrderNo.replace(/\D/g, ''));
        console.log("Order No:",purchaseorderNo);

         // Switch to current window
        // This will return an array of window handles
        const allWindowHandles = await browser.getWindowHandles();
        const originalWindowHandle = allWindowHandles[0];
        await browser.switchToWindow(originalWindowHandle);
        await browser.pause(10000);
    
        // Fiori Tiles Selection
        await dashboardElement.scrollIntoView();
        await Base.waitForDisplayedAndClick(dashboardElement, 5000);
        await browser.pause(5000);

         // Switch window
         const currentWindow = await browser.getWindowHandles();
         await browser.switchToWindow(currentWindow[3]);
         await browser.pause(5000);
  
    
         // Selection of Inbound Delivery Tiles
        const inboundDeliveryTiles = $('//*[@id="dashboardGroups"]/div/child::div/descendant::ul/descendant::div[31]/child::div/div');
        await Base.waitForDisplayedAndClick(inboundDeliveryTiles, 8000);

          // Switch to the iframe
        const iframeinbound = await browser.$('//iframe[@id="application-Shell-startGUI"]');
        await browser.switchToFrame(iframeinbound);
 
        // Create InBound Delivery
        const passingprchaseno = $("//input[@id='M0:46:::3:22']");
        await passingprchaseno.clearValue();
        await Base.waitForDisplayedAndSetValue(passingprchaseno, purchaseorderNo);// Purchase order NO
        await browser.keys('Enter');
        await browser.pause(5000);
        
 
        await Base.waitForDisplayedAndClick($("//div[@title='Save (Ctrl+S)']"), 5000);// Save Doc
        await browser.pause(10000);
        
        // Create Inbound Delivery
        const Inbounddeliveryno = await $("//div[@id='msgarea']/child::div[1]/div/descendant::span[3]").getText();
        const Inboundno = Number(Inbounddeliveryno.replace(/\D/g, ''));
        console.log("Inbound Number:",Inboundno);
        await browser.pause(2000);

         // Switch to current window
        // This will return an array of window handles
        const allWindowHandlesgoods = await browser.getWindowHandles();
        const originalWindowHandlegoods = allWindowHandlesgoods[0];
        await browser.switchToWindow(originalWindowHandlegoods);
        await browser.pause(10000);
    
        // Fiori Tiles Selection
        await dashboardElement.scrollIntoView();
        await Base.waitForDisplayedAndClick(dashboardElement, 5000);
        await browser.pause(5000);

         // Switch window
         const currentWindowgoods = await browser.getWindowHandles();
         await browser.switchToWindow(currentWindowgoods[4]);
         await browser.pause(5000);

         // Selection of Inbound Value
        const postgoodsvalue = $('//span[text()="Post Goods Receipt"]');
        await Base.waitForDisplayedAndClick(postgoodsvalue, 8000);

        // Switch to iframe
        await browser.pause(10000);
        const iframegoods = $('//iframe[@id="application-Shell-startGUI"]');
        // await browser.pause(5000)
        const dropdownfield = $('//input[@id="M0:46:1:1::0:20"]');
        const selectInbound = $('//div[text()="Inbound Delivery"]');
        const selectdeliverynote = $('//input[@id="M0:46:1:2:1:1:2B256::0:50"]');
        const InboundId = $('//input[@id="M0:46:1:1:1::0:0"]');
        const selectOkbox = $('//span[@id="M0:46:1:4:1:33::0:0-txt"]');
        const postbutton  = $('//div[@id="M0:50::btn[11]"]');
        await Base.switchToIframe(iframegoods);
        await Base.waitForDisplayedAndClick(dropdownfield,5000);
        await Base.waitForDisplayedAndClick(selectInbound,5000);
        await Base.waitForDisplayedAndSetValue(InboundId, Inboundno);
        await browser.keys('Enter');
        await browser.pause(5000);
        await Base.waitForDisplayedAndSetValue(selectdeliverynote, "Test Inbound Value");
        await browser.pause(5000);
        await Base.waitForDisplayedAndClick(selectOkbox);
        await Base.waitForDisplayedAndClick(postbutton);
        await browser.pause(10000);

        // Document No
        const creategoodreceipt = await $("//div[@id='msgarea']/child::div[1]/div/descendant::span[3]").getText();
        const goodsreceiptno = Number(creategoodreceipt.replace(/\D/g, ''));
        console.log("Goods Receipt No:", goodsreceiptno);

         // Switch to current window
        // This will return an array of window handles
        const allWindowHandlesInvoice = await browser.getWindowHandles();
        const originalWindowHandleInvoice = allWindowHandlesInvoice[0];
        await browser.switchToWindow(originalWindowHandleInvoice);
        await browser.pause(10000);
    
        // Fiori Tiles Selection
        await dashboardElement.scrollIntoView();
        await Base.waitForDisplayedAndClick(dashboardElement, 5000);
        await browser.pause(5000);

         // Switch window
         const currentWindowInvoice = await browser.getWindowHandles();
         await browser.switchToWindow(currentWindowInvoice[5]);
         await browser.pause(5000);

        //  ===== Invoice cretion =====
        // Select Create Supplier Invioce Tiles
        const elementInvoice = $("//*[@id='dashboardGroups']/div/child::div/descendant::ul/descendant::div[85]/child::div/div");
        await elementInvoice.scrollIntoView();
        await Base.waitForDisplayedAndClick(elementInvoice, 5000);
        await browser.pause(10000);
 
        // Switch to the iframe
        const iframeInvoice = await browser.$('//iframe[@id="application-Shell-startGUI"]');
        await browser.switchToFrame(iframeInvoice);
 
        // Create Supplier Invioce
        const companyCode = await $('//input[@id="M1:46:::0:18"]');
        await Base.waitForDisplayedAndSetValue(companyCode, "3100"); // Compony Code
        await browser.keys('Enter');
        await browser.pause(5000);
 
        const invoiceDate = await $('//input[@id="M0:46:1:1:4B256::0:16"]');
        await Base.waitForDisplayedAndSetValue(invoiceDate, "10.01.2025"); // Invoice Date
        await browser.keys('Enter');
        await browser.pause(5000);
 
        const referenceno = await $('//input[@id="M0:46:1:1:4B256::0:47"]');
        await Base.waitForDisplayedAndSetValue(referenceno, Inboundno); // Reference Inbound Document No
        await browser.keys('Enter');
        await browser.pause(5000);
 
        const purchaseOrderNum = await $('//input[@id="M0:46:1:6:1:2B256:1::0:1"]');
        await Base.waitForDisplayedAndSetValue(purchaseOrderNum, purchaseorderNo); // Purchase Order No
        await purchaseOrderNum.scrollIntoView();
        await browser.keys('Enter');
        await browser.pause(5000);
 
        const supplierInvoiceAmount = await $('//input[@id="M0:46:1:1:4B256::2:16"]');
        await Base.waitForDisplayedAndSetValue(supplierInvoiceAmount, "20"); // Amount Order No
        await supplierInvoiceAmount.scrollIntoView();
        await browser.keys('Enter');
        await browser.pause(5000);
 
        const taxCode = await $('//*[contains(@id,"[1,9]_c-btn")]'); //Tax Code
        await taxCode.scrollIntoView();
        await Base.waitForDisplayedAndClick(taxCode, 5000);
        await browser.pause(2000);

        const selectTaxCode = await $('(//div[contains(text(), "NZ (NL|AP|NonEU|Goods|Commercial invoice)")])[2]'); // select Tax Code
        await selectTaxCode.scrollIntoView();
        await Base.waitForDisplayedAndClick(selectTaxCode, 5000);
        await browser.pause(1000);

        const checkCalculatedTax = await $('//span[@id="M0:46:1:1:4B256::3:36-txt"]'); // Check Calculated Tax
        await checkCalculatedTax.scrollIntoView();
        await Base.waitForDisplayedAndClick(checkCalculatedTax, 5000);
        await browser.pause(5000);

        const clickPostBTNToCreateInvoice = await $('//div[@id="M0:50::btn[11]"]'); // Post
        await clickPostBTNToCreateInvoice.scrollIntoView();
        await Base.waitForDisplayedAndClick(clickPostBTNToCreateInvoice, 5000);
        await browser.pause(10000);

    })


  it.only('S4_STP_IM_Create Cycle counting Physical Inventory Document', async()=>{
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

    // Selection of Document Tiles
    await Base.waitForDisplayedAndClick($(locators.selectdocumenttile), 8000);

    // Switch to the iframe
    const iframe = await browser.$(locators.iframexpath);
    await browser.switchToFrame(iframe);

    // Enter the Plant details
    await Base.waitForDisplayedAndSetValue($(locators.plantxpath), dataset.Plantnumber);
    await browser.keys('Tab');

    // Enter the Storage details
    await Base.waitForDisplayedAndSetValue($(locators.storagexpath), dataset.Storagelocation);
    await browser.keys('Enter');

    // Enter the Material 
    await Base.waitForDisplayedAndSetValue($(locators.materialxpath), dataset.Material);
    await browser.keys('Tab');

    // Enter the batch Number
    await Base.waitForDisplayedAndSetValue($(locators.batchxpath), dataset.Batch);

    // Click on the post button
    await Base.waitForDisplayedAndClick($(locators.postbutton), 2000);
    await browser.pause(10000);
  })    

  it('S4_OTC_OM_Create Delivery', async()=>{

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

    // Click on the Create sales order
    await Base.waitForDisplayedAndClick($(locators.createsalesorder), 5000);
    await browser.pause(10000);

    // Switch to the iframe
    const iframe = await browser.$(locators.iframexpath);
    await browser.switchToFrame(iframe);

    // Entering the details
    await Base.waitForDisplayedAndSetValue($(locators.ordertypexpath), dataset.createdeliverydata.OrderType);
    // await browser.keys('Tab');

    // await Base.waitForDisplayedAndSetValue($(locators.Salesorgxpath), dataset.createdeliverydata.SalesOrg);
    // await browser.keys('Tab');
    
    // await Base.waitForDisplayedAndSetValue($(locators.Disturbitionchannelxpath), dataset.createdeliverydata.Disturbitionchannel);
    // await browser.keys('Tab');

    // await Base.waitForDisplayedAndSetValue($(locators.Divisionxpath), dataset.createdeliverydata.Division);
    await browser.keys('Enter');
    await browser.pause(3000);

    await Base.waitForDisplayedAndSetValue($(locators.Soldtopartyxpath), dataset.createdeliverydata.SoldToParty);
    await Base.waitForDisplayedAndClick($(locators.OTCcreatesalesareaselectxpath), 5000);
    await browser.keys('Enter');
    await browser.pause(3000);

    // await Base.waitForDisplayedAndSetValue($(locators.Shiptopartyxpath), dataset.createdeliverydata.Shiptoparty);
    // await browser.keys('Enter');
    // await browser.pause(2000);

    await Base.waitForDisplayedAndSetValue($(locators.CustomerreferenceDate), dataset.createdeliverydata.referencedate);
    await browser.keys('Enter');
    await browser.pause(2000);


    await Base.waitForDisplayedAndSetValue($(locators.Customerrefnumberxpath), dataset.createdeliverydata.customerreference);
    await browser.keys('Enter');
    await browser.pause(3000);
    
    await Base.waitForDisplayedAndSetValue($(locators.reqdeliverydatexpath), dataset.createdeliverydata.reqdeliverydate);
    await browser.keys('Enter');
    await browser.pause(5000);

    // Enter the material
    const material = await $(locators.materiallinexpath);
    await material.scrollIntoView();
    await Base.waitForDisplayedAndSetValue(material, dataset.createdeliverydata.materialdata);
    await browser.pause(2000);
    await browser.keys('Enter');
    await browser.pause(2000);

    // Enter Qualtity

    const quantity = await $(locators.quantityxpath);
    await quantity.scrollIntoView();
    await Base.waitForDisplayedAndSetValue(quantity, dataset.createdeliverydata.materialquantity);
    await browser.pause(2000);
    await browser.keys('Enter');
    await browser.pause(2000);

    // Click on save button
    await Base.waitForDisplayedAndClick($(locators.savebuttonxpath), 5000);
    await browser.pause(8000);

    // Select the option from pop up
    await Base.waitForDisplayedAndClick($(locators.selectonoptionxpath), 5000);
    await browser.pause(3000);

    // Click on continue button
    await Base.waitForDisplayedAndClick($(locators.popupcontinuexpath), 5000);
    await browser.pause(2000);
  
    // Pop up Edit option
    await Base.waitForDisplayedAndClick($(locators.clickoneditbtnxpath), 5000);
    await browser.pause(2000);

    // Double click option
    await Base.waitForDisplayedAndClick($(locators.doubleclickonoptionxpath), 5000);
    await browser.pause(2000);
    await Base.waitForDisplayedAndDoubleClick($(locators.doubleclickonoptionxpath), 5000);
    await browser.pause(3000);

    // Enter the Spic proc id
    await Base.waitForDisplayedAndSetValue($(locators.Enterspecprodvaluexpath), dataset.createdeliverydata.spaecprodId);
    await browser.pause(5000)

    // Click on Edit next data
    await Base.waitForDisplayedAndClick($(locators.ClickonEditnextbtnxpath), 5000);
    await browser.pause(3000);

    // Enter the material
    const materialone = await $(locators.doubleclickonmaterialxpath);
    await materialone.scrollIntoView();
    await Base.waitForDisplayedAndDoubleClick(materialone, 5000);
    await browser.pause(3000);

    // Click on save button 
    await Base.waitForDisplayedAndClick($(locators.Clickonsavebtnxpath), 5000);
    await browser.pause(2000);

    // Click on the COntinue button
    await Base.waitForDisplayedAndClick($(locators.popupcontinuexpath), 5000);
    await browser.pause(2000);

    // window handle
    const newwindowold = await browser.getWindowHandles();
    await browser.switchToWindow(newwindowold[2]);
    await browser.pause(1000);

     // Switch to the iframe
     const iframe2 = await browser.$(locators.iframexpath);
     await browser.switchToFrame(iframe2);


    // Document No for pick
    const CreatePickOrder = await $("//div[@id='msgarea']/child::div[1]/div/descendant::span[3]").getText();
    const PickOrderNo = Number(CreatePickOrder.replace(/\D/g, ''));
    console.log("Work Order No:", PickOrderNo);

    // window handle
    const newwindowoldone = await browser.getWindowHandles();
    await browser.switchToWindow(newwindowoldone[0]);
    await browser.pause(3000);


    // Fiori Tiles Selection
    const dashboardelement = $(locators.dashboardElement)
    await dashboardelement.scrollIntoView();
    await Base.waitForDisplayedAndClick(dashboardelement, 5000);
    await browser.pause(5000);

    // window handle
    const newwindowoldone1 = await browser.getWindowHandles();
    await browser.switchToWindow(newwindowoldone1[3]);
    await browser.pause(3000);


    // Select tile VA02
    await Base.waitForDisplayedAndClick($(locators.Changesalesordertilexpath), 5000);
    await browser.pause(5000);

     // Switch to the iframe
     const iframe3 = await browser.$(locators.iframexpath);
     await browser.switchToFrame(iframe3);
     await browser.pause(3000);
     
    //  Enter the Order number
    await Base.waitForDisplayedAndSetValue($(locators.VA02orderinputxpath), PickOrderNo);
    await browser.pause(3000);

    // click on menu
    await Base.waitForDisplayedAndClick($(locators.selectmenuxpath), 5000);
    await browser.pause(5000);


  })
  it('S4_STP_IM_Return of Unused parts from Kitting', async()=>{

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

    // Select tile MIGO
    await Base.waitForDisplayedAndClick($(locators.MIGOtileselectionxpath), 5000);
    await browser.pause(5000);

    // Switch to the iframe
    const iframe3 = await browser.$(locators.iframexpath);
    await browser.switchToFrame(iframe3);
    await browser.pause(3000);
     
    // Click on material tab
    await Base.waitForDisplayedAndClick($(locators.Materialtabxpath), 5000);
    await browser.pause(3000);


    // Enter the material value
    const materialscroll = $(locators.Materialinputxpath);
    await materialscroll.scrollIntoView();
    await Base.waitForDisplayedAndSetValue(materialscroll, dataset.Kittydetailsdata.materialvaluekitty);
    await browser.keys('Enter');
    await browser.pause(3000);

    // Quantity Tab xpath
    await Base.waitForDisplayedAndClick($(locators.quantitytabxpath), 5000);
    await browser.pause(2000);
    const quantityscroll = $(locators.quantityinputxpath);
    await quantityscroll.scrollIntoView();
    await browser.pause(2000);
    await Base.waitForDisplayedAndSetValue(quantityscroll, dataset.Kittydetailsdata.quantity);
    await browser.keys('Enter');
    await browser.pause(5000);


    // Where tab data
    await Base.waitForDisplayedAndClick($(locators.wheretabxpath), 5000);
    await browser.pause(2000);
    const momenttype = $(locators.momenttypeinputxpath);
    await momenttype.scrollIntoView();
    await browser.pause(2000);
    await Base.waitForDisplayedAndSetValue(momenttype, dataset.Kittydetailsdata.momenttypevalue);
    await browser.keys('Enter');
    await browser.pause(2000);
    await Base.waitForDisplayedAndSetValue($(locators.plantinputxpath), dataset.Kittydetailsdata.planttype);
    await browser.keys('Enter');
    await Base.waitForDisplayedAndSetValue($(locators.storagelocationxpath), dataset.Kittydetailsdata.storagelocation);
    await browser.keys('Enter');
    await browser.pause(5000);

     // Account Assignment Tab xpath
     await Base.waitForDisplayedAndClick($(locators.accountassignmentrabxpath), 5000);
     await browser.pause(2000);
     const account = $(locators.orderinputxpath);
     await account.scrollIntoView();
     await browser.pause(2000);
     await Base.waitForDisplayedAndSetValue(account, dataset.Kittydetailsdata.order);
     await browser.keys('Enter');
     await browser.pause(5000);

    // Click on check box button
    await Base.waitForDisplayedAndClick($(locators.checkbtnxpath), 5000);
    await browser.pause(5000);
  })

  it('S4_OTC_OM_Create Delivery', async()=>{
     
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

    // Select tile VLO1N
    await Base.waitForDisplayedAndClick($(locators.VL01Ntileselectionxpath), 5000);
    await browser.pause(5000);

    // Switch to the iframe
    const iframe3 = await browser.$(locators.iframexpath);
    await browser.switchToFrame(iframe3);
    await browser.pause(3000);

    // Enter the Order number
    await Base.waitForDisplayedAndSetValue($(locators.VL01Nordernumberinputxpth), dataset.createdeliverydata.OrderNumber);
    await browser.keys('Enter');
    await browser.pause(3000);

    // Enter the Shipping point
    await Base.waitForDisplayedAndSetValue($(locators.VL01NShippingpointinputxpath), dataset.createdeliverydata.Shippingpoint);
    await browser.keys('Enter');
    await browser.pause(3000);

    // // Click on continue button 
    // await Base.waitForDisplayedAndClick($(locators.VL01NContinuebuttonxpath), 5000);
    // await browser.pause(5000);

  })
})