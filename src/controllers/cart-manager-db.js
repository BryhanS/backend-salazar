const CartModel = require("../models/cart.model.js")

class CartManager {
    async createCart(){
        try {
            const newCart = new CartModel({products: []})
            await newCart.save()
            return newCart
        } catch (error) {
            console.log("Error al crear un carrito nuevo", error);
            throw error; 
        }
    }

    async getCartById(cartId){
        try {
            const cart = await CartModel.findById(cartId)

            if(!cart){
                console.log("No hay carrito con ese Id")
                return null
            }

            return cart
            
        } catch (error) {
            console.log("Error al obtener un carrito por ID", error);
            throw error; 
        }
    }

    async addProductAtCart(cartId, productId, quantity = 1){
        try {
            const cart = await this.getCarritoById(cartId);
            const haveCart = cart.products.find(item => item.product.toString() === productId);

            if(haveCart) {
                haveCart.quantity += quantity; 
            }else {
                cart.products.push({product: productId, quantity});
            }

            //Cuuando modifican tiene que marcarlo con "mar,Modified"
            //Marcamos la propiedad "products" como modificada: 
            cart.markModified("products");

            await cart.save();
            return cart;
            
        } catch (error) {
            console.log("Error al agregar un producto", error);
            throw error; 
        }
 
    }
}

module.exports = CartManager;