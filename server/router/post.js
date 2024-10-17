import express from "express";
import multiparty from "connect-multiparty";
import PostController from "../controllers/post.js";
import md_auth from "../middlewares/authenticated.js";

const md_upload = multiparty({ uploadDir: "./uploads/blog" });

const api = express.Router();

api.post("/post", [md_auth.asureAuth, md_upload], PostController.createPost);
api.get("/post", PostController.getPosts);
api.patch(
  "/post/:id",
  [md_auth.asureAuth, md_upload],
  PostController.updatePost
);
api.delete(
  "/post/:id",
  [md_auth.asureAuth, md_upload],
  PostController.deletePost
);
api.get("/post/:path", PostController.getPost);

export default api;
