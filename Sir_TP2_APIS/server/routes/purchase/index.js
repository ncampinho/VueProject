//All these API endpoints start with /api/tp2
const express = require('express');
const db = require('../../db/tables/Purchase_PurchaseLine');

const bodyParser = require('body-parser');

//Router allows to perform different types of request to the database
const router = express.Router();

//bodyParser -> allows to send a body of information typical of post requests
const urlencondedParser = bodyParser.urlencoded({extended:false});

//Endpoint to get purchases from a certain user
router.get('/user/purchases/:id', async (rq, res, next) =>{
    try{
        let results = await db.login(rq.params.id);
        res.json(results);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

//Endpoint that sends data to create a new purchase
router.post('/user/purchase/new', urlencondedParser, async (rq, res, next) =>{
    try{
        let results = await db.newPurchase(rq.body);
        res.json(results);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

//Endpoint that sends data to create a new purchase line
router.post('/user/purchase/newLine', urlencondedParser, async (rq, res, next) =>{
    try{
        let results = await db.newPurchaseLine(rq.body);
        res.json(results);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

//Endpoint to get all temporary purchase lines from a certain user
router.get('/user/purchase/getTempLine/:id', async (rq, res, next) =>{
    try{
        let results = await db.getTempPurchase(rq.params.id);
        res.json(results);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

//Endpoint that sends data to create a new temporary line
router.post('/user/purchase/newTempLine', urlencondedParser, async (rq, res, next) =>{
    try{
        let results = await db.newTempPurchaseLine(rq.body);
        res.json(results);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

//Endpoint that deletes a certain temporary purchase line
router.delete('/user/purchase/deleteLine/:id', urlencondedParser, async (rq, res, next) =>{
    try{
        let results = await db.deleteLine(rq.params.id);
        res.json(results);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

//Export all the routes(endpoints) available
module.exports = router;