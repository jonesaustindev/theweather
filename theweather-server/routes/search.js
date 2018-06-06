const express = require('express');
const router = express.Router();
const { current, hourly, daily, location } = require('../handlers/search');

router.get('/current', current);
router.get('/hourly', hourly);
router.get('/daily', daily);
router.get('/location', location);

module.exports = router;