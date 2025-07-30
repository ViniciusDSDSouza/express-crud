import { join } from "path";
import { Low, JSONFile } from "lowdb";
import { Movie } from "./models/Movies";
import fs from "fs";

type Data = {
  movies: Movie[];
};

const file = join(__dirname, "../db.json");
const adapter = new JSONFile<Data>(file);
const db = new Low<Data>(adapter);

async function initDB() {
  if (
    !fs.existsSync("db.json") ||
    fs.readFileSync("db.json", "utf-8").trim() === ""
  ) {
    fs.writeFileSync("db.json", JSON.stringify({ movies: [] }, null, 2));
  }

  try {
    await db.read();

    if (!db.data) {
      db.data = { movies: [] };
      await db.write();
    }
  } catch (error) {
    console.error("Erro ao ler o DB:", error);
    db.data = { movies: [] };
    await db.write();
  }
}

export { db, initDB };
