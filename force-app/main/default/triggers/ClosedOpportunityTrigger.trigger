trigger ClosedOpportunityTrigger on Opportunity (after update,after insert ) {

    List<Task> tasks = new List<Task>();
    Task tempTask ;

    for (Opportunity opportunity : Trigger.new) {

        if (String.isEmpty(opportunity.StageName) == false && opportunity.StageName.equals('Closed Won')) {

            tempTask = new Task(WhatId = opportunity.Id, Subject = 'Follow Up Test Task');
            tasks.add(tempTask);
            
        }
    }

    if(!tasks.isEmpty()){
        insert tasks;
    }

}