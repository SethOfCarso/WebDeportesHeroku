const mongoose = require("./mongodb-connect").mongoose;

let eventSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    encuentros: {
        type: Array,
        required: true,
    },
    fotoEvento: {
        type: String
    },
    nombreEvento: {
        type: String,
        required: true
    },
    fechaInicio: {
        type: String,
        required: true
    },
    fechaFin: {
        type: String,
        required: true
    }
});

//  Model                 Collection  Schema
let Event = mongoose.model('events', eventSchema);

async function createEvent(newEvent){
    let event = Event(newEvent);
    // Create event
    let docs = await event.save();
    return docs;
}

async function getEvents(){
    // Retrieve all elements
    try{
        // Find all events
        let docs = await Event.find({}, {_id:0, __v: 0}, (err, docs) => {});
        return docs;
    } catch(e){
        console.log(e)
        console.log("Error de conexión");
    }
}

async function getEventById(id){
    // Retrieve element
    try{
        // Find event
        let docs = await Event.find({id : id}, {_id:0, __v: 0}, (err, docs) => {});

        return docs;
    } catch(e){
        console.log(e)
        console.log("Error de conexión");
    }
}

async function updateEvent(id, event){
    let docs = await Event.findOneAndUpdate(
        {id : id}, 
        {$set:  {
            "id" : event.id, 
            "encuentros" : event.encuentros, 
            "fotoEvento" : event.fotoEvento,
            "nombreEvento" : event.nombreEvento, 
            "fechaInicio" : event.fechaInicio,
            "fechaFin" : event.fechaFin}
        }, 
        {returnNewDocument: true}
    );
    return docs;
}

async function deleteEvent(id){
    let doc = await Event.findOneAndDelete({id : id});
    return doc;
}

module.exports = {createEvent, getEvents, getEventById, deleteEvent, updateEvent};


    