const express = require('express');
const router = express.Router();
const { searchBookResults } = require('./ctrl'); 

router.post('/searchBookResults', searchBookResults);

module.exports = router;