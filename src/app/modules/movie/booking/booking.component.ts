import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { seatRowsVerify, seatsHint as seatsHintData } from 'src/app/core/data';
import { Movie, MovieStateModel, Seat, SeatRow } from 'src/app/core/models';
import { GetMovieInfo, MovieState } from 'src/app/core/store';

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

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    const showTimeCode = this.route.snapshot.paramMap.get('showTimeCode');
    if (showTimeCode) {
      this.store.dispatch(new GetMovieInfo(+showTimeCode));
    }
  }

  getSeatClass = (seat: Seat) => {
    switch (true) {
      case seat.daDat:
        return 'reserved';
      case seat.loaiGhe === 'Vip':
        return 'vip';
      default:
        return 'normal';
    }
  };

  getSeats = (): SeatRow[] => {
    this.movieInfo$.subscribe((movieInfo) => {
      this.seats = movieInfo.data.danhSachGhe;
    });
    return seatRowsVerify
      .map((seatRowVerify) => ({
        rowName: seatRowVerify.rowName,
        seats: this.seats.filter((seat) => seatRowVerify.condition(+seat?.stt)),
      }))
      .filter((row) => row.seats.length > 0);
  };
}
