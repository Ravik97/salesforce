//Batch Job for Processing the Records
global class AccountBatch implements Database.Batchable<sobject>{
 // global String [] email = new String[] {'ravikumarah.66@gmail.com'};//Add here your email address here
  
  //Start Method
  global Database.Querylocator start (Database.BatchableContext BC) {
    return Database.getQueryLocator('SELECT Id,Name from Account');//Query which will be determine the scope of Records fetching the same
  }

  //Execute method
  global void execute (Database.BatchableContext BC, List<Account> scope) {
    List<Account> updatedCustomerList = new List<Account>();//List to hold updated customer
    for (Account objScope: scope) { 
       //type casting from generic sOject to APEX_Customer__c
        objScope.Description = 'Updated Via Batch Job';
        objScope.Name = 'Batch'+objScope.Name;
        updatedCustomerList.add(objScope);//Add records to the List
        System.debug('Records updated '+updatedCustomerList);
    } 
        if (updatedCustomerList != null && updatedCustomerList.size()>0) {//Check if List is empty or not
            Database.update(updatedCustomerList); 
            System.debug('Records are successfully updated '+updatedCustomerList);//Update the Records
        }
  }

  //Finish Method
  global void finish(Database.BatchableContext BC){
  Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();

  //Below code will fetch the job Id
  AsyncApexJob a = [Select a.TotalJobItems, a.Status, a.NumberOfErrors, a.JobType, a.JobItemsProcessed, a.ExtendedStatus, a.CreatedById, a.CompletedDate From AsyncApexJob a WHERE id = :BC.getJobId()];//get the job Id
  System.debug('Jobid is'+BC.getJobId());
String [] email=new String[] {'ravikumarah.66@gmail.com'};
  //below code will send an email to User about the status
  mail.setToAddresses(email);
  //mail.setReplyTo('ravikumarah.66@gmailcom');//Add here your email address
  mail.setSenderDisplayName('Apex Batch Processing Module');
  mail.setSubject('Batch Processing '+a.Status);
  mail.setPlainTextBody('The Batch Apex job processed  '+a.TotalJobItems+'batches with  '+a.NumberOfErrors+'failures'+'Job Item processed are'+a.JobItemsProcessed);
  Messaging.sendEmail(new Messaging.Singleemailmessage [] {mail});
  }
}