import {Key} from 'webdriverio'
import { logger } from "./logerror/logfile.js";
import assert from "assert"
import path from "path";
import dotenv from 'dotenv';
import mysql from 'mysql';
import chalk from 'chalk';
import reader from 'xlsx'; // Make sure you import 'xlsx' correctly
dotenv.config();

const standard_timeout = process.env.TIMEOUT
const standard_drag_and_drop_timeout = process.env.DELAY_DRAG_AND_DROP
// console.log(standard_timeout, standard_drag_and_drop_timeout);

export default class BasePage {

     /**
         * Asynchronously handles alert dialogs
         * @param {number} [timeout] - Optional. The timeout for waiting for the alert to appear (default is 10000 milliseconds)
         */
    async alertHandler(timeout=standard_timeout){
        try{
            await browser.waitUntil(async () => {
                return await browser.getAlertText() !== null;
            }, {
                timeout: timeout, // Adjust timeout as needed
                timeoutMsg: 'Alert did not appear'
            });
            const alertText = await browser.getAlertText()
            console.log('Alert text:', alertText);
            await browser.acceptAlert()
        }catch (err) {
            logger.error(err)
        }
    }

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    /**
         * Asynchronously waits for an element to be displayed and clicks on it
         * @param {string} Element elementToWaitForClickable - The element to wait for and click on
         * @param {string} [name] - Optional. The name of the element (default is "element")
         * @param {number} [timeout] - Optional. The timeout for waiting for element existence and display (default is 10000 milliseconds)
         */
    async waitForDisplayedAndClick(elementToWaitForClickable, name="element", timeout=standard_timeout) {
        try {
            await elementToWaitForClickable.waitForExist({timeout:timeout})
            await elementToWaitForClickable.waitForDisplayed({ timeout: timeout });
            await elementToWaitForClickable.click();
        } catch (error) {
            logger.error(`Error occurred in ${name}, ${error}`);
            assert.fail(`Error occurred in ${name}, ${error}`);

        }
        
    }

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

/**
         * Asynchronously waits for an element to be displayed and clicks on it
         * @param {string} Element elementToWaitForDoubleClickable - The element to wait for and Double click on
         * @param {string} [name] - Optional. The name of the element (default is "element")
         * @param {number} [timeout] - Optional. The timeout for waiting for element existence and display (default is 10000 milliseconds)
         */
async waitForDisplayedAndDoubleClick(elementToWaitForDoubleClickable, name="double click", timeout=standard_timeout) {
    try {
        await elementToWaitForDoubleClickable.waitForExist({timeout:timeout})
        await elementToWaitForDoubleClickable.waitForDisplayed({ timeout: timeout });
        await elementToWaitForDoubleClickable.doubleClick();
    } catch (error) {
        logger.error(`Error occurred in ${name}, ${error}`);
        assert.fail(`Error occurred in ${name}, ${error}`);

    }
    
}

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    /**
    * Asynchronously waits for an element to be displayed and sets its value
    * @param {string} Element elementToWaitForSetValue - The element to wait for and set its value
    * @param {string} value - The value to set to the element
    * @param {string} [name] - Optional. The name of the element (default is "element")
    * @param {number} [timeout] - Optional. The timeout for waiting for element existence and display (default is 10000 milliseconds)
    */
    async waitForDisplayedAndSetValue(elementToWaitForSetValue, value, name="element", timeout=standard_timeout) {
        try {
            await elementToWaitForSetValue.waitForExist({timeout:timeout})
            await elementToWaitForSetValue.waitForDisplayed({ timeout: timeout });
            await elementToWaitForSetValue.setValue(value);
        } catch (error) {
            logger.error(`Error occurred in ${name}, ${error}`);
            assert.fail(`Error occurred in ${name}, ${error}`);
        }
    }


//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    /**
        * Asynchronously selects checkboxes based on provided elements and comparison values
        * @param {string} Element elements - An array of checkbox elements to select from
        * @param compare - Comparison values to determine which checkboxes to select
    */

    async selectCheckBoxes(elements, ...compare){
        try{
            await elements.forEach(async(element)=>{
            
                await $(element).waitForExist({timeout:5000})
                await $(element).waitForDisplayed({ timeout: 5000 });
                const value = await $(element).isExisting() && await $(element).isDisplayed();
                const elementText = await $(element).getText()
                if(value){
                        if (compare.includes(elementText)){
                            await $(element).click()
                        }else{
                            return
                        }
                }   
            })
        }
        catch(error){
            logger.error(error)
        }
    }
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
/**
        * Asynchronously selects checkboxes based on provided elements and comparison values
        * @param {string} Element An array of elements to search through
        * @param compare -  Comparison values used to compare the text content of elements
    */

async findElementsContainingText(elements, ...compare){
    try{
        await elements.forEach(async(element)=>{
            await $(element).waitForExist({timeout:5000})
            await $(element).waitForDisplayed({ timeout: 5000 });
            const value = await $(element).isExisting() && await $(element).isDisplayed();
            const elementText = await $(element).getText()
            if(value){
                    if (compare.includes(elementText)){
                        logger.info(elementText)
                    }else{
                        return 
                        // logger.debug(`Element with text "${elementText}" does not match any comparison values.`)
                        
                    }
            }
            assert.notStrictEqual(elementText, "", 'Element does not contain any text')   
        })
    }
    catch(error){
        logger.error(error)
    }
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    
    /**
         * Asynchronously selects a value from a dropdown element
         * @param {string} Element dropdownElement - The dropdown element to select a value from
         * @param value - The value to be selected in the dropdown
         * @param {string} [name] - Optional. The name of the dropdown element (default is "element")
         * @param {number} [timeout] - Optional. The timeout for waiting for element existence and display (default is 10000 milliseconds)
         */
    async selectDropdown(dropdownElement, value, name="element", timeout=standard_timeout){
        try{
            await dropdownElement.waitForExist({timeout:timeout})
            await dropdownElement.waitForDisplayed({ timeout: timeout });
            await dropdownElement.selectByVisibleText(value)
        }catch(error){
            logger.error(`Error occurred in ${name}, ${error}`);
            assert.fail(`Error occurred in ${name}, ${error}`);
        }
    
    }

//-----------------------------------------------------------------------------------------------------------------------------------------
async  dayPick(day_element, day, timeout=standard_timeout, name="day") {
    try {
        const elementsDay = await (day_element);

        for (let i = 0; i < elementsDay.length; i++) {
            const element = await elementsDay[i];

            await $(element).waitForExist({ timeout: timeout });
            await $(element).waitForDisplayed({ timeout: timeout });

            const value = await $(element).isExisting() && await $(element).isDisplayed();
            const elementText = await $(element).getText();

            if (Number(elementText)===Number(day)) { 
                await $(element).click();
                break;
            }
        }
    } catch (error) {
        logger.error(`Error occurred in ${name}, ${error}`);
        assert.fail(`Error occurred in ${name}, ${error}`);
    }
}
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
async datePickerDropDown(elementMonth="", month, elementYear="", year, day_element, day, name = "day", timeout = standard_timeout) {
    try {
        await this.selectDropdown(elementMonth, month);
        await this.selectDropdown(elementYear, year);
        await this.dayPick(day_element, day, timeout);
    } catch (error) {
        logger.error(`Error occurred in ${name}, ${error}`);
        assert.fail(`Error occurred in ${name}, ${error}`);
    }
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

async navDate(elementclick, monthelement, month, yearelement, year, nextelement, backelement, day_element, day, timeout=standard_timeout) {
    
    try {
        await this.waitForDisplayedAndClick(elementclick);        
        if (Number(await yearelement.getText())>Number(year)){
            while (true) {
                let currentMonth = await monthelement.getText();
                let currentYear = await yearelement.getText();
                if (currentMonth === month && Number(currentYear) === Number(year)) {
                    this.dayPick(day_element, day, timeout)
                    break;
                }
                else {
                    await this.waitForDisplayedAndClick(backelement);
                }
            }
        }
        else if(Number(await yearelement.getText())<Number(year)){
            while (true) {
                let currentMonth = await monthelement.getText();
                let currentYear = await yearelement.getText();
                if (currentMonth === month && Number(currentYear) === Number(year)) {
                    await this.dayPick(day_element, day, timeout)
                    break;
                }
                else {
                    await this.nextelement(nextelement);
                }
            }
        }
        else{
            const month_name = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "august", "sep", "oct", "nov", "dec"];
            let currentMonth = await monthelement.getText();
            let element = ""
            const current = month_name.indexOf(await currentMonth.slice(0,3).toLowerCase())
            const actual = month_name.indexOf(await month.slice(0,3).toLowerCase())
            if (current>actual){
                element = await backelement
            }else element = await nextelement
            while (true) {
                let currentMonth = await monthelement.getText();
                let currentYear = await yearelement.getText();
                if (Number(currentYear) === Number(year) && await currentMonth.slice(0,3).toLowerCase()===await month.slice(0,3).toLowerCase()) {
                    await this.dayPick(day_element, day, timeout)
                    break;
                }else{
                    await this.waitForDisplayedAndClick(element)
                }
            }
        } 
    } catch (error) {
        console.error(error);
    }
}


//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        /**
         * Asynchronously uploads a file to the specified element
         * @param  {string} Element - The element to which the file will be uploaded
         * @param pathofUploadFile - The path of the file to be uploaded
         * @param {string} [name] - Optional. The name of the upload action (default is "upload")
         * @param {number} [timeout] - Optional. The timeout for waiting for element existence and display (default is 10000 milliseconds)
         */
    async upload(element, pathofUploadFile, name="upload", timeout = standard_timeout){ 
        try{
            await element.waitForExist({timeout:timeout})
            await element.waitForDisplayed({ timeout: timeout });
            // const filePath = path.join(__dirname, pathofUploadFile) 
            const upload = await browser.uploadFile(pathofUploadFile)
            await element.setValue(upload)
        }catch(error){
            logger.error(`Error occurred in ${name}, ${error}`);
            assert.fail(`Error occurred in ${name}, ${error}`);
        }
    }

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

   /**
 * Perform drag and drop action from one element to another with optional delay.
 * @param  drag_element - The element to drag.
 * @param  drop_element - The element to drop onto.
 * @param {number} [delay_dragAndDrop] - Optional delay in milliseconds after dragging before dropping.
 * @param {string} [name] - Name of the action, used for logging purposes.
 * @param {number} [timeout] - Optional. The timeout for waiting for element existence and display (default is 10000 milliseconds)
 */
   async performDragAndDrop(drag_element, drop_element, delay_dragAndDrop=standard_drag_and_drop_timeout, name="drag and drop", timeout=standard_timeout) {
    try {
        // Resolve elements
        const drag = await drag_element;
        const drop = await drop_element;

        // Wait for elements to exist and be displayed
        await drag.waitForExist({ timeout: timeout });
        await drag.waitForDisplayed({ timeout: timeout });
        await drop.waitForExist({ timeout: timeout });
        await drop.waitForDisplayed({ timeout: timeout });

        // Perform drag and drop action with optional delay
        await drag.dragAndDrop(drop, { duration: delay_dragAndDrop });

    } catch (error) {
        // Handle errors
        logger.error(`Error occurred in ${name}: ${error}`);
        assert.fail(`Error occurred in ${name}: ${error}`);
    }
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            /**
     * Drags the slider element by the specified offsets.
     * 
     * @param {string} sliderElement - The WebDriverIO element representing the slider.
     * @param {number} xOffset - The horizontal offset by which to drag the slider.
     * @param {number} yOffset - The vertical offset by which to drag the slider.
     * @param {string} [name] - The name of the slider (for logging purposes).
     * @param {number} [timeout] - Optional. The timeout for waiting for element existence and display (default is 10000 milliseconds)
     */

    async dragSlider(sliderElement, xOffset, yOffset, name="slider", timeout=standard_timeout) {
        try {
            await sliderElement.waitForExist({ timeout:timeout });
            await sliderElement.waitForDisplayed({ timeout:timeout });
            await sliderElement.dragAndDrop({ x: xOffset, y: yOffset });
        } catch (error) {
            logger.error(`In ${name},'Error dragging slider:${error}`);
            assert.fail(`In ${name},'Error dragging slider:${error}`);
        }
    }

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    /**
 * Asynchronously copies text from one input element and pastes it into another.
 * * Use the `ClearFieldValue` method if you want to remove the values inside the fields before pasting.
 * @param {string} copyInputelement - The selector of the input element from which to copy text.
 * @param {string} pasteInputeElement - The selector of the input element into which to paste text.
 * @param {string} [name="copy and paste"] - Optional name for logging and error handling.
 * @param {number} [timeout] - Optional. The timeout for waiting for element existence and display (default is 10000 milliseconds).
 */
    async copyAndPaste(copyInputelement, pasteInputeElement, name="copy and paste", timeout=standard_timeout) {
        try {
            await this.waitForDisplayedAndClick(copyInputelement, "copyInputelement", timeout);
            await browser.keys([Key.Ctrl, 'a']); // Select all text
            await browser.keys([Key.Ctrl, 'c']); // Copy selected text
            await this.waitForDisplayedAndClick(pasteInputeElement, "pasteInputelement", timeout);
            await browser.keys([Key.Ctrl, 'v']); // Paste copied text
        } catch (error) {
            logger.error(`Error occurred in ${name} : ${error}`);
            assert.fail(`Error occurred in ${name} : ${error}`);
        }
    }

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        /**
     * Switches the Selenium WebDriver focus to the specified iframe element.
     * @param {string} iframeElement - The iframe element to switch to.
     * @param {string} [name="iframe"] - Optional name for logging and error handling.
     * @param {number} [timeout] - Optional. The timeout for waiting for element existence and display (default is 10000 milliseconds).
     */

    async switchToIframe(iframeElemet, name="iframe", timeout=standard_timeout) {
        try {
            await iframeElemet.waitForExist({ timeout:timeout });
            await iframeElemet.waitForDisplayed({ timeout:timeout });
            const frame = await iframeElemet
            await browser.switchToFrame(frame)
        } catch (error) {
            logger.error(`Error occurred in ${name} : ${error}`);
            assert.fail(`Error occurred in ${name} : ${error}`);
        }
    }

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    /**
         * Asynchronously converts the first letter of each word in a string to uppercase
         * @param {string} value - The string to be processed
         */

    async firstLettersUppercase(value) {
        let value_updated = value.split(" ").map(key=>{
            return key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()
        });
        value_updated = value_updated.join(" "); 
        return  value_updated
    }


    //--------------------------------------------------------------------------------------------------------------------------------


    /**
     * Asynchronously retrieves data from a MySQL database.
     * @param {Object} params - The parameters for the MySQL connection and query.
     * @param {string} params.host - The hostname of the MySQL server.
     * @param {string} params.user - The username to use for authentication.
     * @param {string} params.password - The password to use for authentication.
     * @param {number} params.port - The port number to connect to the MySQL server.
     * @param {string} params.database - The name of the database to use.
     * @param {string} params.table - The name of the table to query.
     * @param {string[]} params.columnNames - The column names to retrieve from the table.
     * @param {number} params.start - The starting ID for the query range.
     * @param {number} params.end - The ending ID for the query range.
     * @param {string} [name="mysql"] - Optional. The name for logging and error handling. Defaults to "mysql".
     * @returns {Promise<Object>} A promise that resolves to an object containing the query results.
     */
    async dataFromMysql({host, user, password,  port, database, table, columnNames, start, end}, name="mysql") {
        return new Promise((resolve, reject) => {
            let s = {};
            const connection = mysql.createConnection({
                host: host,
                user: user,
                password: password,
                database: database,
                port: port
            });

            connection.connect((err) => {
                if (err) {
                    // console.error('Error connecting to database:', err);
                    // logger.error('Error connecting to database:', err);
                    return reject(err);
                }
                console.log('Connected to MySQL database');
            });

            let completedQueries = 0;
            const queryCount = Number(end);

            for (let i = Number(start); i <= queryCount; i++) {
                let val = columnNames.join(', ');
                connection.query(`SELECT ${val} FROM ${table} WHERE id = ?`, [i], (err, results) => {
                    if (err) {
                        // console.error(err);
                        // logger.error(err)
                        connection.end();
                        return reject(err);
                    }
                    if (results.length > 0) {
                        console.log(true);
                        // s[`label${i}`] = [results[0].username, results[0].password];
                        s[`label${i}`] = columnNames.map(key => results[0][key]);
                    } else {
                        console.log(false);
                    }

                    completedQueries++;
                    if (completedQueries === queryCount) {
                        connection.end((err) => {
                            if (err) {
                                // console.error('Error closing the connection:', err);
                                return reject(err);
                            }
                            console.log('Connection closed');
                            resolve(s);
                        });
                    }
                });
            }
        }).catch(error =>{
            logger.error(`Error occurred in ${name}: ${error}`);
            console.error(`Error occurred in ${name}: ${chalk.redBright(error)}`);
            assert.fail(`Error occurred in ${name}: ${error}`);
        });
    }

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        /**
     * Asynchronously retrieves data from a PostgreSQL database.
     * @param {Object} params - The parameters for the PostgreSQL connection and query.
     * @param {string} params.host - The hostname of the PostgreSQL server.
     * @param {string} params.user - The username to use for authentication.
     * @param {string} params.password - The password to use for authentication.
     * @param {number} params.port - The port number to connect to the PostgreSQL server.
     * @param {string} params.database - The name of the database to use.
     * @param {string} params.table - The name of the table to query.
     * @param {string[]} params.columnNames - The column names to retrieve from the table.
     * @param {number} params.start - The starting ID for the query range.
     * @param {number} params.end - The ending ID for the query range.
     * @param {string} [name="postgress"] - Optional. The name for logging and error handling. Defaults to "postgress".
     * @returns {Promise<Object>} A promise that resolves to an object containing the query results.
     */
    async dataFromPostgress({host, user, password,  port, database, table, columnNames, start, end}, name="postgress"){
        return new Promise((resolve, reject)=>{
        let s = {};
        var client = new Client({
            "host": host,
            "user": user,
            "password": password,
            "database":database,
            "port": port
        });
        client.connect((err)=>{
            if(err){
                // console.error('Error connecting to database:', err);
                // logger.error('Error connecting to database:', err);
                return reject(err);
            }
            else{
                console.log("connected");
            }
        });

        let completedQueries = 0;
        const queryCount = Number(end);
        for (let i=Number(start); i<=Number(end); i++){
            let val = columnNames.join(', ');
            client.query(`select ${val} from ${table} where id = $1`, [i], function(err, results){
            if(err){
                // console.log(true);
                // console.error(err);
                // logger.error(err)
                client.end();
                return reject(err);
            }
            if(results.rows.length>0){
                // console.log(results.rows[0]);
                s[`label${i}`] = columnNames.map(key => results.rows[0][key]);
                
            }
            else {
                console.log(false);
            }
            completedQueries++;
            
            if(completedQueries == queryCount){
                client.end((err)=>{
                    if (err) {
                        // console.error('Error closing the connection:', err);
                        return reject(err);
                    }
                    console.log('Connection closed');
                    resolve(s);
                })
            }
        
        })
        }
        }).catch(error =>{
            logger.error(`Error occurred in ${name}: ${error}`);
            console.error(`Error occurred in ${name}: ${chalk.redBright(error)}`);
            assert.fail(`Error occurred in ${name}: ${error}`);
        });
        
    

        

        // client.end()


    }

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    /**
 * Asynchronously reads data from an Excel file.
 * 
 * @param {Object} params - Parameters for reading the Excel data.
 * @param {string} params.path - The path to the Excel file.
 * @param  params.sheet_no - The sheet number to read (1-based index).
 * @param  {Array<string>} params.column - The columns to extract data from.
 * @param  params.start_row - The starting row to read (1-based index).
 * @param  params.end_row - The ending row to read (1-based index).
 * @param {Array<number>} params.skip_rows - Rows to skip (1-based index).
 * @param {string} [name] - The name of the operation for logging purposes, default is "reading Excel Data".
 * 
 * @returns {Promise<Object>} A promise that resolves to an object containing the extracted data.
 
 */

async readExcelData({path, sheet_no, column, start_row, end_row, skip_rows}, name="reading Excel Data"){
    return new Promise((resolve, reject) =>{
        if (Number(start_row)>Number(end_row)){
            reject(new Error(`star_row must be less than or equal to end_row`))
        }
        const file = reader.readFile(path)

        let data = {}
        
        const sheets = file.SheetNames 

        for(let i = Number(sheet_no)-1; i<Number(sheet_no); i++) { 
            const temp = reader.utils.sheet_to_json( file.Sheets[file.SheetNames[i]]) 
            // console.log(temp);
            //using forloop
            for (let j = Number(start_row)-1; j < Number(end_row); j++) {
                if (skip_rows.includes(j+1)) {
                    continue;
                }
                const temps = {}
                column.forEach((val)=>{
                    temps[val] = temp[j][val]||reject(`column name : ${val} not found`)
                })
                const ss = Object.values(temps)
                data[`label_${j+1}`] = ss
            }

            // temp.forEach((res, index) => { 
            //     const temps = {}
            //     value.forEach((val)=>{
            //         temps[val] = res[val]
            //     })
            //     const ss = Object.values(temps)
            //     data[`label_${index+1}`] = ss
            // }) 

            } 
            
        resolve(data)
        }).catch(error => {
            logger.error(`Error occurred in ${name}: ${error}`);
            console.error(`Error occurred in ${name}: ${chalk.redBright(error)}`);
            assert.fail(`Error occurred in ${name}: ${error}`);
        })
    }

//--------------------------------------------------------------------------------------------------------------------------------

            /**
     * Asynchronously reads a JSON file and parses its contents.
     *
     * @param {string} path - The path to the JSON file.
     * @param {string} [name=""] - An optional name for the JSON file, used for error logging.
     * @returns {Promise<Object>} - A promise that resolves to the parsed JSON object.
     * @throws {AssertionError} - Throws an assertion error if the file read fails or if JSON parsing fails.
     *
     * @example
     * const data = await jsonReader('./path/to/file.json');
     * console.log(data);
     * console.log(data.users);
     *
     * @example
     * const data = await jsonReader('./path/to/file.json', 'config');
     * console.log(data);
     */

            async jsonReader(path, name = "") {
                try {
                    const data = await new Promise((resolve, reject) => {
                        fs.readFile(path, 'utf8', (err, data) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(data);
                            }
                        });
                    });
                    return JSON.parse(data);
                } catch (err) {
                    logger.error(err);
                    assert.fail(`Error occurred while reading the ${name ? name + " " : ""}json file: ${err}`);
                }
            }

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    //visual testing

        /**
     * Asynchronously checks the screenshot comparison of a given element.
     * 
     * @param comparisionElement - The element to compare.
     * @param {string} [snapshotName="element_snapshot"] - The name for the snapshot. Default is "element_snapshot".
     * @param {number} [timeout] - The timeout in milliseconds for waiting for the next button to exist and be displayed (default is standard_timeout).
     */

        async checkElementScreenshotComparison(comparisionElement, allowableDifference=0, includeTextToCompare = true, exclude_elements = [], snapshotName = "element_snapshot", timeout = 5000){

            let res = true;
            try{
                await comparisionElement.waitForExist({ timeout: timeout });
                await comparisionElement.waitForDisplayed({ timeout: timeout });
    
                const element = await comparisionElement
    
                var result = await browser.checkElement(element, snapshotName, {
                    ignoreAlpha: !includeTextToCompare,
                    enableLayoutTesting: !includeTextToCompare,
                    hideElements:exclude_elements
                })
    
                if(result > Number(allowableDifference)){
                    res = false
                    assert.fail(`Screenshot comparison failed for element [${snapshotName}]. Expected result to be ${Number(allowableDifference)}, but got ${result}.`);
                }
                // assert.strictEqual(result, 0, `Screenshot comparison failed for element [${snapshotName}]. Expected result to be 0, but got ${result}.`);
                // expect(result).toEqual(0);
            }
            catch(err){
                logger.error(`${err}`);
                if(!res){
                    assert.fail(`Screenshot comparison failed for element [${snapshotName}]. \n${chalk.bgGreen("Expected result")} = ${chalk.greenBright(Number(allowableDifference))}\n${chalk.bgRed("actual result")} = ${chalk.redBright(result)}`)
                }else{
                    assert.fail(`${err}`)
                }
               
            }
    
        }

}

// Validating the database instances
// const database = new BasePage();
// // const dataretrive = await database.dataFromMysql({host:'localhost', user:'root', password:'root',  port:'3306', database:'EY_Database', table:'EY_Database_table', columnNames:['column1_name', 'column2_name'], start:1, end:3},"mysql")
// // console.log(dataretrive);

// const excel = await database.readExcelData({path:'D:\\Webdriverpractise\\EYcodegenerator.xlsx', sheet_no:"1", column:['Name','Phonenumber'],start_row:"1", end_row:"5", skip_rows:[]});
// console.log(excel)
