//All these API endpoints start with /api/tp2
const express = require('express');
const db = require('../../db/tables/Shows');

//Router allows to perform different types of request to the database
const router = express.Router();

//Endpoint that gets all shows created
router.get('/shows', async (rq, res, next) =>{
    try{
        
        let results = await db.all();
        res.json(results);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

//Endpoint that gets a particular show
router.get('/show/:id', async (rq, res, next) =>{
    try{
        let results = await db.one(rq.params.id);
        res.json(results);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

//Endpoint that gets a show by its name
router.get('/show/name/:name', async (rq, res, next) =>{
    try{
        let results = await db.byName(rq.params.name);
        res.json(results);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

//Endpoint that gets a show by its type
router.get('/show/type/:type', async (rq, res, next) =>{
    try{
        let results = await db.byType(rq.params.type);
        res.json(results);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

//Endpoint that gets a show by its name and type
router.get('/show/nameType/:name,:type', async (rq, res, next) =>{
    try{
        let results = await db.byNameType(rq.params.name, rq.params.type);
        res.json(results);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

//Endpoint that gets a show by its rating
router.get('/show/rating/:rating', async (rq, res, next) =>{
    try{
        let results = await db.byRating(rq.params.rating);
        res.json(results);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

//Endpoint that gets a show by its name and rating
router.get('/show/nameRating/:name,:rating', async (rq, res, next) =>{
    try{
        let results = await db.byNameRating(rq.params.name, rq.params.rating);
        res.json(results);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

//Export all the routes(endpoints) available
module.exports = router;