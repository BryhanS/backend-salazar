const CartModel = require("../models/cart.model.js");

class CartRepository {
  async createCart() {
    try {
      const newCart = new CartModel({ products: [] });
      await newCart.save();
      return newCart;
    } catch (error) {
      console.log("Error al crear un carrito nuevo", error);
      throw error;
    }
  }

  async getCartById(cartId) {
    try {
      const cart = await CartModel.findById(cartId);

      if (!cart) {
        console.log("No hay carrito con ese Id");
        return null;
      }
      return cart;
    } catch (error) {
      console.log("Error al obtener un carrito por ID", error);
      throw error;
    }
  }

  async addProductAtCart(cartId, productId, quantity = 1) {
    try {
      const cart = await this.getCartById(cartId);
      const haveCart = cart.products.find(
        (item) => item.product.toString() === productId
      );

      if (haveCart) {
        haveCart.quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }

      cart.markModified("products");

      await cart.save();
      return cart;
    } catch (error) {
      console.log("Error al agregar un producto", error);
      throw error;
    }
  }

  async deleteCartProduct(cartId, productId) {
    try {
      const cart = await this.getCartById(cartId);

      if (!cart) {
        console.log("Carrito no encontrado!");
        return null;
      }

      cart.products = cart.products.filter(
        (item) => item.product.toString() !== productId
      );
      cart.markModified("products");
      await cart.save();
      return cart;
    } catch (error) {
      console.log("error al eliminar producto por ID", error);
      throw error;
    }
  }

  async deleterCartAllProduct(cartId) {
    try {
      const cart = await this.getCartById(cartId);
      if (!cart) {
        console.log("Carrito no encontrado!");
        return null;
      }
      cart.products = [];
      cart.markModified("products");
      await cart.save();
      return cart;
    } catch (error) {
      console.log("error al eliminar todos los producto", error);
      throw error;
    }
  }

  async addProductByArray(cartId, information) {
    try {
      const cart = await this.getCartById(cartId);
      if (!cart) {
        console.log("Carrito no encontrado!");
        return null;
      }
      cart.products = information;
      cart.markModified("products");
      await cart.save();
      return cart;
    } catch (error) {
      console.log("error al agregar arreglo de productos", error);
      throw error;
    }
  }
}

module.exports = CartRepository;
