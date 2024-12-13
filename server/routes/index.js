const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/search', require('./search'));
router.use('/manage', require('./manage'));
router.use('/users', require('./users'));


module.exports = router;
