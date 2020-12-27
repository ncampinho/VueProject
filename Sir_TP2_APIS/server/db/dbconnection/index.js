const dbconnection = require('mysql');

const pool = dbconnection.createPool({
    connectionLimit: 10,
    password: 'admin',
    user: 'root',
    database: 'sir_tp2',
    host: 'localhost',
    port: '3306'
});

module.exports = pool