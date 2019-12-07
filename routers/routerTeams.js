const express = require("express");
const router = express.Router();
const db = require("../database/databaseTeam.js");

router.route("/")
    .get(async (req, res) => {
        let teams = null;
        teams = await db.getTeams();
        
        res.status(200);
        res.send(teams);
    })
    .post(async (req, res) => {
        let bodyTeamInfo = checkBodyTeam(req.body);
        if(bodyTeamInfo.length > 7){
            res.status(400);
            res.send({error: bodyTeamInfo});
        } else {
            let mongoResponse = await db.createTeam(req.body);
            if(mongoResponse.error !== undefined){
                res.status(400);
                res.send({error: mongoResponse.error}); 
            } else {
                res.status(201);
                res.send(mongoResponse);
            }
        }
    });

router.route("/:id")
    .get(async (req, res) => {
        let team = await db.getTeamById(req.params.id);
        res.status(200);
        res.send(team);
    })
    .put(async (req, res) => {
        let bodyTeamInfo = checkBodyTeam(req.body);
        if(bodyTeamInfo.length > 7){
            res.status(400);
            res.send({error: bodyTeamInfo});
        } else {
            let mongoResponse = await db.updateTeam(req.params.id, req.body);
            if(mongoResponse.error !== undefined){
                res.status(400);
                res.send({error: mongoResponse.error}); 
            } else {
                res.status(200);
                res.send(mongoResponse);
            }
        }
    })
    .delete(async (req, res) => {
        let team = await db.deleteTeam(req.params.id);
        res.status(200);
        res.send(team);
    });

let teamData = new Array("id", "fotoEquipo", "nombreEquipo", "autorizado", "idCapitan", "idDisciplina", "idIntegrantes");

function checkBodyTeam(bodyRequest){
    let info = "Falta: ";
    // Search for a missing property
    teamData.forEach((element) => {
        if(bodyRequest[element] === undefined)
            info += element + ", " 
    });

    return info;
}

module.exports = router;