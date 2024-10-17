import Newsletter from "../models/newsletter.js";

async function suscribeEmail(req, res) {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).send({ msg: "El email es obligatorio" });

    // Comprobar si el email ya está registrado
    const existingEmail = await Newsletter.findOne({
      email: email.toLowerCase(),
    });

    if (existingEmail) {
      return res.status(400).send({ msg: "Email ya registrado" });
    }

    // Guardar el email si no está registrado
    const newsletter = new Newsletter({
      email: email.toLowerCase(),
    });
    await newsletter.save();

    // Enviar respuesta de éxito
    res.status(200).send({ msg: "Email registrado con éxito" });
  } catch (error) {
    console.error(error);
    res.status(400).send({ msg: "Email ya registrado" });
  }
}

async function getEmails(req, res) {
  try {
    const { page = 1, limit = 10 } = req.query;

    // Convertir y validar los valores de page y limit
    const parsedPage = parseInt(page, 10);
    const parsedLimit = parseInt(limit, 10);

    // Verificar que page y limit sean números válidos y positivos
    if (
      isNaN(parsedPage) ||
      parsedPage <= 0 ||
      isNaN(parsedLimit) ||
      parsedLimit <= 0
    ) {
      return res.status(400).send({
        msg: "Los parámetros 'page' y 'limit' deben ser números positivos",
      });
    }

    const options = {
      page: parsedPage,
      limit: parsedLimit,
    };

    const emails = await Newsletter.paginate({}, options);

    if (emails.docs.length === 0)
      return res.status(404).send({ msg: "No se encontraron emails" });

    res.status(200).send(emails);
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Error al obtener los emails" });
  }
}

async function deleteEmail(req, res) {
  try {
    const { id } = req.params;

    const emailDeleted = await Newsletter.findByIdAndDelete(id);

    if (!emailDeleted)
      return res.status(404).send({ msg: "Email no encontrado" });

    res.status(200).send({ msg: "Email eliminado con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Error al eliminar el email" });
  }
}

export default { suscribeEmail, getEmails, deleteEmail };
