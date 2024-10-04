export type Role = 'CUSTOMER' | 'STAFF' | 'MANAGER' | 'OWNER';
export type User = {
  userId: String;
  username: String;
  fullName: String;
  phoneNumber: String;
  dateOfBirth: String;
  createAt: String;
  roleName: Role;
};
