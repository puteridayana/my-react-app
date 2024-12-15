require('dotenv').config();  
console.log(process.env.DB_USERNAME, process.env.DB_PASSWORD);

const mysql = require('mysql2');

const env = {
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DATABASE: process.env.DB_DATABASE
};


const dbConfig = {
    host: env.DB_HOST,
    port: env.DB_PORT || 3306,
    user: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE
};

console.log('Connecting to:', env.DB_HOST, env.DB_USERNAME);

const pool = mysql.createPool(dbConfig);

const dbconnection = pool.promise();

async function testConnection() {
    try {
        const [rows, fields] = await dbconnection.query('SELECT 1'); 
        console.log('Connected to the database!');
    } catch (err) {
        console.error('Database connection failed:', err.stack);
    }
}

testConnection()

module.exports = dbconnection; 
