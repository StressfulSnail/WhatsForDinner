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
router.get('/', , recipeController.getRecipeById());

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
router.delete('/delete', , recipeController.deleteAccount);

/**
 * POST /api/account/edit
 * Edit Account
 *
 */
router.post('/edit', , recipeController.editAccount);



module.exports = router;