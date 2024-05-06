const express = require("express");
const generateProducts = require("../utils/faker");
const router = express.Router();

router.get("/mockingproducts", (req, res) => {
  const productsFaker = [];

  for (let i = 0; i < 100; i++) {
    productsFaker.push(generateProducts());
  }
  res.send(productsFaker);
});

module.exports = router;
