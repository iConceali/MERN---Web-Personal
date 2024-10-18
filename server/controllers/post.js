import Post from "../models/post.js";
import image from "../utils/image.js";

const createPost = async (req, res) => {
  try {
    const post = new Post(req.body);
    post.created_at = new Date();

    // Procesar miniatura si existe
    if (req.files.miniature) {
      const imagePath = image.getFilePath(req.files.miniature);
      post.miniature = imagePath;
    }

    // Guardar el post en la BD
    const postStored = await post.save();

    // Enviar respuesta de éxito
    res.status(201).send(postStored);
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Error al crear el post" });
  }
};

const getPosts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    // Convertir los valores de page y limit a números enteros
    const parsedPage = parseInt(page, 10);
    const parsedLimit = parseInt(limit, 10);

    // Verificar que los valores de page y limit sean números válidos y positivos
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
      sort: { created_at: "desc" }, // Ordenar por fecha de creación, descendente
    };

    const posts = await Post.paginate({}, options);

    // Verificar si no se encontraron posts
    if (posts.docs.length === 0) {
      return res.status(404).send({ msg: "No se encontraron posts" });
    }

    res.status(200).send(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Error al obtener los posts" });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const postData = req.body;

    if (req.files.miniature) {
      const imagePath = image.getFilePath(req.files.miniature);
      postData.miniature = imagePath;
    }

    const postUpdated = await Post.findByIdAndUpdate(id, postData, {
      new: true,
    });

    if (!postUpdated) res.status(404).send({ msg: "Post no encontrado" });

    res.status(200).send({ msg: "Post actualizado" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Error al actualizar el post" });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const postDeleted = await Post.findByIdAndDelete(id);

    if (!postDeleted)
      return res.status(404).send({ msg: "Post no encontrado" });

    res.status(200).send({ msg: "Post eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Error al eliminar el post" });
  }
};

const getPost = async (req, res) => {
  try {
    const { path } = req.params;

    const post = await Post.findOne({ path });

    if (!post) return res.status(404).send({ msg: "Post no encontrado" });

    res.status(200).send(post);
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Error al obtener el post" });
  }
};

export default { createPost, getPosts, updatePost, deletePost, getPost };
