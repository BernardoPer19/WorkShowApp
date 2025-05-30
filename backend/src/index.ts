import express from "express";
import { AuthController } from "./feature/Auth/controller/AuthController";
import dotenv from "dotenv";
import { projectRoute } from "./feature/Projects/routes/projects.routes";
import cookieParser from "cookie-parser";
import { commentRoute } from "./feature/commets/routes/comments.routes";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/project" , projectRoute);
app.use("/comment" , commentRoute)

app.post("/register", AuthController.registerUser);
app.post("/login", AuthController.loginUser);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
