const express = require('express');
const router = express.Router();
const { fetchUsers, addUser, updateUser, deleteUser } = require('./ctrl');

router.get('/fetchUsers', fetchUsers);

router.post('/addUser', addUser);

router.put('/updateUser', updateUser);

router.delete('/deleteUser/:UserId', deleteUser);

module.exports = router;

