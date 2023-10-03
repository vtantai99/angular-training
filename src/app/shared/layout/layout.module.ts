import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../components/footer/footer.component';
import { HeaderComponent } from '../components/header/header.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';
import { MatDividerModule } from '@angular/material/divider';
import { BookingLayoutComponent } from './booking-layout/booking-layout.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AuthLayoutComponent,
    DefaultLayoutComponent,
    BookingLayoutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
  ],
})
export class LayoutModule {}
