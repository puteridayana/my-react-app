const dbconnection = require('../../connections/database'); // Import the dbconnection

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

        // Perform the query using dbconnection (which supports promises now)
        const [results, fields] = await dbconnection.query(sqlQuery, params); // Use async/await with query

        res.send(results);  // Send the results to the client
        console.log('Query results:', results);

    } catch (error) {
        console.error('Error connecting to database:', error);
        res.status(500).send({ error: 'An error occurred while processing your request.' });
    }
}

module.exports = {
    searchBookResults,
};
