"use strict";

let team = null;

let searchBar = document.getElementById("search");
let searchResults = document.getElementById("searchResults");

function goUpdateTeam(idTeam){
    window.location.href = "../HTML/modifyTeam.html" + "?id=" + idTeam;
}

function loadAll(){
    // Get the parameter in the URL
    let url = new URL(window.location);
    let idTeam = url.searchParams.get("id");
    
    loadSingleTeam(idTeam, finishTeamUpdateView);
}

function prepareTeamUpdateView(){
    setTimeout(loadAll, 100);
}

function updateTeam(e){
    // Get the information
    let teamImage = document.getElementById("teamImageURL").value;
    let teamName = document.getElementById("teamName").value;
    let teamDiscipline = document.getElementById("teamDiscipline").value;
    team.fotoEquipo = teamImage;
    team.nombreEquipo = teamName;
    team.idDisciplina = Number.parseInt(teamDiscipline); 

    // Check for invalid inputs
    let invalids = document.querySelectorAll("*:invalid").length;
    if(invalids > 0)
        return;
    if(team.idCapitan == ""){
        e.preventDefault();
        alert("Seleccione un capitán");
        return;
    }

    e.preventDefault();

    // Prepare and send request
    let xhr = new XMLHttpRequest();
    let url = serverInfo.hostname + serverInfo.port + serverInfo.teamEndPoint + "/" + team.id;
    let data = JSON.stringify(team);

    xhr.open("PUT", url);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhr.send(data);

    xhr.onload = () => {
        let response = JSON.parse(xhr.response);

        if(xhr.status == 200){
            alert("Equipo modificado correctamente");
            window.location.href = "../HTML/showTeam.html"
        } else {
            alert(response.error);
        }
    };
    xhr.onerror = () => {
        alert("Hubo un error al modificar el equipo"); 
    };
}

function prepareEventUpdateView(){
    // Get the parameter in the URL
    let url = new URL(window.location);
    let idTeam = url.searchParams.get("id");

    loadDisciplinesCB(loadListOfDisciplines);
    loadSingleTeam(idTeam, finishTeamUpdateView);
}

function finishTeamUpdateView(response){
    // Save the event
    team = response;

    // Load information into the view
    setTimeout(fillTeamFields, 200);

    // Behaviour in the search bar
    searchBar.addEventListener("keyup", (event) => {
        if(searchBar.value.trim() == ""){
            searchResults.hidden = true;
        } else {
            searchResults.hidden = false;
        }
    
        // Retrieve the users and load them in the view
        searchUserByName(searchBar.value, loadResults);
    });
    searchBar.addEventListener("mouseout", (event) => {
        if(searchBar.value.trim() == ""){
            searchResults.hidden = true;
        } else {
            searchResults.hidden = false;
        }
    });
}

function fillTeamFields(){
    // Load all the fields with the event information
    let teamNameTitle = document.getElementById("teamNameTitle");
    let teamImage = document.getElementById("teamImage");
    let teamImageURL = document.getElementById("teamImageURL");
    let teamName = document.getElementById("teamName");
    let teamDiscipline = document.getElementById("teamDiscipline");
    teamNameTitle.innerText = `Equipo "` + team.nombreEquipo + `"`;
    teamImage.setAttribute("src", team.fotoEquipo);
    teamImageURL.value = team.fotoEquipo;
    teamName.value = team.nombreEquipo;
    teamDiscipline.value = team.idDisciplina; 

    updateRelatedMembers();
    linkCaptainToTeam(team.idCapitan)
}


function loadListOfDisciplines(disciplines){
    let teamDiscipline = document.getElementById("teamDiscipline");

    let disciplinesNamesHtml = disciplines.map((element) => {
        return `
            <option value="${element.id}">${element.nombreDisciplina}</option>
        `;
    });

    teamDiscipline.innerHTML = disciplinesNamesHtml;
}

function updateRelatedMembers(){
    // Get all the users related to the team
    let users = new Array();
    for(let i = 0; i < team.idIntegrantes.length; i++)
        users.push(getUserById(team.idIntegrantes[i]));

    // Convert users to HTML
    let usersHtml = users.map((element) => {
        return `
            <div class="col" data-userId="${element.id}">
                <div class="card " onclick="linkCaptainToTeam(${element.id})">
                    <div class="mt-2"></div>
                    <img src="${element.foto}" class="card-img-top userTeam-image text-center mx-auto">
                    <div class="card-body mx-auto">
                        <p class="card-text text-center">${element.nombre + " " + element.apellido}</p>
                    </div>
                </div>
            </div>
        `;
    }).join("");

    // Show the users related to the team
    let teamMembersSection = document.getElementById("teamMembersSection");
    teamMembersSection.innerHTML = usersHtml;
}

function loadResults(response){
    // Filter users already added
    let users = response.filter((element) => {
        if(team.idIntegrantes.find(id => id == element.id) === undefined)
            return true;
        else
            return false;
    });

    // Styles for users MouseOver and MouseOut
    let style1 = `onMouseOver="this.style.color='white';this.style.background='#266ae0'"`;
    let style2 = `onMouseOut="this.style.color='black';this.style.background='white'"`;

    // Map all the users to HTML
    let usersHtml = users.map((element) => {
        return `
            <li class="list-group-item" ${style1} ${style2} onclick="linkUserToTeam(${element.id})">${element.nombre + " " + element.apellido}</li>
        `;
    }).join("");;

    // Show results
    searchResults.innerHTML = "";
    searchResults.innerHTML = usersHtml;
}

function linkUserToTeam(id){
    // Add the match to the event
    team.idIntegrantes.push(id);
    
    // Update View
    updateRelatedMembers();
    searchBar.value = "";
    searchResults.innerHTML = "";
    searchResults.hiden = true;
}

function linkCaptainToTeam(idCaptain){
    team.idCapitan = idCaptain;

    let teamMembersSection = document.getElementById("teamMembersSection");

    for(let i = 0; i < teamMembersSection.children.length; i++){
        if(teamMembersSection.children[i].getAttribute("data-userId") == idCaptain)
            teamMembersSection.children[i].children[0].style.background = "#a6a8ab"
        else
            teamMembersSection.children[i].children[0].style.background = "white"
    }
}


