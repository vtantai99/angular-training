import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Movie, MovieStateModel } from 'src/app/core/models';
import { GetMovies, MovieState } from 'src/app/core/store';
import Swiper, { EffectCoverflow, Navigation, Pagination } from 'swiper';

Swiper.use([Navigation, Pagination, EffectCoverflow]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {

  @Select(MovieState.movies) movies$!: Observable<MovieStateModel['movies']>
  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(new GetMovies());
  }

  goToBooking(showTimeCode: Movie['maChieuPhim']) {
    this.router.navigateByUrl(`/booking/${showTimeCode}`)
  }
}
