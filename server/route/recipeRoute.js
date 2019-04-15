//Keep an eye on this. 100% sure this will change as I familiarize myself with these models. -Duncan

const express = require('express');
const router = express.Router();

const recipeController = require('../controller/recipeController');

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
router.get('/', recipeController.getRecipe());

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
router.delete('/delete', recipeController.deleteRecipe);

/**
 * POST /api/recipe/edit
 * Edit Recipe
 *
 */
router.post('/edit', recipeController.editRecipe);



module.exports = router;