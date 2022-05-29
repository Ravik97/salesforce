({
    fetchData: function (cmp,event,helper) {
        var action = cmp.get("c.getAllAccounts");
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var data = response.getReturnValue();
                data.forEach(function(record){
                    record.linkName ='/'+record.Id;
                });
                cmp.set('v.data',data);
                
            }
           	console.log("init method called");
            // error handling when state is "INCOMPLETE" or "ERROR"
        });
        $A.enqueueAction(action);
    },
    setupTable: function (cmp,event,helper) {
         var action = cmp.get("c.getPicklistValues");
        action.setParams({
            objectAPIName: "Account",
            fieldAPIName: "Type"
        });
        action.setCallback(this,function(response){
            if(response.getState() === "SUCCESS"){
                var types = [];
                Object.entries(response.getReturnValue()).forEach(([key, value]) => types.push({label:key,value:value}));
                var cols = [
                    {label: "Account Name", fieldName: 'linkName', type: 'url', sortable: true, resizable:true, 
                     attributes:{label:{fieldName:"Name"}, title:"Click to View(New Window)", target:"_blank"}},
                    {label: "Created Date", fieldName: "CreatedDate", type:"date", sortable: true},
                    {label: "Type", fieldName: "Type", editable: true, type:"picklist", selectOptions:types},            
                    {label: "Shipping Street", fieldName: "ShippingStreet", sortable: true, },
                    {label: "Shipping City", fieldName: "ShippingCity", editable: true},            
                    {label: "Shipping State", fieldName: "ShippingState"},
                    {label: "Shipping PostalCode", fieldName: "ShippingPostalCode"},
                    {label: "Shipping Country", fieldName: "ShippingCountry"},                                
                    
                ];
                cmp.set("v.columns", cols);
                this.fetchData(cmp,event,helper);
            }
                     });
        $A.enqueueAction(action);
    },
})