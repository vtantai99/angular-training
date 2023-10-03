import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { User, UserSignIn, UserSignUp } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private signInUrl = '/QuanLyNguoiDung/DangNhap';
  private signUpUrl = '/QuanLyNguoiDung/DangKy';

  constructor(private http: HttpClient, private store: Store) {}

  signIn(userSignIn: UserSignIn) {
    return this.http.post<User>(this.signInUrl, userSignIn);
  }

  signUp(user: UserSignUp) {
    return this.http.post(this.signUpUrl, user);
  }
}
