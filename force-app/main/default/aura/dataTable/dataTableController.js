({
    init: function (cmp, event, helper) {
        helper.setupTable(cmp, event, helper);

    },
    handleSaveEdition: function (cmp, event, helper) {
        var draftValues = event.getParam('draftValues');
        console.log(JSON.stringify(draftValues));
        var action = cmp.get("c.updateAccount");
        action.setParams({"acc" : draftValues});
        action.setCallback(this, function(response) {
            var state = response.getState();
            console.log('inside setcallback');
            $A.get('e.force:refreshView').fire();
            
        });
        console.log('before enque');
        $A.enqueueAction(action);
        
    },
    
   /* doSomething: function (cmp, event, helper) {
        var selectedPicklistValue= cmp.find("statusPicklist").get("v.value");
        var ratingPicklistValue= cmp.find("ratingPicklist").get("v.value");
        console.log(selectedPicklistValue);
        console.log(ratingPicklistValue);
         var action = cmp.get("c.getAccountRating");
        action.setParams({ 
            'rvalue' : ratingPicklistValue,
            'res' : selectedPicklistValue});
        
        action.setCallback(this, function(response) {
            var responseValues = response.getReturnValue();
             var state = response.getState();
            console.log(state + "test");
            if (state === "SUCCESS") {
            
                cmp.set('v.data',responseValues);
              console.log("From server: " + JSON.stringify(response.getReturnValue()));
				
            }
            
           $A.get('e.force:refreshView').fire();
            
        });
        $A.enqueueAction(action);

    }*/
    getSelectedName :function (cmp, event, helper) {
         var selectedRows = event.getParam('selectedRows');
          console.log('selectedRows'+selectedRows);
        //component.set("v.selectedRowsCount" ,selectedRows.length );
      //  let obj =[] ; 
        //for (var i = 0; i < selectedRows.length; i++){
            
//obj.push(selectedRows[i].Id	);
            
//}
        cmp.set("v.AccountId",selectedRows);
      
        //console.log(JSON.stringify(obj) );
        
    },
    
    navigateToNewRecForm :function (cmp, event, helper) {
     var val= cmp.get("v.AccountId");
    if(val<=0)
        alert('select rows before update');
        else{
           cmp.set('v.showanother',true); 
        /*  var evt = $A.get("e.c:Result");
            var res = cmp.get("v.AccountId");
        evt.setParams({
            "Pass_Result": res
               
            });
            evt.fire();
        
    */
    }
    },
    createnewrecord : function (cmp, event, helper) {
        cmp.set("v.shownew",true);
        
    }
    
    /*,
    doSomething1: function (cmp, event, helper) {
        var ratingPicklistValue= cmp.find("ratingPicklist").get("v.value");
        //console.log(selectedPicklistValue);
        console.log(ratingPicklistValue);
         var action = cmp.get("c.getAccountRating");
        //action.setParams({ res : selectedPicklistValue});
        action.setParams( { rvalue : ratingPicklistValue});
        action.setCallback(this, function(response) {
             var state = response.getState();
            console.log(state + "test");
            if (state === "SUCCESS") {
                cmp.set('v.data',response.getReturnValue());
                //alert("From server: " + JSON.stringify(response.getReturnValue()));

            }
            console.log(JSON.stringify(response.getReturnValue()));
            //$A.get('e.force:refreshView').fire();
            
        });
        $A.enqueueAction(action);

    }*/
    
})