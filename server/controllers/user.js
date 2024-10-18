import User from "../models/user.js";
import bcrypt from "bcryptjs";
import image from "../utils/image.js";

const getMe = async (req, res) => {
  try {
    const { user_id } = req.user;

    const response = await User.findById(user_id);
    if (!response)
      return res.status(400).send({ msg: "Usuario no encontrado" });

    return res.status(200).send({ response });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ msg: "Error del servidor" });
  }
};

const getUsers = async (req, res) => {
  try {
    const { active } = req.query;

    let response = null;

    if (active === undefined) {
      response = await User.find();
    } else {
      response = await User.find({ active });
    }

    res.status(200).send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Error al obtener los usuarios" });
  }
};

const createUser = async (req, res) => {
  try {
    const { password } = req.body;
    const user = new User({ ...req.body, active: false });

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    user.password = hashPassword;

    // Procesar avatar si existe
    if (req.files.avatar) {
      const imagePath = image.getFilePath(req.files.avatar);
      user.avatar = imagePath;
    }

    // Guardar el usuario en la BD
    const userStored = await user.save();

    // Enviar respuesta de éxito
    res.status(201).send(userStored);
  } catch (error) {
    console.error(error);
    res.status(400).send({ msg: "Error al crear el usuario" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userData = req.body;

    // Password
    if (userData.password) {
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(userData.password, salt);
      userData.password = hashPassword;
    } else {
      delete userData.password;
    }
    // Avatar
    if (req.files.avatar) {
      const imagePath = image.getFilePath(req.files.avatar);
      userData.avatar = imagePath;
    }

    const userUpdated = await User.findByIdAndUpdate({ _id: id }, userData, {
      new: true,
    });

    // Verificar si el usuario fue encontrado y actualizado
    if (!userUpdated)
      return res.status(404).send({ msg: "Usuario no encontrado" });

    // Respuesta de usuario actualziado
    res.status(200).send({ msg: "Usuario actualizado" });
  } catch (error) {
    console.error(error);
    res.status(400).send({ msg: "Error al actualizar el usuario" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const userDeleted = await User.findByIdAndDelete(id);

    // Verificar si el usuario fue encontrado y eliminado
    if (!userDeleted) {
      return res.status(404).send({ msg: "Usuario no encontrado" });
    }

    // Respuesta de usuario eliminado
    res.status(200).send({ msg: "Usuario eliminado" });
  } catch (error) {
    console.error(error);
    res.status(400).send({ msg: "Error al eliminar al usuario" });
  }
};

export default {
  getMe,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
