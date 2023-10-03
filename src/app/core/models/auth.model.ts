export interface User {
  accessToken: string;
  email: string;
  hoTen: string;
  maLoaiNguoiDung: string;
  maNhom: string;
  soDt: string;
  taiKhoan: string;
}

export interface UserSignIn extends Pick<User, 'taiKhoan'> {
  matKhau: string
}

export interface UserSignUp extends Omit<User, 'accessToken'> {
  matKhau: string
}
