const knex = require('../db');
const Recipe = require('../model/Recipe');

class AccountService {

    _tableToModel(tableObj) {
        const recipe = new Recipe();
        recipe.id = tableObj.id;
        recipe.name = tableObj.name;
        recipe.imageURL = tableObj.imageURL;
        //recipe.ingredientList = tableObj.ingredientList (unsure as to array implementation)
        recipe.prepInstructions = tableObj.prepInstructions;
        recipe.prepTime = tableObj.prepTime;
        recipe.cookTime = tableObj.cookTime;
        recipe.caloricEstimate = tableObj.caloricEstimate;
        recipe.tasteRating = tableObj.tasteRating;
        recipe.difficultyRating = tableObj.difficultyRating;
        //recipe.tags = tableObj.tags;
        return recipe;
    }

    _modelToTable(recipeModel) {
        return {
            id: recipeModel.id,
            name: recipeModel.name,
            imageURL: recipeModel.imageURL,
            ingredientList: recipeModel.ingredientList,
            prepInstructions: recipeModel.prepInstructions,
            prepTime: recipeModel.prepTime,
            cookTime: recipeModel.cookTime,
            caloricEstimate: recipeModel.caloricEstimate,
            tasteRating: recipeModel.tasteRating,
            difficultyRating: recipeModel.difficultyRating,
            tags: recipeModel.tags
        }
    }

    async getRecipe(id) {
        const recipes= await knex.select()
            .from('recipeBook')
            .where({ 'id': id });

        return recipes.length === 0 ? null : this._tableToModel(recipes[0]);
    }

    async findByName(name) {
        const recipes = await knex.select()
            .from('recipeBook')
            .where({ 'name': name });
        return recipes.length === 0 ? null : this._tableToModel(recipe[0]);
    }
}

module.exports = new AccountService();