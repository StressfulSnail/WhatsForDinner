const knex = require('../db');
const PersonalRecipe = require('../model/PersonalRecipe');

class RecipeService {

    _recipeTableToModel(tableObj) {
        const recipe = new PersonalRecipe();
        recipe.recipe_id = tableObj.recipe_id;
        recipe.name = tableObj.name;
        recipe.imageURL = tableObj.image_url;
        recipe.prepInstructions = tableObj.prep_instructions;
        recipe.prepTime = tableObj.prep_time;
        recipe.cookTime = tableObj.cook_time;
        recipe.caloric_est = tableObj.caloric_est;
        recipe.tasteRating = tableObj.taste_rating;
        recipe.difficultyRating = tableObj.difficulty_rating;
        //recipe.tags = tableObj.tags;      Would be on the recipe_tag table.
        return recipe;
    }

    _recipeModelToTable(recipeModel) {
        return {
            recipe_id: recipeModel.recipe_id,
            name: recipeModel.name,
            image_url: recipeModel.imageURL,
            prep_instructions: recipeModel.prepInstructions,
            prep_time: recipeModel.prepTime,
            cook_time: recipeModel.cookTime,
            caloric_est: recipeModel.caloricEstimate,
            taste_rating: recipeModel.tasteRating,
            difficulty_rating: recipeModel.difficultyRating,
           // note: recipeModel.note                        Specific to PersonalRecipe
        }
    }

    _personalRecipeTable(recipeID, accountID, note) {
        return { recipe_id: recipeID, account_id: accountID, note: note };
    }

    async getRecipe(recipeID) {
        const recipes= await knex.select()
            .from('recipe')
            .where({ 'recipe_id': recipeID });

        return recipes.length === 0 ? null : this._recipeTableToModel(recipes[0]);
    }

    async getPersonalRecipes(accountID){
        const recipes= await knex.select()
            .from('recipe')
            .join('personal_recipe', 'recipe.recipe_id', '=', 'personal_recipe.recipe_id')
            .where({ 'account_id': accountID });
        return recipes.map(recipe => {
            const recipeModel = this._recipeTableToModel(recipe);
            recipeModel.note = recipe.note;
            return recipeModel;
        });
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

    async checkValidRecipeCreator(recipe_id, accountID) {
        const recipes = await knex.select()
            .from('personal_recipe')
            .where({'recipe_id': recipe_id});

        return recipes.account_id === accountID;
    }

    async saveRecipe(recipe, accountID) {
        const recipeData = this._recipeModelToTable(recipe);
        recipeData.recipe_id = null;

        await knex.transaction(async (transaction) => {
            const recipeID = await transaction.insert(recipeData)
                .into( 'recipe')
                .returning('recipe_id');

            recipe.setID(recipeID);
            await transaction.insert(this._personalRecipeTable(recipeID, accountID, recipe.note))
                .into('personal_recipe');
        });

    }

    async savePublicRecipe(recipe) {
        const recipeData = this._recipeModelToTable(recipe);
        recipeData.recipe_id = null;

        await knex.transaction( async(transaction) => {
            const recipeID = await transaction.insert(recipeData)
                .into('recipe')
                .returning('recipe_id');

            recipe.setID(recipeID);
        })
    }

    async deleteRecipe(RecipeID) {
        await knex.delete()
            .from('recipe_tag')
            .where({'recipe_id' : RecipeID});

        await knex.delete()
            .from('personal_recipe')
            .where({'recipe_id' : RecipeID});

        await knex.delete()
            .from('ingredient_count')
            .where({'recipe_id' : RecipeID});

        await knex.delete()
            .from('recipe')
            .where({'recipe_id' : RecipeID});

    }


}

module.exports = new RecipeService();