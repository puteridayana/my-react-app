const express = require('express');
const router = express.Router();
const { fetchBooks, addBook, updateBook, deleteBook } = require('./ctrl');

router.get('/fetchBooks', fetchBooks);

router.post('/addBook', addBook);

router.put('/updateBook/:editBookId', updateBook);

router.delete('/deleteBook/:bookId', deleteBook);

module.exports = router;
