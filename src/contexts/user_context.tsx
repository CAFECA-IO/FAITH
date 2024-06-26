import { createContext, useContext, useMemo, useState } from 'react';

type ICredential = {
  id: string;
  name: string;
  avatar: string;
};

interface UserContextType {
  user: ICredential | null;
  setUser: (user: ICredential) => void;
}

const UserContext = createContext<UserContextType>({
  user: {} as ICredential,
  setUser: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<ICredential | null>(null);

  const value = useMemo(() => ({ user, setUser }), [user]);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserCtx = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserCtx must be used within a UserProvider');
  }
  return context;
};
