const pool = require('../../dbconnection');

let db = {};

db.purchases = (id) => {
    return new Promise((resolve, reject) => {

        pool.query('SELECT * FROM purchase, purchaseline, shows, showtype, showrating, dates WHERE purchase.idUser = ? AND purchaseline.idPurchase = purchase.idPurchase AND purchaseline.idShow = shows.idShow AND purchaseline.idDate = dates.idDate AND shows.idRating = rating.idRating AND shows.idShowType = showtype.idShowType',
            [id], (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            })
    })
};

db.newTempPurchaseLine = (lineData) => {
    console.log(lineData)
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM temp_purchaseline WHERE temp_purchaseline.idShow = ? AND temp_purchaseline.idDate = ? AND temp_purchaseline.idUser = ?',
            [lineData.idShow, lineData.idDate, lineData.idUser],
            (err, results) => {
                if (err) {
                    return reject(err)
                }
                if (results.length > 0) {
                    console.log('here')
                    pool.query('UPDATE temp_purchaseline SET temp_purchaseline.quantity = temp_purchaseline.quantity + ?, temp_purchaseline.subtotal = temp_purchaseline.subtotal + ? WHERE temp_purchaseline.idShow = ? AND temp_purchaseline.idDate = ? AND temp_purchaseline.idUser = ?',
                        [lineData.quantity, lineData.subtotal, lineData.idShow, lineData.idDate, lineData.idUser],
                        (err, results) => {
                            if (err) {
                                return reject(err)
                            }

                            return resolve("Ticket added to the shopping cart successfully");
                        })
                } else {
                    pool.query('INSERT INTO temp_purchaseline(idShow, idUser, quantity, subtotal, idDate) VALUES(?,?,?,?,?)',
                        [lineData.idShow, lineData.idUser, lineData.quantity, lineData.subtotal, lineData.idDate],
                        (err, results) => {
                            if (err) {
                                return reject(err)
                            }
                            return resolve("Ticket added to the shopping cart successfully");
                        })
                }
            })

    })
}

db.newPurchase = (purchaseData) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM purchase WHERE purchase.idUser = ? AND purchase.purchaseState = 1',
            [purchaseData.idUser], (err, results) => {
                if (err) {
                    return reject(err);
                }
                if (results.length === 0) {
                    pool.query('INSERT INTO purchase(purchaseDate, purchaseState, Payed, idUser) VALUES(CURDATE(),1,0,?)',
                        [purchaseData.idUser], (err, results) => {
                            if (err) {
                                return reject(err);
                            }
                            pool.query('SELECT * FROM purchase WHERE purchase.idUser = ? AND purchase.purchaseState = 1',
                                [purchaseData.idUser], (err, results) => {
                                    if (err) {
                                        return reject(err);
                                    }
                                    return resolve(results);
                                })
                        })
                }
                return resolve(results);
            })

    })
};
db.newTempPurchaseLine = (lineData) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM temp_purchaseline WHERE temp_purchaseline.idShow = ? AND temp_purchaseline.idDate = ?',
            [lineData.idShow, lineData.idDate],
            (err, results) => {
                if (err) {
                    return reject(err)
                }
                if (results.length > 0) {
                    console.log(lineData)
                    pool.query('UPDATE temp_purchaseline SET temp_purchaseline.quantity = temp_purchaseline.quantity + ?, temp_purchaseline.subtotal = temp_purchaseline.subtotal + ? WHERE temp_purchaseline.idShow = ? AND temp_purchaseline.idDate = ?',
                        [lineData.quantity, lineData.subtotal, lineData.idShow, lineData.idDate],
                        (err, results) => {
                            if (err) {
                                return reject(err)
                            }

                            return resolve("Ticket added to the shopping cart successfully");
                        })
                } else {
                    pool.query('INSERT INTO temp_purchaseline(idShow, idUser, quantity, subtotal, idDate) VALUES(?,?,?,?,?)',
                        [lineData.idShow, lineData.idUser, lineData.quantity, lineData.subtotal, lineData.idDate],
                        (err, results) => {
                            if (err) {
                                return reject(err)
                            }
                            return resolve("Ticket added to the shopping cart successfully");
                        })
                }
            })

    })
}
db.newPurchaseLine = (lineData) => {
    return new Promise((resolve, reject) => {
        //check if line with selected product already exists.
        pool.query('SELECT * FROM purchaseline WHERE shows.idShow = purchaseline.idShow AND purchaseline.idShow = ? AND shows.purchaseState = 1',
            [lineData.idShow], (err, results) => {
                if (err) {
                    return reject(err);
                }
                if (results.length > 0) {
                    pool.query('UPDATE purchaseline SET quantity += ? AND subTotal += ? * ? WHERE shows.idShow = purchaseline.idShow AND purchaseline.idShow = ? AND shows.purchaseState = 1',
                        [lineData.quantity, lineData.quantity, lineData.subTotal, lineData.idShow], (err, results) => {
                            if (err) {
                                return reject(err);
                            }
                            return resolve(results);
                        })
                } else {
                    pool.query('INSERT INTO purchaseline(idShow, idPurchase, quantity, subTotal, idDate) VALUES(?, ?, ?, ?,?)',
                        [lineData.idShow, lineData.idPurchase, lineData.quantity, lineData.quantity * lineData.subTotal, lineData, idDate], (err, results) => {
                            if (err) {
                                return reject(err);
                            }
                            return resolve(results);
                        })
                }

            })

    })
};

db.deleteLine = (id) => {
    return new Promise((resolve, reject) => {

        pool.query('DELETE * FROM purchaseline WHERE shows.idShow = purchaseline.idShow AND purchaseline.idShow = ? AND shows.purchaseState = 1 ',
            [id], (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            })
    })
};

module.exports = db;