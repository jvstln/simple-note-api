import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import indexRoute from "./routes/index.route";
import { connectToDatabase } from "./utils/db";
import { requestLogger } from "./middleware/request-logger.middleware";

// Get environmental variables
dotenv.config();
const PORT = process.env.PORT || 8080;
const DATABASE_URL = process.env.DATABASE_URL || "";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// Routes
app.use("/api", indexRoute);

// Connect to database and then, start the server
connectToDatabase(DATABASE_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Note API listening at port ${PORT}`));
  })
  .catch((error) => console.log("Error connecting to database", error));
