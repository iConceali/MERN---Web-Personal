import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "../utils/jwt.js";

function register(req, res) {
  const { firstname, lastname, email, password } = req.body;

  if (!email) res.status(400).send({ msg: "El email es obligatorio" });
  if (!password) res.status(400).send({ msg: "La contraseña es obligatoria" });

  const user = new User({
    firstname,
    lastname,
    email: email.toLowerCase(),
    role: "user",
    active: false,
  });

  // Escriptar la contraseña
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  user.password = hashPassword;

  // Guardar el usuario
  user
    .save()
    .then((userStorage) => {
      res.status(200).send(userStorage);
    })
    .catch((error) => {
      console.error(error);
      res.status(400).send({ msg: "Error al crear el usuario" });
    });
}

function login(req, res) {
  const { email, password } = req.body;

  if (!email) res.status(400).send({ msg: "El email es obligatorio" });
  if (!password) res.status(400).send({ msg: "La contraseña es obligatoria" });

  const emailLowerCase = email.toLowerCase();

  User.findOne({ email: emailLowerCase })
    .then((userStore) => {
      bcrypt.compare(password, userStore.password, (bcryptError, check) => {
        if (bcryptError) {
          res.status(500).send({ msg: "Error del servidor" });
        } else if (!check) {
          res.status(400).send({ msg: "Contraseña incorrecta" });
        } else if (!userStore.active) {
          res.status(401).send({ msg: "Usuario no autorizado o no activo" });
        } else {
          res.status(200).send({
            access: jwt.createAccessToken(userStore),
            refresh: jwt.createRefreshToken(userStore),
          });
        }
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send({ msg: "Error del servidor" });
    });
}

export default { register, login };
