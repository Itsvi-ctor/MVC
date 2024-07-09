const fs = require("fs")
const path = require("path")

// path
const p = path.join(
    path.dirname(require.main.filename),
    'data',
    'cart.json'
);

module.exports = class Cart {
    static addSingleProductToCart(id, price) {
        // fetch existing product 
        fs.readFile(p, (err, filecontent) => {
            let cart = { products: [], prodPrice: 0 }
            if (!err) {
                cart = JSON.parse(filecontent)
            }
            // find existing product
            const existingProductIndex = cart.products.findIndex(p => p.id === id)
            const existingProduct = cart.products[existingProductIndex]
            let updatedProduct;
            // if product exists, replace the product by increasing the quantity 
            if (existingProduct) {
                updatedProduct = { ...existingProduct }
                updatedProduct.qty = updatedProduct.qty + 1
                cart.products = [...cart.products]
                cart.products[existingProductIndex] = updatedProduct
            } else {
                updatedProduct = { id: id, qty: 1 }
                cart.products = [...cart.products, updatedProduct]
            }
            // Update the price
            cart.prodPrice = cart.prodPrice + +price
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            })
        })
    }

    static deleteProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                return;
            }
            const updatedCart = { ...JSON.parse(fileContent) };
            const product = updatedCart.products.find(prod => prod.id === id);
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(
                prod => prod.id !== id
            );
            updatedCart.totalPrice =
                updatedCart.totalPrice - productPrice * productQty;
            fs.writeFile(p, JSON.stringify(updatedCart), err => {
                console.log(err);
            });
        });
    }


    static getCart(cb) {
        fs.readFile(p, (err, filecontent) => {
            if (err) {
                return cb(null)
            } else {
                const cart = JSON.cart(filecontent)
            }
        })
    }

}
