const CartModel = require("../models/cart.model.js");
const CartRepository = require("../repositories/cart.repository.js");
const cartRepository = new CartRepository();

class CartManager {
  async createCart(req, res) {
    try {
      const newCart = await cartRepository.createCart();
      res.json(newCart);
    } catch (error) {
      console.error("Error al crear un nuevo carrito", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async getCartById(req, res) {
    const cartId = req.params.cid;
    try {
      const cart = await cartRepository.getCartById(cartId);
      res.json(cart.products);
    } catch (error) {
      console.error("Error al obtner el carrito", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async addProductAtCart(req, res) {
    const cId = req.params.cid;
    const pId = req.params.pid;
    const quantity = req.body.quantity || 1;
    try {
      const updateCart = await cartRepository.addProductAtCart(
        cId,
        pId,
        quantity
      );
      console.log(quantity);
      res.json(updateCart.products);
    } catch (error) {
      console.error("Error al agregar al carrito", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async deleteCartProduct(req, res) {
    const cId = req.params.cid;
    const pId = req.params.pid;
    try {
      const deleteCartProduct = await cartRepository.deleteCartProduct(
        cId,
        pId
      );
      res.json(deleteCartProduct.products);
    } catch (error) {
      console.error("Error al eliminar un producto del carrito", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async deleterCartAllProduct(req, res) {
    const cId = req.params.cid;
    try {
      const deleteAllProduct = await cartRepository.deleterCartAllProduct(cId);
      res.json(deleteAllProduct.products);
    } catch (error) {
      console.error(
        "Error al agregar al eliminar todos los productos del carrito",
        error
      );
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async addProductByArray(req, res) {
    const cId = req.params.cid;
    const information = req.body;
    try {
      if (!information) {
        console.log("ingresa dato");
        return null;
      }
      const updateCart = await cartRepository.addProductByArray(
        cId,
        information
      );
      res.json(updateCart.products);
    } catch (error) {
      console.error("Error al agregar al carrito", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}

module.exports = CartManager;
