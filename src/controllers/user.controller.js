const UserModel = require("../models/user.model.js");
const CartModel = require("../models/cart.model.js");
const passport = require("passport");
const { createHash, isValidPassword } = require("../utils/hashbcryp.js");
const UserDTO = require("../dto/user.dto.js");

class UserController {
  async register(req, res) {
    const { first_name, last_name, email, password, age } = req.body;
    try {
      //Verificar si el correo ya esta registrado
      const existeUsuario = await UserModel.findOne({ email: email });
      if (existeUsuario) {
        return res.status(400).send({ error: "El email ya esta registrado" });
      }
      //Si no lo encuentra, creamos el nuevo usuario:
      const nuevoUsuario = await UserModel.create({
        first_name,
        last_name,
        email,
        password: createHash(password),
        age,
      });

      //Almacenamos la info del usuario en la session:
      req.session.login = true;
      req.session.user = { ...nuevoUsuario._doc };
      res.redirect("/profile");
    } catch (error) {
      console.log("Error al crear el usuario:", error);
      res.status(500).send({ error: "Error al guardar el usuario nuevo" });
    }
  }

  async failedRegister(req, res) {
    res.send({ error: "Registro fallido!" });
  }
}

module.exports = UserController;
