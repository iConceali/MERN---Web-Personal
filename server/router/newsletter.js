import express from "express";
import NewsletterController from "../controllers/newsletter.js";
import md_auth from "../middlewares/authenticated.js";

const api = express.Router();

api.post("/newsletter", NewsletterController.suscribeEmail);
api.get("/newsletter", [md_auth.asureAuth], NewsletterController.getEmails);
api.delete(
  "/newsletter/:id",
  [md_auth.asureAuth],
  NewsletterController.deleteEmail
);

export default api;
