import { BookingPayload, Movie, Seat } from "../../models";

export class GetMovies {
  static readonly type = '[MOVIE] Get movies';
}

export class GetMovieInfo {
  static readonly type = '[MOVIE] Get movie info';
  constructor(public showtimeCode: Movie['maChieuPhim']) {}
}

export class SelectSeat {
  static readonly type = '[MOVIE] Select seat';
  constructor(public seat: Seat, public nameOfSeat: string) {}
}

export class BookingMovie {
  static readonly type = '[MOVIE] Booking movie';
  constructor(public data: BookingPayload) {}
}
