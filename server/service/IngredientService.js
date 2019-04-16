const knex = require('../db');
const Ingredient = require('../model/Ingredient');

class IngredientService {

    _ingredientTableToModel(tableObj) {
        const ingredient = new Ingredient();
        ingredient.ingredient_ID = tableObj.ingredient_ID;
        ingredient.name = tableObj.name;
    }


    _ingredientModelToTable(ingredientModel) {
            return {
                ingredient_id: ingredientModel.ingredient_ID,
                name: ingredientModel.name
            }
    }

    async getIngredient(ingredientID) {
        const ingredients = await knex.select()
            .from('ingredient')
            .where({'ingredient_id' : ingredientID});

        return ingredients.length === 0 ? null : this._ingredientTableToModel(ingredients[0]);
    }

    async saveIngredient(ingredient) {
        const ingredientData = this._ingredientModelToTable(ingredient);
        ingredientData.ingredient_id = null;

        await knex.transaction( async (transaction) => {
            const ingredientID = await transaction.insert(ingredientData)
                .into('ingredient')
                .returning('ingredient_id');

            ingredient.setID(ingredientID);
        });
    }
}

module.exports = new IngredientService();