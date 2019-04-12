const knex = require('../db');
const PersonalRecipe = require('../model/PersonalRecipe');

class RecipeService {

    //Am likely going to change this to incorporate some degree of polymorphism- determine if the recipe is personal or shared
    //and then construct that way.
    _recipeTableToModel(tableObj) {
        const recipe = new PersonalRecipe();
        recipe.recipe_id = tableObj.recipe_id;
        recipe.name = tableObj.name;
        recipe.imageURL = tableObj.imageURL;
        //recipe.ingredientList = tableObj.ingredientList; would not be on the Recipe table. Check Ingredient_Count
        recipe.prepInstructions = tableObj.prepInstructions;
        recipe.prepTime = tableObj.prepTime;
        recipe.cookTime = tableObj.cookTime;
        recipe.caloricEstimate = tableObj.caloricEstimate;
        recipe.tasteRating = tableObj.tasteRating;
        recipe.difficultyRating = tableObj.difficultyRating;
        //recipe.tags = tableObj.tags;      Would be on the recipe_tag table.
        return recipe;
    }

    _recipeModelToTable(recipeModel) {
        return {
            recipe_id: recipeModel.recipe_id,
            name: recipeModel.name,
            imageURL: recipeModel.imageURL,
//            ingredientList: recipeModel.ingredientList,   Commented out because it's difficult to put an array into a table
            prepInstructions: recipeModel.prepInstructions,
            prepTime: recipeModel.prepTime,
            cookTime: recipeModel.cookTime,
            caloricEstimate: recipeModel.caloricEstimate,
            tasteRating: recipeModel.tasteRating,
            difficultyRating: recipeModel.difficultyRating,
//            tags: recipeModel.tags,                       See above
//            note: recipeModel.note                        Specific to PersonalRecipe
        }
    }

    async getRecipe(recipeID) {
        const recipes= await knex.select()
            .from('Recipe')
            .where({ 'recipe_id': recipeID });

        return recipes.length === 0 ? null : this._recipeTableToModel(recipes[0]);
    }

    async getPersonalRecipe(recipeID, accountID){
        const recipes= await knex.select()
            .from('personal_recipe')
            .where({ 'recipe_id': recipeID,
                            'account_id': accountID});

        return recipes.length === 0 ? null : this._recipeTableToModel(recipes[0]);
    }

    /**
     * Check if personal recipe with given id exists
     * @param recipeId
     * @param accountId
     * @returns {Promise<boolean>}
     */
    async personalRecipeExists(recipeId, accountId) {
        const count = await knex
            .count('*')
            .from('personal_recipe')
            .where({ recipe_id: recipeId, account_id: accountId });
        return count[0]['count(*)'] === 1;
    }

    /**
     * Check if public recipe with given id exists
     * @param recipeId
     * @returns {Promise<boolean>}
     */
    async publicRecipeExists(recipeId) {
        const count = await knex
            .count('*')
            .from('shared_recipe')
            .where({ recipe_id: recipeId });
        return count[0]['count(*)'] === 1;
    }

    //Right now, I believe this will just return the first recipe with the name specified. We should probably alter it to
    //return an array of recipe (or something similar).
    async findRecipeByName(recipeName) {
        const recipes = await knex.select()
            .from('personal_recipe')
            .where({ 'name': recipeName });
        return recipes.length === 0 ? null : this._recipeTableToModel(recipes[0]);
    }

    async findPersonalRecipeByName(recipeName, accountID) {
        const recipes = await knex.select()
            .from('recipe')
            .joinRaw('personal_recipe')
            .where({'name': recipeName, 'account_id': accountID});

        return recipes.length === 0 ? null : this._recipeTableToModel(recipes[0]);

    }

    async saveRecipe(Recipe) {
        const recipeData = this._modelToTable(Recipe);
        recipeData.recipe_id = null;

        await knex.transaction(async (transaction) => {
            const recipeID = await transaction.insert(recipeData)
                .into( 'Recipe')
                .returning('recipe_id');

            Recipe.setID(recipeID);
        })

 /*       await Recipe.getIngredients().forEach(function(element))) {
            await transaction.insert(recipeID, element)
                .into('ingredient_count');
        } */

    }

}

module.exports = new RecipeService();