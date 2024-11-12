import { Room } from './room.type';

export interface Booking {
  id: number; // Unique identifier for the booking
  roomId: number; // ID of the room being booked
  userId: number; // ID of the user making the booking
  startDate: Date; // Start date of the booking
  endDate: Date; // End date of the booking
  status: 'confirmed' | 'pending' | 'canceled'; // Booking status
  createdAt: Date; // Date when the booking was created
}

export interface SlotBooking {
  timeSlotId: number;
  timeStart: string;
  timeEnd: string;
  status: string;
}

export interface ServiceItems {
  [key: string]: number;
}
export interface CustomerOrderBookingHistory {
  bookingId: string;
  checkinDate: string;
  checkoutDate: string;
  totalPrice: string;
  status: string;
  roomId: string;
  slots: SlotBooking[];
  serviceItems: ServiceItems;
}

export interface BookedSlots {
  [date: string]: number[]; // Date as the key (string), and array of numbers as values
}

export interface BookingStaffTable {
  bookingId: string;
  roomId: string;
  checkinDate: string;
  checkoutDate: string;
  slots: SlotBooking[];
  customerId: string;
  totalPrice: number;
  status: string;
  serviceItems: ServiceItems;
}
export const columnsBooking = [
  { name: 'Mã Đặt Phòng', uid: 'bookingId', sortable: true },
  { name: 'Mã Phòng', uid: 'roomId', sortable: true },
  { name: 'Ngày Nhận Phòng', uid: 'checkinDate', sortable: true },
  { name: 'Ngày Trả Phòng', uid: 'checkoutDate', sortable: true },
  { name: 'Khách Hàng', uid: 'customerId', sortable: true },
  { name: 'Tổng Giá', uid: 'totalPrice', sortable: true },
  { name: 'Trạng Thái', uid: 'status', sortable: true },
  { name: 'Dịch Vụ', uid: 'serviceItems' },
  { name: 'Ca Đặt Phòng', uid: 'slots' },
  { name: 'Actions', uid: 'actions' },
];

export const statusOptionsBooking = [
  { name: 'Sắp diễn ra', uid: 'UPCOMING' },
  { name: 'Hoàn thành', uid: 'FINISHED' },
  { name: 'Đã hủy', uid: 'CANCELLED' },
  { name: 'Đang sử dụng', uid: 'USING' },
];

export const BookingStatus = {
  USING: 'Đang sử dụng',
  FINISHED: 'Hoàn thành',
  UPCOMING: 'Sắp diễn ra',
  CANCELLED: 'Đã hủy',
};

export interface CustomerOrderBooking {
  bookingId: string;

  checkinDate: string;
  checkoutDate: string;
  totalPrice: string;
  status: string;
  room: Room;
  slots: SlotBooking[];
  items: ServiceItems;
}

export interface CheckBooking {
  bookingId: string;
  checkinDate: string;
  checkoutDate: string;
  customerId: string;
  roomId: string;
  serviceItems: ServiceItems;
  slots: SlotBooking[];
  status: string;
  totalPrice: number;
}
