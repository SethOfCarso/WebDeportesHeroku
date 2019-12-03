const express = require("express");
const router = express.Router();
const db = require("../database/databaseMatch.js");

router.route("/")
    .get(async (req, res) => {
        let matches = null;
        let matchName = req.query.nombreEncuentro;
        
        if(matchName !== undefined){
            matches = await db.getMatchByName(matchName);
        } else {
            matches = await db.getMatches();
        }
        
        res.status(200);
        res.send(matches);
    })
    .post(async (req, res) => {
        let body = req.body
        console.log(body);
        let match = null;
        match = await db.createMatch(body);
        res.status(201);
        res.send(match);
    })
    .put(async (req, res) =>{
        let body = req.body;
        console.log(body);
        let matches = await db.deleteMatch(body.id)
        res.status(202)
        res.send(matches)
    });

router.route("/:id")
    .get(async(req, res) => {
        let idMatch = req.query
        let fullMatch = await db.getMatchById(idMatch.id)
        // console.log(fullMatch);
        res.status(201)
        // console.log(fullMatch);
        res.send(fullMatch);
    })
    .post((req, res) => {
        
        res.send()
    })
    .put(async(req,res)=>{
        let body = req.body
        let match = db.updateMatch(body)
        res.status(200)
        res.send(match)
    })
    .delete((req, res) => {
        res.send()
    });

module.exports = router;