const express = require("express");
const router = express.Router();
const CartManager = require("../controllers/cart-manager-db.js");
const cartManager = new CartManager();

//create new cart

router.post("/", async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.json(newCart);
  } catch (error) {
    console.error("Error al crear un nuevo carrito", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.get("/:cid", async (req, res) => {
  const cartId = req.params.cid;
  try {
    const cart = await cartManager.getCartById(cartId);
    res.json(cart.products);
  } catch (error) {
    console.error("Error al obtner el carrito", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.put("/:cid/product/:pid", async (req, res) => {
  const cId = req.params.cid;
  const pId = req.params.pid;
  const quantity = req.body.quantity || 1;
  try {
    const updateCart = await cartManager.addProductAtCart(cId, pId, quantity);
    console.log(quantity);
    res.json(updateCart.products);
  } catch (error) {
    console.error("Error al agregar al carrito", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.delete("/:cid/product/:pid", async (req, res) => {
  const cId = req.params.cid;
  const pId = req.params.pid;
  try {
    const deleteCartProduct = await cartManager.deleteCartProduct(cId, pId);
    res.json(deleteCartProduct.products);
  } catch (error) {
    console.error("Error al eliminar un producto del carrito", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.delete("/:cid", async (req, res) => {
  const cId = req.params.cid;
  try {
    const deleteAllProduct = await cartManager.deleterCartAllProduct(cId);
    res.json(deleteAllProduct.products);
  } catch (error) {
    console.error(
      "Error al agregar al eliminar todos los productos del carrito",
      error
    );
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.put("/:cid", async (req, res) => {
  const cId = req.params.cid;
  const information = req.body;
  try {
    if (!information) {
      console.log("ingresa dato");
      return null;
    }
    const updateCart = await cartManager.addProductByArray(cId, information);
    res.json(updateCart.products);
  } catch (error) {
    console.error("Error al agregar al carrito", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
