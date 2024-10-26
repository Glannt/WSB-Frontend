import { BookingStatus } from '@/types/bookings';
import http from '@/utils/http';
import { parseDate, CalendarDate } from '@internationalized/date';

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

// @GetMapping("/work-shift")
// public ResponseEntity<Object> getWorkShift(@RequestHeader("Authorization") String token) {
//     String jwtToken = token.substring(7);
//     try{
//         return ResponseHandler.responseBuilder("Ok", HttpStatus.OK, staffService.getWorkShift(jwtToken));

//     }catch (Exception e){
//         return ResponseHandler.responseBuilder(e.getMessage(), HttpStatus.BAD_REQUEST);
//     }
// }
export const getWorkShift = () => http.get('/api/auth/staffs/work-shift');

export const getCheckBookingByPhone = (date: string, phoneNumber: string) =>
  http.get('/api/auth/staffs/check-customer-order-booking-phone', {
    params: { date: date, phonenumber: phoneNumber },
  });
export const getCheckBookingByEmail = (date: string, email: string) =>
  http.get('/api/auth/staffs/check-customer-order-booking-email', {
    params: { date: date, email: email },
  });

export const updateBookingStatus = (formdata: FormData) =>
  http.put('/api/auth/staffs/update-booking-status', formdata, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
