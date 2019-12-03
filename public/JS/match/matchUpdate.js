"use strict"

let idMatch = localStorage.getItem("idMatch")


let dateMatch = document.getElementById("dateMatch")
let firstNameTeam = document.getElementById("firstTeam")
let secondNameTeam = document.getElementById("secondTeam")
let scoreFirstTeam = document.getElementById("scoreFirstTeam")
let scoreSecondTeam = document.getElementById("scoreSecondTeam")
let disciplineMatch = document.getElementById("teamDiscipline")
let btnUpdateMatch = document.getElementById("btnUpdateMatch")
let placeMatch = document.getElementById("eventPlace")
let juezMatch = document.getElementById("idJuez")

// Cargar datos
loadSingleMatch(idMatch)


let places = null
function loadPlaces(placeObject) {
    // console.log(placeObject);
    places = placeObject
    for(let i = 0; i < places.length ; i++){
        // console.log("places" + places[i].id);
        // console.log("SingleMatch : " + singleMatch[0].idLugarEvento);
        if(places[i].id === singleMatch[0].idLugarEvento){
            // console.log("Ya lo encontre y es: " + places[i]);
            places = places[i]
        }
    }
}

let matches = {
    _id: "",
    id: 2,
    nombreEncuentro: "",
    idLugarEvento: 2,
    score: "",
    fechaEncuentro: "",
    idJueces: []
}
setTimeout(function(){
    loadEventPlaces(loadPlaces)
    secondLoad()
},300);

function secondLoad(){
    setTimeout(function(){
        insertDataInHtml(singleMatch)
    },300);
}

let nameJuez = null
let scoreFinal = null
function insertDataInHtml(matchObjetct) {
    // console.log(matchObjetct);
    dateMatch.value = matchObjetct[0].fechaEncuentro.slice(0,10);
    let nombreEquipos = matchObjetct[0].nombreEncuentro
    
    let nombre = nombreEquipos.split(" ");
    // console.log(nombre[0]);
    firstNameTeam.value = nombre[0];
    secondNameTeam.value = nombre[2];
    placeMatch.value = places.nombreLugarEvento
    // El juez es matchObjetct[0].idJueces obtener nombre
    for(let i = 0; i< users.length; i++){
        if(users[i].id == matchObjetct[0].idJueces){
            nameJuez = users[i].nombre + " " +  users[i].apellido 
            // console.log(users[i].nombre + " " +  users[i].apellido);
        }
    }
    juezMatch.value = nameJuez;
    scoreFinal = matchObjetct[0].score
    let scoreTemp = scoreFinal.split(";")
    scoreTemp = scoreTemp[0].split(":")
    // console.log(scoreTemp[0]);
    scoreFirstTeam.value = scoreTemp[0]
    scoreSecondTeam.value = scoreTemp[1]
    
}

let singleMatch = null;
function loadSingleMatch(e){
    let myMatch = {
        id : ""
    }
    // Prepare and send request
    let xhr = new XMLHttpRequest();
    let url = serverInfo.hostname + serverInfo.port + serverInfo.matchEndPoint
    +"/id" +"?id=" + e;
    myMatch.id = e
    

    xhr.open("GET", url);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhr.send(null);

    xhr.onload = () => {
        // console.log(xhr.response);
        let response = JSON.parse(xhr.response);
        // console.log(response);
        if(xhr.status == 201){
            //alert("Se elimino el encuentro, volviendo a cargar la pagina");
            //window.location.href = "../HTML/showTeam.html"
            singleMatch = response;
            // console.log("Si existe un match asi");
            }
            else{
                console.log("No fue 202");
            }
    };
    xhr.onerror = () => {
        alert("Hubo un error al cargar el match");
    };
}
btnUpdateMatch.onclick = (e)=>{
    updateMatch()
}

function updateMatch() {
    let matches = {
        _id:"",
        id: 2,
        nombreEncuentro: "",
        idLugarEvento: 2,
        score: "",
        fechaEncuentro: "",
        idJueces: []
    }
    
    singleMatch = singleMatch[0]
    matches._id = singleMatch._id
    matches.id = singleMatch.id
    matches.nombreEncuentro = singleMatch.nombreEncuentro;
    matches.idLugarEvento = singleMatch.idLugarEvento
    // Actualizar score
    let scoreTemp = singleMatch.score
    let equipos = scoreTemp.split(";")
    let teams = equipos[1]
    let newScore = scoreFirstTeam.value +":" + scoreSecondTeam.value
    newScore = newScore+";"+teams
    matches.score = newScore
    matches.fechaEncuentro = singleMatch.fechaEncuentro
    matches.idJueces = singleMatch.idJueces
    console.log(matches);

    
// Prepare and send request
let xhr = new XMLHttpRequest();
let url = serverInfo.hostname + serverInfo.port + serverInfo.matchEndPoint
+"/e"

let data = JSON.stringify(matches);

xhr.open("PUT", url);
xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
xhr.send(data);


xhr.onload = () => {
    if(xhr.status == 200){
        
        alert("Encuentro modificado correctamente");
        window.location.href = "../HTML/encuentros.html"
    } else {
        alert(response.error);
    }
};
xhr.onerror = () => {
    alert("Hubo un error actualizar el encuentro"); 
};

}