({
    closeHelpTicket : function( cmp, event, helper ) {
        var actionAPI = cmp.find("quickActionAPI");
        var fields = { relatedTo : { Id : "recordId" }, 
                     Discount__c : { value : "10.00"}, 
                       Discount_for_Expense__c : { value : "5.00" }, 
                           
                       Discount_for_income__c : { value : "15.00"}}; 
        var args = { actionName : "Account.update_revenue", 
    				entityName: "Account",
					 targetFields : fields };
        actionAPI.setActionFieldValues(args).then(function() {
            actionAPI.invokeAction(args);
        }).catch(function(e) {
            console.error(e.errors);
        });
    }

})