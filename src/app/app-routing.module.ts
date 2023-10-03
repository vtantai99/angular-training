import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './modules/auth/sign-in/sign-in.component';
import { SignUpComponent } from './modules/auth/sign-up/sign-up.component';
import { HomeComponent } from './modules/movie/home/home.component';
import { AuthLayoutComponent } from './shared/layout/auth-layout/auth-layout.component';
import { DefaultLayoutComponent } from './shared/layout/default-layout/default-layout.component';
import { BookingComponent } from './modules/movie/booking/booking.component';
import { BookingLayoutComponent } from './shared/layout/booking-layout/booking-layout.component';
import { AuthGuard, LoggedInGuard } from './core/guards';

const routes: Routes = [
  {
    path: 'home',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
    ],
  },
  {
    path: 'booking',
    component: BookingLayoutComponent,
    children: [
      {
        path: '',
        component: BookingComponent,
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    canActivate: [LoggedInGuard],
    children: [
      {
        path: '',
        component: SignInComponent,
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
      },
    ],
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
