"use strict"
// id from the other window.
let idToModify = JSON.parse(localStorage.getItem("editUser"));

// Get user
let userToModify = null;
setTimeout(function(){
    // Primero a cargar
    firstLoad()
    secondLoad()
    
},300)
function secondLoad(){
    setTimeout(function(){
        loadUserInHTML()
        // Lo segundo a cargar
    },300)
}

function firstLoad(){
    getUser()
}

function getUser() {
    
    // Prepare and send request
    let xhr = new XMLHttpRequest();
    let url = serverInfo.hostname + serverInfo.port + serverInfo.userEndPoint+"/"+ idToModify.id;

    // console.log("Login userLogin: " + userValue);

    xhr.open("GET", url);
    // xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhr.send(null);

    xhr.onload = () => {
        // console.log(xhr);
        
        let response = JSON.parse(xhr.response);
        
        for (let index = 0; index < response.length; index++) {
            // console.log(response[index].email);
            if(response[index].id == idToModify.id){
                response = response[index]
                userToModify = response;

                // console.log("Comparacion del if : " + response.password + " vs " + passValue);
                        console.log("Encontre al usuario");
                    }
                    else{
                        console.log("No encontre ningun usuario con ese id");
                    }     
            
            }
        

    };
    xhr.onerror = () => {
        alert("Hubo un error al hacer login del usuario"); 
    };
}


function loadUserInHTML() {
    
    let name = document.getElementById("name")
    let lname = document.getElementById("lastName")
    let email = document.getElementById("email")
    let bithday = document.getElementById("birthday")
    let userType = document.getElementById("userType")
    let password = document.getElementById("password")
    let imagen = document.getElementById("imgInput ")
    let imagenDisplay = document.getElementById("imagenDisplay");

    name.value = userToModify.nombre
    lname.value = userToModify.apellido 
    email.value = userToModify.email
    bithday.value = userToModify.fechaNacimiento
    userType.value = userToModify.tipoUsuario
    password.value = userToModify.password
    imagen.value = userToModify.foto 
    imagenDisplay.src = userToModify.foto

}

let updateUserBtn = document.getElementById("updateBtn")

updateUserBtn.onclick = (e) =>{
    updateUser()
}

function updateUser() {
    let userToUpdate = {
            _id: "",
            id : 2,
            username : "",
            password : "",
            nombre : "",
            apellido : "",
            foto : "",
            genero : "",
            tipoUsuario : "",
            email: "",
            fechaNacimiento : ""
    }
    userToUpdate.nombre = document.getElementById("name").value;
    userToUpdate.apellido = document.getElementById("lastName").value;
    userToUpdate.email = document.getElementById("email").value;
    userToUpdate.fechaNacimiento = document.getElementById("birthday").value;
    userToUpdate.tipoUsuario = document.getElementById("userType").value;
    userToUpdate.password = document.getElementById("password").value;
    userToUpdate.id = userToModify.id
    userToUpdate.username = userToModify.username
    userToUpdate.genero = userToModify.genero
    userToUpdate.foto = document.getElementById("imgInput ").value;
    userToUpdate._id = userToModify._id

        // Prepare and send request
        let xhr = new XMLHttpRequest();
        let url = serverInfo.hostname + serverInfo.port + serverInfo.userEndPoint + "/" + userToUpdate._id;
        let data = JSON.stringify(userToUpdate);

        xhr.open("PUT", url);
        xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        xhr.send(data);

        xhr.onload = () => {
            if(xhr.status == 200){
                alert("Usuario modificado correctamente");
                window.location.href = "../HTML/userList.html"
            } else {
                alert(response.error);
            }
        };
        xhr.onerror = () => {
            alert("Hubo un error actualizar el usuario"); 
        };
}
