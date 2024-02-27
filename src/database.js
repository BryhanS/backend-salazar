const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://bryhansalazarpacsi:coderhouse@cluster0.nhj6jza.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("conexion exitosa"))
  .catch(() => console.log("error en conexion"));
