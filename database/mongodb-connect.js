const mongoose = require("mongoose");
const config = require("./config.json")

// Collections are the "tables" in MongoDB
let mongoDB = `mongodb+srv://${config.user}:${config.password}@webdeportes-hqkdm.mongodb.net/${config.dbname}?retryWrites=true&w=majority`;

mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log("Connected to database");
}).catch((err) => {
    console.log("Not connected to database", err);
});

module.exports = {mongoose};