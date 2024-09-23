import { User } from '@/types/User';
import React, { createContext, useContext, useState, ReactNode } from 'react';
export type AuthContextType = {
  auth: {
    user: User | null;
    accessToken?: string;
  };
  setAuth: React.Dispatch<
    React.SetStateAction<{ user: User | null; accessToken?: string }>
  >;
};

// Initialize the context with undefined to handle lazy initialization
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<{ user: User | null; accessToken?: string }>(
    { user: null }
  );

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
