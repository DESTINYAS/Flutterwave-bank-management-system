Bank Management System
Welcome to Flutterwave Bank Management System! This system is designed basically to do three things
which includes :
(1) Create a Bank Account
(2) Resolve a Bank Account
(3) Fetch all Bank Accounts

Installation and Usage
(1) Clone the repository: git clone https://github.com/DESTINYAS/Flutterwave-bank-management-system.git
(2) Navigate to the project directory: cd bank-management-system
(3) Install dependencies: npm install
(4) Compile TypeScript: npx tsc
(5) You can run the application using: npm start OR node dist/app.js
(6) Once the application is running you can access the API swagger documentation on your browser via http://localhost:3000/api/ 

Note
(1) The account Type required for account creation is limited to only three types of account ie Savings,Current and Checking with each first latter capitalized. I used enum to create the account type for uniformity.
(2) Accounts created are temporarily stored in an array which will be lost once the server is stopped.
(3) The site was designed with Nodejs, Express and Typscript
