"use strict";
let allMatches = null;

let matches = {
        _id:"",
        idEncuentro: 2,
        nombreEncuentro: "",
        idLugarEvento: 2,
        score: "",
        fechaEncuentro: "",
        idJueces: []
}

setTimeout(loadStuff, 100)

/**
 * load the intial stuff.
 * @param {Anything that catches} e 
 */
function loadStuff(e) {
    loadAllMatches()
    loadMatches();
    //console.log("Se cargo las cosas");
}

/**
 * Load all the matches
 * @param {Anything that catches} e 
 */
function loadAllMatches(e) {

    // Prepare and send request
    let xhr = new XMLHttpRequest();
    let url = serverInfo.hostname + serverInfo.port + serverInfo.matchEndPoint;


    xhr.open("GET", url);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhr.send(null);

    xhr.onload = () => {
        let response = JSON.parse(xhr.response);
        // console.log(response);
        allMatches = response;

        for (let key in response) {
            if (response.hasOwnProperty(key)) {
                let element = response[key];
                //console.log(element);
                //Load all the data that come back
                let divToPlace = document.getElementById("tbody1");
                divToPlace.innerHTML += loadDataInHtml(element);
                


            }
        }

    };
    xhr.onerror = () => {
        alert("Hubo un error al cargar los matches");
    };

}


/**
 * From object change user to HTML
 * user+
 */
let nombreEncuentro1 ;
let scorePreSplit;
let scoreEquipos;
let scoreResultado;
function loadDataInHtml(matchesObject) {
    /**
     * From object to variables
     */
    let idMongo = matchesObject.id
    let idEncuentro = matchesObject.idEncuentro;
    let nombreEncuentro = matchesObject.nombreEncuentro;
    let idLugarEvento = matchesObject.idLugarEvento;
    let score = matchesObject.score;
    let fechaEncuentro = matchesObject.fechaEncuentro;
    let idJueces= matchesObject.idJueces;

     /**
      * Separar nombres de equipos
      */
     nombreEncuentro1 = nombreEncuentro
     let nombres = nombreEncuentro1.split(" ");

    /**
     * Score separar en ganador y perdedor
     */
    scorePreSplit = score;
    let scoreTemp = scorePreSplit.split(";")
    scoreResultado = scoreTemp[0]
    scoreEquipos = scoreTemp[1]

    let ganador ;
    let scoreResultadoTemp = scoreResultado.split(":")
    if(scoreResultadoTemp[0] > scoreResultadoTemp[1]){
        ganador = nombres[0]
    }
    else if(scoreResultadoTemp[0] < scoreResultadoTemp[1]){
        ganador = nombres[2]
    }else {
        ganador = "Empate"
    }

    
    

    return `
    <tr>
                <td>${nombres[0]}</td>
                <td>${nombres[2]}</td>
                <td>${scoreResultado}</td>
                <td>${ganador}</td>
                <td>Cate</td>
                <td>
                    <a id="${idMongo}" href="editEncuentro.html" onclick="saveidMatch(this.id)">
                        <button type="submit">
                            <i class="fas fa-edit"></i>
                        </button>
                    </a>
                </td>
                <td>
                    <a href="" id="${idMongo}" onclick="eliminateMatch(this.id)" >
                        <button type="submit">
                            <i class="fas fa-trash"></i>
                        </button>
                    </a>
                </td>
                </tr>
    `;
}

function saveidMatch(idMatch) {
    localStorage.setItem("idMatch",idMatch)
}

let myMatches = null;
function loadMatches(){
    return new Promise((resolve, reject) => {
        // Prepare and send request
        let xhr = new XMLHttpRequest();
        let url = serverInfo.hostname + serverInfo.port + serverInfo.matchEndPoint;

        xhr.open("GET", url);
        xhr.send();

        xhr.onload = () => {
            let response = JSON.parse(xhr.response);
            // console.log(response);

            if(xhr.status == 200){
                if(response.length == 0){
                    alert("No hay encuentros dados de alta");
                    resolve();
                } else {
                    myMatches = response;
                    resolve();
                } 
            } else {
                alert(response.error);
                resolve();
            }
        };
        xhr.onerror = () => {
            alert("Hubo un error al cargar los encuentros"); 
            resolve();
        };
    });
}

async function getMatchById(idMatch){
    if(myMatches == null){
        await loadMatches();
    }

    let match = myMatches.find((element) => {
        if(element.id == idMatch)
            return true;
    });

    return match;
}

function searchMatchByName(name, callback){
    // Prepare and send request
    let xhr = new XMLHttpRequest();
    let url = serverInfo.hostname + serverInfo.port + serverInfo.matchEndPoint
                + "?nombreEncuentro=" + name;

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