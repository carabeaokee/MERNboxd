import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

const port = process.env.PORT || 9009;
app.listen(port, () => {
  console.log("Server is running on port" + port);
});
