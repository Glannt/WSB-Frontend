import { createContext, useContext, ReactNode, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '@/service/customer.api'; // API function to fetch user data
import { Customer } from '@/types/customer.type';
import {
  getCustomerFromLS,
  getManagerFromLS,
  getStaffToLS,
  setCustomerToLS,
  setManagerToLS,
  setStaffToLS,
} from '@/utils/auth'; // Local storage helpers
import { Staff } from '@/types/staff.type';
import { getProfileStaff } from '@/service/staff.api';
import { Manager } from '@/types/manager.type';
import { getProfileManager } from '@/service/manager.api';

// Define context interface
interface ManagerContextType {
  manager: Manager | null | undefined;
  refetch: () => void; // Added refetch function
  isLoading: boolean;
}

// Initial values for the context
const initialManagerContext: ManagerContextType = {
  manager: getManagerFromLS(), // Load initial customer data from local storage
  refetch: () => null, // Placeholder refetch function
  isLoading: false,
};

// Create the context
export const ManagerContext = createContext<ManagerContextType | null>(
  initialManagerContext
);

// Custom hook to use the context
export const useManager = (): ManagerContextType => {
  const context = useContext(ManagerContext);
  if (!context) {
    throw new Error('useCustomer must be used within a CustomerProvider');
  }
  return context;
};

// Provider component that wraps around the app
export const ManagerProvider = ({ children }: { children: ReactNode }) => {
  // Function to fetch profile data from API
  const getProfileManagerApi = async () => {
    const response = await getProfileManager();
    console.log(response.data.data);
    setManagerToLS(response.data.data);
    return response.data.data;
  };

  // useQuery to fetch customer data
  const {
    data: manager,
    refetch,
    isLoading,
  } = useQuery<Manager>({
    queryKey: ['manager'], // Unique key for this query
    queryFn: getProfileManagerApi, // Function to fetch customer data
    initialData: getManagerFromLS(), // Set initial data from local storage
    staleTime: 1000 * 60 * 5, // Data is considered fresh for 5 minutes
  });

  // Use the fetched customer data and refetch function
  return (
    <ManagerContext.Provider value={{ manager, refetch, isLoading }}>
      {children}
    </ManagerContext.Provider>
  );
};
