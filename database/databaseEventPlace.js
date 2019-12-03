const mongoose = require("./mongodb-connect").mongoose;

let eventPlaceSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    nombreLugarEvento: {
        type: String,
        required: true,
    },
    idDisciplinas: {
        type: Array, 
        required: true
    },
    fotoLugarEvento: {
        type: String
    },
    direccion: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    }
});

//  Model                 Collection  Schema
let EventPlace = mongoose.model('eventplaces', eventPlaceSchema);

async function createEventPlace(newEventPlace){
    let eventPlace = EventPlace(newEventPlace);
    // Create event
    let docs = await eventPlace.save();
    return docs;
}

async function getEventPlaces(){
    // Retrieve all elements
    try{
        // Find all event places
        let docs = await EventPlace.find({}, {_id:0, __v: 0}, (err, docs) => {});
        return docs;
    } catch(e){
        console.log(e)
        console.log("Error de conexión");
    }
}

async function getEventPlaceById(id){
    // Retrieve element
    try{
        // Find event
        let docs = await EventPlace.find({id : id}, {_id:0, __v: 0}, (err, docs) => {});

        return docs;
    } catch(e){
        console.log(e)
        console.log("Error de conexión");
    }
}

async function updateEventPlace(id, eventPlace){
    let docs = await EventPlace.findOneAndUpdate(
        {id : id}, 
        {$set:  {
            "id" : eventPlace.id, 
            "nombreLugarEvento" : eventPlace.nombreLugarEvento, 
            "idDisciplinas" : eventPlace.idDisciplinas,
            "fotoLugarEvento" : eventPlace.fotoLugarEvento, 
            "direccion" : eventPlace.direccion,
            "descripcion" : eventPlace.descripcion}
        }, 
        {returnNewDocument: true}
    );
    return docs;
}

async function deleteEventPlace(id){
    let doc = await EventPlace.findOneAndDelete({id : id});
    return doc;
}

module.exports = {createEventPlace, getEventPlaces, getEventPlaceById, deleteEventPlace, updateEventPlace};


    