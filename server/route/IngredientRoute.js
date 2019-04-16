const express = require('express');
const passport = require('passport');
const router = express.Router();

const ingredientController = require('../controller/ingredientController');

/**
 * GET /api/account/
 * Get account details
 * Returns {
 *      name: string
 * }
 */
router.get('/', ingredientController.getIngredientByID);


/**
 * POST /api/ingredient/
 * Create a new account
 * Body {
 *      name: string
 * }
 */
router.post('/', ingredientController.createIngredient);

module.exports = router;