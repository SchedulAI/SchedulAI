import { useUser } from '../hooks/userHooks';
import { useNavigate } from 'react-router-dom';
import apiUrl from '../config/api';

export const useCheckAuth = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const checkAuth = async () => {
    try {
      const response = await fetch(apiUrl('/auth/validate'), {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        if (data.auth) {
          setUser(data.user);
          navigate('/dashboard');
          return;
        }
      }

      navigate('/login');
    } catch (error) {
      console.error('Erro ao validar autenticação:', error);
      navigate('/login');
    }
  };

  return { checkAuth };
};
