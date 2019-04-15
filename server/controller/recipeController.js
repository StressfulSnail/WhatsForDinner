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
            const name = request.getName();
            recipe.name = name;

            if (request.getImageURL() != null) {
                const imageURL = request.getImageURL();
                recipe.imageURL = imageURL;
            }

            //const validImageURL = Fill this in later

            //Check for Duplicates here if necessary
            if (request.getIngredients.length != 0 && request.getIngredients != undefined) {
                const ingredientList = request.getIngredients();
                recipe.ingredientList = ingredientList;
            }
            //To be used in a different method.
            if (request.getPrepInstructions() != null) {
                const prepInstructions = request.getPrepInstructions();
                recipe.prepInstructions = prepInstructions;
            }

            if (request.getPrepTime()) {
                const prepTime = request.getPrepTime();
                recipe.prepTime = prepTime;
            }

            if (request.getCookTime()) {
                const cookTime = request.getCookTime();
                recipe.cookTime = cookTime;
            }

            if (request.getCaloricEstimate()) {
                const caloricEstimate = request.getCaloricEstimate();
                recipe.caloricEstimate = caloricEstimate;
            }

            if (request.getTasteRating()) {
                const tasteRating = request.getTasteRating();
                recipe.tasteRating = tasteRating;
            }

            if (request.getDifficultyRating()) {
                const difficultyRating = request.getDifficultyRating();
                recipe.difficultyRating = difficultyRating;
            }

            if (request.getTags.length != 0 && request.getTags != undefined) {
                const tags = request.getTags();
                recipe.tags = tags;
            }
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