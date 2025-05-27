import express from "express";
import { AuthController } from "./feature/Auth/controller/AuthController";

const app = express();
app.use(express.json());

app.post("/register", AuthController.registerUser);
app.post("/login", AuthController.loginUser);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
