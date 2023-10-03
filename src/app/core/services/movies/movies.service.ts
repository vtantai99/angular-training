import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CinemaShowtime, Movie, MovieInfoWithSeats } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private getMoviesUrl = '/QuanLyPhim/LayDanhSachPhim';
  private getShowtimeInfoUrl = '/QuanLyRap/LayThongTinLichChieuHeThongRap';
  private getMovieInfoByShowtimeUrl = '/QuanLyDatVe/LayDanhSachPhongVe';

  constructor(private http: HttpClient) {}

  getMovies() {
    return this.http.get<Movie[]>(this.getMoviesUrl, {
      params: { maNhom: 'GP09' },
    });
  }

  getCinemaShowTimeInfo() {
    return this.http.get<CinemaShowtime[]>(this.getShowtimeInfoUrl, {
      params: { maNhom: 'GP09' },
    });
  }

  getMovieInfo(showTimeCode: number) {
    return this.http.get<MovieInfoWithSeats>(this.getMovieInfoByShowtimeUrl, {
      params: { MaLichChieu: showTimeCode },
    });
  }
}
