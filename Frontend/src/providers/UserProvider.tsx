import { ReactNode, createContext, useState } from 'react';

interface UserProviderProps {
  children: ReactNode;
}

export interface UserContextData {
  user: {
    id: string;
    email: string;
  } | null;
  setUser: React.Dispatch<
    React.SetStateAction<{ id: string; email: string } | null>
  >;
}

export const UserContext = createContext<UserContextData>(
  {} as UserContextData
);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
