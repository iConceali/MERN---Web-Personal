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

async function getCourses(req, res) {
  try {
    const { page = 1, limit = 10 } = req.query;
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
    };

    const courses = await Course.paginate({}, options);

    res.status(200).send(courses);
  } catch (error) {
    console.error(error);
    res.status(400).send({ msg: "Error al obtener los cursos" });
  }
}

async function updateCourse(req, res) {
  try {
    const { id } = req.params;
    const courseData = req.body;

    if (req.files && req.files.miniature) {
      const imagePath = image.getFilePath(req.files.miniature);
      courseData.miniature = imagePath;
    }

    const courseUpdated = await Course.findByIdAndUpdate(id, courseData, {
      new: true,
    });

    if (!courseUpdated) res.status(404).send({ msg: "Curso no encontrado" });

    res.status(200).send({ msg: "Curso actualizado" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Error al actualizar el curso" });
  }
}

async function deleteCourse(req, res) {
  try {
    const { id } = req.params;

    const courseDeleted = await Course.findByIdAndDelete(id);

    if (!courseDeleted)
      return res.status(404).send({ msg: "Curso no encontrado" });

    res.status(200).send({ msg: "Curso eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Error al eliminar el curso" });
  }
}

export default { createCourse, getCourses, updateCourse, deleteCourse };
