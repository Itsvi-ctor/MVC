const Products = require("../models/product");

exports.getAddProduct = (req, res, next) => {
    res.render("admin/add-product", {
        pageTitle: "Add Product",
        path: "/admin/add-product",
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true,
    });
};

exports.postAddProduct = (req, res, next) => {
    title = req.body.title
    price = req.body.price
    description = req.body.description
    imageUrl = req.body.imageUrl
    const product = new Products(title, imageUrl, description, price);
    product.save();
    res.redirect("/");
};

exports.getProducts = (req, res, next) => {
    Products.fetchAll((products) => {
        res.render("admin/products", {
            prods: products,
            pageTitle: "All Products",
            path: "admin/products",
        });
    });
}