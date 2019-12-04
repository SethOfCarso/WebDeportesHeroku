"use strict"
/**
 * Upadte account user
 */
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
    fechaNacimiento : "",
    _id: ""
  };

 /**
  * Link with from HTML
  */
  let updateUserBtn = document.getElementById("updateBtn")
  let name = document.getElementById("name")
  let lname = document.getElementById("lastName")
  let email = document.getElementById("email")
  let bithday = document.getElementById("birthday")
  let userType = document.getElementById("userType")
  let password = document.getElementById("password")
  let imagen = document.getElementById("imgInput ")
  let imagenDisplay = document.getElementById("imagenDisplay");
  let idUser;

  /**
   * Get info from localStorage
   */

   let userData = JSON.parse(localStorage.getItem('usuario'));
//    console.log(userData);

   /**
    * Load info
    */
   idUser = userData.id;
   //console.log(idUser);
   name.value = userData.nombre;
   lname.value = userData.apellido;
   email.value = userData.email;
//    Mostrar solo dia mes y año sin tiempo
// Si funciona normalmente 
// birthday.value = userData.fechaNacimiento;
  let fechaNac = userData.fechaNacimiento.slice(0,10)
  fechaNac = fechaNac.slice(0,10)
  console.log(fechaNac);
   birthday.value = fechaNac;
   userType.value = userData.tipoUsuario;
   password.value = userData.password;
   imagen.value = userData.foto;
   imagenDisplay.src = userData.foto;

   //Los que no se modifican
   user.id = idUser
   user.username = userData.username
   user.genero = userData.genero


   updateUserBtn.onclick = (e) =>{
    console.log("hice click");
       updateUser(idUser);
       
   }
   
   if(userData.tipoUsuario == "Administrador" ){
       document.getElementById("userType").disabled = false;
   }

function updateUser(updateUser){
    console.log("Entre al update");
    // updateUser.preventDefault();
// Get the new information
user.nombre = document.getElementById("name").value;
user.apellido = document.getElementById("lastName").value;
user.email = document.getElementById("email").value;
// user.fechaNacimiento = document.getElementById("birthday").value;
user.fechaNacimiento = userData.fechaNacimiento;
user.tipoUsuario = document.getElementById("userType").value;
user.password = document.getElementById("password").value;
user.id = idUser
user.username = userData.username
user.genero = userData.genero
user.foto = document.getElementById("imgInput ").value;
user._id = userData._id





// Prepare and send request
let xhr = new XMLHttpRequest();
let url = serverInfo.hostname + serverInfo.port + serverInfo.userEndPoint + "/" + idUser;
let data = JSON.stringify(user);

xhr.open("PUT", url);
xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
xhr.send(data);
console.log(user);
console.log(data);

xhr.onload = () => {
    if(xhr.status == 200){
        localStorage.setItem('usuario', JSON.stringify(user));
        alert("Usuario modificado correctamente");
        window.location.href = "../HTML/editarPerfil.html"
    } else {
        alert(response.error);
    }
};
xhr.onerror = () => {
    alert("Hubo un error actualizar el usuario"); 
};

}



