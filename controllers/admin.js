const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    edit: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  title = req.body.title;
  price = req.body.price;
  description = req.body.description;
  imageUrl = req.body.imageUrl;

  // ! Using Sequelize
  Product.create({
    title, price, description, imageUrl
  }).then(() => {
    console.log("CREATED PRODUCT 🔥🔥🔥🔥");
    res.redirect("/")
  }).catch(err => {
    console.log(err);
  })

  // ! Using SQL
  // const product = new Products(null, title, imageUrl, description, price);
  // product
  //   .save()
  //   .then(() => {
  //     res.redirect("/");
  //   })
  //   .catch((err) => {
  //     console.log(err, "err from postAddProduct in admin.js controller");
  //   });
  // res.redirect("/");
};
// findByPk()
exports.editProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) return res.redirect("/");
  const prodId = req.params.productId;
  Product.findByPk(prodId).then((product) => {
    if (!product) return res.redirect("/");
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      edit: true,
      product: product,
    })
  }).catch(err => console.log(err))
};

exports.postEditProducts = (req, res, next) => {
  const productId = req.body.productId;
  // ! Using Sequelize
  Product.findByPk(productId).then((product) => {
    product.title = req.body.title,
      product.price = req.body.price,
      product.description = req.body.description,
      product.imageUrl = req.body.imageUrl
    return product.save()
  }).then(result => {
    res.redirect("/admin/products");
    console.log("UPDATED PRODUCT 🔥🔥🔥🔥");
  }).catch(err => console.log(err))


  // ! Using SQL

  // const product = req.body.productId;
  // const updatedProduct = new Product(
  //   product,
  //   req.body.title,
  //   req.body.imageUrl,
  //   req.body.description,
  //   req.body.price
  // );
  // updatedProduct.save();
  // res.redirect("/admin/products");
};

exports.getProducts = (req, res, next) => {
  Product.findAll().then((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "All Products",
      path: "admin/products",
      editing: true,
    });
  }).catch(err => console.log(err));
};

exports.deleteProduct = (req, res, next) => {
  
  // ! Using Sequelize
  const prodId = req.body.productId;
  Product.findByPk(prodId).then((product) => {
    return product.destroy()
  }).then(() => {
    console.log("PRODUCT DELETED")
    res.redirect("/admin/products")
  }).catch(err => console.log(err))

  // ! Using SQL 
  // const prodId = req.body.productId;
  // Product.deleteById(prodId);
  // res.redirect("/admin/products");
};
