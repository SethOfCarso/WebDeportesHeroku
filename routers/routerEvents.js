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
        let bodyEventInfo = checkBodyEvent(req.body);
        if(bodyEventInfo.length > 7){
            res.status(400);
            res.send({error: bodyEventInfo});
        } else {
            let mongoResponse = await db.createEvent(req.body);
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
        let event = await db.getEventById(req.params.id);
        res.status(200);
        res.send(event);
    })
    .put(async (req, res) => {
        let bodyEventInfo = checkBodyEvent(req.body);
        if(bodyEventInfo.length > 7){
            res.status(400);
            res.send({error: bodyEventInfo});
        } else {
            let mongoResponse = await db.updateEvent(req.params.id, req.body);
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
        let event = await db.deleteEvent(req.params.id);
        res.status(200);
        res.send(event);
    });

let eventData = new Array("id", "fotoEvento", "nombreEvento", "fechaInicio", "fechaFin", "encuentros");

function checkBodyEvent(bodyRequest){
    let info = "Falta: ";
    // Search for a missing property
    eventData.forEach((element) => {
        if(bodyRequest[element] === undefined)
            info += element + ", " 
    });

    return info;
}

module.exports = router;