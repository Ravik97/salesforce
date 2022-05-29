trigger Acctriggertest on Account (before insert) {
    boolean once=AccountTriggerHandler.testonce;
    if(once){
        once=false;
        Account acc=new Account();
    acc.Name='new trigger test';
    insert acc;
        
    }

}