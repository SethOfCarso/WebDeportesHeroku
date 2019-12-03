"use strict"
/**
 * User main page.
 */
//Load data from the login
let userData = localStorage.getItem('usuario');
userData = JSON.parse(userData);

/**
 * Link elements with JS
 */
let welcomeMsg = document.getElementById("welcomeMsg");

/**
 * load user items
 */
welcomeMsg.innerHTML = "Bienvenido a Torneos! " + userData.nombre + " " + userData.apellido


