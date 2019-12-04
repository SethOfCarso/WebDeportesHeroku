"use strict";

let disciplines = null;

loadDisciplines();

function loadDisciplines(){
    // Prepare and send request
    let xhr = new XMLHttpRequest();
    let url = serverInfo.hostname + serverInfo.port + serverInfo.disciplineEndPoint;

    xhr.open("GET", url);
    xhr.send();

    xhr.onload = () => {
        let response = JSON.parse(xhr.response);
        

        if(xhr.status == 200){
            if(response.length == 0){
                alert("No hay disciplinas dadas de alta");
            } else {
                disciplines = response;
            } 
        } else {
            alert(response.error);
        }
    };
    xhr.onerror = () => {
        alert("Hubo un error al cargar las disciplinas"); 
    };
}

function getDisciplineById(idDiscipline){
    let discipline = disciplines.find((element) => {
        if(element.id == idDiscipline)
            return true;
    });

    return discipline;
}

function searchDisciplineByName(name, callback){
    // Prepare and send request
    let xhr = new XMLHttpRequest();
    let url = serverInfo.hostname + serverInfo.port + serverInfo.disciplineEndPoint
                + "?nombreDisciplina=" + name;

    xhr.open("GET", url);
    xhr.send();

    xhr.onload = () => {
        let response = JSON.parse(xhr.response);

        if(xhr.status == 200){
            callback(response);
        } else {
            alert(response.error);
        }
    };
    xhr.onerror = () => {
        alert("Hubo un error al cargar las disciplinas"); 
    };
}

function loadDisciplinesCB(callback){
    // Prepare and send request
    let xhr = new XMLHttpRequest();
    let url = serverInfo.hostname + serverInfo.port + serverInfo.disciplineEndPoint;

    xhr.open("GET", url);
    xhr.send();

    xhr.onload = () => {
        let response = JSON.parse(xhr.response);

        if(xhr.status == 200){
            if(response.length == 0){
                alert("No hay disciplinas dadas de alta");
            } else {
                callback(response);
            } 
        } else {
            alert(response.error);
        }
    };
    xhr.onerror = () => {
        alert("Hubo un error al cargar las disciplinas"); 
    };
}
//-----------------------------------------------------------------------------------------------------------
function loadDisciplinesPro(){
    return new Promise((resolve, reject) => {
        // Prepare and send request
        let xhr = new XMLHttpRequest();
        let url = serverInfo.hostname + serverInfo.port + serverInfo.disciplineEndPoint;

        xhr.open("GET", url);
        xhr.send();

        xhr.onload = () => {
            let response = JSON.parse(xhr.response);
            
            if(xhr.status == 200){
                if(response.length == 0){
                    alert("No hay disciplinas dadas de alta");
                    reject();
                } else {
                    disciplines = response;
                    resolve(response);
                } 
            } else {
                alert(response.error);
                reject();
            }
        };
        xhr.onerror = () => {
            alert("Hubo un error al cargar las disciplinas");
            reject();
        };
    });
}