({
       
    fetchLeadSourcePicklist : function(component){
        var action = component.get("c.getPicklistvalues");
        action.setParams({
            'objectName': component.get("v.ObjectName"),
            'field_apiname': component.get("v.Lead_Source"),
            'nullRequired': true
        });
        action.setCallback(this, function(a) {
            var state = a.getState();
            if (state === "SUCCESS"){
                component.set("v.LeadSourcePicklist", a.getReturnValue());
            } 
        });
        $A.enqueueAction(action);
    }
    
})