function showDeleteTeamModal(idEvent){
    // Associate the button to the selected event through a custom attribute
    $('#deleteTeamButton').attr('data-idTeam', idEvent);
    // Show modal
    $('#deleteTeamModal').modal('show');
}

function deleteTeam(){
    // Get the event ID through the custom attribute
    let idTeam = Number.parseInt($('#deleteTeamButton').attr('data-idTeam'));
    // Hide modal
    $('#deleteTeamModal').modal('hide');

    // Prepare and send request
    let xhr = new XMLHttpRequest();
    let url = serverInfo.hostname + serverInfo.port + serverInfo.teamEndPoint + "/" + idTeam;

    xhr.open("DELETE", url);
    xhr.send();

    xhr.onload = () => {
        let response = JSON.parse(xhr.response);

        if(xhr.status == 200){
            alert("Se ha eliminado el equipo correctamente");
            location.reload();
        } else {
            alert(response.error);
        }
    };
    xhr.onerror = () => {
        alert("No se ha podido eliminar el equipo debido a un error inesperado"); 
    };
}