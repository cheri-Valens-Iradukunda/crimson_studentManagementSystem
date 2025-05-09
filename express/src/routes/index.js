/**
 * This file defines the main routing for the application.
 * It imports student routes and applies middleware for logging requests.
 *
 * To add more routes, import them here and use `router.use()` to define new paths.
 */
import express from "express";

// here we import something we need in order to run in good way properly 

import studentRoutes from "./student.routes.js";

import { requestLogger } from "../middleware/index.js";

const router = express.Router();

// here we gave the name router will be using in api when we want somthing to do in project we made

router.use("/students", requestLogger, studentRoutes);


export default router;
