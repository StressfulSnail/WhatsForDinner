/**
 * Meal Plan Entity
 */
class MealPlan {
    constructor() {
        this.id = null;
        this.startDate = null;
        this.endDate = null;
        this.account = null;
        this._mealList = [];
    }

    /**
     * add meal to meal plan
     * @param meal {Meal}
     */
    addMeal(meal) {
        this._mealList.push(meal);
    }

    /**
     * remove meal from meal plan with given id
     * @param mealId {number}
     */
    removeMeal(mealId) {
        // filter and keep all meals that do not have an id of mealId
        this._mealList = this._mealList.filter(meal => meal.id !== mealId);
    }
}

module.exports = MealPlan;