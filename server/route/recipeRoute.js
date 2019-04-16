//Keep an eye on this. 100% sure this will change as I familiarize myself with these models. -Duncan

const express = require('express');
const passport = require('passport');
const router = express.Router();

const recipeController = require('../controller/recipeController');

/**
 * GET /api/recipe/
 * Get recipe details
 * Requires (recipe_id)
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
 *
 * Passport utilized in case you need to return a ton of personal recipes.
 */
router.get('/', passport.authenticate('jwt', { session: false }), recipeController.getRecipe);

/**
 * POST /api/recipe/
 * Create a new recipe
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
router.post('/', passport.authenticate('jwt', { session: false }), recipeController.createRecipe);

/**
 * DELETE /api/recipe/delete
 * Delete Recipe
 *
 */
router.delete('/delete', passport.authenticate('jwt', { session: false }), recipeController.deleteRecipe);

/**
 * POST /api/recipe/edit
 * Edit Recipe
 *
 */
router.post('/edit', passport.authenticate('jwt', { session: false }), recipeController.editRecipe);



module.exports = router;