({
    fetchData: function (cmp,event,helper) {
        var action = cmp.get("c.getAllAccounts");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var data = response.getReturnValue();
                cmp.set('v.data',data);
               $A.get('e.force:refreshView').fire();
            }
            // error handling when state is "INCOMPLETE" or "ERROR"
        });
        $A.enqueueAction(action);
    }
})