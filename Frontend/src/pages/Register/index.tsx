import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';
import { Input } from '../../components/Input';

import { RegisterStyled } from './RegisterStyled';
import apiUrl from '../../config/api';
import { useContext, useState } from 'react';
import Snackbar from '../../components/Snackbar';
import { ScheduleContext } from '../../providers/ScheduleProvider';

export const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState<'success' | 'error'>(
    'success'
  );
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const scheduleContext = useContext(ScheduleContext);
  const schedule_id = scheduleContext?.schedule_id;

  const navigate = useNavigate();

  const createInvite = async () => {
    try {
      await fetch(apiUrl('/invite/create'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          schedule_id: schedule_id,
          user_id: userId,
        }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const registerFetch = async () => {
    setLoading(true);
    try {
      const response = await fetch(apiUrl('/user/create'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });
      const data: RegisterResponse = await response.json();
      setUserId(data.id);
      if (schedule_id) {
        await createInvite();
      }
      if (response.ok) {
        setSnackbarMessage(data.message);
        setSnackbarType('success');
        setSnackbarVisible(true);
        setTimeout(() => {
          navigate('/login');
          setLoading(false);
        }, 5000);
      } else {
        setSnackbarMessage(data.message);
        setSnackbarType('error');
        setSnackbarVisible(true);
        setLoading(false);
      }
    } catch (error) {
      setSnackbarMessage((error as Error).message);
      setSnackbarType('error');
      setSnackbarVisible(true);
      setLoading(false);
    }
  };

  return (
    <RegisterStyled className="register-main-div">
      <div className="btn-back-div">
        <Button onClick={() => navigate('/')}>
          <Icon icon="back" size={18} weight="fill" color="#0A0A15" />
          <span>Voltar</span>
        </Button>
      </div>
      <div className="register-div-section">
        <div className="register-title-div">
          <h1>Pronto para começar? 👋</h1>
          <span>Insira seu email e senha para criar sua conta</span>
        </div>
        <div className="register-field">
          <div className="input-name">
            <label>Nome</label>
            <Input
              type="text"
              placeholder="Insira Seu Nome"
              icon="user"
              color="#0a0a1579"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
            />
          </div>
          <div className="input-email">
            <label>Email</label>
            <Input
              type="email"
              placeholder="Insira Seu Email"
              icon="mail"
              color="#0a0a1579"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              value={email}
            />
          </div>
          <div className="input-password">
            <label>Senha</label>
            <Input
              type="password"
              placeholder="Insira sua senha"
              color="#0a0a1579"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              value={password}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter') {
                  registerFetch();
                }
              }}
            />
          </div>
        </div>
        <div className="register-enter-register-div">
          <Button
            width="full"
            onClick={() => registerFetch()}
            disabled={!name || !email || !password || loading}
          >
            Registrar
          </Button>
          <a id="register-a-create-account" onClick={() => navigate('/login')}>
            Já possui uma conta? <span>Acesse agora</span>
          </a>
        </div>
      </div>
      {snackbarVisible && (
        <Snackbar
          anchororigin={{ vertical: 'top', horizontal: 'right' }}
          variant={snackbarType}
          message={snackbarMessage}
        />
      )}
    </RegisterStyled>
  );
};
