import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { seatRowsVerify, seatsHint as seatsHintData } from 'src/app/core/data';
import { Movie, MovieStateModel, Seat, SeatRow } from 'src/app/core/models';
import { GetMovieInfo, MovieState, SelectSeat } from 'src/app/core/store';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  showTimeCode: Movie['maChieuPhim'];
  seatsHint = seatsHintData;
  seats: Seat[] = [];
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

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const showTimeCode = this.route.snapshot.paramMap.get('showTimeCode');
    if (showTimeCode) {
      this.store.dispatch(new GetMovieInfo(+showTimeCode));
    }

    this.bookingMovie$.subscribe((bookingMovie) => {
      if (!bookingMovie.isLoading) {
        this.dialog.closeAll();
      }
    })
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      minWidth: '500px'
    });
  }

  getSeatClass = (seat: Seat) => {
    switch (true) {
      case seat.daDat:
        return 'reserved';
      case seat.dangChon:
        return 'selecting';
      case seat.loaiGhe === 'Vip':
        return 'vip';
      default:
        return 'normal';
    }
  };

  getSeatsWithRow = (): SeatRow[] => {
    this.movieInfo$.subscribe((movieInfo) => {
      this.seats = movieInfo.data.danhSachGhe;
    });
    return seatRowsVerify
      .map((seatRowVerify) => ({
        rowName: seatRowVerify.rowName,
        seats: this.seats
          .filter((seat) => seatRowVerify.condition(+seat?.stt))
          .map((seat) => ({
            ...seat,
            tenGhe: `${seatRowVerify.rowName}${seat.tenGhe}`,
          })),
      }))
      .filter((row) => row.seats.length > 0);
  };

  selectSeat = (seatSelecting: Seat, nameOfSeat: string) => {
    this.store.dispatch(new SelectSeat(seatSelecting, nameOfSeat));
  };
}
