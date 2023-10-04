import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { BookingComponent } from './booking/booking.component';
import { SwiperModule } from 'swiper/angular';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './booking/dialog/dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [HomeComponent, BookingComponent, DialogComponent],
  imports: [
    CommonModule,
    SwiperModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  bootstrap: [HomeComponent],
})
export class MovieModule {}
