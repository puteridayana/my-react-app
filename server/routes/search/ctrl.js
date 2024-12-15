const dbconnection = require('../../connections/database'); 

async function searchBookResults(req, res) {
    try {
        const { searchTitle, searchAuthor } = req.body;

        let sqlQuery = '';
        let params = [];

        if (searchTitle && searchAuthor) {
            sqlQuery = `SELECT * FROM books WHERE title LIKE ? AND author LIKE ?;`;
            params = [`%${searchTitle}%`, `%${searchAuthor}%`];
        } else if (searchTitle) {
            sqlQuery = `SELECT * FROM books WHERE title LIKE ?;`;
            params = [`%${searchTitle}%`];
        } else if (searchAuthor) {
            sqlQuery = `SELECT * FROM books WHERE author LIKE ?;`;
            params = [`%${searchAuthor}%`];
        }

        console.log('Executing query:', sqlQuery);

        const [results, fields] = await dbconnection.query(sqlQuery, params);

        res.send(results);  
        console.log('Query results:', results);

    } catch (error) {
        console.error('Error connecting to database:', error);
        res.status(500).send({ error: 'An error occurred while processing your request.' });
    }
}

module.exports = {
    searchBookResults,
};
