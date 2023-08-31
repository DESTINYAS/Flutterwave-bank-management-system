import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { createAccount } from '../controllers/post';
import { AccountType } from '../models/account';

const app = express();
app.use(express.json());

const router = express.Router();

/**
 * @swagger
 * /accounts/create:
 *   post:
 *     tags: [Create a Bank Account]
 *     description: Create a new account and receive your uniqque 10 digit account number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               middleName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               balance:
 *                 type: number
 *               accountType:
 *                 type: string
 *                 enum:
 *                   - Savings
 *                   - Current
 *                   - Checking
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *             required:
 *               - firstName
 *               - lastName
 *               - balance
 *               - accountType
 *               - dateOfBirth
 *     responses:
 *       201:
 *         description: Created account
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accountNumber:
 *                   type: number
 *                 accountName:
 *                   type: string
 *                 accountType:
 *                   type: string
 *                 balance:
 *                   type: number
 *               required:
 *                 - accountNumber
 *                 - accountName
 *                 - accountType
 *                 - balance
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               required:
 *                 - message
 */
router.post(
  '/create',
  [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('balance').notEmpty().withMessage('Balance is required').isFloat({ min: 0 }).withMessage('Balance must be a positive number'),
    body('accountType')
      .isIn(Object.values(AccountType))
      .withMessage('Invalid account type'),
    body('dateOfBirth').isISO8601().toDate(),
  ],
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(req.body)
        console.log(errors)
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  (req: Request, res: Response) => {
    const { firstName, middleName, lastName, balance, accountType, dateOfBirth } = req.body;
    const account = createAccount(firstName, middleName, lastName, balance, accountType, dateOfBirth);
    res.status(201).json({ accountNumber: account.accountNumber,accountName:account.firstName +" "+ account.middleName +" "+ account.lastName,accountType:account.accountType, balance: "$"+account.balance });
  }
);

export default router;
