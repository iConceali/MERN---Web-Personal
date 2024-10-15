import Course from "../models/course.js";
import image from "../utils/image.js";

async function createCourse(req, res) {
  try {
    const course = new Course(req.body);

    // Procesar miniatura si existe
    if (req.files.miniature) {
      const imagePath = image.getFilePath(req.files.miniature);
      course.miniature = imagePath;
    }

    // Guardar el curso en la BD
    const courseStored = await course.save();

    // Enviar respuesta de éxito
    res.status(201).send(courseStored);
  } catch (error) {
    console.error(error);
    res.status(400).send({ msg: "Error al crear el curso" });
  }
}

export default { createCourse };
