trigger Contacttriggertest on Contact (before insert) {
    boolean once=AccountTriggerHandler.testonce;
    if(once){
        once=false;
        Contact acc=new Contact(); 
    acc.LastName='new trigger test';
    insert acc;
        
    }

}