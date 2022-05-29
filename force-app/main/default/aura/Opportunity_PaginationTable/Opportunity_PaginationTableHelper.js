({

    doInit_helper : function(component, event, helper) {

        try{

            var objApiName = component.get('v.ObjApiName');

            var fieldApiValues = component.get('v.fieldApiValues');

            console.log('fieldApiValues:::'+JSON.stringify(fieldApiValues));

            var action = component.get("c.fetchObjectRecords");

            action.setParams({

                'objApiName': objApiName,

                'fieldApiValues': fieldApiValues

            });

            action.setCallback(this, function(response) {

                var state = response.getState(); 

                console.log('state:::'+state);

                if (state === "SUCCESS") {

                    var storeResponse = response.getReturnValue();

                    component.set("v.searchResult", storeResponse);

                    //console.log('result:::'+JSON.stringify(component.get("v.searchResult")));

                    helper.makeWrapper_Helper(component,event,helper,storeResponse,fieldApiValues);

                }

            });

            $A.enqueueAction(action);

        }catch(ex){

            console.log('error in code:::'+ex);

            component.set('v.isShowSpinner',false);

        }

    },

    makeWrapper_Helper : function(component,event,helper,storeResponse, fieldApiValues){

    component.set("v.searchResult", storeResponse);

        var mainList = [];

        for(let i=0; i<storeResponse.length; i++){

            let newList = [];

            let indexObj = {};

            indexObj.Key = 'Index';

            indexObj.Value = i+1;

            newList.push(indexObj);

            //console.log('storeResponse[i]:::'+JSON.stringify(storeResponse[i]));

            let AllRowListMap = new Map(Object.entries(storeResponse[i]));

            console.log('AllRowListMap:::'+Array.from(AllRowListMap.entries()));

            let newCustomMap = new Map();

            let count = 0;

            for(let m=0; m<fieldApiValues.length; m++){

                let mapKey = Array.from(AllRowListMap.keys())[count];

                if(!$A.util.isUndefinedOrNull(mapKey)){

                    //console.log('mapKey:::>>>'+mapKey);

                    //console.log('fieldApiValues:::>>>'+fieldApiValues[m]);

                    if(mapKey.toLowerCase() == fieldApiValues[m]){

                        // console.log('key matched>>>>');

                        //console.log('value in map :::'+AllRowListMap.get(mapKey));

                        newCustomMap.set(fieldApiValues[m],AllRowListMap.get(mapKey));

                        count++;

                    }else{

                        newCustomMap.set(fieldApiValues[m],'');

                        if(count == 0){

                            count = 0;

                        }

                    }

                }else{

                    let flag = false;

                    let mapKeynew = Array.from(AllRowListMap.keys())[m-1];

                    let mapValue = AllRowListMap.get(mapKeynew);

                    //console.log('mapValue::>>>'+mapValue);

                    //console.log('all values in map::::'+Array.from(AllRowListMap.values()));

                    for(let mapValueObj in Array.from(AllRowListMap.values())){

                        //console.log('individual value:::'+AllRowListMap.values()[mapValueObj]);

                        if(Array.from(AllRowListMap.values()).includes(mapValue)){

                            flag = true;

                        }

                    }

                    if(true){

                        newCustomMap.set(fieldApiValues[m],'');

                    }else{

                        newCustomMap.set(fieldApiValues[m],mapValue);

                    }

                }

            }

            //console.log('newCustomMap:::'+Array.from(newCustomMap.entries()));

            for(let mapObj in Array.from(newCustomMap.entries())){

                let listMapObj = {};

                listMapObj.Key = Array.from(newCustomMap.keys())[mapObj];

                listMapObj.Value = newCustomMap.get(listMapObj.Key);

                listMapObj.Id = storeResponse[i].Id;

                newList.push(listMapObj);

            }

            mainList.push(newList);

        }

        //console.log('mainList:::'+JSON.stringify(mainList));

        component.set('v.recordList', mainList);

        component.set('v.isPagination', true);

        component.set('v.isShowSpinner',false);

        var myEvent = $A.get("e.c:PaginationEventForSearchKey");

        myEvent.setParams({

            "RecordList": mainList,

            "pageSize": component.get("v.PageSize")

        });

        myEvent.fire();

    },

    viewRecord_helper: function(c, e, h){

        try{

            let Name = e.currentTarget.name;

            console.log('Name::: '+Name);

            let idObj = Name.substring(0,18);

            let recordName = Name.substring(18);

            let recordList = c.get('v.recordList');

            let PathName = c.get('v.PathName');

            if(!$A.util.isUndefinedOrNull(recordList) && !$A.util.isEmpty(recordList)){

                for(let i=0;i<recordList.length;i++){

                    let selectedRecord = recordList[i];

                    console.log('selectedRecord length::::'+selectedRecord.length);

                    for(let z=0;z<selectedRecord.length;z++){

                        if(selectedRecord[z].Value === recordName){

                            let indexValue = selectedRecord[0].Value;

                            let finalName = indexValue+': '+recordName+' '+idObj;

                            // console.log('matched:::::::');

                            var cmpEvent = c.getEvent("sampleCmpEvent");

                            cmpEvent.setParams({

                                "message" : finalName,

                                'PathName' : PathName,

                                'obName'  : c.get('v.ObjApiName')

                            });

                            cmpEvent.fire();

                        }

                    } 

                }

            }

        }catch(ex){

            console.log('ERROR—>'+ex);

            c.set('v.isShowSpinner',false);

        }

    }

})