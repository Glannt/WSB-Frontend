import http from '@/utils/http';

export const getAllRoom = () => http.get('/api/customer/get-all-room-dto');
