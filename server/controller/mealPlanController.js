const recipeService = require('../service/recipeService');
const mealPlanService = require('../service/mealPlanService');
const mealService = require('../service/mealService');
const MealPlan = require('../model/MealPlan');
const Meal = require('../model/Meal');
const Recipe = require('../model/Recipe');

class MealPlanController {
    async createMealPlan(request, response) {
        try {
            const account = request.user;
            const { body } = request;
            // validate access to all recipes (also validates they exist)
            for (let m = 0; m < body.meals.length; m++) {
                const meal = body.meals[m];
                for (let r = 0; r < meal.recipes.length; r++) {
                    const recipe = meal.recipes[r];
                    // check if a personal recipe belonging to the account, or is a public recipe
                    if (!await recipeService.personalRecipeExists(recipe.id, account.id)
                        && !await recipeService.publicRecipeExists(recipe.id)) {
                        return response.sendStatus(400);
                    }
                }
            }

            // create meal plan object
            const mealPlan = new MealPlan();
            mealPlan.account = account;
            mealPlan.name = body.name;
            mealPlan.startDate = new Date(body.startDate);
            mealPlan.endDate = new Date(body.endDate);

            // save meal plan, set model to created id
            const mealPlanId = await mealPlanService.saveMealPlan(mealPlan);
            mealPlan.id = mealPlanId;

            // map json input to meals/recipe models
            const meals = body.meals.map(mealBody => {
                const meal = new Meal();
                meal.dateTime = new Date(mealBody.dateTime);
                meal.servingsRequired = mealBody.servingsRequired;
                meal.note = mealBody.note;
                meal.recipes = mealBody.recipes.map(recipeBody => {
                    const recipe = new Recipe();
                    recipe.id = recipeBody.id;
                    return recipe;
                });
                return meal;
            });
            // add all meals to meal plan
            meals.forEach(meal => {
                mealPlan.addMeal(meal);
            });

            // save all meals
            for (let meal of meals) {
                const mealId = await mealService.saveMeal(meal);
                meal.id = mealId;
            }

            return response.sendStatus(200);
        } catch (e) {
            console.error(e);
            response.sendStatus(500);
        }
    }

    async getMealPlans(request, response) {
        try {
            const account = request.user;

            const mealPlans = await mealPlanService.getAccountMealPlans(account.id);
            const jsonData = mealPlans.map(mealPlan => {
                return {
                    id: mealPlan.id,
                    name: mealPlan.name,
                    startDate: mealPlan.startDate,
                    endDate: mealPlan.endDate,
                }
            });

            return response.json(jsonData);
        } catch (e) {
            console.error(e);
            response.sendStatus(500);
        }
    }

    async getMeals(request, response) {
        try {
            const account = request.user;
            const mealPlanId = request.params.mealPlanId;

            const mealPlan = await mealPlanService.getMealPlan(mealPlanId);
            if (mealPlan.account.id !== account.id) { // make sure they are authorized to access meal plan
                return response.sendStatus(401);
            }

            const meals = await mealService.getMealPlanMeals(mealPlanId);
            const jsonData = meals.map(meal => {
                return {
                    id: meal.id,
                    dateTime: meal.dateTime,
                    servingsRequired: meal.servingsRequired,
                    note: meal.note,
                    recipes: meal.recipes.map(recipe => ({ id: recipe.id, name: recipe.name })),
                }
            });

            return response.json(jsonData);
        } catch (e) {
            console.error(e);
            response.sendStatus(500);
        }
    }
}

module.exports = new MealPlanController();