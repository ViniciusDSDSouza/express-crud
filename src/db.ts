import { join } from "path";
import { Low, JSONFile } from "lowdb";
import { Movie } from "./models/Movies";

type Data = {
  movies: Movie[];
};

const file = join(__dirname, "../db.json");
const adapter = new JSONFile<Data>(file);
const db = new Low<Data>(adapter);

export { db };
