import { Component, ViewEncapsulation } from '@angular/core';
import Swiper, { EffectCoverflow, Navigation, Pagination } from 'swiper';
import { SwiperOptions } from 'swiper/types';


Swiper.use([Navigation, Pagination, EffectCoverflow])

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})


export class HomeComponent {

  swiperConfig: SwiperOptions = {
    // Cấu hình Swiper ở đây
    slidesPerView: 2,
    // spaceBetween: 20,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  };
}
