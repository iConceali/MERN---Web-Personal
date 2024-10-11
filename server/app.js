import express from "express";
// import bodyParser from "body-parser";
import cors from "cors";
import { API_VERSION } from "./constants.js";

export const app = express();

// Import routings
import authRoutes from "./router/auth.js";

// Configure Body Parse
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configure static folder
app.use(express.static("uploads"));

// Configure Header HTTP - CORS
app.use(cors());

// Configure routings
app.use(`/api/${API_VERSION}`, authRoutes);
