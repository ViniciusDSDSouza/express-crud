import { Router } from "express";
import {
  getMovies,
  getMovieById,
  createMovie,
  deleteMovie,
} from "../controllers/movieControllers.js";

const router = Router();

router.get("/", getMovies);
router.post("/", createMovie);
router.get("/:id", getMovieById);
router.delete("/:id", deleteMovie);

export default router;
