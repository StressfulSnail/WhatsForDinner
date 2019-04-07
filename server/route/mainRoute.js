const express = require('express');
const router = express.Router();

router.use('/account', require('./accountRoute'));
router.use('/mealplan', require('./mealPlanRoute'));

module.exports = router;

