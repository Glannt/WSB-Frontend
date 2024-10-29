import { createContext, useContext, ReactNode, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '@/service/customer.api'; // API function to fetch user data
import { Customer } from '@/types/customer.type';
import {
  getCustomerFromLS,
  getStaffToLS,
  setCustomerToLS,
  setStaffToLS,
} from '@/utils/auth'; // Local storage helpers
import { Staff } from '@/types/staff.type';
import { getProfileStaff } from '@/service/staff.api';

// Define context interface
interface StaffContextType {
  staff: Staff | null | undefined;
  refetch: () => void; // Added refetch function
  isLoading: boolean;
}

// Initial values for the context
const initialStaffContext: StaffContextType = {
  staff: getStaffToLS(), // Load initial customer data from local storage
  refetch: () => null, // Placeholder refetch function
  isLoading: false,
};

// Create the context
export const StaffContext = createContext<StaffContextType | null>(
  initialStaffContext
);

// Custom hook to use the context
export const useStaff = (): StaffContextType => {
  const context = useContext(StaffContext);
  if (!context) {
    throw new Error('useCustomer must be used within a CustomerProvider');
  }
  return context;
};

// Provider component that wraps around the app
export const StaffProvider = ({ children }: { children: ReactNode }) => {
  // Function to fetch profile data from API
  const getProfileStaffApi = async () => {
    const response = await getProfileStaff();
    console.log(response.data.data);
    setStaffToLS(response.data.data);
    return response.data.data;
  };

  // useQuery to fetch customer data
  const {
    data: staff,
    refetch,
    isLoading,
  } = useQuery<Staff>({
    queryKey: ['staff'], // Unique key for this query
    queryFn: getProfileStaffApi, // Function to fetch customer data
    initialData: getStaffToLS(), // Set initial data from local storage
    staleTime: 1000 * 60 * 5, // Data is considered fresh for 5 minutes
  });

  // Use the fetched customer data and refetch function
  return (
    <StaffContext.Provider value={{ staff, refetch, isLoading }}>
      {children}
    </StaffContext.Provider>
  );
};
