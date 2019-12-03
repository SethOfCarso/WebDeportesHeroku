const express = require("express");
const router = express.Router();
const db = require("../database/databaseEventPlace.js");

router.route("/")
    .get(async (rq, res) => {
        let eventPlaces = await db.getEventPlaces();
        res.status(200);
        res.send(eventPlaces);
    })
    .post(async (req, res) => {
        let eventPlace = await db.createEventPlace(req.body);
        res.status(201);
        res.send(eventPlace);
    });

router.route("/:id")
    .get(async (req, res) => {
        let eventPlace = await db.getEventPlaceById(req.params.id);
        res.status(200);
        res.send(eventPlace);
    })
    .put(async (req, res) => {
        let eventPlace = await db.updateEventPlace(req.params.id, req.body);
        res.status(200);
        res.send(eventPlace);
    })
    .delete(async (req, res) => {
        let eventPlace = await db.deleteEventPlace(req.params.id);
        res.status(200);
        res.send(eventPlace);
    });

module.exports = router;