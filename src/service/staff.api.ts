import http from '@/utils/http';

export const getAllRoomOverView = () => http.get('/api/auth/staffs/status');

export const getRoomAssign = () => http.get('/api/auth/staffs/room-assign');
export const getOrderBooking = () =>
  http.get('/api/auth/staffs/check-order-booking');
