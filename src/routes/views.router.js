const express = require("express");
const router = express.Router();

const ProductManager = require("../controllers/product-manager-db.js");
const productManager = new ProductManager();

router.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render("home", { products: products });
  } catch (error) {
    console.error("Error al obtener los productos", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.get("/realtimeproducts", async (req, res) => {
  try {
    res.render("realtimeproducts");
  } catch (error) {
    console.error("Error al obtener los productos", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
