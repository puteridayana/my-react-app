const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dbconnection = require('../../connections/database'); 

// Register User
const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);

    const query = 'INSERT INTO users (username, email, password, role, created_at) VALUES (?, ?, ?, ?, NOW())';
    const values = [username, email, hashedPassword, role];

    await dbconnection.query(query, values); // Directly await query

    res.status(201).send('User registered successfully');
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send({ error: 'An error occurred while registering the user.' });
  }
};

// Login User
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const query = 'SELECT * FROM users WHERE username = ?';
    const [rows] = await dbconnection.query(query, [username]); // Directly await query
    if (rows.length === 0) {
      return res.status(404).send({ error: 'User not found' });
    }

    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ error: 'Invalid password' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, user: { id: user.id, username: user.username, role: user.role } });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send({ error: 'An error occurred while logging in.' });
  }
};

// Logout User
const logout = async (req, res) => {
  try {
    res.status(200).send('Logout successful');
  } catch (error) {
    console.error('Error logging out:', error);
    res.status(500).send({ error: 'An error occurred while logging out.' });
  }
};

module.exports = { register, login, logout };
