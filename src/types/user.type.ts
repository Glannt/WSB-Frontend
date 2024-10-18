export type Role = 'CUSTOMER' | 'STAFF' | 'MANAGER' | 'OWNER';
export type User = {
  userId: string;
  username: string;
  fullName?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  createAt: string;
  roleName: Role;
};
