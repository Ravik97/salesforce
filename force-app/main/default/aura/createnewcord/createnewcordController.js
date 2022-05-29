({
	handleSuccess : function(component, event, helper) {
        var record = event.getParam("response");
        console.log("inside new"+record.id);
         var toastEvent = $A.get("e.force:showToast");
              toastEvent.setParams({
                  "title": "Success!",
                  "message": "The record has been saved successfully."
              });
              toastEvent.fire();
              $A.get('e.force:refreshView').fire();
       /*var action = component.get("c.insertAccount");
      action.setParams({  
          "Id" : record.id
      });  
      action.setCallback(this, function(response) {  
          var state = response.getState();  
          if ( state === 'SUCCESS'  ) {  
              var toastEvent = $A.get("e.force:showToast");
              toastEvent.setParams({
                  "title": "Success!",
                  "message": "The record has been saved successfully."
              });
              toastEvent.fire();
              $A.get('e.force:refreshView').fire();  
          }  
          
      });  
      $A.enqueueAction(action); 
		*/
	},
    openModel: function(component, event, helper) {
      // for Display Model,set the "isOpen" attribute to "true"
      component.set("v.isOpen", true);
   },
 
   closeModel: function(component, event, helper) {
      // for Hide/Close Model,set the "isOpen" attribute to "Fasle"  
      component.set("v.isOpen", false);
       $A.get('e.force:refreshView').fire();
   },
})