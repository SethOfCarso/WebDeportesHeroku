"use strict";
/**
 * Este JS como su nombre lo dice:
 * To create users in the db.
 */
/**
 * Checar to-do, son extras a mejorar.
 */

//Crear IDs
let id = 6;

//Nuestro objeto a llenar de usuario
let user = {
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
  };
/**
 * Just references to the inputs.
 * xxxCreate will be use to create users.
 */
let userCreate = document.getElementById("userLogin");
let passCreate = document.getElementById("userPass");
let nameCreate = document.getElementById("userName");
let lNameCreate = document.getElementById("userLastName");
//Empty, later the person will add some photos.
//to-do Agregar un avatar predetermiando.
let photoCreate = ""; 
let genderCreate = document.getElementsByName("userGender");
//When the user is created, it start as User (u)
let userTypeCreate = "U"; 
let emailCreate = document.getElementById("userMail");
let birthdayCreate = document.getElementById("userAge");

let registrerBtn = document.getElementById("registrerBtn");

registrerBtn.onclick = (e) => {
    createUser(e);
};

function createUser(e){
    /**
     * link values.
     */
    let userValue = userCreate.value;
    let passValue = passCreate.value;
    let nameValue = nameCreate.value;
    let lNameValue = lNameCreate.value;
    let photoValue = photoCreate.value;
    let genderValue = genderCreate.value;
    for (let  i = 0, length = genderCreate.length; i < length; i++) {
        if (genderCreate[i].checked) {
            genderValue = genderCreate[i].value;
            break;
        }
    }
    let userTypeValue = "Usuario"
    let emailValue = emailCreate.value;
    let birthdayValue = birthdayCreate.value;

    /**
     * Link value with object
     */
    
    user.id = getLastId();
    user.username = userValue;
    user.password = passValue;
    user.nombre = nameValue;
    user.apellido = lNameValue;
    let randompic = Math.floor(Math.random() *99)
    if(genderValue == 'm'){
        user.foto = "https://randomuser.me/api/portraits/men/"+randompic+".jpg";
    }else{
        user.foto = "https://randomuser.me/api/portraits/women/"+randompic+".jpg";
    }
    user.genero = genderValue;
    user.tipoUsuario = userTypeValue;
    user.email = emailValue;
    user.fechaNacimiento = birthdayValue;
    
    //to-do checar inputs invalidos

    // Check for invalid inputs
    // let invalids = document.querySelectorAll("*:invalid").length;
    // if(invalids > 0)
    //     return;

    // e.preventDefault();

        // Prepare and send request
        let xhr = new XMLHttpRequest();
        let url = serverInfo.hostname + serverInfo.port + serverInfo.userEndPoint;
        console.log(user);
        let data = JSON.stringify(user);

        console.log(data);


        xhr.open("POST", url);
        xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        xhr.send(data);

        xhr.onload = () => {
            console.log(xhr.response);
            let response = JSON.parse(xhr.response);
            console.log(response);

            if(xhr.status == 201){
                alert("Usuario creado correctamente, ya puedes iniciar sesión");
                window.location.href = "../HTML/LandingPage.html"
            } else {
                console.log(response);
                alert(response.error);
            }
        };
        xhr.onerror = () => {
            console.log(xhr.status);
            console.log(xhr.statusText);
            alert("Hubo un error al crear un usuario"); 
        };

    
    
}

function getLastId(){

    let idRand = Math.floor(Math.random() * 10000000)
    return idRand
}