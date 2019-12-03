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
        let team = await db.createTeam(req.body);
        res.status(201);
        res.send(team);
    });

router.route("/:id")
    .get(async (req, res) => {
        let team = await db.getTeamById(req.params.id);
        res.status(200);
        res.send(team);
    })
    .put(async (req, res) => {
        let team = await db.updateTeam(req.params.id, req.body);
        res.status(200);
        res.send(team);
    })
    .delete(async (req, res) => {
        let team = await db.deleteTeam(req.params.id);
        res.status(200);
        res.send(team);
    });

module.exports = router;