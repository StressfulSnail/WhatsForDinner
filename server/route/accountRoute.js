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
 * GET /api/account/find/
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
router.get('/find', passport.authenticate('jwt', { session: false }), accountController.getAccountByUserName);

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
 * GET /api/account/confirm/:invitationId
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
 * POST /api/account/recover
 * Recover password, sets password to random string and emails it to user
 * Body {
 *     email: string
 * }
 */
router.post('/recover', accountController.recoverUser);

/**
 * DELETE /api/account/delete
 * Delete Account
 *
 */
router.delete('/delete', passport.authenticate ('jwt', {session: false }), accountController.deleteAccount);

/**
 * POST /api/account/edit
 * Edit Account
 * Body {
 *      id: string
 *      email: string
 *      username: string
 *      firstName: string
 *      middleName: string
 *      lastName: string
 * }
 *
 */
router.post('/edit', passport.authenticate ('jwt', {session: false }), accountController.editAccount);

/**
 * POST /api/account/change
 * Edit Account
 * Body {
 *      id: string
 *      password: string
 * }
 *
 */
router.post('/change', passport.authenticate ('jwt', {session: false }), accountController.changePassword);


module.exports = router;