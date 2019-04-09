const passport = require('passport');
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

    }

    async getSharedRecipes(request, response) {

    }

    async searchSharedRecipes(request, response){

    }

    async createRecipe(request, response) {
        try {
            const name = request.getName();
            const imageURL = request.getImageURL();

            //const validImageURL = Fill this in later

            //Check for Duplicates here if necessary

            const ingredientList = request.getIngredients();
            //To be used in a different method.

            const prepInstructions = request.getPrepInstructions();
            const prepTime = request.getPrepTime();
            const cookTime = request.getCookTime();
            const caloricEstimate = request.getCaloricEstimate();
            const tasteRating = request.getTasteRating();
            const difficultyRating = request.getDifficultyRating();
            const tags = request.getTags();
            const accountID = request.getAccountID();
            const note = request.getNote();

            await recipeService.saveRecipe(request);
            response.sendStatus(200);
        } catch (e) {
            console.error(e);
            response.sendStatus(500);
        }
    }

    async updateRecipe(request, response) {
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