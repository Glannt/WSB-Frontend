import { User } from './User';
import { SuccessResponse } from './utils.type';
export type AuthResponse = SuccessResponse<{
  access_token: string;
  expires: string;
  user: User;
}>;
