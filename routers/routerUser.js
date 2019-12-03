const express = require("express");
const router = express.Router();

const db = require("../database/databaseUser.js");

router.route("/")
    .get(async (req, res) => {
        db.getUserLogin();
        let users = null;
        let userName = req.query.nombre;
        
        if(userName !== undefined){
            users = await db.getUserByName(userName);
        } else {
            users =  await (db.getUserLogin())
            users = JSON.stringify(users)
        }

        res.status(200);
        res.send(users);
    })
    .post((req, res) => {
        console.log(req.body);
        let users =  db.createUsers(req.body);
        res.status(201)
        res.send(users)
    })
    .delete((req,res ) =>{
        res.send("Eliminado")
    });


router.route("/:email")
    .get(async(req, res) => {
        db.getUserLogin();
        let users =  await (db.getUserLogin())
        users = JSON.stringify(users)
        res.send(users)
         
    })
    .post((req,res) =>{
        res.send("Post de email")
    })
    .put((req, res) => {
        let body = req.body
        // console.log(body);
        db.updateUser(body);
        res.send("Actualizado")
    })
    .delete((req, res) => {
        res.send("Eliminado")
    });


    
router.route("/id/:id")
    .get((req, res) => {
        res.send("get")
         
    })
    .post(async(req,res) =>{
        let body = req.body;
        // console.log(body);
        let user = await db.deleteId(body)
        console.log(user);
        res.status(202)
        res.send(user)
        
    })
    .put((req, res) => {

        res.send("Actualizado")
    })
    .delete((req, res) => {
        res.send("delete")
    });


module.exports = router;