const dbconnection = require('../../connections/database');

// Fetch all users
async function fetchUsers(req, res) {
    try {
        const [rows, fields] = await dbconnection.query('SELECT * FROM users;');
        console.log('Users:', rows);
        res.status(200).json(rows); // Send the response back to the client
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send({ error: 'An error occurred while fetching the users.' });
    }
}

// Add a new user
async function addUser(req, res) {
    try {
        const { username, email, role } = req.body;
        const sqlQuery = 'INSERT INTO users (username, email, role) VALUES (?, ?, ?)';
        const [result] = await dbconnection.query(sqlQuery, [username, email, role]);

        res.status(201).json({ message: 'User added successfully', id: result.insertId });
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).send({ error: 'An error occurred while adding the user.' });
    }
}

// Update an existing user
async function updateUser(req, res) {
    try {
        const { userId } = req.params;
        const { username, email, role } = req.body;
        const sqlQuery = 'UPDATE users SET username = ?, email = ?, role = ? WHERE user_id = ?';
        await dbconnection.query(sqlQuery, [username, email, role, userId]);

        res.json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send({ error: 'An error occurred while updating the user.' });
    }
}

const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const sql = 'DELETE FROM users WHERE user_id = ?';
        await dbconnection.query(sql, [userId]);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Error deleting user' });
    }
};

module.exports = {
    fetchUsers,
    addUser,
    updateUser,
    deleteUser
};
