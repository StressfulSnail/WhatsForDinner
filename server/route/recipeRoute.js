const express = require('express');
const passport = require('passport');
const router = express.Router();

const accountController = require('../controller/accountController');

/**
 * GET /api/recipe/
 * Get account details
 * Returns {
 *      name: string
 *      imageURL: string
 *      ingredientList: Array(Ingredient)
 *      prepInstructions: string
 *      prepTime: int
 *      cookTime: int
 *      caloricEstimate: int
 *      tasteRating: int
 *      difficultyRating: int
 *      tags: array(Tag);
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
 * POST /api/account/confirm/:invitationId
 * Confirm account with invitation key
 */
router.post('/confirm/:invitationId', accountController.confirmAccount);

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