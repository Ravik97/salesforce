public class NewRecordFormController {  
      
    @auraEnabled  
    public static Account getAccount(String recordid) {  
          
        return [ SELECT Id, Name FROM Account WHERE Id =: recordid ];   
          
    }  
  
}