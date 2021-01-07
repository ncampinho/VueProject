/**Requires database connection - Connects to defined database
 * and returns functionalities like querying
*/
const pool = require('../../dbconnection');

/**This file is to write methods that perform queries to on the Comment table on the selected database */

let db = {};

db.allComments = (id) => {
    return new Promise((resolve, reject) => {

        pool.query('SELECT * FROM comment, shows WHERE comment.idShow = shows.idShow AND comment.idShow = ?',
            [id], (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            })
    })
};

//Exports database to give access to all the methods
module.exports = db;