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
 *
 *      ingredientList: [
 *          {
 *              ingredient_name: string
 *              measurement: Double
 *              measurementUnit: string
 *          }
 *      ]
 *      prepInstructions: string
 *      prepTime: int
 *      cookTime: int
 *      caloricEstimate: int
 *      tasteRating: int
 *      difficultyRating: int
 *      tags: [
 *          {
 *              tag_id: int
 *              tag_name: string
 *          }
 *      ]
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
 *
 *      ingredientList: [
 *          {
 *              ingredient_name: string
 *              measurement: Double
 *              measurementUnit: string
 *          }
 *      ]
 *
 *      prepInstructions: string
 *      prepTime: int
 *      cookTime: int
 *      caloricEstimate: int
 *      tasteRating: int
 *      difficultyRating: int
 *
 *      tags: [
 *          {
 *              tag_id: int
 *              tag_name: string
 *          }
 *      ]
 *
 *      note: string
 * }
 */
router.post('/', passport.authenticate('jwt', { session: false }), recipeController.createPersonalRecipe);

/**
 * POST /api/recipe/shared
 * Create a new shared recipe
 * Body {
 *      name: string
 *      imageURL: string
 *
 *      ingredientList: [
 *          {
 *              ingredient_name: string
 *              measurement: Double
 *              measurementUnit: string
 *          }
 *      ]
 *
 *      prepInstructions: string
 *      prepTime: int
 *      cookTime: int
 *      caloricEstimate: int
 *      tasteRating: int
 *      difficultyRating: int
 *
 *      tags: [
 *          {
 *              tag_id: int
 *              tag_name: string
 *          }
 *      ]
 *
 * }
 */
router.post('/shared', recipeController.createSharedRecipe);


/**Adds an ingredientCount to a currently existing recipe. This is in here for testing purposes.
 *
 * params needed
 * Body{
 * "ingredient_id" : int
 * "measurement_id": int
 * "measurement" : double
 * "recipe_id" : int
 * }
 */
router.post('/addCount', passport.authenticate('jwt', { session: false }), recipeController.addIngredientCountToRecipe);

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