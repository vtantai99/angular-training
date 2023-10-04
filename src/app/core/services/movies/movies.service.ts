import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookingPayload, CinemaShowtime, Movie, MovieInfoWithSeats } from '../../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private getMoviesUrl = '/QuanLyPhim/LayDanhSachPhim';
  private getShowtimeInfoUrl = '/QuanLyRap/LayThongTinLichChieuHeThongRap';
  private getMovieInfoByShowtimeUrl = '/QuanLyDatVe/LayDanhSachPhongVe';
  private bookingMovieUrl = '/QuanLyDatVe/DatVe';

  constructor(private http: HttpClient) {}

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.getMoviesUrl, {
      params: { maNhom: 'GP09' },
    });
  }

  getCinemaShowTimeInfo(): Observable<CinemaShowtime[]> {
    return this.http.get<CinemaShowtime[]>(this.getShowtimeInfoUrl, {
      params: { maNhom: 'GP09' },
    });
  }

  getMovieInfo(showTimeCode: number): Observable<MovieInfoWithSeats> {
    return this.http.get<MovieInfoWithSeats>(this.getMovieInfoByShowtimeUrl, {
      params: { MaLichChieu: showTimeCode },
    });
  }

  bookingMovie(data: BookingPayload): Observable<unknown> {
    return this.http.post<unknown>(this.bookingMovieUrl, data, { responseType: 'text' as 'json' });
  }
}
