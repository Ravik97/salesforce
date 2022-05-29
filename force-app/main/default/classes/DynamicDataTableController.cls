public class DynamicDataTableController {

    @AuraEnabled

    public static List<SObject> fetchObjectRecords(String objApiName, List<String> fieldApiValues) {

        System.debug('fieldApiValues:::'+fieldApiValues);

        System.debug('objApiName:::'+objApiName);

        List <SObject> allRecords = new List <SObject> ();

        String query = 'SELECT ';

        for(Integer i=0; i<fieldApiValues.size(); i++){

            query += fieldApiValues[i] +',' ;

        }

        query = query.removeEnd(',');

        query += ' FROM' + objApiName + ' LIMIT 50000';

        System.debug('qq:::' + query);

        allRecords = Database.query(query);

        System.debug('allRecords:::'+allRecords);

        return allRecords;

    }

}