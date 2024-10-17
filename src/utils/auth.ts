import { Customer } from '@/types/customer.type';
import { User } from '@/types/user.type';

export const saveAccessTokenToLS = (access_token: string) => {
  localStorage.setItem('access_token', access_token);
};

export const clearLS = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('profile');
  localStorage.removeItem('roleName');
  localStorage.removeItem('customer');
};

export const getAccessTokenFromLS = () => {
  return localStorage.getItem('access_token') || '';
};

export const getProfileFromLS = () => {
  const result = localStorage.getItem('profile');
  return result ? JSON.parse(result) : null;
};

export const setProfileToLS = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile));
};

export const setRoleNameToLS = (roleName: string) => {
  localStorage.setItem('roleName', JSON.stringify(roleName));
};
export const getRoleName = () => {
  return localStorage.getItem('roleName') || '';
};

export const setCustomerToLS = (customer: Customer) => {
  localStorage.setItem('customer', JSON.stringify(customer));
};

export const getCustomerFromLS = () => {
  const result = localStorage.getItem('customer');
  return result ? JSON.parse(result) : null;
};
