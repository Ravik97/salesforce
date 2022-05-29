public class DataTableApexClass {
    @AuraEnabled
    public static string insertData(String strfromle){
        String returnresponse ='';
        List<Account> AccoutnListtoInsert = new List<Account>();
        //system.debug('strfromle = ' + strfromle);
        List<fieldWrapper> datalist = (List<fieldWrapper>)JSON.deserialize(strfromle, List<fieldWrapper>.class);
        //system.debug('datalist = ' + datalist);
        //system.debug('datalistSize = ' + datalist.size());
        for(fieldWrapper wrapper: datalist){
            Account acc =new  Account();
            acc.Name = wrapper.Name;
            acc.Phone = wrapper.phone;
            acc.AccountNumber = wrapper.AccountNumber;
            AccoutnListtoInsert.add(acc);            
        }
        
        if(AccoutnListtoInsert.size() > 0){
            try {
                insert AccoutnListtoInsert;
                returnresponse = 'SUCCESS';
            }
            catch(Exception ex){
                returnresponse = 'ERROR';
            }
        }
        return returnresponse;
    }
    
    public class fieldWrapper{        
        public String Name;        
        public String AccountNumber;        
        public String phone;
        
    } 
    
    /* for export data into csv file  */
    @AuraEnabled
    public static list <Account> fetchContact(){      
        List <Account> returnConList = new List < Account > ();        
        for(Account con: [SELECT Name, phone, AccountNumber From Account ]) {
            returnConList.add(con);
        }
        return returnConList;
    }
    
    @AuraEnabled
    public static List<Account> getAllAccounts(){
List<Account> accs = [SELECT Id, Name, Type, ShippingStreet, ShippingCity, ShippingState, ShippingPostalCode, ShippingCountry, CreatedDate
                              FROM Account ORDER BY Name LIMIT 10];
        return accs;        
    }
     
    @AuraEnabled
    public static void updateAccount(List<Account> acc ){
        upsert acc;
    }
     @AuraEnabled
    public static void insertAccount(Account Id ){
        insert Id;
    }
    @AuraEnabled
    public static List<Account> getAccount(String r){
        return [Select Id,Name ,AnnualRevenue,Description,NumberOfEmployees,Industry,Rating,Phone from Account Where Industry =:r ] ; 
        
    }
    @AuraEnabled
    public static List<Account> getAccountRating(String rvalue,String res){
        
        return [Select Id,Name,AnnualRevenue,Description,NumberOfEmployees,Industry,Rating,Phone from Account Where Rating =:rvalue AND Industry =:res ] ; 
        
        
    }
    @AuraEnabled
     public static Map<String,String> getPicklistValues(String objectAPIName, String fieldAPIName){
        Map<String,String> pickListValuesMap = new Map<String,String>();
        Schema.SObjectType convertToObj = Schema.getGlobalDescribe().get(objectAPIName);
        Schema.DescribeSObjectResult descResult = convertToObj.getDescribe();
        Schema.DescribeFieldResult fieldResult = descResult.fields.getMap().get(fieldAPIName).getDescribe();
        Boolean isFieldNotRequired = fieldResult.isNillable();
        List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
        for(Schema.PicklistEntry pickListVal : ple){
            if(isFieldNotRequired)
                pickListValuesMap.put('--None--', '');
            if(pickListVal.isActive())
                pickListValuesMap.put(pickListVal.getLabel(), pickListVal.getValue());
        }
        return pickListValuesMap;
    }
    
}