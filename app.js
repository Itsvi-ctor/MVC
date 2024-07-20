const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const errorController = require("./controllers/error");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const sequelize = require("./util/database");

// Models
const User = require("./models/user");
const Product = require("./models/product");
const Cart = require("./models/cart")
const CartItem = require("./models/cartItem")

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findByPk(2).then((user) => { req.user = user; next(); }).catch((err) => console.log(err))
})

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// ! ASSOCIATIONS
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User)
Cart.belongsToMany(Product, { through: CartItem })
Product.belongsToMany(Cart, { through: CartItem })

sequelize
  // .sync({force: true})
  .sync()
  .then((result) => {
    return User.findByPk(2);
  })
  .then((user) => {
    if (!user) return User.create({ name: "Fola", email: "Fola@gmail.com" });
    return user;
  })
  .then((user) => {
    // console.log(user)
    return user.createCart()
  })
  .then(()=>{
    app.listen(3000)
  })
  .catch((err) => {
    console.log(err);
  });

