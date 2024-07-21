const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/cart', shopController.getCart);

router.get("/products", shopController.getProducts)

router.get("/orders", shopController.getOrders)

router.post("/cart-delete-item", shopController.postCartDeleteProduct)

router.get("/products/:productId", shopController.getSingleProduct)

router.get("/checkout", shopController.checkout)
// Posts
router.post("/cart", shopController.postSingleItemToCart)

router.post("/create-order", shopController.postOrder)


module.exports = router;
