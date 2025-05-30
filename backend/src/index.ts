import express from "express";
import dotenv from "dotenv";
import { AuthRouter } from "./feature/Auth/routes/Auth.routes";
import cookieParser from "cookie-parser";
import { projectRoute } from "./feature/Projects/routes/projects.routes";
import { CollectionRouter } from "./feature/collections/routes/Colection.routes";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/", AuthRouter);
app.use("/", projectRoute);
app.use("/", CollectionRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
