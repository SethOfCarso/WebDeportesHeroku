"use strict";
/**
 * Este JS como su nombre lo dice:
 * To load all users from db to table
 */
setTimeout(loadStuff, 100)
setTimeout(secondLoad, 600)
let divToPlace = document.getElementById("prueba1");


function loadStuff(e) {
    loadAllUsers()
    //console.log("Se cargo las cosas");
}

function secondLoad(e) {
    loadInHtml();
}

let allUsers = null;
let number1 = 0;
/**
 * Load all the users 
 * @param {Anything that catches} e 
 */
function loadAllUsers(e) {
    
    
    // Prepare and send request
    let xhr = new XMLHttpRequest();
    let url = serverInfo.hostname + serverInfo.port + serverInfo.userEndPoint;


    xhr.open("GET", url);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhr.send(null);

    xhr.onload = () => {
        let response = JSON.parse(xhr.response);
        allUsers = response;
    };
    xhr.onerror = () => {
        alert("Hubo un error al cargar los usuarios");
    };
    

}

function loadInHtml() {
    for(let i = 0; i < allUsers.length; i++){
        // console.log(i);
        divToPlace.innerHTML += generatorHTML(allUsers[i]);
    }
}


/**
 * From object change user to HTML
 * user+
 */
function generatorHTML(userObject) {
    /**
     * From object to variables
     */
    let idMongo = userObject._id;
    let id = userObject.id;
    let userName = userObject.username;
    let password = userObject.password;
    let nombre = userObject.nombre;
    let apellido = userObject.apellido;
    let foto = userObject.foto;
    let genero = userObject.genero;
    let tipoUsuario = userObject.tipoUsuario;
    let email = userObject.email;
    let fechaNacimiento = userObject.fechaNacimiento


    return `
    <tr>
    <hr>
    <div>
    
    <td>
    </td>

    <td>
        <div class="media">
            
            <div class="media-body">
              <div class="row">
                <img src="${foto}" alt="">
                <div class="row my-auto">
                    <a href="#" id="${id}" onclick="removeID(this.id)" class="pull-right btn btn-danger px-3 mx-4"> <i class="fa fa-trash" aria-hidden="true"></i></a>
                    <a href="#" id="${id}" onclick="editID(this.id)" class="pull-right btn btn-primary px-3"><i class="fa fa-pencil" aria-hidden="true"></i></a>
                </div>
                <h2 class="title my-auto mx-5">
                    ${nombre} ${apellido} <br>
                    ${tipoUsuario} 
                </h2>  
              </div>
                
            </div>
        </div>
        
    </td>
</div>

    `;
}

function removeID(e) {
    // console.log("Hola" + e)
    let deleteUser ={
        _id:""
    }
    deleteUser._id = e
    // Prepare and send request
    let xhr = new XMLHttpRequest();
    let url = serverInfo.hostname + serverInfo.port + serverInfo.userEndPoint
     + "/id/"+e ;
    let data = JSON.stringify(deleteUser);
    
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhr.send(data);

    xhr.onload = () => { 
            alert("Se recargara la página");
            window.location.href ="userList.html";

    };
    xhr.onerror = () => {
        alert("Hubo un error al cargar los usuarios");
    };

}