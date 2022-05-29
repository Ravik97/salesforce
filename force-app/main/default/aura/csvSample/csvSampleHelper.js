({
   onLoad: function(component, event) {
      var action = component.get('c.fetchContact');
      action.setCallback(this, function(response){
         var state = response.getState();
         if (state === "SUCCESS") {
            component.set('v.ListOfContact', response.getReturnValue());
         }
      });
      $A.enqueueAction(action);
   },

   convertArrayOfObjectsToCSV : function(component,objectRecords){
        var csvStringResult, counter, keys, columnDivider, lineDivider;


        if (objectRecords == null || !objectRecords.length) {
            return null;
         }

        columnDivider = ',';
        lineDivider =  '\n';

        keys = ['FirstName','LastName','Department','MobilePhone','Id' ];

        csvStringResult = '';
        csvStringResult += keys.join(columnDivider);
        csvStringResult += lineDivider;

        for(var i=0; i < objectRecords.length; i++){   
            counter = 0;

             for(var sTempkey in keys) {
                var skey = keys[sTempkey] ;  

                  if(counter > 0){ 
                      csvStringResult += columnDivider; 
                   }   

               csvStringResult += '"'+ objectRecords[i][skey]+'"'; 

               counter++;

            } 
             csvStringResult += lineDivider;
          } 

        return csvStringResult;        
    }   
    
})