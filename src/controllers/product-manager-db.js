const ProductModel = require("../models/product.model.js");

class ProductManager {
  async addProduct({
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    category,
    status,
  }) {
    try {
      if (!title || !description || !price || !code || !stock || !category) {
        console.log("todos los campos son obligatorio");
        return;
      }

      const existeProducto = await ProductModel.findOne({ code: code });

      if (existeProducto) {
        console.log("El codigo debe de ser unico");
        return;
      }

      const nuevoProducto = new ProductModel({
        title,
        description,
        price,
        code,
        stock,
        category,
        status: true,
        thumbnail: thumbnail || [],
      });

      await nuevoProducto.save();
    } catch (error) {
      console.log("error al agregar producto", error);
      throw error;
    }
  }

  async getProducts() {
    try {
      const productos = await ProductModel.find();
      return productos;
    } catch (error) {
      console.log("error al recuperar producto", error);
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const producto = await ProductModel.findById(id);
      if (!producto) {
        console.log("Producto no encontrado!");
        return null;
      }
      console.log("Producto encontrado");
      return producto;
    } catch (error) {
      console.log("error al recuperar producto por ID", error);
      throw error;
    }
  }

  async updateProduct(id, productoActualizado) {
    try {
      const updateProduct = await ProductModel.findByIdAndUpdate(
        id,
        productoActualizado
      );

      if (!updateProduct) {
        console.log("Producto no encontrado!");
        return null;
      }
      console.log("Producto actualizado");
      return updateProduct;
    } catch (error) {
      console.log("error al actualizar producto por ID", error);
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      const deleteProduct = await ProductModel.findByIdAndDelete(id);

      if (!deleteProduct) {
        console.log("Producto no encontrado!");
        return null;
      }
      console.log("Producto eliminado");
    } catch (error) {
      console.log("error al eliminar producto por ID", error);
      throw error;
    }
  }
}
