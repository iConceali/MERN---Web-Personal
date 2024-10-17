import express from "express";
// import bodyParser from "body-parser";
import cors from "cors";
import { API_VERSION } from "./constants.js";

export const app = express();

// Import routings
import authRoutes from "./router/auth.js";
import userRoutes from "./router/user.js";
import menuRoutes from "./router/menu.js";
import courseRoutes from "./router/course.js";
import postRoutes from "./router/post.js";

// Configure Body Parse
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configure static folder
app.use(express.static("uploads"));

// Configure Header HTTP - CORS
app.use(cors());

// Configure routings
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, userRoutes);
app.use(`/api/${API_VERSION}`, menuRoutes);
app.use(`/api/${API_VERSION}`, courseRoutes);
app.use(`/api/${API_VERSION}`, postRoutes);
