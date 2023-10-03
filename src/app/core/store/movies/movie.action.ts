import { Movie } from "../../models";

export class GetMovies {
  static readonly type = '[MOVIE] Get movies';
}

export class GetMovieInfo {
  static readonly type = '[MOVIE] Get movie info';
  constructor(public showtimeCode: Movie['maChieuPhim']) {}
}
