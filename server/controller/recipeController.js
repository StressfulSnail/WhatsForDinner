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
            const {body} = request;
            const recipe = new PersonalRecipe();
            const name = body.name;
            recipe.name = name;
            const imageURL = body.imageURL;
            recipe.imageURL = imageURL;
            //const validImageURL = Fill this in later

            //Check for Duplicates here if necessary
            const ingredientList = new Array();

            for(let x = 0; x < body.ingredientList.length; x++) {
                const ingredient = await ingredientService.getIngredientByName(body.ingredientList[x].ingredient_name);
                if (!ingredient) {
                    ingredient.setName(body.ingredientList[x].ingredient_name);
                    await ingredientService.saveIngredient(ingredient);
                }
                const measurementUnit = await ingredientService.getMeasurementByName(body.ingredientList[x].measurementUnit);
                console.log(measurementUnit.getID());
                if (!measurementUnit) {
                    response.sendStatus(404);
                }
                const ingredientCount = new IngredientCount();

                await ingredientCount.setIngredient(ingredient);
                await ingredientCount.setMeasurement(body.ingredientList[x].measurement);
                await ingredientCount.setMeasurementUnit(measurementUnit);

                console.log(measurementUnit.getID());
                await ingredientList.push(ingredientCount);
            }

            const prepInstructions = body.prepInstructions;
            recipe.prepInstructions = prepInstructions;

            const prepTime = body.prepTime;
            recipe.prepTime = prepTime;

            const cookTime = body.cookTime;
            recipe.cookTime = cookTime;

            const caloric_est = body.caloricEstimate;
            recipe.caloricEstimate = caloric_est;

            const tasteRating = body.tasteRating;
            recipe.tasteRating = tasteRating;

            const difficultyRating = body.difficultyRating;
            recipe.difficultyRating = difficultyRating;


            /* Tag method, to fill in later.
            for(let x = 0; x < body.tags.length; x++) {

            }
            */

            //const note =

            await recipeService.saveRecipe(recipe, account.id);

            for (let x = 0; x < ingredientList.length; x++) {
                const ingredientCount = ingredientList[x];
                await ingredientService.saveIngredientCount(ingredientCount, recipe.getID());
            }

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