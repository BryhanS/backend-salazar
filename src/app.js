const express = require("express");
const app = express();
const PUERTO = 8080;
const exphbs = require("express-handlebars");

// const productRouter = require("./routes/products.router.js");
// const cartRouter = require("./routes/cart.router.js");
// const exp = require("constants");

const viewRouter = require("./routes/views.router.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("./src/public"));

//config handlebars

app.engine("handlebars", exphbs.engine());

app.set("view engine", "handlebars");

app.set("views", "./src/views");

//Routes
// app.use("/api/products", productRouter);
// app.use("/api/carts", cartRouter);
app.use("/", viewRouter);

app.listen(PUERTO, () => {
  console.log(`Escuchando en el puerto ${PUERTO}`);
});
