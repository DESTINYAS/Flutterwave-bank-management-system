import express from 'express';
import { Account, AccountType } from '../models/account';
import { v4 as uuidv4 } from 'uuid';
import { database } from '../models/account';
const app = express();

app.use(express.json());


// Function to generate a random 10-digit number
function generateRandomNumber(): number {
    return Math.floor(1000000000 + Math.random() * 9000000000);
}

// Function to generate a unique 10 digit number and return it
function generateUniqueNumber(existingNumbers: number[]): number {
    const uniqueSet: Set<number> = new Set(existingNumbers);
    let newNumber = generateRandomNumber();

    while (uniqueSet.has(newNumber)) {
        newNumber = generateRandomNumber();
    }
    existingNumbers.push(newNumber);
    return newNumber;
}

// declare an array to keep track of the unique account numbers generated so far
const uniqueNumbersArray: number[] = [];

export const createAccount = (
  firstName: string,
  middleName: string | null,
  lastName: string,
  balance: number,
  accountType: AccountType,
  dateOfBirth: Date
) => {
    // console.log("Before generateUniqueNumber:", uniqueNumbersArray);
  const account: Account = {
    id: uuidv4(),
    firstName,
    middleName,
    lastName,
    accountNumber: generateUniqueNumber(uniqueNumbersArray), // Generate account number internally
    balance,
    accountType,
    dateOfBirth,
  };
//   console.log("After generateUniqueNumber:", uniqueNumbersArray);
  database.push(account);
  return account;
};