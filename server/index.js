// Importing the dotenv library to load environment variables from a .env file
import * as dotenv from "dotenv";
// Loading the .env file
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routes/userRoutes.js";
import filmRouter from "./routes/filmRoutes.js";
import reviewRouter from "./routes/reviewRoutes.js";

// Initializing an Express application
const app = express();
// Using middleware to parse JSON bodies
app.use(express.json());
// Using middleware to parse URL-encoded bodies
app.use(
  express.urlencoded({
    extended: true,
  })
);
// Using CORS middleware
app.use(cors());
// Setting the port for the server to listen on, either from environment variables or a default value
const port = process.env.PORT || process.env.CUSTOM_PORT;
// Connecting to the MongoDB database using the URI from environment variables
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // If the connection is successful, start the server
    app.listen(port, () => {
      console.log(
        "Connection to MongoDB established, and server is running on port " +
          port
      );
    });
  })
  // If there is an error connecting to the database, log the error
  .catch((err) => console.log(err));

// Using the _Router for all routes starting with "/api/_"
app.use("/api/users", userRouter);
app.use("/api/films", filmRouter);
app.use("/api/reviews", reviewRouter);

// For any other routes not previously defined, return a 404 error with a message
app.use("*", (req, res) =>
  res.status(404).json({ error: "Endpoint not found." })
);

// app.METHOD(PATH, HANDLER)
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });
