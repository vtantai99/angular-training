export type SeatType = 'Thuong' | 'Vip'

export interface Seat {
  maGhe: number;
  tenGhe: string;
  maRap: number;
  loaiGhe: SeatType;
  stt: string;
  giaVe: number;
  daDat: boolean;
  taiKhoanNguoiDat: string | null;
}

export interface SeatRow {
  rowName: string;
  seats: Seat[];
}
