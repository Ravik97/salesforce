import Name from '@salesforce/schema/Account.Name';
import {NavigationMixin} from 'lightning/navigation'
import { LightningElement, track,wire } from 'lwc';


export default class BasicDatatable extends  NavigationMixin(LightningElement)  {

    @track crisdate
    @track lstAccounts = [
        {
            Id : '101',
            Name : 'Cristiano Ronaldo',
            Over:this.crisdate
        },
        {
            Id : '102',
            Name : 'Lionel Messi',
            Over:this.messdate
        },
        {
            Id : '103',
            Name : 'Sachin Tendulkar',
            Over:this.sachindate
        }
    ];

        
    navigateToTab(){
            this[NavigationMixin.Navigate]({ 
                type:'standard__recordPage',
                attributes: {
                    recordId:'0012v00003H0j0WAAR',
                    objectApiName: 'Account',
                    actionName: 'view'
                }
            })
        }
    
    changehandler(event){
        console.log('id',event.target.id,'label',event.target.label)
        this.lstAccounts[0].Over=event.target.value
        console.log('val',this.lstAccounts[0].Name)
        let lwcInputFields = this.template.querySelectorAll(
        'lightning-input'
        );
        lwcInputFields.forEach(function(element){
            console.log("inside");
            if(element.label =='2'){
                console.log("edd",element.value);
            }
        },this)
        let i=1
        let start=new Date()
        while(start<=new Date(2022, 1, 18)){
            console.log('start date',start)
            start.setDate(start.getDate()+7*i)
            console.log('date',start.toISOString().split('T')[0])
        }

        
    }
}