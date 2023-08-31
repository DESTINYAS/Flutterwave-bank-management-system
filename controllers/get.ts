import { database } from '../models/account';

//  Get a single account with your accountNumber
export const getMyAccount = (accountNumber: number) => {
    const accountDetails = database.find(account => account.accountNumber === accountNumber);
    
    if (accountDetails) {
        return accountDetails;
    } else {
        return "Account with Account Number " + accountNumber + " does not exist";
    }
}


// Fetch All Bank Accounts
export const getAllAccounts = ()=>{ 
    if (database.length > 0){ return database}
    return []
}