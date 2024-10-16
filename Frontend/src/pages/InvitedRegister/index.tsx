import { useParams, useNavigate } from 'react-router-dom';
import { ScheduleContext } from '../../providers/ScheduleProvider';
import { useContext, useEffect, useState } from 'react';
import { Navbar } from '../../components/Navbar';
import { InvitedStyled, Dot } from './InvitedStyled';
import { Icon } from '../../components/Icon';

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
