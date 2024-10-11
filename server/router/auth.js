import express from "express";
import AuthController from "../controllers/auth.js";

const api = express.Router();

api.post("/auth/register", AuthController.register);
api.post("/auth/login", AuthController.login);

export default api;
