import { useState } from 'react';
import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';
import { Input } from '../../components/Input';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const RecoverPasswordStyled = styled.div`
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

  .recover-div-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    width: 100%;
    height: 100%;
  }

  .recover-div-title {
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

  .recover-field {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    width: 100%;
  }

  .input-email {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: fit-content;
    gap: 8px;
  }

  .input-email label {
    padding-left: 4px;
    font-weight: 500;
  }

  .recover-enter-div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    width: 390px;
  }
`;

export const RecoverPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  return (
    <RecoverPasswordStyled>
      <div className="btn-back-div">
        <Button onClick={() => navigate('/login')}>
          <Icon icon="back" size={18} weight="fill" color="#0A0A15" />
          <span>Voltar</span>
        </Button>
      </div>
      <div className="recover-div-section">
        <div className="recover-div-title">
          <h1>Esqueceu A Senha? 👍</h1>
          <span>Insira seu email para recuperar a senha</span>
        </div>
        <div className="recover-field">
          <div className="input-email">
            <label>Email</label>
            <Input
              type="email"
              placeholder="Insira Seu Email"
              icon="mail"
              color="#0A0A1579"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="recover-enter-div">
          <Button width="full" onClick={() => {}} disabled={!email}>
            <p>Recuperar Senha</p>
          </Button>
        </div>
      </div>
    </RecoverPasswordStyled>
  );
};
