const express = require("express");
const router = express.Router();

//controller
const CartManager = require("../controllers/cart-manager-db.js");
const cartManager = new CartManager();

//create new cart
router.post("/", cartManager.createCart);

router.get("/:cid", cartManager.getCartById);

router.put("/:cid/product/:pid", cartManager.addProductAtCart);

router.delete("/:cid/product/:pid", cartManager.deleteCartProduct);

router.delete("/:cid", cartManager.deleterCartAllProduct);

router.put("/:cid", cartManager.addProductByArray);

module.exports = router;
