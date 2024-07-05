const fs = require("fs");
const path = require("path");

const products = [];

const p = path.join(
    path.dirname(require.main.filename),
    "data",
    "products.json"
);

const getProductsFromFile = (cb) => {
    fs.readFile(p, (err, filecontent) => {
        if (err) {
            cb([]);
        }
        cb(JSON.parse(filecontent));
    });
    return products;
};

// ?
module.exports = class Product {
    constructor(t) {
        this.title = t;
    }

    save() {
        getProductsFromFile(
            (product) => {
            product.push(this);
            fs.writeFile(p, JSON.stringify(product), (err) => {
                console.log(err);
            });
        });
    }

    static fetchProducts(cb) {
        getProductsFromFile(cb);
    }
};
