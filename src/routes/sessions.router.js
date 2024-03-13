const express = require("express");
const router = express.Router();
const UserModel = require("../models/user.molde.js");
const passport = require("passport");

// login

router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/api/sessions/faillogin",
  }),
  async (req, res) => {
    if (!req.user) return res.status(400).send({ status: "error" });

    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      age: req.user.age,
      email: req.user.email,
    };
    req.session.login = true;
    res.redirect("/profile");
  }
);

router.get("/faillogin", (req, res) => {
  res.send({ error: "Fallo el login!" });
});

router.get("/logout", (req, res) => {
  if (req.session.login) {
    req.session.destroy();
  }
  res.status(200).send({ message: "Login eliminado" });
});

module.exports = router;
