export interface Movie extends CreateMoviePayload {
  id: string;
}

export interface CreateMoviePayload {
  name: string;
  director: string;
  year: number;
}
