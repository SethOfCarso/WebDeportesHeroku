"use strict"

let dateMatch = document.getElementById("dateMatch")
let firstNameTeam = document.getElementById("firstTeam")
let secondNameTeam = document.getElementById("secondTeam")
let scoreFirstTeam = document.getElementById("scoreFirstTeam")
let scoreSecondTeam = document.getElementById("scoreSecondTeam")
let disciplineMatch = document.getElementById("teamDiscipline")
let btnCreateMatch = document.getElementById("btnCreateMatch")
let placeMatch = document.getElementById("eventPlace")
let juezMatch = document.getElementById("idJuez")




btnCreateMatch.onclick = (e) =>{
    createMatch(e)
}

setTimeout(function() {
    loadTeams(loadTeams1)
    loadEvents(loadEventsPlaces)
    loadEventPlaces(loadEventsPlaces)
    loadJuez(users);
    loadEventPlaces1()
    secondLoad()
},300)

function secondLoad(){
    setTimeout(function() {
        insertHtmlTeam()
        insertHtmlPlaces()
    },300)

}

let allEventsPlaces = null
function loadEventsPlaces(places){
    allEventsPlaces = places;
}

function loadJuez(users) {
    let userLen = users.length
    for(let i = 0; i< userLen; i++){
        if(users[i].tipoUsuario == "Juez"){
            juezMatch.innerHTML += generatorJuez(users[i]);
    }
    }
}

let allTeams = null
function loadTeams1(teams){
    allTeams = teams;
}
function insertHtmlPlaces(){
    let placesLen = myplaces.length;
    console.log(placesLen);
    for(let i = 0; i < placesLen; i++){
        placeMatch.innerHTML += generatorPlaces(myplaces[i])
    }
}

function generatorJuez(juez){
    return`
    <option value="${juez.id}">${juez.nombre +" "+ juez.apellido}</option>
    `
}

function insertHtmlTeam(){
    let teamLen = allTeams.length;
    // console.log(teamLen);
    for(let i = 0; i < teamLen; i++){
        firstNameTeam.innerHTML += generatorTeamOne(allTeams[i])
        secondNameTeam.innerHTML += generatorTeamOne(allTeams[i])
    }
    
}

function generatorDiscipline(disciplineName){
    return`
    <option value="${disciplineName.id}">${disciplineName.nombreDisciplina}</option>
    `
}

function generatorPlaces(places){
    return`
    <option value="${places.id}">${places.nombreLugarEvento}</option>
    `
}

function generatorTeamOne(teamName){
    return`
    <option value="${teamName.id}">${teamName.nombreEquipo}</option>
    `

}


// Objetcto
let matches = {
    id: 2,
    nombreEncuentro: "",
    idLugarEvento: 2,
    score: "",
    fechaEncuentro: "",
    idJueces: []
}


function createMatch(e) {
    /**
     * link values.
     */
    let firstTeam = firstNameTeam.value;
    let secondTeam = secondNameTeam.value;
    let firstScore = scoreFirstTeam.value;
    let secondScore = scoreSecondTeam.value;
    let Juez = juezMatch.value;
    let date = dateMatch.value;
    let place = placeMatch.value;

    /**
     * Link value with object
     */
    
    matches.id = getRandomID();
    matches.nombreEncuentro = allTeams[firstTeam - 1].nombreEquipo + " vs " +  allTeams[secondTeam-1].nombreEquipo
    matches.idLugarEvento = place;
    //Score = scoreTeam1 : scoreTeam2 ; idTeam1: idTeam2
    matches.score = firstScore+":"+secondScore+";"+firstTeam+":"+secondTeam;
    matches.fechaEncuentro = date;
    //Dummy por el momento
    matches.idJueces.push(Juez)
    console.log(matches.idJueces);
    
    //to-do checar inputs invalidos

    // Check for invalid inputs
    // let invalids = document.querySelectorAll("*:invalid").length;
    // if(invalids > 0)
    //     return;

    // e.preventDefault();

        // Prepare and send request
        let xhr = new XMLHttpRequest();
        let url = serverInfo.hostname + serverInfo.port + serverInfo.matchEndPoint;
        console.log(matches);
        let data = JSON.stringify(matches);


        xhr.open("POST", url);
        // xhr.setRequestHeader("Access-Control-Allow-Origin", "<origin> | *")
        xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        
        xhr.send(data);

        xhr.onload = () => {
            console.log(xhr.response);
            let response = JSON.parse(xhr.response);
            console.log(response);

            if(xhr.status == 201){
                alert("Match creado correctamente redireccionando a los matches");
                window.location.href = "../HTML/encuentros.html"
            } else {
                alert(response.error);
            }
        };
        xhr.onerror = () => {
            console.log(xhr.status);
            console.log(xhr.statusText);
            alert("Hubo un error al crear un el encuentro"); 
        };

}
let myplaces = null;
function loadEventPlaces1(){
    // Prepare and send request
    let xhr = new XMLHttpRequest();
    let url = serverInfo.hostname + serverInfo.port + serverInfo.eventPlaceEndPoint;

    xhr.open("GET", url);
    xhr.send();

    xhr.onload = () => {
        let response = JSON.parse(xhr.response);

        if(xhr.status == 200){
            if(response.length == 0){
                alert("No hay lugares dados de alta");
            } else {
                // Execute callback
                myplaces = response;
            } 
        } else {
            alert(response.error);
        }
    };
    xhr.onerror = () => {
        alert("Hubo un error al cargar los lugares"); 
    };
}

function getRandomID(){
    let id = Math.floor(Math.random() * 10000000)
    return id
}