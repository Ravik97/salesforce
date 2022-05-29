trigger AccountDeletion on Account (before delete) {
   
    // Prevent the deletion of accounts if they have related opportunities.
    for (Account a :Trigger.old) {
        a.addError(
            'Cannot delete account with related opportunities.');
    }
    
}