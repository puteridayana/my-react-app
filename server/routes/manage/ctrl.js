const dbconnection = require('../../connections/database'); 

// Fetch all books
async function fetchBooks(req, res) {
    try {
        const [rows, fields] = await dbconnection.query('SELECT * FROM books;');
        console.log('Books:', rows);
        res.status(200).json(rows); // Send the response back to the client
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).send({ error: 'An error occurred while fetching the books.' });
    }
}

// Add a new book
async function addBook(req, res) {
    try {
        const { title, author, genre, publication_year } = req.body;
        const sqlQuery = 'INSERT INTO books (title, author, genre, publication_year) VALUES (?, ?, ?, ?)';
        const [result] = await dbconnection.query(sqlQuery, [title, author, genre, publication_year]);

        res.status(201).json({ message: 'Book added successfully', id: result.insertId });
    } catch (error) {
        console.error('Error adding book:', error);
        res.status(500).send({ error: 'An error occurred while adding the book.' });
    }
}

// Update an existing book
async function updateBook(req, res) {
    try {
        const { bookId } = req.params;
        const { title, author } = req.body;
        const sqlQuery = 'UPDATE books SET title = ?, author = ? WHERE id = ?';
        await dbconnection.query(sqlQuery, [title, author, bookId]);

        res.json({ message: 'Book updated successfully' });
    } catch (error) {
        console.error('Error updating book:', error);
        res.status(500).send({ error: 'An error occurred while updating the book.' });
    }
}

// Delete a book
async function deleteBook(req, res) {
    try {
        const { bookId } = req.params;
        const sqlQuery = 'DELETE FROM books WHERE id = ?';
        await dbconnection.query(sqlQuery, [bookId]);

        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).send({ error: 'An error occurred while deleting the book.' });
    }
}

module.exports = {
    fetchBooks,
    addBook,
    updateBook,
    deleteBook
};
