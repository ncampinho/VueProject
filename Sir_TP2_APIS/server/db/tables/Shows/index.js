/**Requires database connection - Connects to defined database
 * and returns functionalities like querying
*/
const pool = require('../../dbconnection');

/**This file is to write methods that perform queries to on the Show table on the selected database */

let db = {};

//Returns all shows created
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

//Return a specific show given its id
db.one = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('Select * from shows, showdate, dates, rating, showtype where shows.idShow = ? AND shows.idShow = showdate.idShow AND showdate.idDate = dates.idDate AND shows.idRating = rating.idRating AND shows.idShowType = showtype.idShowType', [id], (err, results) => {
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

//Returns shows by name
db.byName = (name) => {
    console.log(name)
    return new Promise((resolve, reject) => {
        pool.query("Select * from shows, showdate, dates, rating, showtype,ratingValue where shows.showName like CONCAT('%',?,'%') AND shows.idShow = showdate.idShow AND showdate.idDate = dates.idDate AND shows.idRating = rating.idRating AND shows.idShowType = showtype.idShowType", [name], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
};

//Return spotlighted shows
db.bySpotlight = () => {
    return new Promise((resolve, reject) => {
        pool.query('Select * from shows, showdate, dates, rating, showtype where shows.idShow = showdate.idShow AND showdate.idDate = dates.idDate AND shows.idRating = rating.idRating AND shows.idShowType = showtype.idShowType AND shows.isSpotlight = 1',
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

//Returns shows by type
db.byType = (type) => {
    return new Promise((resolve, reject) => {
        pool.query("Select * from shows, showdate, dates, rating, showtype  where showtype.type = ? AND shows.idShow = showdate.idShow AND showdate.idDate = dates.idDate AND shows.idRating = rating.idRating AND shows.idShowType = showtype.idShowType", [type], (err, results) => {
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

//Returns shows by type
db.byType_Spotlighted = (type) => {
    return new Promise((resolve, reject) => {
        pool.query("Select * from shows, showdate, dates, rating, showtype  where showtype.type = ? AND shows.idShow = showdate.idShow AND showdate.idDate = dates.idDate AND shows.idRating = rating.idRating AND shows.idShowType = showtype.idShowType AND shows.isSpotlight = 1", [type], (err, results) => {
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

//Returns shows by name and type
db.byNameType = (name, type) => {
    return new Promise((resolve, reject) => {
        pool.query("Select * from shows, showdate, dates, rating, showtype  where shows.showName LIKE CONCAT('%',?,'%') AND showtype.type = ? AND shows.idShow = showdate.idShow AND showdate.idDate = dates.idDate AND shows.idRating = rating.idRating AND shows.idShowType = showtype.idShowType", [name, type], (err, results) => {
            if (err) {
                return reject(err);
            }
            
        })
    })
};

//Returns shows by rating
db.byRating = (rating) => {
    return new Promise((resolve, reject) => {
        pool.query("Select * from shows, showdate, dates, rating, showtype  where rating.rating = ? AND shows.idShow = showdate.idShow AND showdate.idDate = dates.idDate AND shows.idRating = rating.idRating AND shows.idShowType = showtype.idShowType", [rating], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
};

//Return shows by name and rating
db.byNameRating = (name, rating) => {
    return new Promise((resolve, reject) => {
        pool.query("Select * from shows, showdate, dates, rating, showtype  where shows.showName LIKE CONCAT('%',?,'%') AND rating.rating = ? AND shows.idShow = showdate.idShow AND showdate.idDate = dates.idDate AND shows.idRating = rating.idRating AND shows.idShowType = showtype.idShowType", [name, rating], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
};

//Exports database to give access to all the methods
module.exports = db;