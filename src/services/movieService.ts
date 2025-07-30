import { Movie, CreateMoviePayload } from "models/Movies";
import { db, initDB } from "../db";
import { v4 as uuid } from "uuid";

initDB();

export async function getMovies(): Promise<Movie[]> {
  await db.read();

  return db.data?.movies ?? [];
}

export async function getMovieById(id: string): Promise<Movie | undefined> {
  await db.read();
  return db.data?.movies.find((movie) => movie.id === id);
}

export async function createMovie(payload: CreateMoviePayload): Promise<Movie> {
  await db.read();

  if (!db.data?.movies) {
    db.data = { movies: [] };
  }

  const newMovie: Movie = { ...payload, id: uuid() };

  db.data.movies.push(newMovie);
  await db.write();

  return newMovie;
}

export async function deleteMovie(id: string): Promise<boolean> {
  await db.read();

  if (!db.data?.movies) {
    return false;
  }

  const deleteIndex = db.data?.movies.findIndex((movie) => movie.id === id);

  if (deleteIndex !== -1) {
    db.data?.movies.splice(deleteIndex, 1);
    await db.write();
    return true;
  }

  return false;
}
