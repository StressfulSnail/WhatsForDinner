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
            await ingredientService.getRecipeIngredientCounts(recipe);
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

    async createPersonalRecipe(request, response) {
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

            await this.readIngredientList(ingredientList, body.ingredientList, response);

            const prepInstructions = body.prepInstructions;
            recipe.prepInstructions = prepInstructions;

            const prepTime = body.prepTime;
            recipe.prepTime = prepTime;

            const cookTime = body.cookTime;
            recipe.cookTime = cookTime;

            const caloricEstimate = body.caloricEstimate;
            recipe.caloricEstimate = caloricEstimate;

            const tasteRating = body.tasteRating;
            recipe.tasteRating = tasteRating;

            const difficultyRating = body.difficultyRating;
            recipe.difficultyRating = difficultyRating;


            /* Tag method, to fill in later.
            for(let x = 0; x < body.tags.length; x++) {

            }
            */

            const note = body.note;
            recipe.setNote(note);

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

    async getSharedRecipes(request, response) {

    }

    async searchSharedRecipes(request, response){

    }

    async createSharedRecipe(request, response){
        const {body} = request;
        const recipe = new PersonalRecipe();
        const name = body.name;
        recipe.name = name;
        const imageURL = body.imageURL;
        recipe.imageURL = imageURL;
        //const validImageURL = Fill this in later

        //Check for Duplicates here if necessary
        const ingredientList = new Array();

        await this.readIngredientList(ingredientList, body.ingredientList, response);

        const prepInstructions = body.prepInstructions;
        recipe.prepInstructions = prepInstructions;

        const prepTime = body.prepTime;
        recipe.prepTime = prepTime;

        const cookTime = body.cookTime;
        recipe.cookTime = cookTime;

        const caloricEstimate = body.caloricEstimate;
        recipe.caloricEstimate = caloricEstimate;

        const tasteRating = body.tasteRating;
        recipe.tasteRating = tasteRating;

        const difficultyRating = body.difficultyRating;
        recipe.difficultyRating = difficultyRating;


        /* Tag method, to fill in later.
        for(let x = 0; x < body.tags.length; x++) {

        }
        */

        await recipeService.savePublicRecipe(recipe);

        for (let x = 0; x < ingredientList.length; x++) {
            const ingredientCount = ingredientList[x];
            await ingredientService.saveIngredientCount(ingredientCount, recipe.getID());
        }

        response.sendStatus(200);
    } catch (e) {
        console.error(e);
        response.sendStatus(500);
    }

    async editRecipe(request, response) {
        try {
            const recipe = await recipeService.getRecipe(request.recipe_id);
            if (!recipe) {
                return response.sendStatus(404);
            }
            recipe.name = request.body.name;
            recipe.imageURL = request.body.imageURL;

            recipe.prepInstructions = request.body.prepInstructions;
            recipe.prepTime = request.body.prepTime;
            recipe.cookTime = request.body.cookTime;
            recipe.caloricEstimate = request.body.caloricEstimate;
            recipe.tasteRating = request.body.tasteRating;
            recipe.difficultyRating = request.body.difficultyRating;

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
            if (!recipeService.checkValidRecipeCreator(recipe.getID(), request.account_id))
            {
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
     *
     * Created for testing purposes.
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

    /**For internal use, simplifying the reading of ingredients lists
     * Parameters passed:
     * 1:New ingredient list to create
     * 2: Other ingredient list to read
     * 3: Response to use to send.
     */
    async readIngredientList(newIngredientList, otherIngredientList, response)
    {
        for(let x = 0; x < otherIngredientList.length; x++) {
            const ingredient = await ingredientService.getIngredientByName(otherIngredientList[x].ingredient_name);
            if (!ingredient) {
                ingredient.setName(otherIngredientList[x].ingredient_name);
                await ingredientService.saveIngredient(ingredient);
            }
            const measurementUnit = await ingredientService.getMeasurementByName(otherIngredientList[x].measurementUnit);
            console.log(measurementUnit.getID());
            if (!measurementUnit) {
                response.sendStatus(404);
            }
            const ingredientCount = new IngredientCount();

            await ingredientCount.setIngredient(ingredient);
            await ingredientCount.setMeasurement(otherIngredientList[x].measurement);
            await ingredientCount.setMeasurementUnit(measurementUnit);

            await newIngredientList.push(ingredientCount);
        }
    }
}

module.exports = new RecipeController();