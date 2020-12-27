const pool = require('../../dbconnection');

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

module.exports = db;