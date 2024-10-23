import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';
import { Input } from '../../components/Input';

import { RegisterStyled } from './RegisterStyled';
import apiUrl from '../../config/api';
import { useState } from 'react';
import SnackbarContainer from '../../components/Snackbar/SnackbarContainer';
import { useSchedule } from '../../hooks/scheduleHooks';
import { setCookie } from '../../Utils/Cookies';

export const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [containerVisible, setContainerVisible] = useState(true);
  const { schedule_id } = useSchedule();
  const id = schedule_id;

  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const specialCharsRegex: RegExp = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?\s]+/;

  const navigate = useNavigate();

  const createInvite = async (id: string, userId: string) => {
    try {
      const result = await fetch(apiUrl('/invite/create'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          schedule_id: id,
          user_id: userId,
        }),
      });
      return result.json();
    } catch (error) {
      console.error(error);
    }
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

  const registerFetch = async () => {
    setLoading(true);
    if (email === '' || password === '') {
      addSnackbar('Preencha todos os campos', 'error');
      setLoading(false);
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      addSnackbar('Email inválido', 'error');
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      addSnackbar('A senha deve ter no mínimo 6 caracteres', 'error');
      setLoading(false);
      return;
    }
    if (!emailRegex.test(email)) {
      addSnackbar('Email inválido', 'error');
      setLoading(false);
      return;
    }
    if (!specialCharsRegex.test(password)) {
      addSnackbar(
        'A senha deve conter ao menos um caracter especial (!@#$%^&*()_+-=[]{};\':"\\|,.<>/?)',
        'error'
      );
      setLoading(false);
      return;
    }
    if (!name) {
      addSnackbar('Nome é obrigatório', 'error');
      setLoading(false);
      return;
    }
    if (name.length < 3) {
      addSnackbar('Nome deve ter no mínimo 3 caracteres', 'error');
      setLoading(false);
      return;
    }
    try {
      const response = await fetch(apiUrl('/user/create'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.toLowerCase(),
          email: email.toLowerCase(),
          password: password,
        }),
      });
      const { data, message }: RegisterResponse = await response.json();
      setCookie('isFirstLogin', 'true', 8640000);

      if (id) {
        setCookie('schedule_id', id, 864000);
        const invite = await createInvite(id, data.id);
        if (invite.sucess) {
          addSnackbar(invite.message, 'success');
        } else {
          addSnackbar(invite.message, 'error');
        }
      }
      if (response.ok) {
        addSnackbar(message, 'success');
        setTimeout(() => {
          navigate('/login');
          setLoading(false);
        }, 5000);
      } else {
        addSnackbar(message, 'error');
        setLoading(false);
      }
    } catch (error) {
      addSnackbar((error as Error).message, 'error');
      setLoading(false);
      return;
    }
  };

  return (
    <RegisterStyled className="register-main-div">
      <Button onClick={() => navigate('/')}>
        <Icon icon="back" size={18} weight="fill" color="#f8f8fc" />
        <span>Voltar</span>
      </Button>
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
            <p>Registrar</p>
          </Button>
          <a id="register-a-create-account" onClick={() => navigate('/login')}>
            Já possui uma conta? <span>Acesse agora</span>
          </a>
        </div>
      </div>
      <SnackbarContainer
        anchororigin={{ vertical: 'top', horizontal: 'right' }}
        visible={containerVisible}
      />
    </RegisterStyled>
  );
};
