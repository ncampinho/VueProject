/**Requires database connection - Connects to defined database
 * and returns functionalities like querying
*/
const pool = require('../../dbconnection');

/**This file is to write methods that perform queries to on the Show table on the selected database */

let db = {};

//Returns all shows created
db.all = () => {
    return new Promise((resolve, reject) => {
        pool.query('Select * from shows, showdate, dates, rating, showtype, location where shows.idShow = showdate.idShow AND showdate.idDate = dates.idDate AND shows.idRating = rating.idRating AND shows.idShowType = showtype.idShowType AND shows.idLocation = location.idLocation',
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

db.showNames = () => {
    return new Promise((resolve, reject) => {
        pool.query('Select idShow, showName from shows',
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            })
    })
};

//Creates a new show
db.newShow = (showData) => {
    var showDateId = null;
    console.log(showData)
    return new Promise((resolve, reject) => {
        pool.query('Select * from dates WHERE dates.date = ? AND dates.showTime = ?', [showData.showDate, showData.showTime],
            (err, results) => {
                if (err) {
                    return reject(err)
                }
                if (results.length > 0) {
                    showDateId = results[0].idDate;
                } else {
                    pool.query('Insert Into dates(date, showTime) VALUES(?, ?)', [showData.showDate, showData.showTime],
                        (err, results) => {
                            if (err) {
                                return reject(err)
                            }
                            showDateId = results.insertId

                        })
                }
                pool.query('Insert Into shows(showName, showDescription, price, availableTickets, idRating, idShowType, idLocation, image, isSpotlight, imageVert) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    [showData.showName, showData.showDescription, showData.price, showData.availableTickets, showData.idRating, showData.idShowType, showData.idLocation, showData.image, showData.isSpotlight, showData.imageVert],
                    (err, results) => {
                        if (err) {
                            return reject(err)
                        }

                        pool.query('Insert Into showdate(idShow, idDate, limitPurchaseDate) VALUES(?, ?, ?)', [results.insertId, showDateId, showData.limitPurchaseDate],
                            (err, results) => {
                                if (err) {
                                    return reject(err)
                                }
                                return resolve(results)
                            })
                    })
            })
    })
}
//Updates a show
db.updateShow = (showData) => {
    console.log(showData)
    return new Promise((resolve, reject) => {
        pool.query('Select * from shows WHERE shows.idShow = ?', [showData.idShow],
            (err, results) => {
                if (err) {
                    return reject(err)
                }
                pool.query('UPDATE shows SET showName = ? , showDescription = ? , price = ?, availableTickets = ?, idRating = ?, idShowType = ?, idLocation = ?, isSpotlight = ?, image = ?, imageVert = ? WHERE shows.idShow = ?',
                    [showData.showName, showData.showDescription, showData.price, showData.availableTickets, showData.idRating, showData.idShowType, showData.idLocation, showData.isSpotlight, showData.image, showData.imageVert, showData.idShow],
                    (err, results) => {
                        if (err) {
                            return reject(err)
                        }

                        return resolve(results)
                    })
            })
    })
}

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
        pool.query("Select * from shows, showdate, dates, rating, showtype  where showtype.idShowType = ? AND shows.idShow = showdate.idShow AND showdate.idDate = dates.idDate AND shows.idRating = rating.idRating AND shows.idShowType = showtype.idShowType", [type], (err, results) => {
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
        pool.query("Select * from shows, showdate, dates, rating, showtype  where showtype.idShowType = ? AND shows.idShow = showdate.idShow AND showdate.idDate = dates.idDate AND shows.idRating = rating.idRating AND shows.idShowType = showtype.idShowType AND shows.isSpotlight = 1", [type], (err, results) => {
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