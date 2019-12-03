const mongoose = require("./mongodb-connect").mongoose;


let matchSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    nombreEncuentro: {
        type: String,
        required: true,
    },
    idLugarEvento: {
        type: Number,
        required: true,
    },
    score: {
        type: String,
        required: true,
    },
    fechaEncuentro: {
        type: Date,
        required: true,
    },
    idJueces: {
        type: Array,
        required: true,
    }
});

//  Model                 Collection  Schema

let Match = mongoose.model('matches', matchSchema);

async function getMatches(){
    // Retrieve all elements
    try{
        // Find all matches
        let docs = await Match.find({}, { __v: 0}, (err, docs) => {});
        return docs;
       
    } catch(e){
        console.log("Error de conexión");
    }
}

async function getMatchByName(name){
    // Retrieve elements
    try{
        // Find matches that contain that name
        let docs = await Match.find(
            {'nombreEncuentro': new RegExp(name, 'i')}, 
            {_id:0, __v: 0},
            (err, docs) => {}
        );
        
        return docs;
    } catch(e){
        console.log("Error de conexión");
    }
}

async function getMatchById(id){
    // Retrieve elements
    try{
        // Find matches that contain that name
        let docs = await Match.find(
            {'id': id}, 
            { __v: 0},
            (err, docs) => {}
        );
        // console.log(docs);
        return docs;
    } catch(e){
        console.log("Error de conexión al bsucar id");
    }
}

async function createMatch(objectMatch){
    let newMatches = {
        id: 2,
        nombreEncuentro: "",
        idLugarEvento: 2,
        score: "",
        fechaEncuentro: "",
        idJueces: []
    }

    newMatches.id = objectMatch.id;
    newMatches.nombreEncuentro = objectMatch.nombreEncuentro 
    newMatches.idLugarEvento = objectMatch.idLugarEvento
    newMatches.score = objectMatch.score
    newMatches.fechaEncuentro = objectMatch.fechaEncuentro
    newMatches.idJueces = objectMatch.idJueces


    let match = Match(newMatches);
    // Create event
    let docs = await match.save();
    console.log(docs)
    return   docs
}

async function deleteMatch (idMongo) {
    let doc = await Match.findOneAndDelete({id : idMongo});
}

async function updateMatch(MatchObject) {
    let matches = {
        _id:"",
        id: 2,
        nombreEncuentro: "",
        idLugarEvento: 2,
        score: "",
        fechaEncuentro: "",
        idJueces: []
    }
    matches._id = MatchObject._id
    matches.id = MatchObject.id
    matches.nombreEncuentro = MatchObject.nombreEncuentro;
    matches.idLugarEvento = MatchObject.idLugarEvento 
    matches.score = MatchObject.score
    matches.fechaEncuentro = MatchObject.fechaEncuentro
    matches.idJueces = MatchObject.idJueces


    let matchUpdate = await  Match.findByIdAndUpdate({_id: matches._id}, {
        id:matches.id,
        nombreEncuentro: matches.nombreEncuentro,
        idLugarEvento: matches.idLugarEvento,
        score: matches.score,
        fechaEncuentro: matches.fechaEncuentro,
        idJueces: matches.idJueces
      }, (err,docs) =>{   
        if(err){
            console.log(err);
        }
        console.log("Docs" + docs);
     })
}

module.exports = {getMatches, getMatchByName,createMatch,deleteMatch,getMatchById,updateMatch};
