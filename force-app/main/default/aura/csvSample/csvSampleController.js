({
    loadContactList: function(component, event, helper){
       helper.onLoad(component, event);
    },

    downloadCsv : function(component,event,helper){

        var stockData = component.get("v.ListOfContact");

        var csv = helper.convertArrayOfObjectsToCSV(component,stockData);   
         if (csv == null){return;} 

         var hiddenElement = document.createElement('a');
          hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
          hiddenElement.target = '_self';  
          hiddenElement.download = 'ExportData.csv';  
          document.body.appendChild(hiddenElement);
          hiddenElement.click(); 
        }, 
 })