require('dotenv').config();  
console.log(process.env.DB_USERNAME, process.env.DB_PASSWORD);

const mysql = require('mysql2');

// Environment variables loaded via dotenv
const env = {
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DATABASE: process.env.DB_DATABASE
};

// Database configuration
const dbConfig = {
    host: env.DB_HOST,
    port: env.DB_PORT || 3306,
    user: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE
};

// Log connection details
console.log('Connecting to:', env.DB_HOST, env.DB_USERNAME);

// Create a connection pool using mysql2 with promise support
const pool = mysql.createPool(dbConfig);

// Use the promise API for query execution
const dbconnection = pool.promise();

// Test the database connection
async function testConnection() {
    try {
        const [rows, fields] = await dbconnection.query('SELECT 1'); // Simple query to check the connection
        console.log('Connected to the database!');
    } catch (err) {
        console.error('Database connection failed:', err.stack);
    }
}

testConnection()

module.exports = dbconnection; 
