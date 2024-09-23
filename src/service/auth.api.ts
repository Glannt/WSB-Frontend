import { AuthResponse } from '@/types/auth.type';
import http from '@/utils/http';

export const registerAccount = (body: {
  username: string;
  password: string;
  email: string;
  dateOfBirth: Date;
  fullName: string;
  phoneNumber: string;
}) => http.post<AuthResponse>('/api/auth/register', body);
export const loginAccount = (body: { username: string; password: string }) =>
  http.post<AuthResponse>('/api/auth/login', body);
