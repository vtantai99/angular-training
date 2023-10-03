import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { forkJoin, map, tap } from 'rxjs';
import { MovieStateModel } from '../../models';
import { MoviesService } from '../../services';
import { GetMovieInfo, GetMovies } from './movie.action';

const authStateDefault: MovieStateModel = {
  movies: {
    isLoading: false,
    data: [],
    error: null,
  },
  movieInfo: {
    isLoading: false,
    data: {},
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

  // Get movies
  @Action(GetMovies)
  getMovies({ patchState, getState }: StateContext<MovieStateModel>) {
    const getPreviousState = (): MovieStateModel['movies'] => getState().movies;
    patchState({
      movies: { ...getPreviousState(), isLoading: true },
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
              ...getPreviousState(),
              isLoading: false,
              data: movies,
            },
          });
        },
        error: (error) => {
          patchState({
            movies: {
              ...getPreviousState(),
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
    const getPreviousState = (): MovieStateModel['movieInfo'] =>
      getState().movieInfo;
    patchState({
      movieInfo: { ...getPreviousState(), isLoading: true },
    });
    return this.movieService.getMovieInfo(showtimeCode as number).pipe(
      tap({
        next: (movieInfoWithSeats) => {
          patchState({
            movieInfo: {
              ...getPreviousState(),
              data: movieInfoWithSeats,
              isLoading: false,
            },
          });
        },
        error: (error) => {
          patchState({
            movieInfo: {
              ...getPreviousState(),
              error,
              isLoading: false,
            },
          });
        },
      })
    );
  }
}
