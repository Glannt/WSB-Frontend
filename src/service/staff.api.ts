import { BookingStatus } from '@/types/bookings';
import http from '@/utils/http';

export const getAllRoomOverView = () => http.get('/api/auth/staffs/status');

export const getRoomAssign = () => http.get('/api/auth/staffs/room-assign');
export const getOrderBooking = () =>
  http.get('/api/auth/staffs/check-order-booking');

export const updateBooking = (formdata: FormData) =>
  http.put('/api/auth/staffs/update-booking-status', formdata, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const updateStatusBooking = (
  bookingId: string,
  body: {
    status: string;
  }
) =>
  http.put(`/api/auth/staffs/status/booking/${bookingId}`, body, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
