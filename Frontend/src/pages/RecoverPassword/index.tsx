import { useState } from 'react';
import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';
import { Input } from '../../components/Input';
import { useNavigate } from 'react-router-dom';
import { RecoverPasswordStyled } from './RecoverPasswordStyled';


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
