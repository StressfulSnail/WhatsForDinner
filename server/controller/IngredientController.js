const jwt = require('jsonwebtoken');
const recipeService = require('../service/recipeService');
const Ingredient = require('../model/Ingredient');
const IngredientCount = require('../model/IngredientCount');
//const RecipeBook = require('../model/RecipeBook');
const errorResponses = require('./errorResponses');

class IngredientController {

    async getIngredientByID(request, response) {
        try {
            const ingredient = IngredientService.getIngredient(request.body.id);
            if (!ingredient) {
                return response.sendStatus(404);
            }
            response.send(ingredient);
        } catch (e) {
            console.error(e);
            response.sendStatus(500);
        }
    }

    async createIngredient(request, response) {
        try {
            const ingredient = new Ingredient();
            ingredient.name = request.body.name;
            const duplicateName = await ingredientService.findByName(ingredient.name);

            if(duplicateName) {
                const {status, message} = errorResponses.duplicateName;
                return response.status(status).send(message);
            }

            await ingredientService.saveIngredient(ingredient);
            response.sendStatus(200);
        } catch (e) {
            console.error(e);
            response.sendStatus(500);
        }
    }
}

module.exports = new IngredientController();