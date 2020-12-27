const express = require('express');
const db = require('../../db/tables/Users');

const bodyParser = require('body-parser');

const router = express.Router();

const urlencondedParser = bodyParser.urlencoded({extended:false});

//From this stage all apis start with /api/tp2
router.get('/user/login/:username,:password', async (rq, res, next) =>{
    try{
        let results = await db.login(rq.params.username, rq.params.password);
        res.json(results);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/user/registration', urlencondedParser,async (rq, res, next) =>{
    try{
        let results = await db.register(rq.body);
        res.headers("Access-Control-Allow-Origin", "*")
        res.json(results);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/user/writeComment', urlencondedParser,async (rq, res, next) =>{
    try{
        let results = await db.writeComment(rq.body);
        res.json(results);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

router.put('/user/likeComment/:id', urlencondedParser,async (rq, res, next) =>{
    try{
        let results = await db.likeComment(rq.params.id);
        res.json(results);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

router.put('/user/unlikeComment/:id', urlencondedParser,async (rq, res, next) =>{
    try{
        let results = await db.unlikeComment(rq.params.id);
        res.json(results);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = router;