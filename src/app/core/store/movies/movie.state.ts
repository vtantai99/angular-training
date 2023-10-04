import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { forkJoin, map, tap } from 'rxjs';
import { MovieStateModel } from '../../models';
import { MoviesService } from '../../services';
import {
  BookingMovie,
  GetMovieInfo,
  GetMovies,
  SelectSeat,
} from './movie.action';

const authStateDefault: MovieStateModel = {
  movies: {
    isLoading: false,
    data: [],
    error: null,
  },
  movieInfo: {
    isLoading: false,
    data: { thongTinPhim: {}, danhSachGhe: [] },
    error: null,
  },
  totalToPay: 0,
  namesOfSeatsSelecting: [],
  bookingMovie: {
    isLoading: false,
    error: null,
  },
};

@State<MovieStateModel>({
  name: 'movie',
  defaults: authStateDefault,
})
@Injectable()
export class MovieState {
  constructor(private movieService: MoviesService) {}

  @Selector()
  static movies(state: MovieStateModel) {
    return state.movies;
  }

  @Selector()
  static movieInfo(state: MovieStateModel) {
    return state.movieInfo;
  }

  @Selector()
  static totalToPay(state: MovieStateModel) {
    return state.totalToPay;
  }

  @Selector()
  static namesOfSeatsSelecting(state: MovieStateModel) {
    return state.namesOfSeatsSelecting;
  }

  @Selector()
  static bookingMovie(state: MovieStateModel) {
    return state.bookingMovie;
  }

  // Get movies
  @Action(GetMovies)
  getMovies({ patchState, getState }: StateContext<MovieStateModel>) {
    const getCurrentState = (): MovieStateModel['movies'] => getState().movies;
    patchState({
      movies: { ...getCurrentState(), isLoading: true },
    });
    forkJoin({
      movies: this.movieService.getMovies(),
      cinemaShowtimeInfo: this.movieService.getCinemaShowTimeInfo(),
    })
      .pipe(
        map((result) => {
          const { movies, cinemaShowtimeInfo } = result;
          const newMovies = movies.map((movie) => {
            const maChieuPhim = cinemaShowtimeInfo
              .map((c) => c.lstCumRap)
              .flat()
              .flatMap((cumRap) => cumRap.danhSachPhim)
              .find((phim) => phim.maPhim === movie.maPhim)
              ?.lstLichChieuTheoPhim[0]?.maLichChieu;
            return { ...movie, maChieuPhim };
          });
          return { movies: newMovies, cinemaShowtimeInfo };
        })
      )
      .subscribe({
        next: (result) => {
          const { movies } = result;
          patchState({
            movies: {
              ...getCurrentState(),
              isLoading: false,
              data: movies,
            },
          });
        },
        error: (error) => {
          patchState({
            movies: {
              ...getCurrentState(),
              isLoading: false,
              error,
            },
          });
        },
      });
  }

  // Get movie info
  @Action(GetMovieInfo)
  getMovieInfo(
    { patchState, getState }: StateContext<MovieStateModel>,
    { showtimeCode }: GetMovieInfo
  ) {
    const getCurrentState = (): MovieStateModel['movieInfo'] =>
      getState().movieInfo;
    patchState({
      movieInfo: { ...getCurrentState(), isLoading: true },
    });
    return this.movieService.getMovieInfo(showtimeCode as number).pipe(
      tap({
        next: (movieInfoWithSeats) => {
          patchState({
            movieInfo: {
              ...getCurrentState(),
              data: movieInfoWithSeats,
              isLoading: false,
            },
          });
        },
        error: (error) => {
          patchState({
            movieInfo: {
              ...getCurrentState(),
              error,
              isLoading: false,
            },
          });
        },
      })
    );
  }

  // Select seat
  @Action(SelectSeat)
  selectSeat(
    { patchState, getState }: StateContext<MovieStateModel>,
    { seat, nameOfSeat }: SelectSeat
  ) {
    const index = getState().movieInfo.data.danhSachGhe.findIndex(
      (currentSeat) => currentSeat.maGhe === seat.maGhe
    );

    if (index !== -1) {
      const newSeats = [...getState().movieInfo.data.danhSachGhe];
      newSeats[index].dangChon = !newSeats[index].dangChon;

      const newTotalToPay = newSeats.reduce((result, seat) => {
        if (seat.dangChon) {
          return result + seat.giaVe;
        }
        return result;
      }, 0);

      const newNamesOfSeatsSelecting = [...getState().namesOfSeatsSelecting];
      const indexOfNameOfSeatSelecting =
        getState().namesOfSeatsSelecting.indexOf(nameOfSeat);
      if (indexOfNameOfSeatSelecting !== -1) {
        newNamesOfSeatsSelecting.splice(indexOfNameOfSeatSelecting, 1);
      } else {
        newNamesOfSeatsSelecting.push(nameOfSeat);
      }

      patchState({
        movieInfo: {
          ...getState().movieInfo,
          data: {
            ...getState().movieInfo.data,
            danhSachGhe: newSeats,
          },
        },
        totalToPay: newTotalToPay,
        namesOfSeatsSelecting: newNamesOfSeatsSelecting,
      });
    }
  }

  // Booking movie
  @Action(BookingMovie)
  bookingMovie(
    { patchState, getState }: StateContext<MovieStateModel>,
    { data }: BookingMovie
  ) {
    patchState({
      bookingMovie: { ...getState().bookingMovie, isLoading: true },
    });
    return this.movieService.bookingMovie(data).pipe(
      tap({
        next: () => {
          const newSeats = [...getState().movieInfo.data.danhSachGhe].map(
            (seat) => ({
              ...seat,
              daDat: seat.dangChon || seat.daDat,
            })
          );
          patchState({
            bookingMovie: { ...getState().bookingMovie, isLoading: false },
            movieInfo: {
              ...getState().movieInfo,
              data: { ...getState().movieInfo.data, danhSachGhe: newSeats },
            },
            totalToPay: 0,
            namesOfSeatsSelecting: []
          });
        },
        error: (error) => {
          patchState({
            bookingMovie: { ...getState().bookingMovie, error, isLoading: false },
          });
        },
        complete: () => {
          alert('Booking tickets successfully')
        }
      })
    );
  }
}
