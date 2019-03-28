const express = require('express');
const router = express.Router();

router.use('/account', require('./accountRoute'));

module.exports = router;

