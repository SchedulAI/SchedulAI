import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';
import { Input } from '../../components/Input';
import SnackbarContainer from '../../components/Snackbar/SnackbarContainer';
import { useUser } from '../../hooks/userHooks';
import { LoginStyled } from './LoginStyled';
import apiUrl from '../../config/api';
import { setCookie } from '../../Utils/Cookies';

export const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [containerVisible, setContainerVisible] = useState<boolean>(true);
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const addSnackbar = (
    message: string,
    variant: 'success' | 'error' | 'info' | 'warning'
  ) => {
    const event = new CustomEvent('addSnackbar', {
      detail: {
        id: Date.now(),
        message,
        variant,
        anchororigin: { vertical: 'top', horizontal: 'right' },
      },
    });
    window.dispatchEvent(event);
    setContainerVisible(true);
  };

  const loginFetch = async () => {
    setLoading(true);

    try {
      const response = await fetch(apiUrl('/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.toLowerCase(), password }),
        credentials: 'include',
      });
      const data = await response.json();

      setLoading(false);
      if (data.auth) {
        setUser({ id: data.user.id, email });
        setCookie('logged_in', data.user.id, 84600);
        navigate('/dashboard');
      } else {
        addSnackbar(data.message, 'error');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, []);

  return (
    <LoginStyled className="login-main-div">
      <Button onClick={() => navigate('/')}>
        <Icon icon="back" size={18} weight="fill" color="#f8f8fc" />
        <span>Voltar</span>
      </Button>
      <div className="login-div-section">
        <div className="login-title-div">
          <h1>Bem-Vindo De volta 👋</h1>
          <span>Insira seu email e senha para acessar sua conta</span>
        </div>
        <div className="login-field">
          <div className="input-email">
            <label>Email</label>
            <Input
              type="email"
              placeholder="Insira Seu Email"
              icon="mail"
              color="#0a0a1579"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
          </div>
          <div className="input-password">
            <label>Senha</label>
            <Input
              type="password"
              placeholder="Insira sua senha"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              color="#0a0a1579"
              onKeyDown={async (e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter') {
                  if(!email || !password) return;
                  await loginFetch();
                }
              }}
            />
          </div>
        </div>
        <div className="login-enter-register-div">
          <Button
            width="full"
            onClick={loginFetch}
            disabled={!email || !password || loading}
          >
            <p>Entrar</p>
          </Button>
          <a id="login-a-create-account" onClick={() => navigate('/register')}>
            Não tem uma conta? <span>Registre-se</span>
          </a>
        </div>
      </div>
      <SnackbarContainer
        anchororigin={{ vertical: 'top', horizontal: 'right' }}
        visible={containerVisible}
      />
    </LoginStyled>
  );
};
