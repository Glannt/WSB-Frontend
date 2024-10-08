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
  userName: string,
  body: Omit<Customer, 'wallet' | 'roleName'>
) => http.put(`/api/customer/manage-profile/edit-profile/${userName}`, body);

export const getHistoryBooking = () =>
  http.get('/api/customer/history-booking');
