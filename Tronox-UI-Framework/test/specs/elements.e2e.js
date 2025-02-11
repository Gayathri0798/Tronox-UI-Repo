import BasePage from "../../common.js"
const Base = new BasePage();
describe("start @prod", ()=>{
    before(async()=>{
        await browser.url(global.wdioEnvParameters.config.baseUrl);
        await browser.maximizeWindow();
    })
    it("should enter the values", async()=>{
        // await browser.getUrlAndTittle()
        const name = await $('//*[@id="name"]')
        const email = await $('//*[@id="email"]')
        const phonenum = await $('//*[@id="phone"]')
        const address = await $('//*[@id="textarea"]')
        await Base.waitForDisplayedAndSetValue(name, "name")
        await Base.waitForDisplayedAndSetValue(email, "email")
        await Base.waitForDisplayedAndSetValue(phonenum, "123456789")
        await Base.waitForDisplayedAndSetValue(address, "Bangalore")
    })

    it("radio", async()=>{
        const male = $('//*[@id="male"]')
        await Base.waitForDisplayedAndClick(male)
    })

    it('checkboxes', async()=>{
        const checkbox = await $$('//*[@id="post-body-1307673142697428135"]/div[4]/div/label')
        await Base.selectCheckBoxes(checkbox, ["Monday", "Tuesday", "Wednesday"])
        await browser.pause(5000)
    })
    
    it("dropdown", async()=>{
        const dropdown = $('//*[@id="country"]')
        await Base.selectDropdown(dropdown, "France")
        await browser.pause(5000)
    })



    it("date", async()=>{
        await $('//*[@id="datepicker"]').click()
        await Base.dayPick($$('//*[@id="ui-datepicker-div"]/table/tbody/tr/td/a'), "23")
        await browser.pause(3000)
    })

    it("copy and paste", async()=>{
        const copyInputFromAddress =  await $('//*[@id="textarea"]')
        const pasteInsearch = await $('//*[@id="Wikipedia1_wikipedia-search-input"]')
        await Base.copyAndPaste(copyInputFromAddress, pasteInsearch)
    })


    it.skip("compare", async()=>{
        const s = await $('//*[@id="post-body-1307673142697428135"]/div[4]/div[2]/label')
        // await Base.compareText(s, "Monday")
    })

    

    it('alertHandler', async()=>{
        const alert = await $('//*[@id="HTML9"]/div[1]/button[1]')
        await Base.waitForDisplayedAndClick(alert)
        await browser.pause(5000)
        await Base.alertHandler()
    })

    it('confirmBox', async()=>{
        const confirm = await $('//*[@id="HTML9"]/div[1]/button[2]')
        await Base.waitForDisplayedAndClick(confirm)
        await browser.pause(5000)
        await Base.alertHandler(false)
    })


    it("dragAndDrop", async()=>{
        const drag = await $('//*[@id="draggable"]')
        const drop = await $('//*[@id="droppable"]')
        await Base.performDragAndDrop(drag, drop)
    })

    

    it("slider", async()=>{
        const slider = $('//*[@id="slider"]/span')
        await Base.dragSlider(slider, 200, 0)
    })//*[@id="HTML10"]/div[1]/button
    

    it('switch to iframe', async()=>{
        const iframe = await $('//*[@id="frame-one796456169"]')
        const input = await $('//*[@id="RESULT_TextField-0"]')
        await Base.switchToIframe(iframe)
        await Base.waitForDisplayedAndSetValue(input, "RESULT")
        await browser.pause(5000)
    })
    
    
})