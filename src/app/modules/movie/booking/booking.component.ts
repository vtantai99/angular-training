import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { seats, seatRowsVerify, seatsHint as seatsHintData } from 'src/app/core/data';
import { SeatRow } from 'src/app/core/models';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent {
  seatsHint = seatsHintData

  promiseObj = Observable
  getSeats = (): SeatRow[] => {
    return seatRowsVerify
      .map((seatRowVerify) => ({
        rowName: seatRowVerify.rowName,
        seats: seats.filter((seat) => seatRowVerify.condition(+seat?.stt)),
      }))
      .filter((row) => row.seats.length > 0);
  };
}
