import express from "express";
import MenuController from "../controllers/menu.js";
import md_auth from "../middlewares/authenticated.js";

const api = express.Router();

api.post("/menu", [md_auth.asureAuth], MenuController.createMenu);
api.get("/menu", MenuController.getMenus);
api.patch("/menu/:id", [md_auth.asureAuth], MenuController.updateMenu);
api.delete("/menu/:id", [md_auth.asureAuth], MenuController.deleteMenu);

export default api;
