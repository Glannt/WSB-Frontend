import { useContext, useDebugValue } from 'react';
import AuthContext, { AuthContextType } from '../context/AuthProvider';

// Create a custom hook with proper typing for the AuthContext
const useAuth = (): AuthContextType | undefined => {
  const context = useContext(AuthContext);

  // Display helpful debug value in React DevTools
  useDebugValue(context, (context) =>
    context?.auth?.user ? 'Logged In' : 'Logged Out'
  );

  return context;
};

export default useAuth;
