({  
  
    navigateToNewRecForm : function(component, event, helper) {  
          
        var event = $A.get("e.force:navigateToComponent");  
        event.setParams({  
            componentDef : "c:NewRecordForm",  
            componentAttributes : {      
                  
                AccountId : component.get("v.AccountId")  
                  
            }  
        });  
        event.fire();  
          
    }  
      
})