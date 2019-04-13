import BaseService from "./BaseService";

const host = 'http://localhost:3001';

class MealPlanService extends BaseService {

    /**
     * @param token {string} user token
     * @returns {Promise<void>}
     */
    async getMealPlans(token) {
        const response = await fetch(`${host}/api/mealplan`, {
            headers: super.getHeaders(token),
        });

        if(!response.ok) {
            throw new Error(await response.text());
        }

        return await response.json();
    }

    async getMeals(token, mealPlanId) {
        const response = await fetch(`${host}/api/mealplan/${mealPlanId}/meals`, {
            headers: super.getHeaders(token),
        });

        if(!response.ok) {
            throw new Error(await response.text());
        }

        return await response.json();
    }
}

export default new MealPlanService();