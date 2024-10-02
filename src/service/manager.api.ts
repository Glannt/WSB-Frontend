import { AddRoomResponse } from '@/types/room.type';
import http from '@/utils/http';

export const AddNewRoom = (formdata: FormData) =>
  http.post('/api/manager/add-new-room', formdata, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const UpdateRoom = (roomId: number | undefined, formData: FormData) =>
  http.put(`/api/manager/update-room/${roomId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const getAllRoom = () => http.get('/api/manager/get-all-room');
