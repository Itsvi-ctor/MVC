const Products = require("../models/product");

exports.getAddProduct = (req, res, next) => {
    res.render("admin/add-product", {
        pageTitle: "Add Product",
        path: "/admin/add-product",
        edit: false
    });
};

exports.postAddProduct = (req, res, next) => {
    title = req.body.title 
    price = req.body.price
    description = req.body.description
    imageUrl = req.body.imageUrl
    const product = new Products(null, title, imageUrl, description, price);
    product.save();
    res.redirect("/");
};

exports.postEditProducts = (req, res, next) => {
    const product = req.body.productId
    const updatedProduct = new Products(product.id, product.title, product.imageUrl, product.description, product)
    updatedProduct.save()
}

exports.editProduct = (req, res, next) => {
    const editMode = req.query.edit
    if (!editMode) return res.redirect("/")
    const prodId = req.params.productId
    Products.findById(prodId, product => {
        if (!product) return res.redirect("/")
        res.render("admin/edit-product", {
            pageTitle: "Edit Product",
            path: "/admin/edit-product",
            edit: true,
            product: product
        });
    })
}

exports.getProducts = (req, res, next) => {
    Products.fetchAll((products) => {
        res.render("admin/products", {
            prods: products,
            pageTitle: "All Products",
            path: "admin/products",
            editing: true
        });
    });
}