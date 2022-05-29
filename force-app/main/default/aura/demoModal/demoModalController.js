({doInit: function (component, event, helper) {  
         
       var temp= component.get("v.AccountId");
    	var val=temp[0].Id;
    	component.set("v.firstId",val);
     
         console.log("inside form inits"+val);
        
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
 
   likenClose: function(component, event, helper) {
      // Display alert message on the click on the "Like and Close" button from Model Footer 
      // and set set the "isOpen" attribute to "False for close the model Box.
      alert('thanks for like Us :)');
      component.set("v.isOpen", false);
       $A.get('e.force:refreshView').fire();
   },
    /* getValueFromApplicationEvent: function(component, event, helper) {
        console.log("inside form handler");
        var ShowResultValue = event.getParam("Pass_Result");
        // set the handler attributes based on event data
          var final=JSON.stringify(ShowResultValue);
         console.log(ShowResultValue);
        component.set("v.AccountId", ShowResultValue);
        
        
    },*/
  handleSuccess : function(component, event, helper) {  
          
        //var params = event.getParams();  
         var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Success!",
                    "message": "The record has been updated successfully."
                });
                toastEvent.fire();  
        $A.get('e.force:refreshView').fire();
    },
  myChange  : function(component, event, helper) { 
      
      /*  var discount= component.find("discid").get("v.value");
      var discountex= component.find("discexcid").get("v.value");
      var discountin= component.find("discinid").get("v.value");
      console.log(discount);
      console.log(discountex);
      console.log(discountin);
      
    */
  },
  setcall : function(component, event, helper) { 
      var action = component.get("c.applytoall");
      action.setParams({  
          "acc" : component.get("v.AccountId"),
          "disc" :component.get("v.disselectedval"),
          "disex" : component.get("v.discexval"),
          "disin" : component.get("v.discinval")
      });  
      action.setCallback(this, function(response) {  
          var state = response.getState();  
          if ( state === 'SUCCESS'  ) {  
              var toastEvent = $A.get("e.force:showToast");
              toastEvent.setParams({
                  "title": "Success!",
                  "message": "The record has been updated successfully."
              });
              toastEvent.fire();
              $A.get('e.force:refreshView').fire();  
          }  
          
      });  
      $A.enqueueAction(action);  
    
  },
  
	handleSucces : function(component, event, helper) {
        var record = event.getParam("response");
        console.log("inside new"+record.id);
         var toastEvent = $A.get("e.force:showToast");
              toastEvent.setParams({
                  "title": "Success!",
                  "message": "The record has been saved successfully."
              });
              toastEvent.fire();
              $A.get('e.force:refreshView').fire();
    },
  opennewModel: function(component, event, helper) {
      // for Display Model,set the "isOpen" attribute to "true"
      component.set("v.isnewOpen", true);
   },
 
   closenewModel: function(component, event, helper) {
      // for Hide/Close Model,set the "isOpen" attribute to "Fasle"  
      component.set("v.isnewOpen", false);
       $A.get('e.force:refreshView').fire();
   },
})