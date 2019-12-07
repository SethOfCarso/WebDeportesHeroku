const mongoose = require("./mongodb-connect").mongoose;


let teamSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    nombreEquipo: {
        type: String,
        required: true,
        unique: true
    },
    autorizado: {
        type: Boolean,
        required: true,
    },
    idCapitan: {
        type: Number,
        required: true,
    },
    idDisciplina: {
        type: Number,
        required: true,
    },
    idIntegrantes: {
        type: Array,
        default: undefined,
        required: true
    },
    fotoEquipo: {
        type : String
    }
});

//  Model                 Collection  Schema
let Team = mongoose.model('teams', teamSchema);

async function createTeam(newTeam){
    try{
        let team = Team(newTeam);
        // Create team
        let docs = await team.save();
        return docs;
    } catch(e) {
        return {error: e.errmsg};
    }
}

async function getTeams(){
    // Retrieve all elements
    try{
        // Find all matches
        let docs = await Team.find({}, {_id:0, __v: 0}, (err, docs) => {});
        
        return docs;
    } catch(e){
        return {error: e.errmsg};
    }
}

async function getTeamById(id){
    // Retrieve element
    try{
        // Find event
        let docs = await Team.find({id : id}, {_id:0, __v: 0}, (err, docs) => {});

        return docs;
    } catch(e){
        return {error: e.errmsg};
    }
}

async function updateTeam(id, team){
    try{
        let docs = await Team.findOneAndUpdate(
            {id : id}, 
            {$set:  {
                "id" : team.id, 
                "idIntegrantes" : team.idIntegrantes, 
                "nombreEquipo" : team.nombreEquipo,
                "fotoEquipo" : team.fotoEquipo, 
                "autorizado" : true,
                "idCapitan" : team.idCapitan,
                "idDisciplina" : team.idDisciplina}
            }, 
            {returnNewDocument: true}
        );
        return docs;
    } catch(e){
        return {error: e.errmsg};
    }
}

async function deleteTeam(id){
    try{
        let doc = await Team.findOneAndDelete({id : id});
        return doc;
    } catch(e){
        return {error: e.errmsg};
    }
}

module.exports = {createTeam, getTeams, getTeamById, updateTeam, deleteTeam};
