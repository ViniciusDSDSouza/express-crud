import { dirname, join } from "path";
import { Low, JSONFile } from "lowdb";
import { fileURLToPath } from "url";
import { Movie } from "./models/Movies.js";

type Data = {
  movies: Movie[];
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const file = join(__dirname, "db.json");
const adapter = new JSONFile<Data>(file);
const db = new Low<Data>(adapter);

export { db };
