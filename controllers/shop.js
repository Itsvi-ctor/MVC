const { redirect } = require("express/lib/response");
const Product = require("../models/product");
const Cart = require("../models/cart")

exports.getProducts = (req, res, next) => {
  // ! Using Sequelize 
  Product.findAll().then((product) => {
    res.render("shop/product-list", {
      prods: product,
      pageTitle: "All Products",
      path: "/products",
    })
  }).catch((err) => {
    console.log(err, "error from getProducts in shop controller");
  })

  // ! Using SQL
  // Product.fetchAll().then(([rows, fieldData]) => {
  //   res.render("shop/product-list", {
  //     prods: rows,
  //     pageTitle: "All Products",
  //     path: "/products",
  //   });
  // }).catch((err) => {
  //   console.log(err, "error from getProducts in shop controller");
  // })

};

exports.getSingleProduct = (req, res, next) => {
  const prodId = req.params.productId
  Product.findByPk(prodId).then((product) => {
    console.log(product, "this is from getSingleProduct 🔥🔥🔥🔥");
    res.render("shop/product-detail", { path: "/products", product: product, pageTitle: product.title })
  }).catch((err) => {
    console.log(err, "err coming from getSingleProduct in shop controller")
  })
}

exports.postSingleItemToCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }
      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId);
    })
    .then(product => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity }
      });
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
}

exports.getIndex = (req, res, next) => {

  // ! Using Sequelize 
  Product.findAll().then((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  }).catch(err => {
    console.log(err);
  })

  // ! Using SQL
  // Product.fetchAll().then(([rows, fieldData]) => {
  //   res.render("shop/index", {
  //     prods: rows,
  //     pageTitle: "Shop",
  //     path: "/",
  //   });
  // }).catch((err) => {
  //   console.log(err, "this error is from getIndex in shop.js controller");
  // })

}

exports.getCart = (req, res, next) => {
  // console.log(req.user);
  req.user.getCart()
    .then((cart) => {
      return cart.getProducts()
        .then((products) => {
          // console.log(products);
          res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: products
          })
        }).catch(err => { console.log(err); })
    }).catch(err => console.log(err))


  // Cart.getCart(cart => {
  //   Product.fetchAll(products => {
  //     const cartProducts = [];
  //     for (product of products) {
  //       const cartProductData = cart.products.find(
  //         prod => prod.id === product.id
  //       );
  //       if (cartProductData) {
  //         cartProducts.push({ productData: product, qty: cartProductData.qty });
  //       }
  //     }
  //     res.render('shop/cart', {
  //       path: '/cart',
  //       pageTitle: 'Your Cart',
  //       products: cartProducts
  //     });
  //   });
  // });
};

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts();
    })  
    .then(products => {
      console.log(products, "products from postOrder ❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥");
      return req.user
        .createOrder()
        .then(order => {
          return order.addProducts(
            products.map(product => {
              product.orderItem = { quantity: product.cartItem.quantity };
              return product;
            })
          );
        })
        .catch(err => console.log(err));
    })
    .then(result => {
      return fetchedCart.setProducts(null);
    })
    .then(result => {
      res.redirect('/orders');
    })
    .catch(err => console.log(err));
}

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  console.log(prodId, "I am product ID 🔥🔥🔥🔥🔥");
  req.user
    .getCart()
    .then(cart => {
      console.log(cart, "this is cart from deleted products 🔥🔥🔥🔥🔥");
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      console.log(products, "products, what it is ❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥");
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
}

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders({ include: ['products'] })
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      });
    })
    .catch(err => console.log(err));
}

exports.checkout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout Page"
  })
}