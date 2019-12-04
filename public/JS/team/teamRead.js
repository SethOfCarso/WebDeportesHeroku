"use strict";

let teams = null;
let selectedTeam = null;

// function prepareTeamReadView(){
//     finishTeamReadView();
// }

// function finishTeamReadView(response){
//     // Save the teams array
//     teams = response;

//     // Load information into elements
//     convertTeamToHtml();
// }

function loadTeams(callback){
    // Prepare and send request
    let xhr = new XMLHttpRequest();
    let url = serverInfo.hostname + serverInfo.port + serverInfo.teamEndPoint;

    xhr.open("GET", url);
    xhr.send();

    xhr.onload = () => {
        let response = JSON.parse(xhr.response);

        if(xhr.status == 200){
            if(response.length == 0){
                alert("No hay equipos dados de alta");
            } else {
                // Execute callback
                callback(response);
            } 
        } else {
            alert(response.error);
        }
    };
    xhr.onerror = () => {
        alert("Hubo un error al cargar los equipos"); 
    };
}

function loadSingleTeam(idTeam, callback){
    // Prepare and send request
    let xhr = new XMLHttpRequest();
    let url = serverInfo.hostname + serverInfo.port + serverInfo.teamEndPoint + "/" + idTeam;

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
        alert("Hubo un error al cargar el equipo"); 
    };
}

function convertTeamToHtml(){
    // Convert teams to HTML
    let teamsHtml = teams.map((element) => {
        return `
        <tr class="row-content">
            <td>${element.id}</td>
            <td>${element.nombreEquipo}</td>
            <td>${getDisciplineById(element.idDisciplina).nombreDisciplina}</td>
            <td><a href="#" onclick="goReadTeamDetail(${element.id})">Ver detalle</a></td>
            <td>
            <a class="btn btn-danger edit" href="#" onclick="showDeleteTeamModal(${element.id})">
                <i class="fa fa-trash"></i>
            </a>
            &nbsp;
            <a class="btn btn-info edit" href="#" onclick="goUpdateTeam(${element.id})">
                <i class="fa fa-pencil-square-o"></i>
            </a> 
            </td>
        </tr>
        `;
    }).join("");

    // Update table with teams
    let tableTeams = document.getElementById("tableTeams");
    tableTeams.innerHTML = teamsHtml;
}

function goReadTeamDetail(idTeam){
    window.location.href = "../HTML/showTeamDetail.html" + "?id=" + idTeam;
}

// function prepareTeamDetailReadView(){
//     // Get the parameter in the URL
//     let url = new URL(window.location);
//     let idTeam = url.searchParams.get("id");
    
//     loadSingleTeam(idTeam, finishTeamDetailReadView);
// }

// function finishTeamDetailReadView(response){
//     // Save the selected team
//     selectedTeam = response;

//     // Load information into elements
//     fillTeamDetailsFields();
// }

function fillTeamDetailsFields(){
    let teamNameTitle = document.getElementById("teamNameTitle");
    let teamImage = document.getElementById("teamImage");
    let teamImageURL = document.getElementById("teamImageURL");
    let teamName = document.getElementById("teamName");
    let teamCaptain = document.getElementById("teamCaptain");
    let teamDiscipline = document.getElementById("teamDiscipline");
    let teamMembersSection = document.getElementById("teamMembersSection");

    let captain = getUserById(selectedTeam.idCapitan);

    teamNameTitle.innerText = `Equipo "` + selectedTeam.nombreEquipo + `"`;
    teamImage.setAttribute("src", selectedTeam.fotoEquipo);
    teamImageURL.value = selectedTeam.fotoEquipo;
    teamName.value = selectedTeam.nombreEquipo;
    teamCaptain.value = captain.nombre +  " " + captain.apellido;
    teamDiscipline.value = getDisciplineById(selectedTeam.idDisciplina).nombreDisciplina;

    let teamMembers = new Array();
    for(let i = 0; i < selectedTeam.idIntegrantes.length; i++)
        teamMembers.push(getUserById(selectedTeam.idIntegrantes[i]));

    let teamMembersHTML = teamMembers.map((element) => {
        if(selectedTeam.idCapitan == element.id)
            return `
                <div class="col">
                    <div class="card " style="background-color:#a6a8ab;">
                        <div class="mt-2"></div>
                        <img src="${element.foto}" class="card-img-top userTeam-image text-center mx-auto">
                        <div class="card-body mx-auto">
                            <p class="card-text text-center">${element.nombre + " " + element.apellido}</p>
                        </div>
                    </div>
                </div>
            `;
        else
            return `
                <div class="col">
                    <div class="card ">
                        <div class="mt-2"></div>
                        <img src="${element.foto}" class="card-img-top userTeam-image text-center mx-auto">
                        <div class="card-body mx-auto">
                            <p class="card-text text-center">${element.nombre + " " + element.apellido}</p>
                        </div>
                    </div>
                </div>
            `;
    }).join("");
    teamMembersSection.innerHTML = teamMembersHTML;
}
//-------------------------------------------------------------------------------------------------------------
function prepareTeamReadView(){
    loadTeamsPro().then((response) => {
        // Get the teams
        teams = response;

        loadDisciplinesPro().then((response) => {
            // Load information into elements
            convertTeamToHtml();
        });
    });
}

function loadTeamsPro(){
    return new Promise((resolve, reject) =>{
        // Prepare and send request
        let xhr = new XMLHttpRequest();
        let url = serverInfo.hostname + serverInfo.port + serverInfo.teamEndPoint;

        xhr.open("GET", url);
        xhr.send();

        xhr.onload = () => {
            let response = JSON.parse(xhr.response);

            if(xhr.status == 200){
                if(response.length == 0){
                    alert("No hay equipos dados de alta");
                    reject();
                } else {
                    teams = response;
                    resolve(response);
                } 
            } else {
                alert(response.error);
                reject();
            }
        };
        xhr.onerror = () => {
            alert("Hubo un error al cargar los equipos"); 
            reject();
        };
    });
}




function prepareTeamDetailReadView(){
    // Get the parameter in the URL
    let url = new URL(window.location);
    let idTeam = url.searchParams.get("id");
    
    loadSingleTeamPro(idTeam).then((response) => {
        // Save the selected team
        selectedTeam = response;

        loadUsersPro().then((response) => {       
            loadDisciplinesPro().then((response) => {
                // Once I have all the information I need, load it into elements
                fillTeamDetailsFields();
            });
        });
    });
}

function loadSingleTeamPro(idTeam){
    return new Promise((resolve, reject) =>{
        // Prepare and send request
        let xhr = new XMLHttpRequest();
        let url = serverInfo.hostname + serverInfo.port + serverInfo.teamEndPoint + "/" + idTeam;

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
            alert("Hubo un error al cargar el equipo");
            reject();
        };
    });
}