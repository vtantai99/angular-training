import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { BookingComponent } from './booking/booking.component';
import { SwiperModule } from 'swiper/angular';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [HomeComponent, BookingComponent],
  imports: [
    CommonModule,
    SwiperModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
  ],
  bootstrap: [HomeComponent],
})
export class MovieModule {}
