import { useContext } from 'react';
import { UserContext, UserContextData } from '../providers/UserProvider';

export const useUser = (): UserContextData => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};