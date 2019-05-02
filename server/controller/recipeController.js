const jwt = require('jsonwebtoken');
const recipeService = require('../service/recipeService');
const ingredientService = require('../service/ingredientService');
const tagService = require('../service/tagService');
const Recipe = require ('../model/Recipe');
const PersonalRecipe = require('../model/PersonalRecipe');
const Ingredient = require('../model/Ingredient');
const MeasurementUnit = require('../model/MeasurementUnit');
const IngredientCount = require('../model/IngredientCount');
const Tag = require('../model/Tag');
//const RecipeBook = require('../model/RecipeBook');
const errorResponses = require('./errorResponses');

class RecipeController {

    async getRecipe(request, response) {
        try {
            const account = request.user;
            const recipeID = request.param.id;
            const recipe = await recipeService.getRecipe(recipeID);

            if(!recipeService.checkValidRecipeCreator(recipe.getID(), account.getID())) {
                return response.sendStatus(404);
            }

            if (!recipe) {
                return response.sendStatus(404);
            }
            await ingredientService.getRecipeIngredientCounts(recipe);
            await tagService.getRecipeTags(recipe);
            response.send(recipe);
        } catch (e) {
            console.error(e);
            response.sendStatus(500);
        }
    }

    async getPersonalRecipes(request, response) {
        try {
            const account = request.user;
            const recipes = await recipeService.getPersonalRecipes(account.id);

            for (let recipe of recipes) {
                await ingredientService.getRecipeIngredientCounts(recipe);
                await tagService.getRecipeTags(recipe);
            }

            response.send(recipes);
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
            let ingredientList = new Array();
            const otherIngredientList = body.ingredientList;

            await RecipeController.readIngredientList(ingredientList, otherIngredientList, response);

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

            const tagList = new Array();

            body.tags = body.tags ? body.tags : [];
            for(let x = 0; x < body.tags.length; x++) {
                let tag = await tagService.getTagByName(body.tags[x].name);
                if(!tag) {
                    tag = new Tag();
                    await tag.setName(body.tags[x].name);
                    await tag.setTagType(body.tags[x].tag_type);
                    await tagService.saveTag(tag);
                }
                await tagList.push(tag);
            }

            const note = body.note;
            recipe.setNote(note);

            await recipeService.saveRecipe(recipe, account.id);

            for (let x = 0; x < ingredientList.length; x++) {
                const ingredientCount = ingredientList[x];
                await ingredientService.saveIngredientCount(ingredientCount, recipe.getID());
            }

            for (let x = 0; x < tagList.length; x++) {
                const tag = tagList[x];
                await tagService.saveRecipeTag(tag.getTagID(), recipe.getID());
            }

            response.sendStatus(200);
        } catch (e) {
            console.error(e);
            response.sendStatus(500);
        }
    }

    async getSharedRecipe(request, response) {
        try {
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

    async searchSharedRecipes(request, response){

    }

    /**
     * Pretty much the same thing as createPersonalRecipe. Doesn't require an account to use.
     * @param request
     * @param response
     * @returns {Promise<void>}
     */
    async createSharedRecipe(request, response) {
        try {
            const {body} = request;
            const recipe = new PersonalRecipe();
            const name = body.name;
            recipe.name = name;
            const imageURL = body.imageURL;
            recipe.imageURL = imageURL;
            //const validImageURL = Fill this in later

        //Check for Duplicates here if necessary
        let ingredientList = new Array();
        const otherIngredientList = body.ingredientList;

        ingredientList = await RecipeController.readIngredientList(ingredientList, otherIngredientList, response);

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

            const note = body.note;
            recipe.note = note;

        for(let x = 0; x < body.tags.length; x++) {
            let tag = tagService.getTagByName(body.tags[x].name);
            if(!tag) {
                tag.setName(body.tags[x].name);
                tag.setTagType(body.tags[x].tag_type);
                await tagService.saveTag(tag);
            }
        }

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

            const recipe = await recipeService.getRecipe(request.body.recipe_id);

            recipe.addIngredient(ingredientCount);

            await ingredientService.saveIngredientCount(ingredientCount, recipe.getID());
            response.sendStatus(200);
        }catch (e) {
            console.error(e);
            response.sendStatus(500);
        }
    }

    /**For internal use, simplifying the reading of ingredients lists
     * Does not work at the moment
     * Parameters passed:
     * 1:New ingredient list to create
     * 2: Other ingredient list to read
     * 3: Response to use to send.
     */
    static async readIngredientList(newIngredientList = [], otherIngredientList = [], response) {
        for(let x = 0; x < otherIngredientList.length; x++) {
            let ingredient = await ingredientService.getIngredientByName(otherIngredientList[x].ingredient);
            if (!ingredient) {
                ingredient = new Ingredient();
                ingredient.setName(otherIngredientList[x].ingredient);
                await ingredientService.saveIngredient(ingredient);
            }
            const measurementUnit = await ingredientService.getMeasurementByName(otherIngredientList[x].measurementUnit);
            if (!measurementUnit) {
                response.sendStatus(404);
            }
            const ingredientCount = new IngredientCount();

                ingredientCount.setIngredient(ingredient);
                ingredientCount.setMeasurement(otherIngredientList[x].measurement);
                ingredientCount.setMeasurementUnit(measurementUnit);

                newIngredientList.push(ingredientCount);
        }
    }
}

module.exports = new RecipeController();