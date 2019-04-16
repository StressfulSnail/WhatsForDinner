const express = require('express');
const router = express.Router();

router.use('/account', require('./accountRoute'));
router.use('/mealplan', require('./mealPlanRoute'));
router.use('/recipe', require('./recipeRoute'));
router.use('/ingredient', require('./ingredientRoute'));

module.exports = router;

