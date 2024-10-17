import { Icon } from '../../components/Icon';
import { useState, useRef, useEffect } from 'react';
import { Button } from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/userHooks';
import { Card } from '../../components/Card';
import apiUrl from '../../config/api';
import { Modal } from '../../components/Modal';
import Snackbar from '../../components/Snackbar';
import { StyledDashboard, Dot } from './StyleDashboard';
import { formatDate } from '../../Utils/FormatDate';
import { formatMessage } from '../../Utils/FormatMessage';
import { compareStatus } from '../../Utils/sortSchedules';

export const Dashboard = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [sendingMessage, setSendingMessage] = useState<string>('');
  const [conversation, setConversation] = useState<ConversationMessage[]>([]);
  const [currentSchedule, setCurrentSchedule] =
    useState<ScheduleCreateResponse | null>(null);
  const [schedules, setSchedules] = useState<ScheduleResponse | null>(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [slideMenuOpen, setSlideMenuOpen] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [activeModalId, setActiveModalId] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useUser();

  function openModal(schedule_id: string) {
    setActiveModalId(schedule_id);
  }

  function closeModal() {
    setActiveModalId(null);
  }

  async function handleSendMessage() {
    if (!message) return;

    const schedule = currentSchedule || (await createSchedule());

    setConversation((prevConversation) => [
      ...prevConversation,
      { sender: 'user', message: message! },
    ]);

    if (schedule) {
      await sendMessageToAi(sendingMessage, schedule.data.id);
    }
  }

  const sendMessageToAi = async (message: string, schedule_id: string) => {
    setMessage('');
    try {
      setLoadingMessage(true);
      const data = await fetch(apiUrl('/chat/'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          message: message,
          schedule_id: schedule_id,
        }),
      });

      const res = await data.json();
      const iaResponse = res.data;
      setSendingMessage('');
      setConversation((prevConversation) => [
        ...prevConversation,
        { sender: 'ia', message: iaResponse },
      ]);
      setLoadingMessage(false);
    } catch (error) {
      setSnackbarMessage('Erro ao enviar mensagem');
      setSnackbarVisible(true);
      setLoadingMessage(false);
      console.error(error);
    }
  };

  const createSchedule = async () => {
    try {
      const data = await fetch(apiUrl('/schedule/'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          title: 'Nova reunião',
        }),
      });

      const res: ScheduleCreateResponse = await data.json();

      setCurrentSchedule(res);
      await getSchedules();
      return res;
    } catch (error) {
      setSnackbarMessage('Erro ao criar novo chat');
      setSnackbarVisible(true);
      console.error(error);
    }
  };

  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  }

  const logout = async () => {
    try {
      await fetch(apiUrl('/logout'), {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      setUser('');
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const getSchedules = async () => {
    try {
      const response = await fetch(apiUrl('/schedule'), {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
        credentials: 'include',
      });
      const schedules: ScheduleResponse = await response.json();
      if (schedules.success) {
        schedules.data.sort(compareStatus);
        setSchedules(schedules);
      }
      if (schedules.success && schedules.data.length === 0) {
        return;
      }
    } catch (error) {
      setSnackbarMessage('Erro ao buscar chats');
      setSnackbarVisible(true);
      console.error(error);
    }
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversation]);

  useEffect(() => {
    getSchedules();
  }, []);

  return (
    <StyledDashboard slidemenuopen={slideMenuOpen ? 'true' : undefined}>
      <div
        className={slideMenuOpen ? 'div-cover-open' : 'div-cover-closed'}
        onClick={() => setSlideMenuOpen(!slideMenuOpen)}
      >
        <div
          className={
            slideMenuOpen ? 'slide-bar-menu-open' : 'slide-bar-menu-closed'
          }
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className={'slide-bar-div-button'}
            onClick={() => setSlideMenuOpen(!slideMenuOpen)}
          >
            <Icon
              icon="sidebarSimple"
              size={32}
              weight="regular"
              color="#0A0A15"
            />
          </div>
          <div className="sideBar-content">
            <Button
              width="full"
              onClick={() => {
                setSlideMenuOpen(false);
                setConversation([]);
                setCurrentSchedule(null);
              }}
            >
              <Icon icon="plus" size={24}></Icon> <p>Novo chat</p>
            </Button>
            <div className="host-div">
              {schedules && <p className="bold-card">Host</p>}
              <div className="host-cards">
                {schedules &&
                  schedules.data.map(
                    (schedule) =>
                      schedule.is_host && (
                        <div key={schedule.id}>
                          <Card
                            Display={slideMenuOpen ? 'Flex' : 'none'}
                            key={String(schedule.id)}
                            status={schedule.status}
                            title={schedule.title}
                            proposed_date={
                              schedule.proposed_date
                                ? typeof schedule.proposed_date === 'object'
                                  ? formatDate(
                                      schedule.proposed_date.proposed_date
                                    )
                                  : formatDate(schedule.proposed_date)
                                : 'A definir'
                            }
                            onClick={() => openModal(schedule.id)}
                          />
                          {activeModalId === schedule.id && (
                            <Modal
                              onClick={closeModal}
                              schedule={schedule}
                              setSchedules={setSchedules}
                              schedules={schedules}
                              setCurrentSchedule={setCurrentSchedule}
                              setConversation={setConversation}
                              setActiveModalId={setActiveModalId}
                              setSlideMenuOpen={setSlideMenuOpen}
                            />
                          )}
                        </div>
                      )
                  )}
              </div>
            </div>
            <div className="guest-div">
              {schedules && <p className="bold-card">Convidado</p>}
              <div className="guest-cards">
                {schedules &&
                  schedules.data.map(
                    (schedule) =>
                      !schedule.is_host && (
                        <div key={schedule.id}>
                          <Card
                            Display={slideMenuOpen ? 'Flex' : 'none'}
                            key={String(schedule.id)}
                            status={schedule.status}
                            title={schedule.title}
                            proposed_date={
                              schedule.proposed_date
                                ? typeof schedule.proposed_date === 'object'
                                  ? formatDate(
                                      schedule.proposed_date.proposed_date
                                    )
                                  : formatDate(schedule.proposed_date)
                                : 'A definir'
                            }
                          />
                        </div>
                      )
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="chat-content">
        <div className="logo">
          <Button onClick={() => logout()}>
            <p>Sair</p>
          </Button>
        </div>
        <div className="chat">
          {conversation.length === 0 ? (
            <>
              <h2>O que gostaria de agendar hoje?</h2>
              <div className="chat-input">
                <input
                  type="text"
                  placeholder="O que posso agendar para você hoje?"
                  value={message ? message : ''}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    setSendingMessage(e.target.value);
                  }}
                  onKeyDown={handleKeyPress}
                />
                <button
                  onClick={() => {
                    handleSendMessage();
                  }}
                  disabled={!message}
                >
                  <Icon
                    icon="circleArrowUp"
                    size={32}
                    weight="fill"
                    color={message ? '#0a0a15' : '#0a0a1580'}
                  />
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="chat-conversation">
                {conversation.map((msg, index) => (
                  <div key={index} className={`message ${msg.sender}`}>
                    {msg.sender === 'ia' && (
                      <div className="icon-ia">
                        <Icon
                          size={32}
                          icon="robot"
                          weight="fill"
                          color="#0a0a15"
                        />
                      </div>
                    )}
                    <pre>{formatMessage(msg.message)}</pre>
                  </div>
                ))}
                {loadingMessage && (
                  <div className="typing">
                    Digitando algo <Dot>.</Dot>
                    <Dot>.</Dot>
                    <Dot>.</Dot>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
              <div className="chat-input">
                <input
                  type="text"
                  placeholder="Mensagem SchedulAI"
                  value={message ? message : ''}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    setSendingMessage(e.target.value);
                  }}
                  onKeyDown={handleKeyPress}
                />
                <button
                  onClick={() => {
                    handleSendMessage();
                  }}
                >
                  <Icon
                    icon="circleArrowUp"
                    size={32}
                    weight="fill"
                    color={message ? '#0a0a15' : '#0a0a1580'}
                  />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      {snackbarVisible && (
        <Snackbar
          anchororigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="error"
          message={snackbarMessage}
        />
      )}
    </StyledDashboard>
  );
};
