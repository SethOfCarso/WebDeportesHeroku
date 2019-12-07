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
        let bodyEventPlaceInfo = checkBodyEventPlace(req.body);
        if(bodyEventPlaceInfo.length > 7){
            res.status(400);
            res.send({error: bodyEventPlaceInfo});
        } else {
            let mongoResponse = await db.createEventPlace(req.body);
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
        let eventPlace = await db.getEventPlaceById(req.params.id);
        res.status(200);
        res.send(eventPlace);
    })
    .put(async (req, res) => {
        let bodyEventPlaceInfo = checkBodyEventPlace(req.body);
        if(bodyEventPlaceInfo.length > 7){
            res.status(400);
            res.send({error: bodyEventPlaceInfo});
        } else {
            let mongoResponse = await db.updateEventPlace(req.params.id, req.body);
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
        let eventPlace = await db.deleteEventPlace(req.params.id);
        res.status(200);
        res.send(eventPlace);
    });

let eventPlaceData = new Array("id", "fotoLugarEvento", "nombreLugarEvento", "direccion", "descripcion", "idDisciplinas");

function checkBodyEventPlace(bodyRequest){
    let info = "Falta: ";
    // Search for a missing property
    eventPlaceData.forEach((element) => {
        if(bodyRequest[element] === undefined)
            info += element + ", " 
    });

    return info;
}

module.exports = router;