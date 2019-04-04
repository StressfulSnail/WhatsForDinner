const knex = require('../db');
const PersonalRecipe = require('../model/PersonalRecipe');

class RecipeService {

    //Am likely going to change this to incorporate some degree of polymorphism- determine if the recipe is personal or shared
    //and then construct that way.
    _tableToModel(tableObj) {
        const recipe = new PersonalRecipe();
        recipe.recipeID = tableObj.recipe_id;
        recipe.name = tableObj.name;
        recipe.imageURL = tableObj.imageURL;
        //recipe.ingredientList = tableObj.ingredientList; Not represented in ERD - Separate Table
        recipe.prepInstructions = tableObj.prepInstructions;
        recipe.prepTime = tableObj.prepTime;
        recipe.cookTime = tableObj.cookTime;
        recipe.caloricEstimate = tableObj.caloricEstimate;
        recipe.tasteRating = tableObj.tasteRating;
        recipe.difficultyRating = tableObj.difficultyRating;
        //recipe.tags = tableObj.tags; Not represented in ERD - Separate Table
        return recipe;
    }

    _modelToTable(recipeModel) {
        return {
            recipe_id: recipeModel.recipe_id,
            name: recipeModel.name,
            imageURL: recipeModel.imageURL,
            //ingredientList: recipeModel.ingredientList, See Above
            prepInstructions: recipeModel.prepInstructions,
            prepTime: recipeModel.prepTime,
            cookTime: recipeModel.cookTime,
            caloricEstimate: recipeModel.caloricEstimate,
            tasteRating: recipeModel.tasteRating,
            difficultyRating: recipeModel.difficultyRating
            //tags: recipeModel.tags,                   See Above
        }
    }

    async getRecipe(recipeID) {
        const recipes= await knex.select()
            .from('Recipe')
            .where({ 'recipe_id': recipeID });

        return recipes.length === 0 ? null : this._tableToModel(recipes[0]);
    }


    //Returns a recipe when given the RecipeID and the accountID. Possibly redundant.
    async getPersonalRecipe(recipeID, accountID){
        const recipes= await knex.select()
            .from('personal_recipe')
            .where({ 'recipe_id': recipeID,
                            'account_id': accountID});

        return recipes.length === 0 ? null : this._tableToModel(recipes[0]);
    }


    //Right now, I believe this will just return the first recipe with the name specified. We should probably alter it to
    //return an array of recipe (or something similar).
    async findRecipeByName(recipeName) {
        const recipes = await knex.select()
            .from('personal_recipe')
            .where({ 'name': recipeName });
        return recipes.length === 0 ? null : this._tableToModel(recipes[0]);
    }

    async findPersonalRecipeByName(recipeName, accountID) {
        const recipes = await knex.select()
            .from('recipe')
            .joinRaw('personal_recipe')
            .where({'name': recipeName, 'account_id': accountID});

        return recipes.length === 0 ? null : this._tableToModel(recipes[0]);

    }

    /* WIP
    async findRecipeByIngredient(ingredientID) {
        const recipeID = await knex.select()
            .from('recipe')
            .joinRaw('ingredient_count')
            .where({'ingredient_ID': ingredientID})
            .returning('recipeID');
    } */


    //Will need to expand on this
    async saveRecipe(Recipe, accountID) {
        const recipeData = this._modelToTable(Recipe);
        recipeData.recipe_id = null;

        await knex.transaction(async (transaction) => {
            const recipeID = await transaction.insert(recipeData)
                .into( 'recipe')
                .returning('recipe_id');

            await transaction.insert( {
                recipe_ID: recipeID,
                account_id: accountID})
                .into('personal_recipe');
        });
    }



}

module.exports = new RecipeService();