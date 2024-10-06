// import { Customer } from '@/types/customer.type';
// import { createContext, useContext } from 'react';

// // Create a context for the customer data
// export const CustomerContext = createContext<Customer | null | undefined>(
//   undefined
// );

// // Create a custom hook to use the customer context
// export const useCustomer = () => {
//   return useContext(CustomerContext);
// };

// import { Customer } from '@/types/customer.type';
// import { createContext, useContext, ReactNode, useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { getUser } from '@/service/customer.api'; // Ensure correct API function import
// import { getCustomerFromLS } from '@/utils/auth';

// // Create context for customer data
// interface CustomerContextType {
//   customer: Customer | null | undefined; // Changed from undefined to null for clarity
//   //   refetch: () => void;
// }

// const initialCustomerContext: CustomerContextType = {
//   customer: getCustomerFromLS(),
//   // setProfile: () => null,
//   //   refetch: () => null,
// };
// export const CustomerContext = createContext<CustomerContextType | null>(
//   initialCustomerContext
// );

// // Create custom hook to use customer context
// export const useCustomer = (): CustomerContextType => {
//   const context = useContext(CustomerContext);
//   if (!context) {
//     throw new Error('useCustomer must be used within a CustomerProvider');
//   }
//   return context;
// };

// // Create Provider for CustomerContext
// export const CustomerProvider = ({ children }: { children: ReactNode }) => {
//   const [customer, setCustomer] = useState<Customer | null | undefined>(
//     initialCustomerContext.customer
//   );

//   return (
//     <CustomerContext.Provider
//       value={{ customer: initialCustomerContext.customer }}
//     >
//       {children}
//     </CustomerContext.Provider>
//   );
// };

import { createContext, useContext, ReactNode, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '@/service/customer.api'; // API function to fetch user data
import { Customer } from '@/types/customer.type';
import { getCustomerFromLS, setCustomerToLS } from '@/utils/auth'; // Local storage helpers

// Define context interface
interface CustomerContextType {
  customer: Customer | null | undefined;
  refetch: () => void; // Added refetch function
}

// Initial values for the context
const initialCustomerContext: CustomerContextType = {
  customer: getCustomerFromLS(), // Load initial customer data from local storage
  refetch: () => null, // Placeholder refetch function
};

// Create the context
export const CustomerContext = createContext<CustomerContextType | null>(
  initialCustomerContext
);

// Custom hook to use the context
export const useCustomer = (): CustomerContextType => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error('useCustomer must be used within a CustomerProvider');
  }
  return context;
};

// Provider component that wraps around the app
export const CustomerProvider = ({ children }: { children: ReactNode }) => {
  // Function to fetch profile data from API
  const getProfileUser = async () => {
    const response = await getUser();
    const data = response.data.data;
    setCustomerToLS(data); // Update local storage when new data is fetched
    return data;
  };

  // useQuery to fetch customer data
  const { data: customer, refetch } = useQuery<Customer>({
    queryKey: ['customer'], // Unique key for this query
    queryFn: getProfileUser, // Function to fetch customer data
    initialData: getCustomerFromLS(), // Set initial data from local storage
    staleTime: 1000 * 60 * 5, // Data is considered fresh for 5 minutes
  });

  // Use the fetched customer data and refetch function
  return (
    <CustomerContext.Provider value={{ customer, refetch }}>
      {children}
    </CustomerContext.Provider>
  );
};
