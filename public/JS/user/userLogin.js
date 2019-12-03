"use strict";

/**
 * This JS will be used for login
 */

 /**
  * getters for login
  * getter values
  */
let userLogIn = document.getElementById("user");
let passLogIn = document.getElementById("pass");
let logInBtn = document.getElementById("logInBtn");
let lostPSWbtn = document.getElementById("lostPSW");
let idUser 

logInBtn.onclick = (e) => {
    logInUser(e);
}

lostPSWbtn.onclick = (e) => {
    lostPSW(e);
}
/**
 * What to do when you lost the password
 * @param {from onclick} e 
 */
function lostPSW (e) {
    alert("We dont have this service ATM, please remember your password")
}


function logInUser(e) {
    let userValue = userLogIn.value;
    let passValue = passLogIn.value;

    // Prepare and send request
    let xhr = new XMLHttpRequest();
    let url = serverInfo.hostname + serverInfo.port + serverInfo.userEndPoint+"/"+userValue;

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
            if(response[index].username == userValue){
                response = response[index]

                // console.log("Comparacion del if : " + response.password + " vs " + passValue);
                
                    if(response.password === passValue){
                        localStorage.setItem('usuario', JSON.stringify(response));
                        // console.log(JSON.stringify(response));
                        alert("Correct login, redirecting")
                        window.location.href ="landingPageLogin.html";
                    }
                    else{
                        alert("user/pass doesn't appear in our db");
                        localStorage.setItem('usuario',"Nada")
                    }     
            
            }
        }

    };
    xhr.onerror = () => {
        alert("Hubo un error al hacer login del usuario"); 
    };

}

