const fs = require("fs");
const path = require("path");

const products = [];

// !GLOBAL PATH
const p = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
);

// ? HELPER FUNCTION
const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return cb([]);
    }
    cb(JSON.parse(fileContent));
  });
  return products;
};
// ? CLASS
module.exports = class Product {
  constructor(t) {
    this.title = t;
  }

  save() {
    getProductsFromFile(
      (product) => {
        products.push(this);
        fs.writeFile(p, JSON.stringify(product), (err) => {
          console.log(err);
        });
      });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  /*
Initially, this wouldn't work because this function isn't asynchronous 
so we have to pass in a callback function in the fetchAll as seen above

  static fetchAll() {
    const p = path.join(
      path.dirname(require.main.filename),
      "data",
      "products.json"
    );
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return [];
      }
      return JSON.parse(fileContent);
    });
    return products;
  }
  */
};
