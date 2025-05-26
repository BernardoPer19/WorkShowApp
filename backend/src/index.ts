import express from "express";
import { projectRoute } from "./feature/Projects/routes/projects.routes";
const app = express();
app.use(express.json());


const PORT = process.env.PORT || 3000;

app.use("/project" , projectRoute)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});