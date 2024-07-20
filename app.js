const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const errorController = require("./controllers/error");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const sequelize = require("./util/database");

// Models
const User = require("./models/user")
const Product = require("./models/product")


const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// ! Model definition
// User created this product
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
// User has many products
User.hasMany(Product)


sequelize.sync().then((result) => {
    app.listen(3000);
}).catch(err => {
    console.log(err);
})

