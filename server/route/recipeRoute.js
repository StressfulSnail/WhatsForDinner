const express = require('express');
const passport = require('passport');
const router = express.Router();

const recipeController = require('../controller/accountController');

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
 *      tags: array(Tag)
 * }
 */
router.get('/', passport.authenticate('jwt', { session: false }), recipeController.getRecipeById());

/**
 * POST /api/recipe/
 * Create a new account
 * Body {
 *      name: string
 *      imageURL: string
 *      ingredientList: Array(Ingredient)
 *      prepInstructions: string
 *      prepTime: int
 *      cookTime: int
 *      caloricEstimate: int
 *      tasteRating: int
 *      difficultyRating: int
 *      tags: array(Tag)
 * }
 */
router.post('/', recipeController.createRecipe);

/**
 * DELETE /api/recipe/delete
 * Delete Recipe
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