trigger LeadTrigger on Lead (before insert) {
    for(Lead l :Trigger.New){
        l.LeadSource ='other';
    }
}