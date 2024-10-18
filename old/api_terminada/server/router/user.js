import express from "express";
import multiparty from "connect-multiparty";
import UserController from "../controllers/user.js";
import md_auth from "../middlewares/authenticated.js";

const md_upload = multiparty({ uploadDir: "./uploads/avatar" });
const api = express.Router();

api.get("/user/me", [md_auth.asureAuth], UserController.getMe);
api.get("/users", [md_auth.asureAuth], UserController.getUsers);
api.post("/user", [md_auth.asureAuth, md_upload], UserController.createUser);
api.patch(
  "/user/:id",
  [md_auth.asureAuth, md_upload],
  UserController.updateUser
);
api.delete(
  "/user/:id",
  [md_auth.asureAuth, md_upload],
  UserController.deleteUser
);

export default api;
