import { Response, Request } from "express";
import * as movieServices from "../services/movieService";
import { createMovieSchema } from "../schemas/movieSchema";
import z from "zod";

export async function getMovies(_req: Request, res: Response) {
  res.status(200).json(await movieServices.getMovies());
}

export async function createMovie(req: Request, res: Response) {
  const validation = createMovieSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json(z.treeifyError(validation.error));
  }

  try {
    const response = await movieServices.createMovie(validation.data);
    res.status(201).json({ message: "Movie created with success", response });
  } catch (err) {
    console.error("Error creating movie. ", err);
    res.status(400).json({ message: "Bad request" });
  }
}

export async function getMovieById(req: Request, res: Response) {
  const movie = await movieServices.getMovieById(req.params.id);

  if (!movie) {
    return res.status(404).json({ message: "Movie not found" });
  }

  res.status(200).json(movie);
}

export async function deleteMovie(req: Request, res: Response) {
  const isDeleted = await movieServices.deleteMovie(req.params.id);

  if (isDeleted) {
    res.status(202).json({ message: "Movie deleted" });
    return;
  }

  res.status(404).json({ message: "Movie not found" });
}
