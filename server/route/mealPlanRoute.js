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
 *              date: Date
 *              time: Time
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
 */
router.post('/', passport.authenticate('jwt', { session: false }), mealPlanController.createMealPlan);

module.exports = router;