import { User } from "./auth.model";
import { Movie, MovieInfoWithSeats } from "./movie.model";

export interface AuthStateModel {
  accessToken: string;
  userLoggedIn: {
    isLoading: boolean;
    data: User | Record<string, never>;
    error: unknown;
  }
}

export interface MovieStateModel {
  movies: {
    isLoading: boolean;
    data: Movie[];
    error: unknown;
  },
  movieInfo: {
    isLoading: boolean;
    data: MovieInfoWithSeats | Record<string, never>;
    error: unknown;
  }
}
