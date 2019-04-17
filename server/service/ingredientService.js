const knex = require('../db');
const Ingredient = require('../model/Ingredient');

class ingredientService {

    _ingredientTableToModel(tableObj) {
        const ingredient = new Ingredient();
        ingredient.setID(tableObj.ingredient_id);
        ingredient.setName(tableObj.name);
        return ingredient;
    }


    _ingredientModelToTable(ingredientModel) {
            return {
                ingredient_id: ingredientModel.ingredient_id,
                name: ingredientModel.name
            }
    }

    async getIngredient(ingredientID) {
        const ingredients = await knex.select()
            .from('ingredient')
            .where({'ingredient_id' : ingredientID});

        console.log(ingredients[0].name);
        console.log(this._ingredientTableToModel(ingredients[0]));
        return ingredients.length === 0 ? null : this._ingredientTableToModel(ingredients[0]);
    }

    async getIngredientByName(ingredientName) {
        const ingredients = await knex.select()
            .from('ingredient')
            .where({'name' : ingredientName});

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

module.exports = new ingredientService();