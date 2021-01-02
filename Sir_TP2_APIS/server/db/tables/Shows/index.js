const pool = require('../../dbconnection');

let db = {};

db.all = () => {
    return new Promise((resolve, reject) => {
        pool.query('Select * from shows, showdate, dates, rating, showtype where shows.idShow = showdate.idShow AND showdate.idDate = dates.idDate AND shows.idRating = rating.idRating AND shows.idShowType = showtype.idShowType',
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                let groups = Object.create(null);

                results.forEach(item => {
                    if (!groups[item.idShow]) {
                        groups[item.idShow] = [];
                    }

                    groups[item.idShow].push({
                        item
                    });
                });

                
                return resolve(groups);
            })
    })
};

db.one = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('Select * from shows, showdate, dates, rating, showtype where shows.idShow = ? AND shows.idShow = showdate.idShow AND showdate.idDate = dates.idDate AND shows.idRating = rating.idRating AND shows.idShowType = showtype.idShowType', [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
};

db.byName = (name) => {
    console.log(name)
    return new Promise((resolve, reject) => {
        pool.query("Select * from shows, showdate, dates, rating, showtype where shows.showName like CONCAT('%',?,'%') AND shows.idShow = showdate.idShow AND showdate.idDate = dates.idDate AND shows.idRating = rating.idRating AND shows.idShowType = showtype.idShowType", [name], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
};

db.byType = (type) => {
    return new Promise((resolve, reject) => {
        pool.query("Select * from shows, showdate, dates, rating, showtype where showtype.type = ? AND shows.idShow = showdate.idShow AND showdate.idDate = dates.idDate AND shows.idRating = rating.idRating AND shows.idShowType = showtype.idShowType", [type], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
};

db.byNameType = (name, type) => {
    return new Promise((resolve, reject) => {
        pool.query("Select * from shows, showdate, dates, rating, showtype where shows.showName LIKE CONCAT('%',?,'%') AND showtype.type = ? AND shows.idShow = showdate.idShow AND showdate.idDate = dates.idDate AND shows.idRating = rating.idRating AND shows.idShowType = showtype.idShowType", [name, type], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
};

db.byRating = (rating) => {
    return new Promise((resolve, reject) => {
        pool.query("Select * from shows, showdate, dates, rating, showtype where rating.rating = ? AND shows.idShow = showdate.idShow AND showdate.idDate = dates.idDate AND shows.idRating = rating.idRating AND shows.idShowType = showtype.idShowType", [rating], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
};

db.byNameRating = (name, rating) => {
    return new Promise((resolve, reject) => {
        pool.query("Select * from shows, showdate, dates, rating, showtype where shows.showName LIKE CONCAT('%',?,'%') AND rating.rating = ? AND shows.idShow = showdate.idShow AND showdate.idDate = dates.idDate AND shows.idRating = rating.idRating AND shows.idShowType = showtype.idShowType", [name, rating], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
};

module.exports = db;