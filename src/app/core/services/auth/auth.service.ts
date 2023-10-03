import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserSignIn, UserSignUp } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private signInUrl = '/QuanLyNguoiDung/DangNhap';
  private signUpUrl = '/QuanLyNguoiDung/DangKy';

  constructor(private http: HttpClient) {}

  signIn(userSignIn: UserSignIn) {
    return this.http.post<User>(this.signInUrl, userSignIn);
  }

  signUp(user: UserSignUp) {
    return this.http.post(this.signUpUrl, user);
  }
}
