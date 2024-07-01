const express = require("express");
const router = express.Router();
const ViewsController = require("../controllers/views.controller.js");
const viewController = new ViewsController();

router.get("/products", viewController.renderProduct);

router.get("/carts/:cid", viewController.renderCart);

router.get("/login", viewController.login);

router.get("/profile", viewController.profile);

router.get("/register", viewController.register);

router.get("/", viewController.renderHombe);

router.get("/reset-password", viewController.renderResetPassword);

router.get("/password", viewController.renderChangePassword);

router.get("/confirmacion-envio", viewController.renderConfirmation);

router.get("/panel-premium", viewController.renderPremium);

module.exports = router;
