({  
  
    doInit: function (component, event, helper) {  
         
       
     
         console.log("inside form inits");
        var action = component.get('c.getAccount');  
        action.setParams({  
              
            recid : component.get("v.recordid")  
              
        });  
        action.setCallback(this, function(response) {  
              
            var state = response.getState();  
            if ( state === 'SUCCESS' && component.isValid() ) {  
                  
                component.set('v.AccountRec', response.getReturnValue());  
                  
            }   
              
        });  
        $A.enqueueAction(action);  
          
    },  
      
    handleSuccess : function(component, event, helper) {  
          
        var params = event.getParams();  
        alert(params.response.id);  
          
    },
    getValueFromApplicationEvent: function(component, event, helper) {  
        console.log("inside form handler");
        var ShowResultValue = event.getParam("Pass_Result");
        // set the handler attributes based on event data
          var final=JSON.stringify(ShowResultValue);
         console.log(final);
        component.set("v.recordid", final);
        
   } 
    
      
})