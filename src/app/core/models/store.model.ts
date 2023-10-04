import { User } from './auth.model';
import { Movie, MovieInfoWithSeats } from './movie.model';
import { Seat } from './seats.model';

export interface AuthStateModel {
  accessToken: string;
  userLoggedIn: {
    isLoading: boolean;
    data: User | Record<string, never>;
    error: unknown;
  };
  signup: {
    isLoading: boolean;
    error: unknown;
  };
}

export interface MovieStateModel {
  movies: {
    isLoading: boolean;
    data: Movie[];
    error: unknown;
  };
  movieInfo: {
    isLoading: boolean;
    data: MovieInfoWithSeats;
    error: unknown;
  };
  bookingMovie: {
    isLoading: boolean;
    error: unknown;
  };
  totalToPay: Seat['giaVe'];
  namesOfSeatsSelecting: Seat['tenGhe'][];
}
