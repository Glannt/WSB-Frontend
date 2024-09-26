import { User } from '@/types/user.type';
import { getAccessTokenFromLS, getProfileFromLS } from '@/utils/auth';
import { createContext, Dispatch, SetStateAction, useState } from 'react';

interface AppContextInterface {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  profile: User | null;
  setProfile: Dispatch<SetStateAction<User | null>>;
}
const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null,
};
export const AppContext = createContext<AppContextInterface>(initialAppContext);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    initialAppContext.isAuthenticated
  );
  const [profile, setProfile] = useState<User | null>(
    initialAppContext.profile
  );

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile: initialAppContext.profile,
        setProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
