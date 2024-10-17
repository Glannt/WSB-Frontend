import http from '@/utils/http';

export const getAllRoomOverView = () => http.get('/api/auth/staffs/status');
