const express = require("express");
const app = express();
const PUERTO = 8080;
// const exp = require("constants");

const ProductManager = require("../src/js/ProductMangager.js");
const productManganer = new ProductManager("./src/db/product-data.json");

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Gracias por ingresar a mi nueva APP!!!");
});

app.get("/api/products", async (req, res) => {
  try {
    const limit = req.query.limit;
    const productos = await productManganer.getProducts();

    if (!limit) {
      res.json(productos);
      return;
    } else {
      res.json(productos.slice(0, limit));
    }
  } catch (error) {
    console.error("Ocurrio error al al llamar a los productos", error);
    res.status(500).json({ error: "Error del servidor" });
  }
});

app.get("/api/products/:pid", async (req, res) => {
  try {
    const id = req.params.pid;
    const producto = await productManganer.getProductById(parseInt(id));

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

app.listen(PUERTO);
