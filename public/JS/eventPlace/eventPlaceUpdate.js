"use strict";

let eventPlace = null;

let searchBar = document.getElementById("search");
let searchResults = document.getElementById("searchResults");

function goUpdateEventPlace(idEventPlace){
    window.location.href = "../HTML/modifyEventPlace.html" + "?id=" + idEventPlace;
}

function prepareEventPlaceUpdateView(){
    // Get the parameter in the URL
    let url = new URL(window.location);
    let idEventPlace = url.searchParams.get("id");

    loadSingleEventPlacePro(idEventPlace).then((response) => {
        // Save the event place
        eventPlace = response;

        loadDisciplinesPro().then((response) => {
            // Load information into the view
            fillEventPlaceFields();

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
        });
    });
}


function fillEventPlaceFields(){
    // Load all the fields with the event place information
    let eventPlaceName = document.getElementById("eventPlaceName");
    let eventPlaceDescription = document.getElementById("eventPlaceDescription");
    let eventPlaceAddress = document.getElementById("eventPlaceAddress");
    let eventPlaceImage = document.getElementById("eventPlaceImage");
    eventPlaceName.value = eventPlace.nombreLugarEvento;
    eventPlaceDescription.value = eventPlace.descripcion;
    eventPlaceAddress.value = eventPlace.direccion;
    eventPlaceImage.value = eventPlace.fotoLugarEvento;

    updateRelatedDisciplines();
}

function updateEventPlace(elementEvent){
    elementEvent.preventDefault();
    // Get the new information
    let eventPlaceName = document.getElementById("eventPlaceName").value;
    let eventPlaceDescription = document.getElementById("eventPlaceDescription").value;
    let eventPlaceAddress = document.getElementById("eventPlaceAddress").value;
    let eventPlaceImage = document.getElementById("eventPlaceImage").value;
    eventPlace.nombreLugarEvento = eventPlaceName;
    eventPlace.descripcion = eventPlaceDescription;
    eventPlace.direccion = eventPlaceAddress;
    eventPlace.fotoLugarEvento = eventPlaceImage;

    // Prepare and send request
    let xhr = new XMLHttpRequest();
    let url = serverInfo.hostname + serverInfo.port + serverInfo.eventPlaceEndPoint + "/" + eventPlace.id;
    let data = JSON.stringify(eventPlace);

    xhr.open("PUT", url);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhr.send(data);

    xhr.onload = () => {
        if(xhr.status == 200){
            alert("Lugar modificado correctamente");
            window.location.href = "../HTML/showEventPlace.html"
        } else {
            alert(response.error);
        }
    };
    xhr.onerror = () => {
        alert("Hubo un error actualizar el lugar"); 
    };

}

function updateRelatedDisciplines(){
    // Get all the disciplines related to the event
    let disciplines = new Array();
    for(let i = 0; i < eventPlace.idDisciplinas.length; i++)
        disciplines.push(getDisciplineById(eventPlace.idDisciplinas[i]));

    // Convert disciplines to HTML
    let disciplinesHtml = disciplines.map((element) => {
        return `
            <li class="list-group-item">${element.nombreDisciplina}</li>
        `;
    }).join("");

    // Show the disciplines related to the event
    let listOfDisciplines = document.getElementById("disciplinesAdded");
    listOfDisciplines.innerHTML = disciplinesHtml;
}

function loadResults(response){
    // Filter disciplines already added
    let disciplines = response.filter((element) => {
        if(eventPlace.idDisciplinas.find(id => id == element.id) === undefined)
            return true;
        else
            return false;
    });

    // Styles for disciplines MouseOver and MouseOut
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
    // Add the match to the event
    eventPlace.idDisciplinas.push(id);
    
    // Update View
    updateRelatedDisciplines();
    searchBar.value = "";
    searchResults.innerHTML = "";
    searchResults.hiden = true;
}
