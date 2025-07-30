import { z } from "zod";

export const createMovieSchema = z.object({
  name: z.string().min(1, "Field required"),
  director: z.string().min(1, "Field required"),
  year: z.number().min(1, "Field required"),
});
