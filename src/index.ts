import express from "express";
import movies from "./routes/movieRoutes";

const app = express();
const PORT = 8080;

app.use(express.json());

app.use("/movies", movies);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
