const knex = require('../db');
const Meal = require('../model/Meal');
const Recipe = require('../model/Recipe');

class MealService {

    _tableToModel(tableObj) {
        const meal = new Meal();
        meal.id = tableObj.meal_id;
        meal.dateTime = tableObj.meal_date_time;
        meal.servingsRequired = tableObj.servings_required;
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

    _recipeTableToRecipeModel(tableObj) {
        const recipe = new Recipe();
        recipe.id = tableObj.recipe_id;
        recipe.name = tableObj.name;
        return recipe;
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

    /**
     * Get all meals within a meal plan
     * @param mealPlanId
     * @returns {Promise<Meal[]>}
     */
    async getMealPlanMeals(mealPlanId) {
        const results = await knex
            .select('*')
            .from('meal')
            .where({ meal_plan_id: mealPlanId });

        const meals = results.map(rowData => this._tableToModel(rowData));

        // add recipes to meal model
        for (let meal of meals) {
            const recipeResults = await knex
                .select('recipe.recipe_id', 'recipe.name')
                .from('meal_recipe')
                    .leftJoin('recipe', 'meal_recipe.recipe_id', '=', 'recipe.recipe_id')
                .where({ meal_id: meal.id });
            meal.recipes = recipeResults.map(rowData => this._recipeTableToRecipeModel(rowData));
        }

        return meals;
    }
}

module.exports = new MealService();