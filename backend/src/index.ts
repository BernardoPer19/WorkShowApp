import express from "express";
import dotenv from "dotenv";
import { AuthRouter } from "./feature/Auth/routes/Auth.routes";
import cookieParser from "cookie-parser";
import { projectRoute } from "./feature/Projects/routes/projects.routes";
import { commentRoute } from "./feature/commets/routes/comments.routes";
import { CollectionRouter } from "./feature/collections/routes/Colection.routes";
import { errorHandler } from "./middlewares/errorHandler";
import cors from 'cors'
dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/", AuthRouter);
app.use("/", projectRoute);
app.use("/", CollectionRouter);
app.use("/",commentRoute)

app.use(errorHandler);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
