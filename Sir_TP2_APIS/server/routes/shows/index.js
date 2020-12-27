const express = require('express');
const db = require('../../db/tables/Shows');

const router = express.Router();

//From this stage all apis start with /api/tp2
router.get('/shows', async (rq, res, next) =>{
    try{
        let results = await db.all();
        res.json(results);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/show/:id', async (rq, res, next) =>{
    try{
        let results = await db.one(rq.params.id);
        res.json(results);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/show/name/:name', async (rq, res, next) =>{
    try{
        let results = await db.byName(rq.params.name);
        res.json(results);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/show/type/:type', async (rq, res, next) =>{
    try{
        let results = await db.byType(rq.params.type);
        res.json(results);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/show/nameType/:name,:type', async (rq, res, next) =>{
    try{
        let results = await db.byNameType(rq.params.name, rq.params.type);
        res.json(results);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/show/rating/:rating', async (rq, res, next) =>{
    try{
        let results = await db.byRating(rq.params.rating);
        res.json(results);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/show/nameRating/:name,:rating', async (rq, res, next) =>{
    try{
        let results = await db.byNameRating(rq.params.name, rq.params.rating);
        res.json(results);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = router;