const ProductService = require("../services/product.services.js")
const productService = new ProductService()

class ProductManager {
  async addProduct(req, res) {
    const newProduct = req.body;
    try {
      await productService.addProduct(newProduct);
      res.status(201).json({ message: "Producto agregado exitosamente" });
    } catch (error) {
      res.status(500).json({ error: "error del servidor" });
    }
  }

  async getProducts(req, res) {
    try {
      const { limit = 10, page = 1, sort, query } = req.query;
  
      const products = await productService.getProducts({
        limit: parseInt(limit),
        page: parseInt(page),
        sort,
        query,
      });
  
      res.json({
        status: "success",
        payload: products,
        totalPages: products.totalPages,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        page: products.page,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevLink: products.hasPrevPage
          ? `/api/products?limit=${limit}&page=${products.prevPage}&sort=${sort}&query=${query}`
          : null,
        nextLink: products.hasNextPage
          ? `/api/products?limit=${limit}&page=${products.nextPage}&sort=${sort}&query=${query}`
          : null,
      });
    } catch (error) {
      console.error("Ocurrio error al al llamar a los productos", error);
      res
        .status(500)
        .json({ status: "error", error: "Error interno del servidor" });
    }
  }

  async getProductById(req,res) {
    try {
      const id = req.params.pid;
      const producto = await productService.getProductById(id);
  
      if (!producto) {
        res.json({ error: "producto no encontrado" });
      } else {
        res.json(producto);
      }
    } catch (error) {
      console.error("Error al obtener producto", error);
      res.status(500).json({ error: "error del servidor" });
    }
  }

  async updateProduct(req,res) {
    const id = req.params.pid;
    const update = req.body;
  
    try {
      await productService.updateProduct(id, update);
      res.status(201).json({ message: "Producto modificado exitosamente" });
    } catch (error) {
      res.status(500).json({ error: "erro del servidor" });
    }
  }

  async deleteProduct(req, res) {
    const id = req.params.pid;

    try {
      await productService.deleteProduct(id);
      res.status(201).json({ message: "Producto eliminado exitosamente" });
    } catch (error) {
      res.status(500).json({ error: "erro del servidor" });
    }
  }
}
module.exports = ProductManager;
