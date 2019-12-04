"use strict";

let users = null;
loadUsers();

function loadUsers(){
    // Prepare and send request
    let xhr = new XMLHttpRequest();
    let url = serverInfo.hostname + serverInfo.port + serverInfo.userEndPoint;

    xhr.open("GET", url);
    xhr.send();

    xhr.onload = () => {
        let response = JSON.parse(xhr.response);

        if(xhr.status == 200){
            if(response.length == 0){
                alert("No hay usuarios dados de alta");
            } else {
                users = response;
                //callback(response);
            } 
        } else {
            alert(response.error);
        }
    };
    xhr.onerror = () => {
        alert("Hubo un error al cargar los usuarios"); 
    };
}

function getUserById(idUser){
    let user = users.find((element) => {
        if(element.id == idUser)
            return true;
    });

    return user;
}

function searchUserByName(name, callback){
    // Prepare and send request
    let xhr = new XMLHttpRequest();
    let url = serverInfo.hostname + serverInfo.port + serverInfo.userEndPoint
                + "?nombre=" + name;

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
        alert("Hubo un error al cargar los encuentros"); 
    };
}

//-----------------------------------------------------------------------------------------------------------
function loadUsersPro(){
    return new Promise((resolve, reject) => {
        // Prepare and send request
        let xhr = new XMLHttpRequest();
        let url = serverInfo.hostname + serverInfo.port + serverInfo.userEndPoint;

        xhr.open("GET", url);
        xhr.send();

        xhr.onload = () => {
            let response = JSON.parse(xhr.response);

            if(xhr.status == 200){
                if(response.length == 0){
                    alert("No hay usuarios dados de alta");
                    reject();
                } else {
                    users = response;
                    resolve(response);
                } 
            } else {
                alert(response.error);
                reject();
            }
        };
        xhr.onerror = () => {
            alert("Hubo un error al cargar los usuarios");
            reject();
        };
    });
}