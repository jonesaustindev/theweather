const express = require('express');
const router = express.Router();
const { current, hourly, daily } = require('../handlers/search');

router.get('/current', current);
router.get('/hourly', hourly);
router.get('/daily', daily);

module.exports = router;