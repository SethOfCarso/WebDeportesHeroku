"use strict";

let eventPlaces = null;

function prepareEventPlaceReadView(){
    loadEventPlacesPro().then((response) => {
        // Save the events array
        eventPlaces = response;
        loadDisciplinesPro().then((response) => {
            // Load information into elements
            convertEventPlaceToHtml();
        });
    });

}

function loadEventPlaces(callback){
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
                callback(response);
            } 
        } else {
            alert(response.error);
        }
    };
    xhr.onerror = () => {
        alert("Hubo un error al cargar los lugares"); 
    };
}

function loadSingleEventPlace(idEventPlace, callback){
    // Prepare and send request
    let xhr = new XMLHttpRequest();
    let url = serverInfo.hostname + serverInfo.port + serverInfo.eventPlaceEndPoint + "/" + idEventPlace;

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
        alert("Hubo un error al cargar el lugar"); 
    };
}

function convertEventPlaceToHtml(){
    // Convert events to HTML
    let eventPlacesHtml = eventPlaces.map((element) => {
        return `
        <tr class="row-content">
            <td>${element.id}</td>
            <td>${element.nombreLugarEvento}</td>
            <td>${getDisciplinesNames(element.idDisciplinas)}</td>
            <td><a href="#" data-toggle="modal" data-target="#placeInformation" onclick="showDetails(${element.id})">Ver detalles</a></td>
            <td>
                <a class="btn btn-danger edit" href="#" onclick="showDeleteEventPlaceModal(${element.id})">
                <i class="fa fa-trash"></i>
                </a>
                &nbsp;
                <a class="btn btn-info edit" href="#" onclick="goUpdateEventPlace(${element.id})">
                <i class="fa fa-pencil-square-o"></i>
                </a> 
            </td>
        </tr>
        `;
    }).join("");

    // Update table with events
    let tableEventPlaces = document.getElementById("tableEventPlaces");
    tableEventPlaces.innerHTML = eventPlacesHtml;
}

function showDetails(eventPlaceId){
    // Get the selected place
    let eventPlace = eventPlaces.find((element) => {
        if(element.id == eventPlaceId)
            return true;
    });

    // Update event place name
    let eventPlaceName = document.getElementById("eventPlaceName");
    eventPlaceName.innerText = eventPlace.nombreLugarEvento;

    // Update event place image
    let eventPlaceImage = document.getElementById("eventPlaceImageModal");
    eventPlaceImage.setAttribute("src", eventPlace.fotoLugarEvento);

    // Convert general info to HTML
    let generalInfoHtml = `Dirección: ${eventPlace.direccion}
            Disciplinas: ${getDisciplinesNames(eventPlace.idDisciplinas)}
            Descripción: ${eventPlace.descripcion}
    `;
    let eventPlaceInfo = document.getElementById("eventPlaceInfo");
    eventPlaceInfo.innerText = generalInfoHtml;
}

function getDisciplinesNames(disciplines){
    let disciplinesNames = new Array();
    for(let i = 0; i < disciplines.length; i++)
        disciplinesNames.push(getDisciplineById(disciplines[i]).nombreDisciplina);

    return disciplinesNames;
}
//----------------------------------------------------------------------------------------------------------
function loadEventPlacesPro(){
    return new Promise((resolve, reject) => {
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
                    reject();
                } else {
                    eventPlaces = response;
                    resolve(response);
                } 
            } else {
                alert(response.error);
                reject();
            }
        };
        xhr.onerror = () => {
            alert("Hubo un error al cargar los lugares"); 
            reject();
        };
    });
}

function loadSingleEventPlacePro(idEventPlace){
    return new Promise((resolve, reject) => {
        // Prepare and send request
        let xhr = new XMLHttpRequest();
        let url = serverInfo.hostname + serverInfo.port + serverInfo.eventPlaceEndPoint + "/" + idEventPlace;

        xhr.open("GET", url);
        xhr.send();

        xhr.onload = () => {
            let response = JSON.parse(xhr.response);

            if(xhr.status == 200){
                resolve(response[0]);
            } else {
                alert(response.error);
                reject();
            }
        };
        xhr.onerror = () => {
            alert("Hubo un error al cargar el lugar"); 
            reject();
        };
    });
}