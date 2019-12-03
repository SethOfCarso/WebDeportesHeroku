const express = require("express");
const router = express.Router();
const db = require("../database/databaseDiscipline.js");

router.route("/")
    .get(async (req, res) => {
        let disciplines = null;
        let disciplineName = req.query.nombreDisciplina;
        
        if(disciplineName !== undefined){
            disciplines = await db.getDisciplineByName(disciplineName);
        } else {
            disciplines = await db.getDisciplines();
        }
        
        res.status(200);
        res.send(disciplines);
    })
    .post(async (req, res) => {
        res.send();
    });

router.route("/:id")
    .get((req, res) => {
        res.send();
    })
    .put((req, res) => {
        res.send()
    })
    .delete((req, res) => {
        res.send()
    });

module.exports = router;