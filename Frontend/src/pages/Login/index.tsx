import { useState, useEffect } from 'react';
import { Button } from '../../components/Button';
import { Checkbox } from '../../components/Checkbox';
import { Icon } from '../../components/Icon';
import { Input } from '../../components/Input';
import { useUser } from '../../hooks/userHooks';
import { useNavigate } from 'react-router-dom';
import SnackbarContainer from '../../components/Snackbar/SnackbarContainer';
import { LoginStyled } from './LoginStyled';
import apiUrl from '../../config/api';

export const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [containerVisible, setContainerVisible] = useState(true);
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.toLowerCase(),
          password: password,
        }),
        credentials: 'include',
      });
      setLoading(false);
      const data = await response.json();
      if (data.auth) {
        setUser(email);
        if (rememberMe) {
          localStorage.setItem('email', email);
          localStorage.setItem('password', password);
        } else {
          localStorage.removeItem('email');
          localStorage.removeItem('password');
        }
        navigate('/dashboard');
      } else {
        addSnackbar(data.error, 'error');
      }
    } catch (error) {
      addSnackbar((error as Error).message, 'error');
      setLoading(false);
      return;
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    } else {
      const savedEmail = localStorage.getItem('email');
      const savedPassword = localStorage.getItem('password');
      if (savedEmail && savedPassword) {
        setEmail(savedEmail);
        setPassword(savedPassword);
        setRememberMe(true);
      }
    }
  }, [user, navigate]);

  return (
    <LoginStyled className="login-main-div">
      <div className="btn-back-div">
        <Button onClick={() => navigate('/')}>
          <Icon icon="back" size={18} weight="fill" color="#0A0A15" />
          <span>Voltar</span>
        </Button>
      </div>
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
                  await loginFetch();
                }
              }}
            />
          </div>
        </div>
        <div className="login-remember-me-div">
          <Checkbox
            label="Lembrar-me"
            checked={rememberMe}
            onChange={handleRememberMeChange}
          />
          <a id="forget-password" onClick={() => navigate('/recover-password')}>
            Esqueceu a senha? <span>Recupere agora</span>
          </a>
        </div>
        <div className="login-enter-register-div">
          <Button
            width="full"
            onClick={async () => await loginFetch()}
            disabled={!email || !password || loading}
          >
            Entrar
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
