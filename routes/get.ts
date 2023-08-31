import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { param, validationResult } from 'express-validator';
import { getMyAccount } from '../controllers/get';
import { getAllAccounts } from '../controllers/get';

const app = express();
app.use(express.json());

const router = express.Router();

/**
 * @swagger
 * /get-details/{accountNumber}:
 *   get:
 *     tags: [Resolve Bank Account]
 *     description: Retrieve a specific Account by accountNumber.
 *     parameters:
 *       - name: accountNumber
 *         in: path
 *         required: true
 *         description: Customer account number.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved the account.
 *       '404':
 *         description: Note not found.
 */
router.get('/get-details/:accountNumber',
 [
    param("accountNumber").notEmpty().withMessage('Account number must be provided').isNumeric().withMessage('Account number must be number')
    .trim().isLength({min:10,max:10}).withMessage('Account number is ten characters long')
],
(req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(req.params)
        console.log(errors.array())
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  
  (req: Request, res: Response) => {
    try{
    const { accountNumber } = req.params;
    const account = getMyAccount(parseInt(accountNumber));
    return res.status(200).json( account );}
    catch(error){return res.status(500).json({ error: 'Internal Server error ,Please try again' });}
}
)

/**
 * @swagger
 * /get-all-accounts:
 *   get:
 *     tags: [Fetch all Bank Accounts]
 *     description: Fetch all Bank Accounts.
 *     responses:
 *       '200':
 *         description: Successfully retrieved accounts.
 *       '401':
 *         description:  An error occured, please try again later.
 */
router.get('/get-all-accounts',(req: Request, res: Response) => {
    try{
    const account = getAllAccounts();
    return res.status(200).json( account );
}
    catch(error){return res.status(500).json({ error: 'An error occurred, please try again' });
}
});
export default router;