import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { BookingPayload, MovieStateModel } from 'src/app/core/models';
import { AuthState, BookingMovie, MovieState } from 'src/app/core/store';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  constructor(private store: Store) {}
  @Select(MovieState.movieInfo) movieInfo$!: Observable<
    MovieStateModel['movieInfo']
  >;
  @Select(MovieState.totalToPay) totalToPay$!: Observable<
    MovieStateModel['totalToPay']
  >;
  @Select(MovieState.namesOfSeatsSelecting) namesOfSeatsSelecting$!: Observable<
    MovieStateModel['namesOfSeatsSelecting']
  >;
  @Select(MovieState.bookingMovie) bookingMovie$!: Observable<
    MovieStateModel['bookingMovie']
  >;

  bookingMovie = () => {
    const showTimeCode = this.store.selectSnapshot(MovieState.movieInfo).data
      .thongTinPhim.maLichChieu;
    const tickets = this.store
      .selectSnapshot(MovieState.movieInfo)
      .data.danhSachGhe.filter((seat) => seat.dangChon)
      .map((seat) => ({ maGhe: seat.maGhe, giaVe: seat.giaVe }));
    const userName = this.store.selectSnapshot(AuthState.userLoggedIn).data
      .taiKhoan;

    const data: BookingPayload = {
      maLichChieu: showTimeCode,
      danhSachVe: tickets,
      taiKhoanNguoiDung: userName,
    };
    this.store.dispatch(new BookingMovie(data))
  };
}
