const express = require('express');
const passport = require('passport');
const router = express.Router();

const accountController = require('../controller/accountController');

/**
 * GET /api/account/
 * Get account details
 * Returns {
 *      email: string
 *      username: string
 *      password: string
 *      firstName: string
 *      middleName: string
 *      lastName: string
 *      paymentInfo: string
 *      subscriptionLevel: int
 *      confirmed: boolean
 * }
 */
router.get('/', passport.authenticate('jwt', { session: false }), accountController.getAccountById);

/**
 * POST /api/account/
 * Create a new account
 * Body {
 *      email: string
 *      username: string
 *      password: string
 *      firstName: string
 *      middleName: string
 *      lastName: string
 * }
 */
router.post('/', accountController.createAccount);

/**
 * Get /api/account/confirm/:invitationId
 * Confirm account with invitation key
 */
router.get('/confirm/:invitationId', accountController.confirmAccount);

/**
 * POST /api/account/validate
 * Validate user
 * Body {
 *     username: string
 *     password: string
 * }
 */
router.post('/validate', accountController.validateUser);

/**
 * DELETE /api/account/delete
 * Delete Account
 *
 */
router.delete('/delete', passport.authenticate ('jwt', {session: false }), accountController.deleteAccount);

/**
 * POST /api/account/edit
 * Edit Account
 *
 */
router.post('/edit', passport.authenticate ('jwt', {session: false }), accountController.editAccount);



module.exports = router;