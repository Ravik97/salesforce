({

    doInit: function(component, event, helper) {

        component.set('v.isShowSpinner',true);

        helper.doInit_helper(component, event, helper);

    },

    viewRecord : function(c,e,h){

        h.viewRecord_helper(c, e, h);

    },

    handlePaginationEvent : function(c, e) {

        let RecordByPage = e.getParam("RecordByPage");

        c.set("v.recordListByPage", RecordByPage);

    },

    handlePageSizeEvent : function(c, e, h){

        var fieldApiValues = c.get('v.fieldApiValues');

        var searchResult = c.get('v.searchResult');

        let pageSize = e.getParam("pageSize");

        if(!$A.util.isUndefinedOrNull(pageSize)){

            c.set("v.PageSize", pageSize);

        }else{

            c.set("v.PageSize", 10) 

        }

        c.set("v.isPagination", false);

        h.makeWrapper_Helper(c,e,h,searchResult,fieldApiValues);

    },

    FilterDynamicListMethod : function(c, e, h){

        // alert(‘YesFire’);

        let FilterDynamicList = e.getParam("FilterDynamicList");

        var fieldApiValues = c.get('v.fieldApiValues');

        //console.log(‘FilterDynamicListinDataTabel ‘ + JSON.stringify(FilterDynamicList));

        h.makeWrapper_Helper(c,e,h,FilterDynamicList,fieldApiValues);

    }

})