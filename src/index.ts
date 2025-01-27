import express, { Request } from "express";
import cors from "cors";
import "dotenv/config";
import router from "./features/routes";
import { notFoundHandler, errorHandler } from "./middleware/error.middleware";

const app = express();
const port = process.env.PORT;

app.use(express.json({ limit: "150mb" }));
app.use(express.urlencoded({ extended: true, limit: "150mb" }));
app.use(cors());

app.get("/test", (req, res) => {
  res.send(`Still Alive 🚀`);
});

app.use("/api/v1/", router);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Database connected successfully`);
  console.log(`Server is running on port 🚀: ${port}`);
});
