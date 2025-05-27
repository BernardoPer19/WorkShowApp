import express from "express";
import dotenv from "dotenv";
import { AuthRouter } from "./feature/Auth/routes/Auth.routes";

const app = express();
app.use(express.json());
dotenv.config();

app.use("/", AuthRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
