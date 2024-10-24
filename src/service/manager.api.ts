import { AddRoomResponse } from '@/types/room.type';
import http from '@/utils/http';

//Room
export const AddNewRoom = (formdata: FormData) =>
  http.post('/api/manager/add-new-room-img', formdata, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const UpdateRoom = (roomId: string | undefined, formData: FormData) =>
  http.put(`/api/manager/update-room/${roomId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const getAllRoom = () => http.get('/api/get-all-room');

export const deleteRoomById = (roomId: string | undefined) =>
  http.delete(`/api/manager/delete-room/${roomId}`);

//Staff
export const getAllStaff = () => http.get('/api/auth/staffs');

export const AddNewStaff = (body: {
  fullName: string;
  phoneNumber: string;
  dateOfBirth?: string;
  email?: string;
  workShift: string;
  workDays: string;
  buildingId: string;
  // status: string;
}) => http.post('/api/auth/staffs', body);
