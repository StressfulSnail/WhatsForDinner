const passport = require('passport');
const jwt = require('jsonwebtoken');
const recipeService = require('../service/recipeService');
const PersonalRecipe = require('../model/PersonalRecipe');
const Ingredient = require('../model/Ingredient');
const IngredientCount = require('../model/IngredientCount');
const RecipeBook = require('../model/RecipeBook');
const errorResponses = require('./errorResponses');

class RecipeController {

    async getRecipeById(request, response) {
        try {
            const recipe = await recipeService.getPersonalRecipe(request.recipes.recipe_id, request.recipes.account_id);
            if (!recipe) {
                return response.sendStatus(404);
            }
            response.send(recipe);
        } catch (e) {
            console.error(e);
            response.sendStatus(500);
        }
    }

    async createRecipe(request, response) {
        try {
            const name = request.getName();
            const imageURL = request.getImageURL();

            //const validImageURL = Fill this in later
            const ingredientList = request.getIngredients();
            const prepInstructions = request.getPrepInstructions();
            const prepTime = request.getPrepTime();
            const cookTime = request.getCookTime();
            const caloricEstimate = request.getCaloricEstimate();
            const tasteRating = request.getTasteRating();
            const difficultyRating = request.getDifficultyRating();
            const tags = request.getTags();
            const accountID = request.getAccountID();
            const note = request.getNote();
        }
    }

}

module.exports = new recipeController();