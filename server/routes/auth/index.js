const express = require('express');
const router = express.Router();
const { register, login, logout } = require('./ctrl');
const { verifyToken } = require('../../middlewares/auth');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', verifyToken, logout);
router.get('/protected', verifyToken, (req, res) => {
  res.status(200).send(`Access granted. User ID: ${req.userId}`);
});

module.exports = router;
