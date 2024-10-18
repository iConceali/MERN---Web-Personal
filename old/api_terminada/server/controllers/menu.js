import Menu from "../models/menu.js";

async function createMenu(req, res) {
  try {
    const menu = new Menu(req.body);

    const menuStored = await menu.save();

    res.status(200).send(menuStored);
  } catch (error) {
    console.error(error);
    res.status(400).send({ msg: "Error al crear el menu" });
  }
}

async function getMenus(req, res) {
  try {
    const { active } = req.query;

    let response = null;

    if (active === undefined) {
      response = await Menu.find().sort({ order: "asc" });
    } else {
      response = await Menu.find({ active }).sort({ order: "asc" });
    }

    if (!response) {
      res.status(400).send({ msg: "No se ha encontrado ningún menu" });
    } else {
      res.status(200).send(response);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Error al obtener los Menus" });
  }
}

async function updateMenu(req, res) {
  try {
    const { id } = req.params;
    const menuData = req.body;

    const menuUpdated = await Menu.findByIdAndUpdate(id, menuData, {
      new: true,
    });

    // Verificar si el menu  fue encontrado y actualizado
    if (!menuUpdated)
      return res.status(404).send({ msg: "Menu no encontrado" });

    // Respuesta de menu actualziado
    res.status(200).send({ msg: "Menu actualizado" });
  } catch (error) {
    console.error(error);
    res.status(400).send({ msg: "Error al actualizar el menu" });
  }
}

async function deleteMenu(req, res) {
  try {
    const { id } = req.params;

    const menuDeleted = await Menu.findByIdAndDelete(id);

    // Verificar si el usuario fue encontrado y eliminado
    if (!menuDeleted) {
      return res.status(404).send({ msg: "Menu no encontrado" });
    }

    // Respuesta de usuario eliminado
    res.status(200).send({ msg: "Menu eliminado" });
  } catch (error) {
    console.error(error);
    res.status(400).send({ msg: "Error al eliminar el menu" });
  }
}

export default { createMenu, getMenus, updateMenu, deleteMenu };
