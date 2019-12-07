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
        unique: true
    },
    idDisciplinas: {
        type: Array,
        default: undefined,
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
    try{
        let eventPlace = EventPlace(newEventPlace);
        // Create event
        let docs = await eventPlace.save();
    return docs;
    } catch(e) {
        return {error: e.errmsg};
    }
}

async function getEventPlaces(){
    // Retrieve all elements
    try{
        // Find all event places
        let docs = await EventPlace.find({}, {_id:0, __v: 0}, (err, docs) => {});
        return docs;
    } catch(e){
        return {error: e.errmsg};
    }
}

async function getEventPlaceById(id){
    // Retrieve element
    try{
        // Find event
        let docs = await EventPlace.find({id : id}, {_id:0, __v: 0}, (err, docs) => {});

        return docs;
    } catch(e){
        return {error: e.errmsg};
    }
}

async function updateEventPlace(id, eventPlace){
    try{
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
    } catch(e){
        return {error: e.errmsg};
    }
}

async function deleteEventPlace(id){
    try{
        let doc = await EventPlace.findOneAndDelete({id : id});
        return doc;
    } catch(e){
        return {error: e.errmsg};
    }
}

module.exports = {createEventPlace, getEventPlaces, getEventPlaceById, deleteEventPlace, updateEventPlace};


    