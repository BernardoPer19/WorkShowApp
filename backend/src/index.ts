import express from "express";
import dotenv from "dotenv";
<<<<<<< HEAD
import { AuthRouter } from "./feature/Auth/routes/Auth.routes";
=======
import { projectRoute } from "./feature/Projects/routes/projects.routes";
import cookieParser from "cookie-parser";
dotenv.config();
>>>>>>> 2064e347dd8c54c018f166a8d4b82899308dfbf6

const app = express();
app.use(express.json());
app.use(cookieParser())

app.use("/project" , projectRoute);

app.use("/", AuthRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
