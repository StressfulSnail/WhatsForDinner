const knex = require('../db');
const MealPlan = require('../model/MealPlan');
const Account = require('../model/Account');

class MealPlanService {

    _tableToModel(tableObj) {
        const mealPlan = new MealPlan();
        mealPlan.id = tableObj.meal_plan_id;
        mealPlan.name = tableObj.name;
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
            name: mealPlanModel.name,
            start_date: mealPlanModel.startDate,
            end_date: mealPlanModel.endDate,
        }
    }

    /**
     * @param mealPlan
     * @returns {Promise<number>} Id of the saved Meal Plan
     */
    async saveMealPlan(mealPlan) {
        const tableData = this._modelToTable(mealPlan);
        tableData.meal_plan_id = null; // set to null so mysql auto generates
        const id = await knex
            .insert(tableData)
            .into('meal_plan')
            .returning('meal_plan_id');
        return id[0];
    }

    /**
     * Gets all meal plans belonging to an account
     * @param accountId
     * @returns {Promise<MealPlan[]>}
     */
    async getAccountMealPlans(accountId) {
        const results = await knex
            .select('*')
            .from('meal_plan')
            .where({ account_id: accountId });
        return results.map(rowData => this._tableToModel(rowData));
    }

    /**
     * Gets all meal plans belonging to an account
     * @param mealPlanId
     * @returns {Promise<MealPlan[]>}
     */
    async getMealPlan(mealPlanId) {
        const results = await knex
            .select('*')
            .from('meal_plan')
            .where({ meal_plan_id: mealPlanId })
            .limit(1);
        return results.length === 1 ? this._tableToModel(results[0]) : null;
    }
}

module.exports = new MealPlanService();