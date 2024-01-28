const express = require("express");
const app = express();
const PUERTO = 8080;
// const exp = require("constants");

const ProductManager = require("../src/controllers/ProductMangager.js");
const productManganer = new ProductManager("./src/models/product-data.json");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

app.post("/api/product", async (req, res) => {
  const newProduct = req.body;
  try {
    await productManganer.addProducts(newProduct);
    res.status(201).json({ message: "Producto agregado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "error del servidor" });
  }
});

app.put("/api/products/:pid", async (req, res) => {
  const id = req.params.pid;
  const update = req.body;

  try {
    await productManganer.updateProduct(parseInt(id), update);
    res.status(201).json({ message: "Producto modificado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "erro del servidor" });
  }
});

app.delete("/api/products/:pid", async (req, res) => {
  const id = req.params.pid;

  try {
    await productManganer.deleteProduct(parseInt(id));
    res.status(201).json({ message: "Producto eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "erro del servidor" });
  }
});

app.listen(PUERTO);
