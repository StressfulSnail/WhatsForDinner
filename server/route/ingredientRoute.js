const express = require('express');
const passport = require('passport');
const router = express.Router();

const ingredientController = require('../controller/ingredientController');

/**
 * GET /api/ingredient/
 * Get ingredient details
 * Requires "ingredient_id" : X
 * Returns {
 *      ingredient_id: int
 *      name: string
 * }
 */
router.get('/', ingredientController.getIngredientByID);

/**
 * GET /api/ingredient/measurement
 * Get measurement details
 * Requires "measurement_id" : X
 * Returns {
 *      measurement_id: int
 *      name: string
 * }
 */
router.get('/measurement', ingredientController.getMeasurementByID);

/**
 * POST /api/ingredient/
 * Create a new ingredient
 * Body {
 *      name: string
 * }
 */
router.post('/', ingredientController.createIngredient);

/**
 * POST /api/ingredient/measurement/
 * Create a new measurement unit
 * Body {
 *      name: string
 * }
 */
router.post('/measurement', ingredientController.createMeasurement);

router.post('/count', ingredientController.createIngredientCountByID);

module.exports = router;