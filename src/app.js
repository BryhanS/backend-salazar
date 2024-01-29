const express = require("express");
const app = express();
const PUERTO = 8080;

const productRouter = require("./routes/products.router.js");
const cartRouter = require("./routes/cart.router.js");

// const exp = require("constants");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Gracias por ingresar a mi nueva APP!!!");
});

//Routes

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

app.listen(PUERTO);
