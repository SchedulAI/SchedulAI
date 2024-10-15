import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';
import { Input } from '../../components/Input';
import styled from 'styled-components';
import apiUrl from '../../config/api';
import { useContext, useState } from 'react';
import Snackbar from '../../components/Snackbar';
import { ScheduleContext } from '../../providers/ScheduleProvider';

const RegisterStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
  height: 100%;
  position: relative;
  color: #0a0a15;

  .btn-back-div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 8px;
    top: 0;
    left: 0;
    padding: 32px;
  }

  .register-div-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    width: 100%;
    height: 100%;
  }

  .register-title-div {
    width: 390px;
    text-align: left;

    h1 {
      font-size: 3.16rem;
      font-weight: 600;
    }

    span {
      font-size: 1rem;
      font-weight: 400;
      color: #0a0a15;
      opacity: 50%;
    }
  }

  .register-field {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    width: 100%;
  }

  .input-email,
  .input-password {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: fit-content;
    gap: 8px;
  }

  .input-email label,
  .input-password label {
    padding-left: 4px;
    font-weight: 500;
  }

  .register-remember-me-div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    width: 390px;
    font-size: 0.875rem;
  }

  #forget-password {
    font-size: 0.875rem;
  }

  #forget-password span {
    font-weight: 500;
  }

  .register-enter-register-div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    width: 390px;
  }

  #register-a-create-account {
    font-size: 0.875rem;
  }

  #register-a-create-account span {
    font-weight: 500;
  }
`;

interface RegisterResponse {
  id: string;
  name: string;
  email: string;
  success: boolean;
  message: string;
}

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
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-email">
            <label>Email</label>
            <Input
              type="email"
              placeholder="Insira Seu Email"
              icon="mail"
              color="#0a0a1579"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="input-password">
            <label>Senha</label>
            <Input
              type="password"
              placeholder="Insira sua senha"
              color="#0a0a1579"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
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
