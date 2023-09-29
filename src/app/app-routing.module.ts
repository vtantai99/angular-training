import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './modules/auth/sign-in/sign-in.component';
import { SignUpComponent } from './modules/auth/sign-up/sign-up.component';
import { HomeComponent } from './modules/movie/home/home.component';
import { AuthLayoutComponent } from './shared/layout/auth-layout/auth-layout.component';
import { DefaultLayoutComponent } from './shared/layout/default-layout/default-layout.component';
import { BookingComponent } from './modules/movie/booking/booking.component';
import { BookingLayoutComponent } from './shared/layout/booking-layout/booking-layout.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
    ],
  },
  {
    path: '',
    component: BookingLayoutComponent,
    children: [
      {
        path: 'booking',
        component: BookingComponent,
      },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'sign-up',
        component: SignUpComponent,
      },
      {
        path: 'sign-in',
        component: SignInComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
