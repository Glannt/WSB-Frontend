import http from '@/utils/http';

export const getAllRoom = () => http.get('/api/customer/get-all-room-dto');

export const getBookedSlot = (roomId: string, checkInDate: string) =>
  http.get(`/api/check-booked-slot`, {
    params: { roomId: roomId, checkInDate: checkInDate },
  });

export const getBookeddSlot = (
  roomId: string,
  checkinDate: string,
  checkoutDate: string
) =>
  http.get(`/api/check-booked-slot-each-date`, {
    params: {
      roomId: roomId,
      checkinDate: checkinDate,
      checkoutDate: checkoutDate,
    },
  });
