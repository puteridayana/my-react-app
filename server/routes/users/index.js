const express = require('express');
const router = express.Router();
const { fetchUsers, addUser, deleteUser } = require('./ctrl');

router.get('/fetchUsers', fetchUsers);

router.post('/addUser', addUser);

router.delete('/deleteUser/:UserId', deleteUser);

module.exports = router;

