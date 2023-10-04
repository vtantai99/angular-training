import { User } from './auth.model';
import { Seat } from './seats.model';

export interface Movie {
  biDanh: string;
  danhGia: number;
  hinhAnh: string;
  maNhom: string;
  maPhim: number;
  moTa: string;
  ngayKhoiChieu: string;
  tenPhim: string;
  trailer: string;
  maChieuPhim?: number;
}

export interface MovieShowTime {
  giaVe: number;
  maLichChieu: number;
  maRap: string;
  ngayChieuGioChieu: string;
  tenRap: string;
}

export interface CinemaMovie {
  hinhAnh: string;
  lstLichChieuTheoPhim: MovieShowTime[];
  maPhim: number;
  tenPhim: string;
}

export interface CinemaComplex {
  danhSachPhim: CinemaMovie[];
  diaChi: string;
  maCumRap: string;
  tenCumRap: string;
}

export interface CinemaShowtime {
  logo: string;
  lstCumRap: CinemaComplex[];
  maHeThongRap: string;
  mahom: string;
  tenHeThongRap: string;
}

export interface MovieInfo {
  diaChi: string;
  gioChieu: string;
  hinhAnh: string;
  maLichChieu: number;
  ngayChieu: string;
  tenCumRap: string;
  tenPhim: string;
  tenRap: string;
}

export interface MovieInfoWithSeats {
  thongTinPhim: MovieInfo | Record<string, never>;
  danhSachGhe: Seat[];
}

export interface BookingPayload {
  maLichChieu: MovieInfo['maLichChieu'];
  danhSachVe: { maGhe: Seat['maGhe']; giaVe: Seat['giaVe'] }[];
  taiKhoanNguoiDung: User['taiKhoan'];
}
