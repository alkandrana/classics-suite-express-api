import mysql from 'mysql2/promise'
import dotenv from 'dotenv/config';

export default mysql.createPool({
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});