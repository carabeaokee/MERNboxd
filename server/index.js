import * as dotenv from "dotenv";
// loading .env file
dotenv.config();

import express from "express";
import cors from "cors";
import { userRouter } from "./routes/userRoutes.js";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

const port = process.env.PORT || 9999;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(
        "Connection to MongoDB established, and server is running on port " +
          port
      );
    });
  })
  .catch((err) => console.log(err));

app.use("/api/users", userRouter);

app.use("*", (req, res) =>
  res.status(404).json({ error: "Endpoint not found." })
);

// app.METHOD(PATH, HANDLER)
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });
