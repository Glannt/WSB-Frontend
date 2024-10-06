import { AuthResponse } from '@/types/auth.type';
import { getAccessTokenFromLS } from '@/utils/auth';
import http from '@/utils/http';

export const registerAccount = (body: {
  userName: string;
  fullName: string;
  email: string;
  password: string;
  dateOfBirth: Date;
  phoneNumber: string;
  role: string;
}) => http.post<AuthResponse>('/api/auth/register', body);

export const loginAccount = (body: { userName: string; password: string }) =>
  http.post<AuthResponse>('/api/auth/login', body);

export const logout = () => http.post('/api/auth/log-out');
