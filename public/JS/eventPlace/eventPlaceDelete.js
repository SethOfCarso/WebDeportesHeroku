function showDeleteEventPlaceModal(idEvent){
    // Associate the button to the selected event through a custom attribute
    $('#deleteEventPlaceButton').attr('data-idEventPlace', idEvent);
    // Show modal
    $('#deleteEventPlaceModal').modal('show');
}

function deleteEventPlace(){
    // Get the event ID through the custom attribute
    let idEventPlace = Number.parseInt($('#deleteEventPlaceButton').attr('data-idEventPlace'));
    // Hide modal
    $('#deleteEventPlaceModal').modal('hide');

    // Prepare and send request
    let xhr = new XMLHttpRequest();
    let url = serverInfo.hostname + serverInfo.port + serverInfo.eventPlaceEndPoint + "/" + idEventPlace;

    xhr.open("DELETE", url);
    xhr.send();

    xhr.onload = () => {
        let response = JSON.parse(xhr.response);

        if(xhr.status == 200){
            alert("Se ha eliminado el lugar correctamente");
            location.reload();
        } else {
            alert(response.error);
        }
    };
    xhr.onerror = () => {
        alert("No se ha podido eliminar el lugar debido a un error inesperado"); 
    };
}