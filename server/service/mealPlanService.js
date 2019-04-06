const knex = require('../db');
const MealPlan = require('../model/MealPlan');
const Account = require('../model/Account');

class MealPlanService {

    _tableToModel(tableObj) {
        const mealPlan = new MealPlan();
        mealPlan.id = tableObj.meal_plan_id;
        mealPlan.startDate = tableObj.start_date;
        mealPlan.endDate = tableObj.end_date;

        mealPlan.account = new Account();
        mealPlan.account.id = tableObj.account_id;
        return mealPlan;
    }

    _modelToTable(mealPlanModel) {
        return {
            meal_plan_id: mealPlanModel.id,
            account_id: mealPlanModel.account.id,
            start_date: mealPlanModel.startDate,
            end_date: mealPlanModel.endDate,
        }
    }

    async saveMealPlan(mealPlan) {
        const tableData = this._modelToTable(mealPlan);
        tableData.id = null; // set to null so mysql auto generates
        await knex
            .insert(tableData)
            .into('meal_plan');
    }
}

module.exports = new MealPlanService();