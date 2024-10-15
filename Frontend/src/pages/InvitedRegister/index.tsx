import { useParams, useNavigate } from 'react-router-dom';
import { ScheduleContext } from '../../providers/ScheduleProvider';
import { useContext, useEffect, useState } from 'react';
import { Navbar } from '../../components/Navbar';
import styled, { keyframes } from 'styled-components';
import { Icon } from '../../components/Icon';

const InvitedStyled = styled.div`
  .main-section {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .invite-chat {
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-height: 500px;
    min-height: 500px;
    width: 50%;
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid #e0e0e0;
  }
  .message-invite {
    display: flex;
    max-width: 80%;
    padding: 0.5rem 1rem;
    gap: 0.5rem;
    border-radius: 20px;
    font-size: 1rem;
    line-height: 1.4;
    align-self: center;
    align-items: center;
    background-color: #e0e0e0;
    color: #0a0a15;

    a {
      color: #8380e5;
    }
  }
  .typing {
    display: flex;
    align-items: center;
    align-self: flex-end;
    margin-top: auto;
    font-size: 1rem;
    color: #0a0a15;
  }
`;

const bounce = keyframes`
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-5px);
    }
  `;

const Dot = styled.span`
  display: inline-block;
  animation: ${bounce} 0.6s infinite;
  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  &:nth-child(3) {
    animation-delay: 0.4s;
  }
`;

export const InvitedRegister = () => {
  const navigate = useNavigate();
  const { schedule_id } = useParams<{ schedule_id: string }>();
  const scheduleContext = useContext(ScheduleContext);
  const [loading, setLoading] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (schedule_id && scheduleContext) {
      scheduleContext.setScheduleId(schedule_id);
    }

    const timer = setTimeout(() => {
      setLoading(false);
      setShowMessage(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [schedule_id, scheduleContext]);

  return (
    <InvitedStyled>
      <Navbar />
      <div className="main-section">
        <div className="invite-chat">
          {loading ? (
            <div className="typing">
              Digitando algo <Dot>.</Dot>
              <Dot>.</Dot>
              <Dot>.</Dot>
            </div>
          ) : (
            showMessage && (
              <div className="message-invite">
                <Icon size={32} icon="robot" weight="fill" color="#0a0a15" />
                <p>
                  Olá, você recebeu um convite para um evento, para poder
                  agendar o seu horário, por favor cadastre-se
                  <a onClick={() => navigate('/register')}> clicando aqui!</a>
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </InvitedStyled>
  );
};
