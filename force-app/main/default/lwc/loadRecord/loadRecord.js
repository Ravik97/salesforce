import { LightningElement,api,track } from 'lwc';

export default class LoadRecord extends LightningElement {
    @api val
    @api
    get display(){
        return this.val
    }
    set display(val){
        if(val<0){
            val=999
        }
        else
        this.val=val
    }
    
}