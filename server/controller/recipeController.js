const passport = require('passport');
const jwt = require('jsonwebtoken');
const recipeService = require('../service/recipeService');
const Recipe = require('../model/Recipe');
const Ingredient = require('../model/Ingredient');
const errorResponses = require('./errorResponses');

class AccountController {

    async getRecipeById(request, response) {
        try {
            const Recipe = await recipeService.getRecipe(request.recipes.id);
            if (!recipe) {
                return response.sendStatus(404);
            }
            response.send(recipe);
        } catch (e) {
            console.error(e);
            response.sendStatus(500);
        }
    }

}

module.exports = new RecipeController();