import {logger}  from '../../logerror/logfile.js';
export default class reusablemethods{

    async findMultipleElements(elements, ...compare){
        try{
            await elements.forEach(async(element)=>{
            
                await $(element).waitForExist({timeout:10000})
                await $(element).waitForDisplayed({ timeout: 10000 });
                const value = await $(element).isExisting() && await $(element).isDisplayed();
                const elementText = await $(element).getText()
                if(value){
                        if (compare.includes(elementText)){
                            logger.info(elementText)
                            // await $(element).click()
                        }else{
                            logger.error(elementText)
                            return
                        }
                }
                // assert.notStrictEqual(elementText, "", 'Element does not contain any text')
               
            })
        }
        catch(error){
            logger.error(error.name);
        }
    }

    async findMultipleElementsInTables(elements){
        try{
            await elements.forEach(async(element)=>{
            
                await $(element).waitForExist({timeout:10000})
                await $(element).waitForDisplayed({ timeout: 10000 });
                const value = await $(element).isExisting() && await $(element).isDisplayed();
                const elementText = await $(element).getText()
                if(value){
                        // if (compare.includes(elementText)){
                            logger.info(elementText)
                            // await $(element).click()
                        // }else{
                            // logger.error(elementText)
                            // return
                        // }
                }
                // assert.notStrictEqual(elementText, "", 'Element does not contain any text')
               
            })
        }
        catch(error){
            logger.error(error.name);
        }
    }


}