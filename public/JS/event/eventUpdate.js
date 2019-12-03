"use strict";

let event = null;

let searchBar = document.getElementById("search");
let searchResults = document.getElementById("searchResults");

function goUpdateEvent(idEvent){
    window.location.href = "../HTML/modifyEvent.html" + "?id=" + idEvent;
}


function loadAll(){
    // Get the parameter in the URL
    let url = new URL(window.location);
    let idEvent = url.searchParams.get("id");
    
    loadSingleEvent(idEvent, finishEventUpdateView);
}

function prepareEventUpdateView(){
    setTimeout(loadAll, 300);
}

function finishEventUpdateView(response){
    // Save the event
    event = response;

    // Load information into the view
    fillEventFields();

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
}

function fillEventFields(){
    // Load all the fields with the event information
    let eventName = document.getElementById("eventName");
    let dateStart = document.getElementById("dateStart");
    let dateEnd = document.getElementById("dateEnd");
    let eventImage = document.getElementById("eventImage");
    eventName.value = event.nombreEvento;
    dateStart.value = event.fechaInicio;
    dateEnd.value = event.fechaFin;
    eventImage.value = event.fotoEvento;

    updateRelatedMatches();
}

function updateEvent(elementEvent){
    elementEvent.preventDefault();
    // Get the new information
    let eventName = document.getElementById("eventName").value;
    let dateStart = document.getElementById("dateStart").value;
    let dateEnd = document.getElementById("dateEnd").value;
    let eventImage = document.getElementById("eventImage").value;
    event.nombreEvento = eventName;
    event.fechaInicio = dateStart;
    event.fechaFin = dateEnd;
    event.fotoEvento = eventImage;

    // Prepare and send request
    let xhr = new XMLHttpRequest();
    let url = serverInfo.hostname + serverInfo.port + serverInfo.eventEndPoint + "/" + event.id;
    let data = JSON.stringify(event);

    xhr.open("PUT", url);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhr.send(data);

    xhr.onload = () => {
        if(xhr.status == 200){
            alert("Evento modificado correctamente");
            window.location.href = "../HTML/showEvent.html"
        } else {
            alert(response.error);
        }
    };
    xhr.onerror = () => {
        alert("Hubo un error actualizar el evento"); 
    };

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
