import { Response, Request } from "express";
import { db } from "../db";
import { Movie } from "../models/Movies";

export async function getMovies(_req: Request, res: Response) {
  await db.read();
  const data = db.data?.movies || [];

  res.json(data);
}

export async function createMovie(req: Request, res: Response) {
  await db.read();

  if (!db.data) {
    db.data = { movies: [] };
  }

  const body: Omit<Movie, "id"> = req.body;

  const movie: Movie = {
    director: body.director,
    name: body.name,
    year: body.year,
    id: Date.now(),
  };

  db.data?.movies.push(movie);
  db.write();

  res.status(201).json({ message: "Movie created with success", movie });
}

export async function getMovieById(req: Request, res: Response) {
  await db.read();

  const id = Number(req.params.id);
  const movie = db.data?.movies.find((movie) => movie.id === id);

  if (!movie) {
    return res.status(404).json({ message: "Movie not found" });
  }

  res.json(movie);
}

export async function deleteMovie(req: Request, res: Response) {
  await db.read();

  if (!db.data?.movies) {
    return res.status(500).json({ message: "Database not initialized" });
  }

  const id = Number(req.params.id);

  const index = db.data?.movies.findIndex((movie) => movie.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Movie not found" });
  }

  db.data?.movies.splice(index, 1);
  await db.write();
  res.status(202).json({ message: "Movie deleted with success" });
}
