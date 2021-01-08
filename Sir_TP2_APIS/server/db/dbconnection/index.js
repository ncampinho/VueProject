/**MySQL Database Connection- Change with your credentials to connect to your MySQL
 * Import this on files to perform a connection and gain access to querying functionalities
*/
const dbconnection = require('mysql');

/*const pool = dbconnection.createPool({
    connectionLimit: 10,
    password: 'admin',
    user: 'user',
    database: 'sir_tp2',
    host: 'localhost',
    port: '3306'
});*/
const pool = dbconnection.createPool({
    connectionLimit: 10,
    password: 'admin',
    user: 'root',
    database: 'sir_tp2',
    host: 'localhost',
    port: '3306'
});

/**Pool allows to perform queries and retrieve/reject results according
 * with the success/unsucess of that same query.
 * It's exported in order to be accessed in other components.
 */
module.exports = pool