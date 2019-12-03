const mongoose = require("./mongodb-connect").mongoose;

// Base de usuario
let userSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    username: {
        type: String,
        unique:true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    foto: {
        type: String,
        required: true
    },
    genero: {
        type: String,
        required: true
    },
    tipoUsuario: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    fechaNacimiento: {
        type: Date,
        required: true
    }
});

//  Model                 Collection  Schema
let User = mongoose.model('users', userSchema);

async function createUsers(objetctUser){
    let newUser = {
        id: 7,
        username: "Carso",
        password: "123",
        nombre: "Erick",
        apellido: "Cardona Soto Maynez",
        foto: "https://randomuser.me/api/portraits/men/25.jpg",
        genero: "m",
        tipoUsuario: "Usuario",
        email: "cardona.erick@hotmail.com",
        fechaNacimiento: "2019-11-15"
      }

      newUser.id = objetctUser.id;
      newUser.username = objetctUser.username 
      newUser.password = objetctUser.password
      newUser.nombre = objetctUser.nombre
      newUser.apellido = objetctUser.apellido
      newUser.foto = objetctUser.foto
      newUser.genero = objetctUser.genero
      newUser.tipoUsuario = objetctUser.tipoUsuario
      newUser.email = objetctUser.email
      newUser.fechaNacimiento = objetctUser.fechaNacimiento

    let user = User(newUser);
    // Create event
    let docs = await user.save();
    console.log(docs)
    return   docs
}
let allUsersComplete 
async function getUserLogin(){

    // Regresar todos los usuarios
    let userAll = await User.find({}, (err,docs) =>{   
        allUsersComplete = docs
     })
    // console.log("User all en database" + userAll);
    allUsersComplete = userAll
    return userAll
}

async function updateUser(user){
    let newUser = {
        _id:"",
        id: 9,
        username: "Carso",
        password: "123",
        nombre: "Erick",
        apellido: "Cardona Soto Maynez",
        foto: "https://randomuser.me/api/portraits/men/25.jpg",
        genero: "m",
        tipoUsuario: "Usuario",
        email: "cardona.erick@hotmail.com",
        fechaNacimiento: "2019-11-15"
      }
      newUser._id = user._id
      newUser.id = user.id;
      newUser.username = user.username 
      newUser.password = user.password
      newUser.nombre = user.nombre
      newUser.apellido = user.apellido
      newUser.foto = user.foto
      newUser.genero = user.genero
      newUser.tipoUsuario = user.tipoUsuario
      newUser.email = user.email
      newUser.fechaNacimiento = user.fechaNacimiento

    // console.log(user);
    // console.log("Hola soy de uptate user" + newUser._id);
    console.log(newUser);
    let userAll = await User.findByIdAndUpdate({'_id': newUser._id}, {
        _id:newUser._id,
        id: newUser.id,
        username: newUser.username,
        password: newUser.password,
        nombre: newUser.nombre,
        apellido: newUser.apellido,
        foto: newUser.foto,
        genero: newUser.genero,
        tipoUsuario: newUser.tipoUsuario,
        email: newUser.email,
        fechaNacimiento: newUser.fechaNacimiento
      }, (err,docs) =>{   
        if(err){
            console.log(err);
        }
        console.log("Docs" + docs);
     })

    // let userAll = await User.findByIdAndUpdate({'_id': newUser._id}, {nombre:newUser.nombre, 
    // apellido: newUser.apellido}, (err,docs) =>{   
    //     if(err){
    //         console.log(err);
    //     }
    //     console.log("Docs" + docs);
    //  })
}

async function deleteId(userId) {
    let doc = await User.findOneAndDelete({id : userId});
}

async function getUserByName(name){
    // Retrieve elements
    try{
        // Find users that contain that name
        let docs = await User.find(
            {$or:[{'nombre': new RegExp(name, 'i')}, {'apellido': new RegExp(name, 'i')}]}, 
            {_id:0, __v: 0},
            (err, docs) => {}
        );
        
        return docs;
    } catch(e){
        console.log("Error de conexión");
    }
}


module.exports = {createUsers,getUserLogin,allUsersComplete,updateUser,deleteId, getUserByName};


    