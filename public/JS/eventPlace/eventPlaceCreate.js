"use strict";

loadEventPlaces(getLastId);

let eventPlace = {
    id: 1,
    idDisciplinas: [],
    fotoLugarEvento: "",
    nombreLugarEvento: "",
    direccion: "",
    descripcion: ""
  };

let searchBar = document.getElementById("search");
let searchResults = document.getElementById("searchResults");
let createEventPlaceBtn = document.getElementById("createEventPlaceBtn");

createEventPlaceBtn.onclick = (e) => {
    createEventPlace(e);
};

function createEventPlace(e){
    // Get the information
    let eventPlaceName = document.getElementById("eventPlaceName").value;
    let eventPlaceDescription = document.getElementById("eventPlaceDescription").value;
    let eventPlaceAddress = document.getElementById("eventPlaceAddress").value;
    let eventPlaceImage = document.getElementById("eventPlaceImage").value;
    eventPlace.nombreLugarEvento = eventPlaceName;
    eventPlace.descripcion = eventPlaceDescription;
    eventPlace.direccion = eventPlaceAddress;
    eventPlace.fotoLugarEvento = eventPlaceImage;

    // Check for invalid inputs
    let invalids = document.querySelectorAll("*:invalid").length;
    if(invalids > 0)
        return;

    e.preventDefault();

    // Prepare and send request
    let xhr = new XMLHttpRequest();
    let url = serverInfo.hostname + serverInfo.port + serverInfo.eventPlaceEndPoint;
    let data = JSON.stringify(eventPlace);

    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhr.send(data);

    xhr.onload = () => {
        let response = JSON.parse(xhr.response);

        if(xhr.status == 201){
            alert("Lugar creado correctamente");
            window.location.href = "../HTML/showEventPlace.html"
        } else {
            alert(response.error);
        }
    };
    xhr.onerror = () => {
        alert("Hubo un error al crear el lugar"); 
    };
}

// Behaviour in the search bar
searchBar.addEventListener("keyup", (event) => {
    if(searchBar.value.trim() == ""){
        searchResults.hidden = true;
    } else {
        searchResults.hidden = false;
    }

    // Retrieve the disciplines and load them in the view
    searchDisciplineByName(searchBar.value, loadResults);
});
searchBar.addEventListener("mouseout", (event) => {
    if(searchBar.value.trim() == ""){
        searchResults.hidden = true;
    } else {
        searchResults.hidden = false;
    }
});


function loadResults(response){
    // Filter disciplines already added
    let disciplines = response.filter((element) => {
        if(eventPlace.idDisciplinas.find(id => id == element.id) === undefined)
            return true;
        else
            return false;
    });

    // Styles for eventPlaces MouseOver and MouseOut
    let style1 = `onMouseOver="this.style.color='white';this.style.background='#266ae0'"`;
    let style2 = `onMouseOut="this.style.color='black';this.style.background='white'"`;

    // Map all the disciplines to HTML
    let disciplinesHtml = disciplines.map((element) => {
        return `
            <li class="list-group-item" ${style1} ${style2} onclick="linkDisciplineToEventPlace(${element.id})">${element.nombreDisciplina}</li>
        `;
    }).join("");;

    // Show results
    searchResults.innerHTML = "";
    searchResults.innerHTML = disciplinesHtml;
}

function linkDisciplineToEventPlace(id){
    // Add the discipline to the event place
    eventPlace.idDisciplinas.push(id);
    
    // Update View
    updateRelatedDisciplines();
    searchBar.value = "";
    searchResults.innerHTML = "";
    searchResults.hiden = true;
}

function updateRelatedDisciplines(){
    // Get all the disciplines related to the event place
    let disciplines = new Array();
    for(let i = 0; i < eventPlace.idDisciplinas.length; i++)
        disciplines.push(getDisciplineById(eventPlace.idDisciplinas[i]));

    // Convert disciplines to HTML
    let disciplinesHtml = disciplines.map((element) => {
        return `
            <li class="list-group-item">${element.nombreDisciplina}</li>
        `;
    }).join("");

    // Show the matches related to the event
    let listOfDisciplines = document.getElementById("disciplinesAdded");
    listOfDisciplines.innerHTML = disciplinesHtml;
}

function getLastId(response){
    eventPlaces = response;

    eventPlace.id = eventPlaces.pop().id + 1;
}