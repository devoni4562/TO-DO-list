const mariadb = require('mariadb');
const dotenv = require('dotenv').config({path: '../.env'});

const connectDB = mariadb.createPool({
    host: process.env.MARIA_HOST,
    user: process.env.MARIA_USER,
    password: process.env.MARIA_PW,
    database: process.env.MARIA_DB,
    connectionLimit: 5
});

module.exports = connectDB;