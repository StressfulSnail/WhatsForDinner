const knex = require('../db');
const Recipe = require('../model/Recipe');

class RecipeService {

    _tableToModel(tableObj) {
        const recipe = new PersonalRecipe();
        recipe.recipeID = tableObj.recipe_id;
        recipe.name = tableObj.name;
        recipe.imageURL = tableObj.imageURL;
        //recipe.ingredientList = tableObj.ingredientList; (unsure as to array implementation)
        recipe.prepInstructions = tableObj.prepInstructions;
        recipe.prepTime = tableObj.prepTime;
        recipe.cookTime = tableObj.cookTime;
        recipe.caloricEstimate = tableObj.caloricEstimate;
        recipe.tasteRating = tableObj.tasteRating;
        recipe.difficultyRating = tableObj.difficultyRating;
        //recipe.tags = tableObj.tags;
        recipe.accountID = tableObj.accountID;
        //recipe.note = tableObj.note;
        return recipe;
    }

    _modelToTable(recipeModel) {
        return {
            recipe_id: recipeModel.recipe_id,
            name: recipeModel.name,
            imageURL: recipeModel.imageURL,
            ingredientList: recipeModel.ingredientList,
            prepInstructions: recipeModel.prepInstructions,
            prepTime: recipeModel.prepTime,
            cookTime: recipeModel.cookTime,
            caloricEstimate: recipeModel.caloricEstimate,
            tasteRating: recipeModel.tasteRating,
            difficultyRating: recipeModel.difficultyRating,
            tags: recipeModel.tags,
            account_id: recipeModel.account_id,
            note: recipeModel.note
        }
    }

    async getPublicRecipe(recipeID) {
        const recipes= await knex.select()
            .from('personal_recipe')
            .where({ 'recipe_id': recipeID });

        return recipes.length === 0 ? null : this._tableToModel(recipes[0]);
    }

    async getPersonalRecipe(recipeID, accountID){
        const recipes= await knex.select()
            .from('personal_recipe')
            .where({ 'recipe_id': recipeID,
                            'account_id': accountID});

        return recipes.length === 0 ? null : this._tableToModel(recipes[0]);
    }

    async findRecipeByName(recipeName) {
        const recipes = await knex.select()
            .from('personal_recipe')
            .where({ 'name': recipeName });
        return recipes.length === 0 ? null : this._tableToModel(recipes[0]);
    }

    async findPersonalRecipeByName(recipeName, accountID) {
        const recipes = await knex.select()
            .from('personal_recipes')
            .where({'recipeName': recipeName,
                           'account_id': accountID});

        return recipes.length === 0 ? null : this._tableToModel(recipes[0]);
    }

    async saveRecipe(recipe, accountID) {
        const recipeData = this._modelToTable(recipe);
        recipeData.recipe_id = null;

        await knex.transaction(async (transaction) => {
            const recipeID = await transaction.insert(recipeData)
                .into( 'personal_recipe')
                .returning('recipe_id');
        });
    }

}

module.exports = new RecipeService();