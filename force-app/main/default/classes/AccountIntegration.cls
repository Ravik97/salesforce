@RestResource(urlmapping='/v1/Account/*')

global class AccountIntegration{


@httpGet
global static Account handleget(){
RestRequest request= RestContext.request;
String requri= request.requestURI;
string accid=requri.subStringAfterLast('/');
Account acc= [Select Id,Name from Account where Id=:accid];
return acc;
}
}