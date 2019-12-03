"use strict";

let events = null;

function prepareEventReadView(){
    loadEvents(finishEventReadView);
}

function finishEventReadView(response){
    // Save the events array
    events = response;

    // Load information into elements
    convertEventToHtml();
    convertNextEventsToHtml();
}

function loadEvents(callback){
    // Prepare and send request
    let xhr = new XMLHttpRequest();
    let url = serverInfo.hostname + serverInfo.port + serverInfo.eventEndPoint;

    xhr.open("GET", url);
    xhr.send();

    xhr.onload = () => {
        let response = JSON.parse(xhr.response);

        if(xhr.status == 200){
            if(response.length == 0){
                alert("No hay eventos dados de alta");
            } else {
                // Execute callback
                callback(response);
            } 
        } else {
            alert(response.error);
        }
    };
    xhr.onerror = () => {
        alert("Hubo un error al cargar los eventos"); 
    };
}

function loadSingleEvent(idEvent, callback){
    // Prepare and send request
    let xhr = new XMLHttpRequest();
    let url = serverInfo.hostname + serverInfo.port + serverInfo.eventEndPoint + "/" + idEvent;

    xhr.open("GET", url);
    xhr.send();

    xhr.onload = () => {
        let response = JSON.parse(xhr.response);

        if(xhr.status == 200){
            callback(response[0]);
        } else {
            alert(response.error);
        }
    };
    xhr.onerror = () => {
        alert("Hubo un error al cargar el evento"); 
    };
}

function convertEventToHtml(){
    // Convert events to HTML
    let eventsHtml = events.map((element) => {
        return `
        <tr class="row-content">
            <td>${element.id}</td>
            <td>${element.nombreEvento}</td>
            <td>${element.fechaInicio}</td>
            <td>${element.fechaFin}</td>
            <td><a href="#" data-toggle="modal" data-target="#eventInformation" onclick="showMatches(${element.id})">Ver encuentros</a></td>
            <td>
            <a class="btn btn-danger edit" href="#" onclick="showDeleteEventModal(${element.id})">
                <i class="fa fa-trash"></i>
            </a>
            &nbsp;
            <a class="btn btn-info edit" href="#" onclick="goUpdateEvent(${element.id})">
                <i class="fa fa-pencil-square-o"></i>
            </a> 
            </td>
        </tr>
        `;
    }).join("");

    // Update table with events
    let tableEvents = document.getElementById("tableEvents");
    tableEvents.innerHTML = eventsHtml;
}

function convertNextEventsToHtml(){
    // Get current month
    let today = new Date();
    let month = today.getMonth() + 1;

    // Get all the events in the current month
    let nextEventsHtml = events.map((element) => {
        let elementMonth = Number.parseInt(element.fechaInicio.substring(5, 7));
        if(elementMonth != month)
            return ``;
        else
            return `
            <li>
                <table>
                    <tr>
                        <td rowspan="2">
                                <a class="btn btn-primary" href="#">
                                <i class="fa fa-calendar"></i>
                                </a>
                        </td>
                        <td>${element.fechaInicio}</td>
                    </tr>
                    <tr>
                        <td>${element.nombreEvento}</td>
                    </tr>
                </table>
            </li>
            `;
    }).join("");

    // Update side bar with events
    let listNextEvents = document.getElementById("listNextEvents");
    listNextEvents.innerHTML = nextEventsHtml;
}

async function showMatches(eventId){
    // Get the selected event
    let event = events.find((element) => {
        if(element.id == eventId)
            return true;
    });

    // Update event name
    let eventName = document.getElementById("eventName");
    eventName.innerText = event.nombreEvento;

    // Update event image
    let eventImage = document.getElementById("eventImageModal");
    eventImage.setAttribute("src", event.fotoEvento);

    // Get the name of all the matches related to the event
    let matches = new Array();
    for(let i = 0; i < event.encuentros.length; i++)
        matches.push(await getMatchById(event.encuentros[i]));

    // Convert matches to HTML
    let matchesHtml = matches.map((element) => {
        return `
            <li>${element.nombreEncuentro}</li>
        `;
    }).join("");

    // Update list of matches
    let matchesList = document.getElementById("matchesList");
    matchesList.innerHTML = matchesHtml;
}