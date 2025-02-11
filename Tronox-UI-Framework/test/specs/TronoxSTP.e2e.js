import BasePage from "../../common.js"
const Base = new BasePage();
let dataset = await import('../Data/'+ global.wdioEnvParameters.config.appName +'/Physicalinventory.json', { assert: { type: 'json' } });
let locators = await import('../pageobjects/elementIdentifiers/'+ global.wdioEnvParameters.config.appName +'/physicalinventoryxpath.json', { assert: { type: 'json' } })
locators=locators.default;
dataset=dataset.default;
describe('Create Goods Issue against Maintenance Work Order', () => {
    before(async()=>{
        await browser.url(global.wdioEnvParameters.config.baseUrl);
        await browser.maximizeWindow();
    })
  it('Should create Goods Issue against Maintenance Work Order', async () => {
 

  const dashboardElement = await $("//section[@id='main-content']/child::section/section/descendant::section[37]");
  const element = $("//*[@id='dashboardGroups']/div/child::div/descendant::ul/descendant::div[43]/child::div/div");
  const supplier = await $("//input[@id='M0:46:1:1:2::0:49']");
  const purOrganization = await $("//div[@id='M0:46:1:2:2:1:1::0:7-scrl-cnt']/descendant::table[1]/child::tbody/descendant::td[1]/child::input");
  const purGroup = await $('//div[@id="M0:46:1:2:2:1:1::0:7-scrl-cnt"]/descendant::table[2]/child::tbody/descendant::td[1]/child::input');
  const componyCode = await $('//div[@id="M0:46:1:2:2:1:1::0:7-scrl-cnt"]/descendant::table[3]/child::tbody/descendant::td[1]/child::input');
  const previewItem = await $("//div[@id='M0:46:1:3']/child::div[1]/descendant::div[1]/child::div/div");
  const materialno = await $("//*[@id='M0:46:1:3:2']/descendant::table[1]/descendant::tbody[1]/child::tr[2]/child::td[2]/child::div/descendant::table/descendant::tr[1]/child::td[2]/descendant::span[1]");
  const entermaterialno = await $("//*[@id='M0:46:1:3:2']/descendant::table[1]/descendant::tbody[1]/child::tr[2]/child::td[2]/child::div/descendant::table/descendant::tr[1]/child::td[2]/descendant::span[1]/child::input");
  const plant = await $("//*[@id='M0:46:1:3:2']/descendant::table[1]/descendant::tbody[1]/child::tr[2]/child::td[2]/child::div/descendant::table/descendant::tr[1]/child::td[13]/descendant::span[1]");
  const enterplant = await $("//*[@id='M0:46:1:3:2']/descendant::table[1]/descendant::tbody[1]/child::tr[2]/child::td[2]/child::div/descendant::table/descendant::tr[1]/child::td[13]/descendant::span[1]/child::input");
  const quantity = await $("//*[@id='M0:46:1:3:2']/descendant::table[1]/descendant::tbody[1]/child::tr[2]/child::td[2]/child::div/descendant::table/descendant::tr[1]/child::td[4]/descendant::span[1]");
  const enterquantity = await $("//*[@id='M0:46:1:3:2']/descendant::table[1]/descendant::tbody[1]/child::tr[2]/child::td[2]/child::div/descendant::table/descendant::tr[1]/child::td[4]/descendant::span[1]/child::input");
  const secondScreen = await $("//span[@id='M0:46:1:4:2:1:2:1-next']");
  const confirmationTab = await $("//div[@id='M0:46:1:4:2:1:2:1::0:18-title']");
  const contConfirmation = await $("//span[@id='M0:46:1:4:2:1:2:1:2B274:1::0:16-btn']");
  const selcConfirmationCont = await $("//div[@data-itemvalue2='Inbound Delivery']");
  const seveDocument = await $("//div[@title='Save (Ctrl+S)']");
  const inboundDeliveryTiles = $('//*[@id="dashboardGroups"]/div/child::div/descendant::ul/descendant::div[31]/child::div/div');
  const passingprchaseno = $("//input[@id='M0:46:::3:22']");
  const saveInboundDeliveryDoc = $("//div[@title='Save (Ctrl+S)']");
  const postgoodsvalue = $("//*[@id='dashboardGroups']/div/child::div/descendant::ul/descendant::div[53]/child::div/div");
  const dropdownfield = $('//input[@id="M0:46:1:1::0:20"]');
  const selectInbound = $('//div[text()="Inbound Delivery"]');
  const selectdeliverynote = $('//input[@id="M0:46:1:2:1:1:2B256::0:50"]');
  const InboundId = $('//input[@id="M0:46:1:1:1::0:0"]');
  const selectOkbox = $('//span[@id="M0:46:1:4:1:33::0:0-txt"]');
  const postbutton  = $('//div[@id="M0:50::btn[11]"]');
  const elementRsvCreation = $("//*[@id='dashboardGroups']/div/child::div/descendant::ul/descendant::div[309]/child::div/div");
 
 
  await Base.waitForDisplayedAndSetValue($(locators.Usernameoktaxpath), dataset.logincred.username);
  await Base.waitForDisplayedAndSetValue($(locators.Passwordoktaxpath), dataset.logincred.password);
  await Base.waitForDisplayedAndClick($(locators.Submitbuttonxpath), dataset.logincred.submitbtn, 5000);
  await Base.waitForDisplayedAndSetValue($(locators.Codepathxpath), dataset.logincred.code); // OTP_____________________
  await Base.waitForDisplayedAndClick($(locators.verifybuttonxpath), 5000);
  await browser.pause(10000)  
 
  // Launch Firio app launch
  await dashboardElement.scrollIntoView();
  await Base.waitForDisplayedAndClick(dashboardElement, 5000);
 
  // window handle
  const newwindow = await browser.getWindowHandles();
  await browser.switchToWindow(newwindow[1]);
  await browser.pause(10000);
 
  // Tile Create Purchase Order Tilse Selection
  await element.scrollIntoView();
  await Base.waitForDisplayedAndClick(element, 5000);
  await browser.pause(10000);
 
  // Switch to Create Purchase Order iframe
  const iframe = await browser.$('//iframe[@id="application-Shell-startGUI"]');
  await browser.switchToFrame(iframe);
 
  // Enter Supplier Code
  await Base.waitForDisplayedAndSetValue(supplier, dataset.STPorderdetails.supplierNo);
  await browser.keys('Enter');
  await browser.pause(5000);
 
// Enter Purchase Organization
  await Base.waitForDisplayedAndSetValue(purOrganization, dataset.STPorderdetails.purchaseOrganization);
  await browser.keys('Enter');
  await browser.pause(5000);
 
  // Enter Purchasing Group
  await Base.waitForDisplayedAndSetValue(purGroup, dataset.STPorderdetails.purchaseGroup);
  await browser.keys('Enter');
  await browser.pause(5000);
 
// Enter Compony Code
  await Base.waitForDisplayedAndSetValue(componyCode, dataset.STPorderdetails.componyCode);
  await browser.keys('Enter');
  await browser.pause(5000);
 
  // Click on Item Preview to expand window
  await previewItem.scrollIntoView();
  await previewItem.click();
  await browser.pause(5000);
 
  // Enter MAterial No
 await materialno.scrollIntoView();
  await Base.waitForDisplayedAndClick(materialno, 5000);
 await Base.waitForDisplayedAndSetValue(entermaterialno, dataset.STPorderdetails.MaterialNumber);
 await browser.keys('Enter');
 
  // Enter Plant Code
 await plant.scrollIntoView();
  await Base.waitForDisplayedAndClick(plant, 5000);
 await Base.waitForDisplayedAndSetValue(enterplant, dataset.STPorderdetails.PlantCode);
 await browser.keys('Enter');
 
  // Enter Quantity for order
  await quantity.scrollIntoView();
  await Base.waitForDisplayedAndClick(quantity, 5000);
  await Base.waitForDisplayedAndSetValue(enterquantity, dataset.STPorderdetails.setQuantity);
  await browser.keys('Enter');
 
  // Click on Right arrow to open a new Tab
  await secondScreen.scrollIntoView();
  await Base.waitForDisplayedAndClick(secondScreen, 5000);
  await browser.pause(5000);
 
  // Click on Confirmation Tab
 await confirmationTab.scrollIntoView();
  await Base.waitForDisplayedAndClick(confirmationTab, 5000);
 
  // Click on contConfirmation dropdown
await contConfirmation.scrollIntoView();
 await Base.waitForDisplayedAndClick(contConfirmation, 5000);
 
 // Click on contConfirmation dropdown and Select Inbound
 await selcConfirmationCont.scrollIntoView();
 await Base.waitForDisplayedAndClick(selcConfirmationCont, 5000);
 
 // Click on Save button to Create Purchase Order
  await Base.waitForDisplayedAndClick(seveDocument, 5000);
  await browser.pause(2000);
 
  // window handle
  await browser.switchToWindow(newwindow[1]);
  await browser.pause(5000);
 
  // Switch to iframe
  await browser.switchToFrame(iframe);
 
  // Save the Purchase Document No
  const createPurchaseOrderNo = await $("//div[@id='msgarea']/child::div[1]/div/descendant::span[3]").getText();
  const purchaseOrderNo = Number(createPurchaseOrderNo.replace(/\D/g, ''));
  console.log("Order No:",purchaseOrderNo);
 
// *************** Create InBound Delivery****************************
 
   // Switch to Main window
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
  await Base.waitForDisplayedAndClick(inboundDeliveryTiles, 8000);
 
    // Switch to the iframe
  const iframeinbound = await browser.$('//iframe[@id="application-Shell-startGUI"]');
  await browser.switchToFrame(iframeinbound);
 
  // // Enter Date  
  // const enterDeliveryDate  = $('//input[@id="M0:46:::6:22"]');
  // await enterDeliveryDate.clearValue();
  // await Base.waitForDisplayedAndSetValue(enterDeliveryDate, '');// Purchase order NO
  // await browser.pause(5000);
 
  // Create InBound Delivery
  await passingprchaseno.clearValue();
  await Base.waitForDisplayedAndSetValue(passingprchaseno, purchaseOrderNo);// Purchase order NO
  await browser.keys('Enter');
  await browser.pause(5000);
 
 
  await Base.waitForDisplayedAndClick(saveInboundDeliveryDoc, 5000);// Save Doc
  await browser.pause(10000);
 
  // Create Inbound Delivery
  const Inbounddeliveryno = await $("//div[@id='msgarea']/child::div[1]/div/descendant::span[3]").getText();
  const Inboundno = Number(Inbounddeliveryno.replace(/\D/g, ''));
  console.log("Inbound Number:",Inboundno);
  await browser.pause(2000);
 
  // ********************************** Goods Receiept *******************
   // Switch to current window
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
 
   // Selection of Goods Receiept
  await Base.waitForDisplayedAndClick(postgoodsvalue, 8000);
 
  // Switch to iframe
  await browser.pause(10000);
  const iframegoods = $('//iframe[@id="application-Shell-startGUI"]');
  // await browser.pause(5000)
 
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
 
  //  ===================== Reservation Creation ==========================================
 
  // Switch to current window
  const allWindowHandlesInvoice = await browser.getWindowHandles();
  const originalWindowHandleInvoice = allWindowHandlesInvoice[0];
  await browser.switchToWindow(originalWindowHandleInvoice);
  await browser.pause(10000);
 
  // Fiori Tiles Selection
  await dashboardElement.scrollIntoView();
  await Base.waitForDisplayedAndClick(dashboardElement, 5000);
  await browser.pause(5000);
 
   // Switch window
   const currentWindowCreation = await browser.getWindowHandles();
   await browser.switchToWindow(currentWindowCreation[5]);
   await browser.pause(5000);
 
  // Select Reservation Creation Tiles
  await elementRsvCreation.scrollIntoView();
  await Base.waitForDisplayedAndClick(elementRsvCreation, 5000);
  await browser.pause(10000);
 
   // Switch to the iframe
   const iframeRsvCreation = await browser.$('//iframe[@id="application-Shell-startGUI"]');
   await browser.switchToFrame(iframeRsvCreation);
 
   // Enter Movement Type
   const enterMovementType  = $('//input[@id="M0:46:::4:21"]');
   await Base.waitForDisplayedAndSetValue(enterMovementType, dataset.STPorderdetails.MovementType);
   await browser.keys('Enter');
   await browser.pause(5000);
 
   // Enter Plant Code
   const cr_enterPlant  = $('//input[@id="M0:46:::5:21"]');
   await Base.waitForDisplayedAndSetValue(cr_enterPlant, dataset.STPorderdetails.RC_Plant);
   await browser.keys('Enter');
   await browser.pause(5000);
 
   // Enter Good Receipt No  
   const enterGoodReceiptNo  = $('//input[@id="M0:46:::2:17"]');
   await Base.waitForDisplayedAndSetValue(enterGoodReceiptNo, goodsreceiptno);
   await browser.keys('Enter');
   await browser.pause(5000);
 
   // Enter Cost Center No
   const enterCostCenterNo  = $('//input[@id="M0:46:1::0:16"]');
   await Base.waitForDisplayedAndSetValue(enterCostCenterNo, dataset.STPorderdetails.CostCenterNo);
   await browser.keys('Enter');
   await browser.pause(5000);
 
   // Enter Material No
   const cr_enterMaterialNO  = $('//input[@id="M0:46:2::0:7"]');
   await Base.waitForDisplayedAndSetValue(cr_enterMaterialNO, dataset.STPorderdetails.RC_MaterialNO);
   await browser.pause(5000);
 
   // Enter Quantity
   const cr_enterQuantity  = $('//input[@id="M0:46:2::0:48"]');
   await Base.waitForDisplayedAndSetValue(cr_enterQuantity, dataset.STPorderdetails.RC_Quantity);
   await browser.pause(5000);
 
   // Enter Unit Type
   const cr_enterUnitType  = $('//input[@id="M0:46:2::0:66"]');
   await Base.waitForDisplayedAndSetValue(cr_enterUnitType, dataset.STPorderdetails.RC_UnitType);
   await browser.keys('Enter');
   await browser.pause(5000);
 
   const clickPostBTN  = $('//div[@title="Post (Ctrl+S)"]');
   await Base.waitForDisplayedAndClick(clickPostBTN,5000);
   await browser.pause(20000);
 
   //Save Create Reservation Document No
  const createReservation = await $("//div[@id='msgarea']/child::div[1]/div/descendant::span[3]").getText();
  const reservatioNO = Number(createReservation.replace(/\D/g, ''));
  console.log("Goods Receipt No:", reservatioNO);
 
  // ************** Goods Issue for Work Order ********************************
 
    // Switch to current window
  const allWindowHandlesGoodsIssue = await browser.getWindowHandles();
  const originalWindowHandleGoodsIssue = allWindowHandlesGoodsIssue[0];
  await browser.switchToWindow(originalWindowHandleGoodsIssue);
  await browser.pause(10000);
 
  // Fiori Tiles Selection
  await dashboardElement.scrollIntoView();
  await Base.waitForDisplayedAndClick(dashboardElement, 5000);
  await browser.pause(5000);
 
   // Switch window
   const currentWindowGoodsIssue = await browser.getWindowHandles();
   await browser.switchToWindow(currentWindowGoodsIssue[6]);
   await browser.pause(5000);
 
   // Select Goods Issue Tiles
   const selectPostIssueTiles = $("//*[@id='dashboardGroups']/div/child::div/descendant::ul/descendant::div[134]/child::div/div");
   await Base.waitForDisplayedAndClick(selectPostIssueTiles, 8000);
   await browser.pause(5000);
 
  // Switch to iframe
  const iframeGoodsIssue = await browser.$('//iframe[@id="application-Shell-startGUI"]');
  await Base.switchToIframe(iframeGoodsIssue);
  await browser.pause(5000);
 
  // click on DropDown
  const selectDropdown  = $('//input[@id="M0:46:1:1::0:20"]');
  await Base.waitForDisplayedAndClick(selectDropdown,5000);
 
  // Select reservation From Dropdown
  const selectReservation  = $('//div[text()="Reservation"]');
  await Base.waitForDisplayedAndClick(selectReservation,5000);
 
  // Enter Reservation no that create from created reservation in previous step
  const enterReservarionNo  = $('//input[@id="M0:46:1:1:1::0:0"]');
  await Base.waitForDisplayedAndSetValue(enterReservarionNo, reservatioNO);
  await browser.keys('Enter');
  await browser.pause(5000);
 
  // Click on where Tab To see the details
  const clickWhereTab = $('//div[@id="M0:46:1:4:1:1::0:2-title"]');
  await Base.waitForDisplayedAndClick(clickWhereTab);
  await browser.pause(5000);
 
  // check ItemsOk checkbox
  const checkItemsOk = $('//span[@id="M0:46:1:4:1:33::0:0-txt"]');
  await Base.waitForDisplayedAndClick(checkItemsOk);
 
  // Click on post button to create a work order
  const cw_PostBTN  = $('//div[@id="M0:50::btn[11]"]');
  await Base.waitForDisplayedAndClick(cw_PostBTN);
  await browser.pause(20000);
 
  // Document No for work Order
  const createGoodIssueForWorkOrder = await $("//div[@id='msgarea']/child::div[1]/div/descendant::span[3]").getText();
  const GoodsReceiptNoForWorkOrder = Number(createGoodIssueForWorkOrder.replace(/\D/g, ''));
  console.log("Work Order No:", GoodsReceiptNoForWorkOrder);
 
 
  });
});