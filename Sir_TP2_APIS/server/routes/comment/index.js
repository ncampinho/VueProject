const express = require('express');
const db = require('../../db/tables/Comment');

const bodyParser = require('body-parser');

const router = express.Router();

const urlencondedParser = bodyParser.urlencoded({extended:false});

router.get('/shows/comments/:id', async (rq, res, next) =>{
    try{
        let results = await db.allComments(rq.params.id);
        res.json(results);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = router;