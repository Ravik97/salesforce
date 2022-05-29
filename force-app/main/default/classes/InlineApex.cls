public class InlineApex {

    @AuraEnabled
    public static List<Account> getAccountRating(String rvalue,String res){
        List<Account> a= [Select Id,Name,AnnualRevenue,Description,NumberOfEmployees,Industry,Rating,Phone from Account Where (Rating =:rvalue AND Industry =:res) ] ; 
        return a;
        
    }
    @AuraEnabled
    public static List<Account> getAllAccounts(){
        return [Select Id,Name , AnnualRevenue, Description, NumberOfEmployees, Industry ,Rating, Phone from Account] ; 
        
    }
}