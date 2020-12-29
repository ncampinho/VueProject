const pool = require('../../dbconnection');

let db = {};

db.login = (username,password) => {
    return new Promise((resolve, reject) => {
        console.log(username, password)
       pool.query('Select * from user, zipcode, usertype where user.idZipCode = zipcode.idZipCode AND user.idUserType = usertype.idUserType AND usertype.userTypeName = "user" AND user.username = ? AND user.password = ?', [username,password], (err, results) => {
           if(err){
               return reject(err);
           }
        
           return resolve(results);
       }) 
    })
};

db.register = (userData) => {
    return new Promise((resolve, reject) => {
        console.log(userData)
        pool.query('Select * from user where user.email = ? OR user.username = ?',
        [userData.email, userData.username],(err, results) => {
            if(err){
                return reject(err)
            }
            if(results.length > 0){
                return resolve("Username or email already exists")
            }
            pool.query('INSERT INTO user(username,password,name,nif,email,idZipCode,idUserType) VALUES(?, ?, ?, ?, ?, ?, 1)', 
            [userData.username, userData.password, userData.name, userData.nif, userData.email, userData.idZipCode], (err, results) => {
           if(err){
               return reject(err);
           }
           return resolve(results);
       })
        })
    })
};

db.writeComment = (commentData) => {
    return new Promise((resolve, reject) => {
        
       pool.query('INSERT INTO comment(comentText, idUser, idReply, idShow) VALUES(?,?,?,?)', 
       [commentData.comentText, commentData.idUser, commentData.idReply, commentData.idShow], (err, results) => {
           if(err){
               return reject(err);
           }
           return resolve(results);
       }) 
    })
};

db.likeComment = (id) => {
    return new Promise((resolve, reject) => {
        
       pool.query('UPDATE comment SET numberLikes += 1 WHERE idComment = ?', 
       [id], (err, results) => {
           if(err){
               return reject(err);
           }
           return resolve(results);
       }) 
    })
};

db.unlikeComment = (id) => {
    return new Promise((resolve, reject) => {
        
       pool.query('UPDATE comment SET numberLikes -= 1 WHERE idComment = ?', 
       [id], (err, results) => {
           if(err){
               return reject(err);
           }
           return resolve(results);
       }) 
    })
};

module.exports = db;