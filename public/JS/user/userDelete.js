

function deleteUser(idUser){
    // Get the event ID through the custom attribute
    let idEvent = Number.parseInt($('#deleteEventButton').attr('data-idEvent'));
    // Hide modal
    $('#deleteEventModal').modal('hide');

    // Prepare and send request
    let xhr = new XMLHttpRequest();
    let url = serverInfo.hostname + serverInfo.port + serverInfo.eventEndPoint + "/" + idEvent;

    xhr.open("DELETE", url);
    xhr.send();

    xhr.onload = () => {
        let response = JSON.parse(xhr.response);

        if(xhr.status == 200){
            alert("Se ha eliminado el evento correctamente");
            location.reload();
        } else {
            alert(response.error);
        }
    };
    xhr.onerror = () => {
        alert("No se ha podido eliminar el evento debido a un error inesperado"); 
    };
}