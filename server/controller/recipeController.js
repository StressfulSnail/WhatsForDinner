const jwt = require('jsonwebtoken');
const recipeService = require('../service/recipeService');
const ingredientService = require('../service/ingredientService');
const Recipe = require ('../model/Recipe');
const PersonalRecipe = require('../model/PersonalRecipe');
const Ingredient = require('../model/Ingredient');
const MeasurementUnit = require('../model/MeasurementUnit');
const IngredientCount = require('../model/IngredientCount');
//const RecipeBook = require('../model/RecipeBook');
const errorResponses = require('./errorResponses');

class RecipeController {

    async getRecipe(request, response) {
        try {
            const account = request.user;
            const recipeID = request.body.recipe_id;
            const recipe = await recipeService.getRecipe(recipeID);
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
            const account = request.user;
            const recipe = await recipeService.getPersonalRecipes(account.id);
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
            const account = request.user;
            const recipe = new PersonalRecipe();
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

            const caloric_est = request.body.caloric_est;
            recipe.caloric_est = caloric_est;

            const tasteRating = request.body.tasteRating;
            recipe.tasteRating = tasteRating;

            const difficultyRating = request.body.difficultyRating;
            recipe.difficultyRating = difficultyRating;

            const tags = request.body.tags;
            recipe.tags = tags;
 //           const note = request.getNote();

            await recipeService.saveRecipe(recipe, account.id);

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
            recipe.name = request.body.name;
            recipe.imageURL = request.body.imageURL;
            recipe.ingredientList = request.body.ingredientList;
            recipe.prepInstructions = request.body.prepInstructions;
            recipe.prepTime = request.body.prepTime;
            recipe.cookTime = request.body.cookTime;
            recipe.caloricEstimate = request.body.caloricEstimate;
            recipe.tasteRating = request.body.tasteRating;
            recipe.difficultyRating = request.body.difficultyRating;
            recipe.tags = request.body.tags;

            await recipeService.editRecipe(recipe);
            response.sendStatus(200);
        } catch(e) {
            console.error(e);
            response.sendStatus(500);
        }
    }

    async deleteRecipe(request, response) {
        try {
            const recipe = await recipeService.getRecipe(request.body.recipe_id);
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

    /**Adds an ingredientCount to a currently existing recipe.
     *
     * params needed
     * "ingredient_id"
     * "measurement_id"
     * "measurement"
     * "recipe_id"
     */
    async addIngredientCountToRecipe(request, response) {
        try{
            const ingredientCount = await ingredientService.getIngredientCount(request.body.ingredient_id,
                    request.body.measurement_id, request.body.measurement);

            const recipe = await recipeService.getRecipe(request.body.recipe_id)

            recipe.addIngredient(ingredientCount);

            await ingredientService.saveIngredientCount(ingredientCount, recipe.getID());
            response.sendStatus(200);
        }catch (e) {
            console.error(e);
            response.sendStatus(500);
        }
    }
}

module.exports = new RecipeController();