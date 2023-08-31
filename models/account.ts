
export enum AccountType {
    SAVINGS = 'Savings',
    CHECKING = 'Checking',
    CURRENT = 'Current',
  }
  
  export interface Account {
    id: string;
    firstName: string;
    middleName?: string | null;
    lastName: string;
    accountNumber: number;
    balance: number;
    accountType: AccountType;
    dateOfBirth: Date;
  }

// Array used for in-memory storage in place of database for simplicity sake  
  export const database = [];