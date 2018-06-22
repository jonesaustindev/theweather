const express = require('express');
const router = express.Router();
const { search } = require('../handlers/search');

router.get('/search', search);

module.exports = router;