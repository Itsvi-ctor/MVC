const { redirect } = require("express/lib/response");
const Products = require("../models/product");
const Cart = require("../models/cart")

exports.getProducts = (req, res, next) => {
  Products.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  });
};

exports.getSingleProduct = (req, res, next) => {
  const prodId = req.params.productId
  Products.findById(prodId, product => {
    res.render("shop/product-detail", { path: "/products", product: product, pageTitle: product.title })
  })
}

exports.postSingleItemToCart = (req, res, next) => {
  const prodId = req.body.productId
  Products.findById(prodId, product => {
    Cart.addSingleProductToCart(prodId, product.price)
  })
  res.redirect("/")
}

exports.getIndex = (req, res, next) => {
  Products.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
}

exports.getCart = (req, res, next) => {
  res.render("shop/cart", {
    path: "/cart",
    pageTitle: "Your Cart"
  })
}

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "My Orders"
  })
}

exports.checkout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout Page"
  })
}