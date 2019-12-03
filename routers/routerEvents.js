const express = require("express");
const router = express.Router();
const db = require("../database/databaseEvent.js");

router.route("/")
    .get(async (rq, res) => {
        let events = await db.getEvents();
        res.status(200);
        res.send(events);
    })
    .post(async (req, res) => {
        let event = await db.createEvent(req.body);
        res.status(201);
        res.send(event);
    });

router.route("/:id")
    .get(async (req, res) => {
        let event = await db.getEventById(req.params.id);
        res.status(200);
        res.send(event);
    })
    .put(async (req, res) => {
        let event = await db.updateEvent(req.params.id, req.body);
        res.status(200);
        res.send(event);
    })
    .delete(async (req, res) => {
        let event = await db.deleteEvent(req.params.id);
        res.status(200);
        res.send(event);
    });

module.exports = router;