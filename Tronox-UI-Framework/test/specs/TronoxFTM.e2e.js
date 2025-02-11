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

   it('S4_FTM_AP_Release Payment Proposal',async()=>{ 
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

    // Click on the FTM F110 Tile
    const F110tile = $(locators.FTMF110tilexpath);
    await F110tile.scrollIntoView();
    await Base.waitForDisplayedAndClick(F110tile, 5000);
    await browser.pause(5000);

     // Switch to the iframe to enter data
     const iframe3 = await browser.$(locators.iframexpath);
     await browser.switchToFrame(iframe3);
     await browser.pause(3000);

    //  Enter the date and identification
     await Base.waitForDisplayedAndSetValue($(locators.FTM110dateinputxpath), dataset.F110dataset.Rundatedata);
     await browser.pause(2000);

     await Base.waitForDisplayedAndSetValue($(locators.FTMF110identificationxpath), dataset.F110dataset.identificationdata);
     await browser.keys('Enter');
     await browser.pause(2000);

    //  //  Click on paymentrun button
    //  await Base.waitForDisplayedAndClick($(locators.FTMpaymentrunbtn), 5000);
    //  await browser.pause(5000);
     
    // //  Click on the start immdediately check box
    //  await Base.waitForDisplayedAndClick($(locators.FTMF110Startimmediatelyxpath), 5000);
    //  await browser.pause(3000);

    // //  Click on the schedule button
    //  await Base.waitForDisplayedAndClick($(locators.FTMF110schedulebtnxpath), 5000);
    //  await browser.pause(5000);

    //  Display Proposal Click on button
     await Base.waitForDisplayedAndClick($(locators.FTMF110displayproposalxpath), 5000);
     await browser.pause(5000);

    //  Click on to verify the document number
    await Base.waitForDisplayedAndClick($(locators.FTMF110clickonthevalue), 5000);
    await Base.waitForDisplayedAndDoubleClick($(locators.FTMF110clickonthevalue), 5000);
    await browser.pause(5000)

    // switch to the main page
    const newwindow0 = await browser.getWindowHandles();
    await browser.switchToWindow(newwindow0[0]);
    await browser.pause(10000); 

    // Launch Firio app launch
    const dashboard0 = $(locators.dashboardElement);
    await dashboard0.scrollIntoView();
    await Base.waitForDisplayedAndClick(dashboard0, 5000);
    await browser.pause(5000);

     // window handle
     const newwindow2 = await browser.getWindowHandles();
     await browser.switchToWindow(newwindow2[2]);
     await browser.pause(10000);

    // Select the tile FBL1N
     const FBL1Ntile = $(locators.FBL1Ntileselectionxpath);
     await FBL1Ntile.scrollIntoView();
     await Base.waitForDisplayedAndClick(FBL1Ntile, 5000);
     await browser.pause(5000);

     // Switch to the iframe to enter data
     const iframe4 = await browser.$(locators.iframexpath);
     await browser.switchToFrame(iframe4);
     await browser.pause(3000);


    //  Enter the Vendor account FB11N
    await Base.waitForDisplayedAndSetValue($(locators.FBL1Naddvendoraccountxpath), dataset.F110dataset.Vendourdata);
    await browser.pause(2000);

    // Enter the company code
    await Base.waitForDisplayedAndSetValue($(locators.FBL1Nentercopanycodexpath), dataset.F110dataset.companycodedata);
    await browser.pause(2000);

    // Select the clear items option
    await Base.waitForDisplayedAndClick($(locators.FBL1nclickoncirclexpath), 5000);
    await browser.pause(2000);

    // Click on Execute button
    await Base.waitForDisplayedAndClick($(locators.FB1Nclickonexecutebtnxpath), 5000);
    await browser.pause(10000);

    // switch to the main page
    const newwindow00 = await browser.getWindowHandles();
    await browser.switchToWindow(newwindow00[0]);
    await browser.pause(10000); 

     // Launch Firio app launch
     const dashboard00 = $(locators.dashboardElement);
     await dashboard00.scrollIntoView();
     await Base.waitForDisplayedAndClick(dashboard00, 5000);
     await browser.pause(5000);
 
      // window handle
      const newwindow3 = await browser.getWindowHandles();
      await browser.switchToWindow(newwindow3[3]);
      await browser.pause(10000);
 
     // Select the tile FK10N
      const FK10Ntile = $(locators.FK10Nclickontilexpath);
      await FK10Ntile.scrollIntoView();
      await Base.waitForDisplayedAndClick(FK10Ntile, 5000);
      await browser.pause(5000);
 
      // Switch to the iframe to enter data
      const iframe5 = await browser.$(locators.iframexpath);
      await browser.switchToFrame(iframe5);
      await browser.pause(3000);

    //Enter the Financial year fields
      await Base.waitForDisplayedAndSetValue($(locators.FK10Nenterfiscalyearxpath), dataset.F110dataset.Ficialyear);
      await browser.pause(2000);

    // Click on FK10N Xpath 
      await Base.waitForDisplayedAndClick($(locators.FK10Nexecutebtnxpath), 5000);  
      await browser.pause(3000);
      
    // Table xpath to take screen shot
      const navigate = $(locators.FK10Ntablexpath);
      await navigate.scrollIntoView();
      await browser.pause(5000);  
      
      // switch to the main page
    const newwindow000 = await browser.getWindowHandles();
    await browser.switchToWindow(newwindow000[0]);
    await browser.pause(10000); 

     // Launch Firio app launch
     const dashboard000 = $(locators.dashboardElement);
     await dashboard000.scrollIntoView();
     await Base.waitForDisplayedAndClick(dashboard000, 5000);
     await browser.pause(5000);
 
      // window handle
      const newwindow4 = await browser.getWindowHandles();
      await browser.switchToWindow(newwindow4[4]);
      await browser.pause(10000);
 
     // Select the tile BNK_M0NI
      const BNK_M0NItile = $(locators.BNKtileselectionxpath);
      await BNK_M0NItile.scrollIntoView();
      await Base.waitForDisplayedAndClick(BNK_M0NItile, 5000);
      await browser.pause(5000);
 
      // Switch to the iframe to enter data
      const iframe6 = await browser.$(locators.iframexpath);
      await browser.switchToFrame(iframe6);
      await browser.pause(3000);

     // Enter the vendour 
     await Base.waitForDisplayedAndSetValue($(locators.BNKvendorinputxpath), dataset.F110dataset.Vendourdata);
     await browser.keys('Enter');
     await browser.pause(3000);
     
    //  Enter the company code
    await Base.waitForDisplayedAndSetValue($(locators.BNKcompanycode), dataset.F110dataset.companycodedata);
    await browser.keys('Enter');
    await browser.pause(3000);
      
    // Click on the execute btn
    await Base.waitForDisplayedAndClick($(locators.BNKExecutebutton), 5000);
    await browser.pause(10000);

    
    })

   it.only('S4_FTM_GL_345_Park General Journal Entries and POST it', async()=>{

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

    // Click on the FTM FB50 Tile
    const F110tile = $(locators.FB50tileselectionxpath);
    await F110tile.scrollIntoView();
    await Base.waitForDisplayedAndClick(F110tile, 5000);
    await browser.pause(5000);

     // Switch to the iframe to enter data
     const iframe3 = await browser.$(locators.iframexpath);
     await browser.switchToFrame(iframe3);
     await browser.pause(3000);

    // Enter the posting date
    await Base.waitForDisplayedAndSetValue($(locators.FB50postingdate), dataset.FB50JournalEnteries.postingdate);
    // await browser.keys('Enter');
    await browser.pause(2000);

    //  // handle pop up
    //  await Base.waitForDisplayedAndClick($(locators.FB50poupcontinuexpath), 5000);
    //  await browser.pause(2000);

    // Enter the documsnt date
    await Base.waitForDisplayedAndSetValue($(locators.FB50Documentdatexpath), dataset.FB50JournalEnteries.documentdate);
    // await browser.keys('Enter');
    await browser.pause(2000);  

    // // handle pop up
    // await Base.waitForDisplayedAndClick($(locators.FB50poupcontinuexpath), 5000);
    // await browser.pause(2000);

    // Reference input fields
    await Base.waitForDisplayedAndSetValue($(locators.FB50referencefieldxpath), dataset.FB50JournalEnteries.referencenumber);
    await browser.pause(5000)

    // GL Account 
    const clickitem = $(locators.FB50accountclickxpath);
    await Base.waitForDisplayedAndClick(clickitem, 5000);
    await Base.waitForDisplayedAndSetValue($(locators.FB50GLAccountxpath), dataset.FB50JournalEnteries.GLaccount)
    await browser.pause(2000);

    // Select the items from drop down
    await Base.waitForDisplayedAndClick($(locators.FB50dropdownclickxpath), 5000);
    await Base.waitForDisplayedAndClick($(locators.FB50dropdownitems), 5000);
    await browser.pause(3000);

    // Amount value enter
    const amount = $(locators.FB50amountclick);
    await Base.waitForDisplayedAndClick(amount, 5000);
    await Base.waitForDisplayedAndSetValue($(locators.FB05amountenterxpath), dataset.FB50JournalEnteries.amount);
    await browser.pause(3000);

    // Enter the Tax code
    const tax = $(locators.FB50Taxxpath);
    await Base.waitForDisplayedAndClick(tax, 5000);
    await Base.waitForDisplayedAndSetValue($(locators.FB50Taxinputxpath), dataset.FB50JournalEnteries.Taxcode);
    await browser.pause(3000);

    // Cost centre
    const costcode = $(locators.FB50costcentrexpath);
    await costcode.scrollIntoView();
    await Base.waitForDisplayedAndClick(costcode, 5000);
    await Base.waitForDisplayedAndSetValue($(locators.FB50costcentreinputxpath), dataset.FB50JournalEnteries.costcentre);
    await browser.pause(3000);

    // Entering the 2 nd row

       // GL Account 
       const clickitem2 = $(locators.FB50accountclickxpath2);
       await Base.waitForDisplayedAndClick(clickitem2, 5000);
       await Base.waitForDisplayedAndSetValue($(locators.FB50GLAccountxpath2), dataset.FB50JournalEnteries.GLrow2);
       await browser.pause(2000);
   
       // Select the items from drop down
       await Base.waitForDisplayedAndClick($(locators.FB50dropdownclickxpath2), 5000);
       await Base.waitForDisplayedAndClick($(locators.FB50dropdownitems2), 5000);
       await browser.pause(3000);
   
       // Amount value enter
       const amount2 = $(locators.FB50amountclick2);
       await Base.waitForDisplayedAndClick(amount2, 5000);
       await Base.waitForDisplayedAndSetValue($(locators.FB05amountenterxpath2), dataset.FB50JournalEnteries.amount);
       await browser.pause(3000);
   
      //  // Enter the Tax code
      //  const tax2 = $(locators.FB50Taxxpath2);
      //  await tax2.scrollIntoView();
      //  await Base.waitForDisplayedAndClick(tax2, 5000);
      //  await Base.waitForDisplayedAndSetValue($(locators.FB50Taxinputxpath2), dataset.FB50JournalEnteries.Taxcode);
      //  await browser.pause(3000);
   
      //  // Cost centre
      //  const costcode2 = $(locators.FB50costcentrexpath2);
      //  await costcode2.scrollIntoView();
      //  await Base.waitForDisplayedAndClick(costcode2, 5000);
      //  await Base.waitForDisplayedAndSetValue($(locators.FB50costcentreinputxpath2), dataset.FB50JournalEnteries.costcentre);
      //  await browser.pause(3000);
   
        // Click on the Park
        await Base.waitForDisplayedAndClick($(locators.FB50parkbuttonclick), 5000);
        await browser.pause(10000); 

        await browser.keys('Enter');
        await browser.pause(2000);
        await browser.keys('Enter');
        await browser.pause(2000);

        const documentnumber = await $("//div[@id='msgarea']/child::div[1]/div/descendant::span[3]").getText();
        const documentnumberdisplay = documentnumber.replace(/\D/g, '');
        console.log("Order No:",documentnumberdisplay);
        await browser.pause(5000);
        
        // Swith to FBVO tile
           // window handle
          const newwindow0 = await browser.getWindowHandles();
          await browser.switchToWindow(newwindow0[0]);
          await browser.pause(10000);

           // Launch Firio app launch
          const dashboard1 = $(locators.dashboardElement);
          await dashboard1.scrollIntoView();
          await Base.waitForDisplayedAndClick(dashboard1, 5000);
          await browser.pause(5000);

           // window handle
           const newwindow1 = await browser.getWindowHandles();
           await browser.switchToWindow(newwindow1[2]);
           await browser.pause(10000);

          // Click on the FTM FB50 Tile
          const FBV0tile = $(locators.FBVOtileselectionxpath);
          await FBV0tile.scrollIntoView();
          await Base.waitForDisplayedAndClick(FBV0tile, 5000);
          await browser.pause(5000);

          // Switch to the iframe to enter data
          const iframe4 = await browser.$(locators.iframexpath);
          await browser.switchToFrame(iframe4);
          await browser.pause(3000);

          // Financial year xpath
          await Base.waitForDisplayedAndSetValue($(locators.FBV0financialyearxpath), dataset.FB50JournalEnteries.financiallyear);
          await browser.pause(2000);

          // Click on continue btn
          await Base.waitForDisplayedAndClick($(locators.FBV0continuebtn), 5000);
          await browser.pause(5000);

          // Click on post button
          await Base.waitForDisplayedAndClick($(locators.clickonpostbtnxpath), 5000);
          await browser.pause(5000);

          await browser.keys('Enter');

         // handle pop up
          await Base.waitForDisplayedAndClick($(locators.FB50poupcontinuexpath), 5000);
          await browser.pause(2000);
   }) 

   it('S4_FTM_CO_Maintenance Orders Settlement (checked-out by 202407)', async()=>{
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

    // Click on the FTM KO88 Tile
    const KO88tile = $(locators.KO88tileselecctionxpath);
    await KO88tile.scrollIntoView();
    await Base.waitForDisplayedAndClick(KO88tile, 5000);
    await browser.pause(5000);

     // Switch to the iframe to enter data
     const iframe = await browser.$(locators.iframexpath);
     await browser.switchToFrame(iframe);
     await browser.pause(3000);

    //  Enter the controlling area and click on continue button
    await Base.waitForDisplayedAndSetValue($(locators.KO88controllingxpath), dataset.KO88ordersetellement.controling);
    await browser.pause(2000);
    await Base.waitForDisplayedAndClick($(locators.KO88popupcontinuexpath), 5000);
    await browser.pause(2000);

      //  Enter the order number
      await Base.waitForDisplayedAndSetValue($(locators.KO88orderinputxpath), dataset.KO88ordersetellement.ordernumber);
      await browser.pause(2000);

      //  Enter the setellement number
      await Base.waitForDisplayedAndSetValue($(locators.KO88Settelementxpath), dataset.KO88ordersetellement.setellementperiod);
      await browser.pause(2000);

      //  Enter the Financial year
      await Base.waitForDisplayedAndSetValue($(locators.KO88financialyearxpath), dataset.KO88ordersetellement.financialyear);
      await browser.pause(2000);
    
      //  Click on execute button
      await Base.waitForDisplayedAndClick($(locators.K088executexpath), 5000);
      await browser.pause(10000);

    //   // Switch out of frame
    //   await browser.switchToFrame(null);
    //   await browser.pause(10000);

    //   // Click on back button
    //   await Base.waitForDisplayedAndClick($(locators.KO88backbtnxpath), 5000);
    //   await browser.pause(5000);

    //    // Switch to the iframe to enter data
    //  const iframe1 = await browser.$(locators.iframexpath);
    //  await browser.switchToFrame(iframe1);
    //  await browser.pause(3000);

    //   //  Uncheck the test run
    //   await Base.waitForDisplayedAndClick($(locators.KO88Unchecktestrunxpath), 5000);
    //   await browser.pause(2000);

    //   // Check the tran check box 
    //   await Base.waitForDisplayedAndClick($(locators.KO88checktrancheckboxxpath), 5000);
    //   await browser.pause(5000);

    //   // navigate to the detailed list
    //   await Base.waitForDisplayedAndClick($(locators.KO88detailedlist), 5000);
    //   await browser.pause(10000);

    //   // Click on the setelled list items
    //   await Base.waitForDisplayedAndClick($(locators.K088detailedlistselection), 5000);
    //   await browser.pause(3000);
      
    //   // click on the accounting details
    //   await Base.waitForDisplayedAndClick($(locators.KO88accountdetailsbtnxpath), 5000);
    //   await browser.pause(2000);

    //   // Get the document number
    //   // const documentnumber = await $("//div[@id='msgarea']/child::div[1]/div/descendant::span[3]").getText();
    //   const documentnumber = await $(locators.KO88documentnumberxpath);
    //   const documentnumberdisplay = documentnumber.replace(/\D/g, '');
    //   console.log("Document No:",documentnumberdisplay);

      // window handle
    const newwindow1 = await browser.getWindowHandles();
    await browser.switchToWindow(newwindow1[0]);
    await browser.pause(10000);

       // Launch Firio app launch
    const dashboard1 = $(locators.dashboardElement);
    await dashboard1.scrollIntoView();
    await Base.waitForDisplayedAndClick(dashboard1, 5000);
    await browser.pause(5000);

    // window handle
    const newwindow2 = await browser.getWindowHandles();
    await browser.switchToWindow(newwindow2[2]);
    await browser.pause(10000);

       // Click on the FTM KO88 Tile
    const FB03tile = $(locators.FB03tileselection);
    await FB03tile.scrollIntoView();
    await Base.waitForDisplayedAndClick(FB03tile, 5000);
    await browser.pause(5000);

    // Switch to the iframe to enter data
    const iframe1 = await browser.$(locators.iframexpath);
    await browser.switchToFrame(iframe1);
    await browser.pause(3000);

    // Enter the Document field
    await Base.waitForDisplayedAndSetValue($(locators.FB03documentinput), dataset.KO88ordersetellement.Documentnumber);
    await browser.pause(3000);

    // Enter the companycode
    await Base.waitForDisplayedAndSetValue($(locators.FB03companycodeinput), dataset.KO88ordersetellement.companycode);
    await browser.pause(3000);
    
    // Enter the financial year
    await Base.waitForDisplayedAndSetValue($(locators.FB03financialyearinput), dataset.KO88ordersetellement.financialyear);
    await browser.pause(3000);

    // Click on the continue button
    await Base.waitForDisplayedAndClick($(locators.FB03continuebuttonxpath), 5000);
    await browser.pause(3000);

     // window handle
     const newwindow3 = await browser.getWindowHandles();
     await browser.switchToWindow(newwindow3[0]);
     await browser.pause(10000);
 
        // Launch Firio app launch
     const dashboard2 = $(locators.dashboardElement);
     await dashboard2.scrollIntoView();
     await Base.waitForDisplayedAndClick(dashboard2, 5000);
     await browser.pause(5000);
 
     // window handle
     const newwindow4 = await browser.getWindowHandles();
     await browser.switchToWindow(newwindow4[3]);
     await browser.pause(10000);
 
        // Click on the FTM S_ALR Tile
     const S_ALRtile = $(locators.S_ALRtileselectionxpath);
     await S_ALRtile.scrollIntoView();
     await Base.waitForDisplayedAndClick(S_ALRtile, 5000);
     await browser.pause(5000);
 
     // Switch to the iframe to enter data
     const iframe4 = await browser.$(locators.iframexpath);
     await browser.switchToFrame(iframe4);
     await browser.pause(3000);

    // Enter the plant number
    await Base.waitForDisplayedAndSetValue($(locators.S_ALRplantinputxpath), dataset.KO88ordersetellement.plantnumber);
    await browser.pause(2000);

    // Enter the from date
    const frmdata = await $(locators.S_ALRfromperiodxpath)
    await frmdata.clearValue();
    await Base.waitForDisplayedAndSetValue(frmdata, dataset.KO88ordersetellement.financialyear);
    await browser.pause(2000);

    // Click on executebutton
    await Base.waitForDisplayedAndClick($(locators.S_ALRexecutebtnxpath), 5000);
    await browser.pause(90000);


    // click on the list check box
    await Base.waitForDisplayedAndClick($(locators.S_ALRclickonxpath), 5000);
    await browser.pause(2000);

    // Click on the filter 
    await Base.waitForDisplayedAndClick($(locators.S_ALRfilterxpath), 5000);
    await browser.pause(2000);

    // Enter the order number
    await Base.waitForDisplayedAndSetValue($(locators.S_ALREnterorderxpath), dataset.KO88ordersetellement.ordernumber);
    await browser.keys('Enter');
    await browser.pause(5000);
   })

   it('S4_DTS_PP_Manage Process Orders', async()=>{

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

    // Click on the FTM KO88 Tile
    const KO88tile = $(locators.KO88tileselecctionxpath);
    await KO88tile.scrollIntoView();
    await Base.waitForDisplayedAndClick(KO88tile, 5000);
    await browser.pause(5000);

     // Switch to the iframe to enter data
     const iframe = await browser.$(locators.iframexpath);
     await browser.switchToFrame(iframe);
     await browser.pause(3000);

     

   })
})    