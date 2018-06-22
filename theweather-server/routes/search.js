const express = require('express');
const router = express.Router();
const { search } = require('../handlers/search');

router.get('/search', function(req, res){
    res.sendFile(path.join(__dirname, 'build', search));
});

module.exports = router;