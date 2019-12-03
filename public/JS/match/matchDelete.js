"use strict"


function eliminateMatch(e) {
    let idMongoEliminate = {
        id: ""
    }

    idMongoEliminate.id = e
    // Prepare and send request
    let xhr = new XMLHttpRequest();
    let url = serverInfo.hostname + serverInfo.port + serverInfo.matchEndPoint;
    let data = JSON.stringify(idMongoEliminate);

    xhr.open("PUT", url);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhr.send(data);

    xhr.onload = () => {
        let response = JSON.parse(xhr.response);
        // console.log(response);
        if(xhr.status == 202){
            alert("Se elimino el encuentro, volviendo a cargar la pagina");
            window.location.href = "../HTML/showTeam.html"
            }
            else{
                console.log("No fue 202");
            }
        

    };
    xhr.onerror = () => {
        alert("Hubo un error al eliminar un match");
    };

}