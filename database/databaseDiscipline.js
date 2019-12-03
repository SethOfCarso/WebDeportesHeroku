const mongoose = require("./mongodb-connect").mongoose;

let disciplineSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    nombreDisciplina: {
        type: String,
        required: true,
    }
});

//  Model                 Collection  Schema
let Discipline = mongoose.model('disciplines', disciplineSchema);

async function getDisciplines(){
    // Retrieve all elements
    try{
        // Find all matches
        let docs = await Discipline.find({}, {_id:0, __v: 0}, (err, docs) => {});
        
        return docs;
    } catch(e){
        console.log("Error de conexión");
    }
}

async function getDisciplineByName(name){
    // Retrieve elements
    try{
        // Find matches that contain that name
        let docs = await Discipline.find(
            {'nombreDisciplina': new RegExp(name, 'i')}, 
            {_id:0, __v: 0},
            (err, docs) => {}
        );
        
        return docs;
    } catch(e){
        console.log("Error de conexión");
    }
}

module.exports = {getDisciplines, getDisciplineByName};