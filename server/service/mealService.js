const knex = require('../db');
const Meal = require('../model/Meal');

class MealService {

    _tableToModel(tableObj) {
        const meal = new Meal();
        meal.id = tableObj.meal_id;
        meal.date = tableObj.meal_date;
        meal.mealTime = tableObj.meal_time;
        meal.servingsRequired = tableObj.servings_required;
        meal.note = tableObj.note;
        return meal;
    }

    _modelToTable(mealModel) {
        return {
            meal_plan_id: mealModel.mealPlan.id,
            meal_date: mealModel.date,
            meal_time: mealModel.time,
            servings_required: mealModel.servingsRequired,
            note: mealModel.note,
        }
    }
}

module.exports = new MealService();