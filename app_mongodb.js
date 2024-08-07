const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
// const errorController = require("./controllers/error");
const mongoConnect = require("./util/database_mongodb")


const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// app.use(errorController.get404);

mongoConnect((client) => {
    console.log(client);
    app.listen(3000);
})