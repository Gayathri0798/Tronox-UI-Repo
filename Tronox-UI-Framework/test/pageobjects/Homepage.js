import { $ } from '@wdio/globals'
import reusablemethods from '../pageobjects/reusablemethods.js';

let menu = await import('../pageobjects/elementIdentifiers/' + global.wdioEnvParameters.config.appName +'/Homepage.json', { assert: { type: 'json' } })
menu = menu.default;

class Jamaica extends reusablemethods {

    get Menu1(){
        return $$(menu.menu1)
    }

    get Menu2(){
        return $$(menu.menu2)
    }

    get Menu3(){
        return $$(menu.menu3)
    }

    get Menu4(){
        return $$(menu.menu4)
    }

    async jamaicaweb(menuA, menuB, menuC, menuD){
        await super.findMultipleElements(this.Menu1, ...menuA);
        await super.findMultipleElements(this.Menu2, ...menuB);
        await super.findMultipleElements(this.Menu3, ...menuC);
        await super.findMultipleElements(this.Menu4, ...menuD);
    }

}

export default new Jamaica()