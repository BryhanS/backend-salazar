const express = require("express");
const router = express.Router();

const ProductManager = require("../controllers/product-manager-db.js");
const productManager = new ProductManager();

router.get("/", async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;

    const products = await productManager.getProducts({
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
});

router.get("/:pid", async (req, res) => {
  try {
    const id = req.params.pid;
    const producto = await productManager.getProductById(id);

    if (!producto) {
      res.json({ error: "producto no encontrado" });
    } else {
      res.json(producto);
    }
  } catch (error) {
    console.error("Error al obtener producto", error);
    res.status(500).json({ error: "error del servidor" });
  }
});

router.post("", async (req, res) => {
  const newProduct = req.body;
  try {
    await productManager.addProducts(newProduct);
    res.status(201).json({ message: "Producto agregado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "error del servidor" });
  }
});

router.put("/:pid", async (req, res) => {
  const id = req.params.pid;
  const update = req.body;

  try {
    await productManager.updateProduct(id, update);
    res.status(201).json({ message: "Producto modificado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "erro del servidor" });
  }
});

router.delete("/:pid", async (req, res) => {
  const id = req.params.pid;

  try {
    await productManager.deleteProduct(id);
    res.status(201).json({ message: "Producto eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "erro del servidor" });
  }
});

module.exports = router;
