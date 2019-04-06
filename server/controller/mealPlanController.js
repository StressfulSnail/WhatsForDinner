const recipeService = require('../service/recipeService');

class MealPlanController {
    async createMealPlan(request, response) {
        try {
            const account = request.user;
            const { body } = request;
            // validate access to all recipes (also validates they exist)
            for (let m = 0; m < body.meals; m++) {
                const meal = body.meals[m];
                for (let r = 0; r < body.meal.recipes.length; r++) {
                    const recipe = meal.recipes[r];
                    // check if a personal recipe belonging to the account, or is a public recipe
                    if (!await recipeService.personalRecipeExists(recipe.id, account.id)
                        && !await recipeService.publicRecipeExists(recipe.id)) {
                        return response.sendStatus(400);
                    }
                }
            }

            return request.sendStatus(200);
        } catch (e) {
            console.error(e);
            response.sendStatus(500);
        }
    }
}

module.exports = new MealPlanController();