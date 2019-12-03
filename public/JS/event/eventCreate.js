"use strict";

loadEvents(getLastId);

let id = 0;
let event = {
    id: 1,
    encuentros: [],
    fotoEvento: "",
    nombreEvento: "",
    fechaInicio: "",
    fechaFin: ""
  };

let searchBar = document.getElementById("search");
let searchResults = document.getElementById("searchResults");
let createEventBtn = document.getElementById("createEventBtn");

createEventBtn.onclick = (e) => {
    createEvent(e);
};

function createEvent(e){
    // Get the information
    let eventName = document.getElementById("eventName").value;
    let dateStart = document.getElementById("dateStart").value;
    let dateEnd = document.getElementById("dateEnd").value;
    let eventImage = document.getElementById("eventImage").value;
    event.nombreEvento = eventName;
    event.fechaInicio = dateStart;
    event.fechaFin = dateEnd;
    event.fotoEvento = eventImage;

    // Check for invalid inputs
    let invalids = document.querySelectorAll("*:invalid").length;
    if(invalids > 0)
        return;

    e.preventDefault();

    // Prepare and send request
    let xhr = new XMLHttpRequest();
    let url = serverInfo.hostname + serverInfo.port + serverInfo.eventEndPoint;
    let data = JSON.stringify(event);

    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhr.send(data);

    xhr.onload = () => {
        let response = JSON.parse(xhr.response);

        if(xhr.status == 201){
            alert("Evento creado correctamente");
            window.location.href = "../HTML/showEvent.html"
        } else {
            alert(response.error);
        }
    };
    xhr.onerror = () => {
        alert("Hubo un error al crear el evento"); 
    };
}

// Behaviour in the search bar
searchBar.addEventListener("keyup", (event) => {
    if(searchBar.value.trim() == ""){
        searchResults.hidden = true;
    } else {
        searchResults.hidden = false;
    }

    // Retrieve the matches and load them in the view
    searchMatchByName(searchBar.value, loadResults);
});
searchBar.addEventListener("mouseout", (event) => {
    if(searchBar.value.trim() == ""){
        searchResults.hidden = true;
    } else {
        searchResults.hidden = false;
    }
});


function loadResults(response){
    // Filter matches already added
    let matches = response.filter((element) => {
        if(event.encuentros.find(id => id == element.id) === undefined)
            return true;
        else
            return false;
    });

    // Styles for events MouseOver and MouseOut
    let style1 = `onMouseOver="this.style.color='white';this.style.background='#266ae0'"`;
    let style2 = `onMouseOut="this.style.color='black';this.style.background='white'"`;

    // Map all the matches to HTML
    let matchesHtml = matches.map((element) => {
        return `
            <li class="list-group-item" ${style1} ${style2} onclick="linkMatchToEvent(${element.id})">${element.nombreEncuentro}</li>
        `;
    }).join("");;

    // Show results
    searchResults.innerHTML = "";
    searchResults.innerHTML = matchesHtml;
}

function linkMatchToEvent(id){
    // Add the match to the event
    event.encuentros.push(id);
    
    // Update View
    updateRelatedMatches();
    searchBar.value = "";
    searchResults.innerHTML = "";
    searchResults.hiden = true;
}

async function updateRelatedMatches(){
    // Get all the matches related to the event
    let matches = new Array();
    for(let i = 0; i < event.encuentros.length; i++)
        matches.push(await getMatchById(event.encuentros[i]));

    // Convert matches to HTML
    let matchesHtml = matches.map((element) => {
        return `
            <li class="list-group-item">${element.nombreEncuentro}</li>
        `;
    }).join("");

    // Show the matches related to the event
    let listOfMatches = document.getElementById("matchesAdded");
    listOfMatches.innerHTML = matchesHtml;
}

function getLastId(response){
    events = response;
    event.id = events.pop().id + 1;
}