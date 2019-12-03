"use strict";
// VARIABLES
const express = require("express");
const cors = require("cors");   // https://developer.mozilla.org/es/docs/Web/HTTP/Access_control_CORS
const routerEvents = require('./routers/routerEvents');   // Add event's router reference
const routerEventPlaces = require('./routers/routerEventPlaces');   // Add event place's router reference
const routerMatches = require('./routers/routerMatches'); // Add matche's router reference
const routerDisciplines = require('./routers/routerDisciplines'); // Add discipline's router reference
const routerUsers = require("./routers/routerUser");   // Add user's router reference
const routerTeams = require("./routers/routerTeams");   // Add user's router reference
const app = express();
// const port = 3000;
let port = process.env.PORT || 3000

// MIDDLEWARE
app.use(express.json());
app.use(express.static(__dirname+"/public")) //Camb
app.use(express.static(__dirname+"/public/HTML"))
app.use(cors());
app.use('/api/evento', routerEvents);               // Enable event's router in that endpoint
app.use('/api/lugarevento', routerEventPlaces);     // Enable event place's router in that endpoint
app.use('/api/encuentro', routerMatches);           // Enable matche's router in that endpoint
app.use('/api/disciplina', routerDisciplines);      // Enable discipline's router in that endpoint
app.use('/api/user', routerUsers);               // Enable users's router in that endpoint
app.use('/api/equipo', routerTeams);               // Enable Teams's router in that endpoint



// ENDPOINTS
// Root
app.route("/")
    .get((req,res) => {
        res.send("GET /");
    })
    .post((req,res) => {
        res.send("POST /");
    })
    .delete((req,res) => {
        res.send("DELETE /");
    })
    .put((req,res) => {
        res.send("PUT /");
    });



// START SERVER
app.listen(port, () => console.log("http://localhost:" + port));