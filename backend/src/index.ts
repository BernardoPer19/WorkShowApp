import express from "express";
import { AuthController } from "./feature/Auth/controller/AuthController";
import dotenv from "dotenv";

const app = express();
app.use(express.json());
dotenv.config();

app.post("/register", AuthController.registerUser);
app.post("/login", AuthController.loginUser);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
