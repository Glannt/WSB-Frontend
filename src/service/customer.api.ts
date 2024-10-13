import { Customer } from '@/types/customer.type';
import { User } from '@/types/user.type';
import http from '@/utils/http';

export const changePassword = (username: string, formData: FormData) =>
  http.put(
    `/api/customer/manage-profile/change-password/${username}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

export const getUser = () => http.get('/api/customer/manage-profile');

export const changeProfile = (
  username: string,
  body: Omit<Customer, 'wallet' | 'roleName'>
) => http.put(`/api/customer/manage-profile/edit-profile/${username}`, body);

export const getHistoryBooking = () =>
  http.get('/api/customer/history-booking');

export const getService = () => http.get(`/api/get-service-items`);

export const updateServiceBooking = (formdata: FormData) =>
  http.put('/api/customer/update-service', formdata, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const getDetailRoom = (roomId: string) =>
  http.get(`/api/customer/room-detail/${roomId}`);

export const getSimilarType = (roomType: string) =>
  http.get(`/api/get-room-by-type`, { params: { roomTypeName: roomType } });

export const getAllBuiding = () => http.get(`/api/auth/buildings`);
