import { ReactNode, createContext, useState } from 'react';

interface UserProviderProps {
    children: ReactNode;
}

export interface UserContextData {
    user: string;
    setUser: (user: string) => void;
}

export const UserContext = createContext<UserContextData>({} as UserContextData);

export const UserProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState('');

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};