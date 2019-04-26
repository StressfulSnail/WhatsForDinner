const express = require('express');
const passport = require('passport');
const router = express.Router();

const mealPlanController = require('../controller/mealPlanController');

/**
 * POST /api/mealplan/
 * Create a new meal plan
 * Body {
 *      name: string
 *      startDate: Date
 *      endDate: Date
 *      meals: [
 *          {
 *              dateTime: Date
 *              servingsRequired: number
 *              note: string
 *              recipes: [
 *                  {
 *                      id: int
 *                      name?: string
 *                  }
 *              ]
 *          }
 *      ]
 * }
 * Response mealPlanId: int
 */
router.post('/', passport.authenticate('jwt', { session: false }), mealPlanController.createMealPlan);

/**
 * GET /api/mealplan/
 * Get all meal plans for account
 * Response [
 *   {
 *      id: number
 *      name: string
 *      startDate: Date
 *      endDate: Date
 *   }
 * ]
 */
router.get('/', passport.authenticate('jwt', { session: false }), mealPlanController.getMealPlans);

/**
 * PUT /api/mealplan/:mealPlanId
 * Update meal plan with given id
 * Body {
 *    id: number
 *    name: string
 *    startDate: Date
 *    endDate: Date
 * }
 */
router.put('/:mealPlanId', passport.authenticate('jwt', { session: false }), mealPlanController.updateMealPlan);

/**
 * DELETE /api/mealplan/:mealPlanId
 * Delete meal plan with given id, will delete any children meals
 */
router.delete('/:mealPlanId', passport.authenticate('jwt', { session: false }), mealPlanController.deleteMealPlan);

/**
 * GET /api/mealplan/:mealPlanId/meals
 * Get all meals for a meal plan
 * Response [
 *  {
 *    id: number
 *    dateTime: Date
 *    servingsRequired: number
 *    note: string
 *    recipes: [
 *        {
 *          id: int
 *          name: string
 *        }
 *    ]
 *  }
 *]
 */
router.get('/:mealPlanId/meals', passport.authenticate('jwt', { session: false }), mealPlanController.getMeals);

/**
 * POST /api/mealplan/:mealPlanId/meals
 * Add new meal into meal plan
 * Body {
 *    dateTime: Date
 *    servingsRequired: number
 *    note: string
 *    recipes: [
 *        {
 *          id: int
 *          name?: string
 *        }
 *    ]
 *  }
 */
router.post('/:mealPlanId/meals', passport.authenticate('jwt', { session: false }), mealPlanController.createMeal);

/**
 * PUT /api/mealplan/:mealPlanId/meals/:mealId
 * Update meal with given mealId
 * Body {
 *    id: number
 *    dateTime: Date
 *    servingsRequired: number
 *    note: string
 *    recipes: [
 *        {
 *          id: int
 *          name?: string
 *        }
 *    ]
 *  }
 */
router.put('/:mealPlanId/meals/:mealId', passport.authenticate('jwt', { session: false }), mealPlanController.updateMeal);

/**
 * DELETE /api/mealplan/:mealPlanId/meals/:mealId
 * Delete meal with given mealId
 */
router.delete('/:mealPlanId/meals/:mealId', passport.authenticate('jwt', { session: false }), mealPlanController.deleteMeal);

/**
 * POST /api/mealplan/:mealPlanId/copy
 * Make a copy of the meal plan
 */
router.post('/:mealPlanId/copy', passport.authenticate('jwt', { session: false }), mealPlanController.copyMealPlan);



module.exports = router;