const mongodb = require("mongodb")
const MongodbClient = mongodb.MongoClient
require("dotenv").config();


const mongoConnect = (cb) => {
  let connection_string = process.env.mongo_connection_string
  MongodbClient.connect(`mongodb+srv://folajimi:folajimi@cluster0.6uyxac1.mongodb.net/`).then((client) => {
    console.log("CONNECTED");
    cb(client)
  }).catch(err => { console.log(err); })
}

module.exports = mongoConnect