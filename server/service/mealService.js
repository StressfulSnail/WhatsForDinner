const knex = require('../db');
const Meal = require('../model/Meal');
const MealPlan = require('../model/MealPlan');
const Recipe = require('../model/Recipe');

class MealService {

    _tableToModel(tableObj) {
        const meal = new Meal();
        meal.id = tableObj.meal_id;
        meal.dateTime = tableObj.meal_date_time;
        meal.servingsRequired = tableObj.servings_required;
        meal.note = tableObj.note;

        meal.mealPlan = new MealPlan();
        meal.mealPlan.id = tableObj.meal_plan_id;

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
     * @param meal {Meal}
     * @returns {Promise<void>}
     */
    async updateMeal(meal) {
        const mealTableData = this._modelToTable(meal);

        await knex.transaction(async (transaction) => {
            await transaction('meal')
                .update(mealTableData)
                .where({ meal_id: meal.id });

            // delete all meal recipes for this meal
            await transaction('meal_recipe')
                .delete()
                .where({ meal_id: meal.id });

            // then rebuild with recipes from meal object
            const mealRecipeTablesData =
                meal.recipes.map(recipe => this._recipesToMealRecipeTable(recipe, meal.id));
            for (let mealRecipeTableData of mealRecipeTablesData) {
                await transaction
                    .insert(mealRecipeTableData)
                    .into('meal_recipe');
            }
        });
    }

    async getMeal(mealId) {
        const results = await knex
            .select('*')
            .from('meal')
            .where({ meal_id: mealId })
            .limit(1);

        const meal = results.length === 1 ? this._tableToModel(results[0]) : null;
        if (!meal) {
            return null;
        }

        // add recipes to meal model
        const recipeResults = await knex
            .select('recipe.recipe_id', 'recipe.name')
            .from('meal_recipe')
            .leftJoin('recipe', 'meal_recipe.recipe_id', '=', 'recipe.recipe_id')
            .where({ meal_id: meal.id });
        meal.recipes = recipeResults.map(rowData => this._recipeTableToRecipeModel(rowData));

        return meal;
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

    /**
     * @param meal {Meal}
     * @returns {Promise<void>}
     */
    async deleteMeal(meal) {
        await knex.transaction(async (transaction) => {
            // delete all meal recipes for this meal
            await transaction('meal_recipe')
                .delete()
                .where({ meal_id: meal.id });
            // delete meal
            await transaction('meal')
                .delete()
                .where({ meal_id: meal.id });
        });
    }
}

module.exports = new MealService();