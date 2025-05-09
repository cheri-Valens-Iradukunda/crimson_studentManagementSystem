import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";

import routes from "./routes/index.js";
import { errorResponse, logger } from "./utils/index.js";

const app = express();
dotenv.config();


const PORT = process.env.PORT || 5000;


// middlewares

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome in student management system!");
});

// api routes

app.use("/api/management", routes);

// Middleware to handle 404 errors

app.use((req, res, next) => {
  const err = new Error("Route not found");
  err.status = 404;
  next(err);       // Pass the error to the error handler
});

// Default error handler

app.use(errorResponse);

// listen for incoming requests
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
