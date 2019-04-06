const knex = require('../db');
const Meal = require('../model/Meal');

class MealService {

    _tableToModel(tableObj) {
        const meal = new Meal();
        meal.id = tableObj.meal_id;
        meal.dateTime = tableObj.meal_date_time;
        meal.servingsRequired = tableObj;
        meal.note = tableObj.note;
        return meal;
    }

    _modelToTable(mealModel) {
        return {
            meal_plan_id: mealModel.mealPlan.id,
            meal_date_time: mealModel.dateTime,
            servings_required: mealModel.servingsRequired,
            note: mealModel.note,
        }
    }

    _recipesToMealRecipeTable(recipe, mealId) {
        return { recipe_id: recipe.id, meal_id: mealId };
    }

    /**
     * @param meal
     * @returns {Promise<number>} Id of the saved meal
     */
    async saveMeal(meal) {
        const mealTableData = this._modelToTable(meal);

        let mealId;
        await knex.transaction(async (transaction) => {
           mealId = await transaction
               .insert(mealTableData)
               .into('meal')
               .returning('meal_id');

            const mealRecipeTablesData =
                meal.recipes.map(recipe => this._recipesToMealRecipeTable(recipe, mealId[0]));
           for (let mealRecipeTableData of mealRecipeTablesData) {
               await transaction
                   .insert(mealRecipeTableData)
                   .into('meal_recipe');
           }
        });
        return mealId[0];
    }
}

module.exports = new MealService();