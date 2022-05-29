public class  csvDownloadCtrl {
@AuraEnabled
   public static list <contact> fetchContact(){

      List <contact> returnConList = new List < contact > ();

      for(contact con: [SELECT firstName, LastName, Department, MobilePhone From contact LIMIT 1000]) {
             returnConList.add(con);
          }
         return returnConList;
   }
     @AuraEnabled
    public static string insertData(String strfromle){
        String returnresponse ='';
        List<contact> contactListtoInsert = new List<contact>();
        //system.debug('strfromle = ' + strfromle);
        List<fieldWrapper> datalist = (List<fieldWrapper>)JSON.deserialize(strfromle, List<fieldWrapper>.class);
        //system.debug('datalist = ' + datalist);
        //system.debug('datalistSize = ' + datalist.size());
        for(fieldWrapper wrapper: datalist){
            contact acc =new  contact();
            acc.firstName = wrapper.firstName;
            acc.LastName = wrapper.LastName;
            acc.Department = wrapper.Department;
            acc.MobilePhone = wrapper.MobilePhone;
            contactListtoInsert.add(acc);            
        }
        
        if(contactListtoInsert.size() > 0){
            try {
                insert contactListtoInsert;
                returnresponse = 'SUCCESS';
            }
            catch(Exception ex){
                returnresponse = 'ERROR';
            }
        }
        return returnresponse;
    }
    
    public class fieldWrapper{        
        public String firstName;        
        public String LastName;        
        public String Department;
        public String MobilePhone;
    } 
}