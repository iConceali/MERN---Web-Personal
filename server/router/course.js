import express from "express";
import multiparty from "connect-multiparty";
import CourseController from "../controllers/course.js";
import md_auth from "../middlewares/authenticated.js";

const md_upload = multiparty({ uploadDir: "./uploads/course" });
const api = express.Router();

api.post(
  "/course",
  [md_auth.asureAuth, md_upload],
  CourseController.createCourse
);

export default api;
