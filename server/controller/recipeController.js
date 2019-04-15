const jwt = require('jsonwebtoken');
const recipeService = require('../service/recipeService');
const PersonalRecipe = require('../model/PersonalRecipe');
const Ingredient = require('../model/Ingredient');
const IngredientCount = require('../model/IngredientCount');
const RecipeBook = require('../model/RecipeBook');
const errorResponses = require('./errorResponses');

class RecipeController {

    async getRecipe(request, response) {
        try {
            const recipe = await recipeService.getRecipe(request.recipes.recipe_id);
            if (!recipe) {
                return response.sendStatus(404);
            }
            response.send(recipe);
        } catch (e) {
            console.error(e);
            response.sendStatus(500);
        }
    }

    async searchPersonalRecipes(request, response) {
        try {
            const recipe = await recipeService.getPersonalRecipe(request.recipes.recipe_id);
            if (!recipe) {
                return response.sendStatus(404);
            }
            response.send(recipe);
        } catch (e) {
            console.error(e);
            response.sendStatus(500);
        }
    }

    async getSharedRecipes(request, response) {

    }

    async searchSharedRecipes(request, response){

    }

    async createRecipe(request, response) {
        try {
            const recipe = new Recipe();
            const name = request.body.name;
            recipe.name = name;
            const imageURL = request.body.imageURL;
            recipe.imageURL = imageURL;
            //const validImageURL = Fill this in later

            //Check for Duplicates here if necessary
            const ingredientList = request.body.ingredientList;
            recipe.ingredientList = ingredientList;

            //To be used in a different method.
            const prepInstructions = request.body.prepInstructions;
            recipe.prepInstructions = prepInstructions;

            const prepTime = request.body.prepTime;
            recipe.prepTime = prepTime;

            const cookTime = request.body.cookTime;
            recipe.cookTime = cookTime;

            const caloricEstimate = request.body.caloricEstimate;
            recipe.caloricEstimate = caloricEstimate;

            const tasteRating = request.body.tasteRating;
            recipe.tasteRating = tasteRating;

            const difficultyRating = request.body.difficultyRating;
            recipe.difficultyRating = difficultyRating;

            const tags = request.body.tags;
            recipe.tags = tags;
 //           const note = request.getNote();



            await recipeService.saveRecipe(recipe);
            response.sendStatus(200);
        } catch (e) {
            console.error(e);
            response.sendStatus(500);
        }
    }

    async editRecipe(request, response) {
        try {
            const recipe = await recipeService.getRecipe(request.recipe_id);
            if (!recipe) {
                return response.sendStatus(404);
            }
//            recipe.recipe_id = request.recipe_id; Commented out because recipe_id should be immutable.
            recipe.name = request.name;
            recipe.imageURL = request.imageURL;
            recipe.ingredientList = request.ingredientList;
            recipe.prepInstructions = request.prepInstructions;
            recipe.prepTime = request.prepTime;
            recipe.cookTime = request.cookTime;
            recipe.caloricEstimate = request.caloricEstimate;
            recipe.tasteRating = request.tasteRating;
            recipe.difficultyRating = request.difficultyRating;
            recipe.tags = request.tags;

            await recipeService.editRecipe(recipe);
            response.sendStatus(200);
        } catch(e) {
            console.error(e);
            response.sendStatus(500);
        }
    }

    async deleteRecipe(request, response) {
        try {
            const recipe = await recipeService.getRecipe(request.recipe_id);
            if (!recipe) {
                return response.sendStatus(404);
            }
            await recipeService.deleteRecipe(recipe.recipe_id);
            response.sendStatus(200);
        }catch(e) {
            console.error(e);
            response.sendStatus(500);
        }
    }

}

module.exports = new RecipeController();