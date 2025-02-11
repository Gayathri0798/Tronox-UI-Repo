// const Logincommon = require('../pageobjects/Logincommon')
import { assert } from 'console'
import login from '../Data/login.json' assert {type: 'json'}
import loginxpath from '../Data/loginxpath.json' assert {type: 'json'}
// const fs = require('fs')

describe('Login into application', ()=>{
    // const testDataObject = require("../Data/login.json");
    
    // let credential =  JSON.parse(fs.readFileSync('test/Data/login.json'))
    it('Login into application', async()=>{
       await browser.url('https://shriramsoftwares.com/hospital/')
       console.log(await browser.getTitle())
       await expect(browser).toHaveUrl('https://shriramsoftwares.com/hospital/')
       await expect(browser).toHaveTitleContaining('Login')
       console.log(login.username,login.password)
      //  await loginxpath.username.setValue(login.username)
      //  await loginxpath.password.setValue(login.password)
      // console.log(Logincommon.loginusername())
    })
})