import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "../utils/jwt.js";

const register = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    if (!email) return res.status(400).send({ msg: "El email es obligatorio" });
    if (!password)
      return res.status(400).send({ msg: "La contraseña es obligatoria" });

    const user = new User({
      firstname,
      lastname,
      email: email.toLowerCase(),
      role: "user",
      active: false,
    });

    // Encriptar la contraseña
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    user.password = hashPassword;

    // Guardar el usuario
    const userStorage = await user.save();
    return res.status(201).send(userStorage);
  } catch (error) {
    console.error(error);
    res.status(400).send({ msg: "Error al crear el usuario" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validaciones iniciales
    if (!email) return res.status(400).send({ msg: "El email es obligatorio" });
    if (!password)
      return res.status(400).send({ msg: "La contraseña es obligatoria" });

    const emailLowerCase = email.toLowerCase();

    // Buscar usuario por email
    const userStore = await User.findOne({ email: emailLowerCase });
    if (!userStore)
      return res.status(400).send({ msg: "Usuario o contraseña incorrectos" });

    // Comparar la contraseña usando bcrypt de forma asíncrona
    const check = await bcrypt.compare(password, userStore.password);
    if (!check) {
      res.status(400).send({ msg: "Contraseña incorrecta" });
    } else if (!userStore.active) {
      res.status(401).send({ msg: "Usuario no autorizado o no activo" });
    } else {
      return res.status(200).send({
        access: jwt.createAccessToken(userStore),
        refresh: jwt.createRefreshToken(userStore),
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Error del servidor" });
  }
};

const refreshAccessToken = async (req, res) => {
  try {
    const { token } = req.body;

    // Validar que el token esté presente
    if (!token) return res.status(400).send({ msg: "Token requerido" });

    // Decodificar el token para obtner el user_id
    const { user_id } = jwt.decoded(token);

    // Buscar el usuario en la BD por el user_id
    const userStorage = await User.findOne({ _id: user_id });

    // Validaciones iniciales
    if (!userStorage)
      return res.status(404).send({ msg: "Usuario no encontrado" });

    // Generar y enviar el nuevo AccessToken
    return res.status(200).send({
      accessToken: jwt.createAccessToken(userStorage),
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Error del servidor" });
  }
};
export default { register, login, refreshAccessToken };
