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
    let userValue = null;
    let passValue  = null;
    let nameValue = null;
    let lNameValue = null;
    let emailValue = null;
    let birthdayValue= null;
    let genderValue = null;

    if(userCreate.value.length >0){
        if(validateUsername(userCreate.value)){
            userValue = userCreate.value;
        }else
        return
        
    }else{
        alert("El valor de usuario esta vacio")
        return;
    }
    if(passCreate.value.length > 0){
        passValue = passCreate.value;
    } else {
        alert("La contraseña esta vacía");
        return;
    }
    if(nameCreate.value.length > 0){
         nameValue = nameCreate.value;
    } else {
        alert("El nombre se encuentra vacio");
        return;
    }
    if(lNameCreate.value.length > 0){
         lNameValue = lNameCreate.value;
    } else {
        alert("El apellido se encuentra vacio");
        return;
    }
    let flagGender = 1;
    let photoValue = photoCreate.value;     
    
        genderValue = genderCreate.value;
        for (let  i = 0, length = genderCreate.length; i < length; i++) {
            if (genderCreate[i].checked) {
                flagGender= 0;
                genderValue = genderCreate[i].value;
                break;
            }
        }
        if(flagGender == 1){
            alert("No selecciono un genero")
            return
        }
    
    
    let userTypeValue = "Usuario"
    if(emailCreate.value.length > 0){
        if(ValidateEmail(emailCreate.value)){
        if(validateEmailName(emailCreate.value)){
            emailValue = emailCreate.value;
            // console.log(emailValue);
        } else{
            return
        }
    }
    } else {
        alert("El valor del correo se encuentra vacio")
        return
    }
    
    if(birthdayCreate.value.length > 0){
        birthdayValue = birthdayCreate.value;    
    } else {
        alert("El valor de fecha de nacimiento se encuentra vacio")
        return;
    }
    

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
    let invalids = document.querySelectorAll("*:invalid");
    let invalidsLen = invalids.length
    if(invalidsLen >= 3){
        // console.log("Hay invalidos");
        // console.log(invalids);
        return;
    }
    else{
        // console.log("No hay invalidos");
        crearUsuarioPost(user);
    }
        

    // e.preventDefault();

        // Prepare and send request
        // let xhr = new XMLHttpRequest();
        // let url = serverInfo.hostname + serverInfo.port + serverInfo.userEndPoint;
        // console.log(user);
        // let data = JSON.stringify(user);

        // console.log(data);


        // xhr.open("POST", url);
        // xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        // xhr.send(data);

        // xhr.onload = () => {
        //     console.log(xhr.response);
        //     let response = JSON.parse(xhr.response);
        //     console.log(response);

        //     if(xhr.status == 201){
        //         alert("Usuario creado correctamente, ya puedes iniciar sesión");
        //         // window.location.href = "../HTML/LandingPage.html"
        //         modalLoginbtn.click()
        //     } else {
        //         console.log(response);
        //         alert(response.error);
        //     }
        // };
        // xhr.onerror = () => {
        //     console.log(xhr.status);
        //     console.log(xhr.statusText);
        //     alert("Hubo un error al crear un usuario"); 
        // };
    
}

function crearUsuarioPost(user){

    // Prepare and send request
    let xhr = new XMLHttpRequest();
    let url = serverInfo.hostname + serverInfo.port + serverInfo.userEndPoint;
    // console.log(user);
    let data = JSON.stringify(user);

    // console.log(data);


    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhr.send(data);

    xhr.onload = () => {
        // console.log(xhr.response);
        let response = JSON.parse(xhr.response);
        // console.log(response);

        if(xhr.status == 201){
            alert("Usuario creado correctamente, ya puedes iniciar sesión");
            // window.location.href = "../HTML/LandingPage.html"
            modalLoginbtn.click()
        } else {
            // console.log(response);
            alert(response.error);
        }
    };
    xhr.onerror = () => {
        // console.log(xhr.status);
        // console.log(xhr.statusText);
        alert("Hubo un error al crear un usuario"); 
    };

}

let modalLogin = document.getElementById("modelIdLogin")
let modalLoginbtn = document.getElementById("loginBtn")


function getLastId(){

    let idRand = Math.floor(Math.random() * 10000000)
    return idRand
}

function ValidateEmail(mail) 
{
//  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(myForm.emailAddr.value))
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    alert("Metiste un email que no cumple con las caracteristicas de email")
    return (false)
}

function validateUsername(user){
    // users son todos los usuarios existentes por el momento
    for(let i = 0; i< users.length;i++){
        if(users[i].username == user){
            alert("Ya existe un usuario con ese username");
            return false
        }
    }
    return true
}

function validateEmailName(email){
    for(let i = 0; i< users.length;i++){
        if(users[i].email == email){
            alert("Ya existe un usuario con ese email");
            return false
        }
    }
    return true
}