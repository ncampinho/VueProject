const express = require('express');
const db = require('../../db/tables/Purchase_PurchaseLine');

const bodyParser = require('body-parser');

const router = express.Router();

const urlencondedParser = bodyParser.urlencoded({extended:false});

router.get('/user/purchases/:id', async (rq, res, next) =>{
    try{
        let results = await db.login(rq.params.id);
        res.json(results);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/user/purchase/new', urlencondedParser, async (rq, res, next) =>{
    try{
        let results = await db.newPurchase(rq.body);
        res.json(results);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/user/purchase/newLine', urlencondedParser, async (rq, res, next) =>{
    try{
        let results = await db.newPurchaseLine(rq.body);
        res.json(results);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/user/purchase/newTempLine', urlencondedParser, async (rq, res, next) =>{
    try{
        let results = await db.newTempPurchaseLine(rq.body);
        res.json(results);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

router.delete('/user/purchase/deleteLine/:id', urlencondedParser, async (rq, res, next) =>{
    try{
        let results = await db.deleteLine(rq.params.id);
        res.json(results);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = router;