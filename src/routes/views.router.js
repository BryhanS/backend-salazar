const express = require("express");
const router = express.Router();
const ProductManager = require("../controllers/product-manager-db.js");
const CartManager = require("../controllers/cart-manager-db.js");
const productManager = new ProductManager();
const cartManager = new CartManager();

// router.get("/products", async (req, res) => {
//   try {
//     const { page = 1, limit = 2 } = req.query;
//     const products = await productManager.getProducts({
//       page: parseInt(page),
//       limit: parseInt(limit),
//     });

//     const newArray = products.docs.map((product) => {
//       const { _id, ...rest } = product.toObject();
//       return rest;
//     });

//     res.render("products", {
//       productos: newArray,
//       hasPrevPage: products.hasPrevPage,
//       hasNextPage: products.hasNextPage,
//       prevPage: products.prevPage,
//       nextPage: products.nextPage,
//       currentPage: products.page,
//       totalPages: products.totalPages,
//     });
//   } catch (error) {
//     console.error("Error al obtener productos", error);
//     res.status(500).json({
//       status: "error",
//       error: "Error interno del servidor",
//     });
//   }
// });

// router.get("/carts/:cid", async (req, res) => {
//   const cartId = req.params.cid;

//   try {
//     const cart = await cartManager.getCartById(cartId);

//     if (!cart) {
//       console.log("No exite el carrito ID");
//       return res.status(404).json({ error: "Carrito no encontrado" });
//     }

//     const productInCart = cart.products.map((item) => ({
//       product: item.product.toObject(),
//       quantity: item.quantity,
//     }));
//     res.render("carts", { productos: productInCart });
//   } catch (error) {
//     console.error("Error al obtener el carrito", error);
//     res.status(500).json({ error: "Error interno del servidor" });
//   }
// });

router.get("/login", (req, res) => {
  if (req.session.login) {
    return res.redirect("/profile");
  }
  res.render("login");
});

router.get("/profile", (req, res) => {
  if (!req.session.login) {
    return res.redirect("/login");
  }
  res.render("profile", { user: req.session.user });
});

router.get("/register", (req, res) => {
  res.render("register");
});

module.exports = router;
