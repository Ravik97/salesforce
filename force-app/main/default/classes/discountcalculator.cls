public with sharing class discountcalculator {
	@AuraEnabled
    public static void applytoall(List<Account> acc,String disc,String disex,String disin){
        List<Account> nacc = new  List<Account>();
        Decimal discount =Decimal.valueOf(disc);
        Decimal discountex =Decimal.valueOf(disex);
        Decimal discountin =Decimal.valueOf(disin);
        for(Integer i=0;i<acc.size();i++){
            acc[i].Discount__c = discount;
            acc[i].Discount_for_Expense__c = discountex;
            acc[i].Discount_for_income__c = discountin;
            nacc.add(acc[i]);
        }
        update nacc;
        
    }
    
    
}