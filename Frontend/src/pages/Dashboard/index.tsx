import styled, { keyframes } from 'styled-components';
import { Icon } from '../../components/Icon';
import { useState, useRef, useEffect } from 'react';
import { Button } from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/userHooks';
import { Card } from '../../components/Card';
import apiUrl from '../../config/api';

const shrinkWidth = keyframes`
  from {
    width: 20%;
  }
  to {
    width: 4%;
  }
`;

const expandWidth = keyframes`
  from {
    width: 4%;
  }
  to {
    width: 19%;
  }
`;

const StyledDashboard = styled.div<{ slideMenuOpen: boolean }>`
  * {
    transition: all ease-in-out 0.3s;
  }

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;

  .chat-content {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
    padding: 21px;
  }

  .div-cover-open {
    width: 0;
    height: 100vh;
    background-color: #0a0a1575;
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
  }

  .div-cover-open {
    width: 100vw;
    height: 100vh;
    background-color: #0a0a1575;
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
  }

  .div-cover-closed {
    width: 0;
    height: 100vh;
    background-color: #0a0a1575;
    position: absolute;
    z-index: 0;
    top: 0;
  }

  .guest-div,
  .host-div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    user-select: none;

    .guest-cards,
    .host-cards {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
  }

  .slide-bar-menu-closed {
    width: 4%;
    height: 100%;
    animation: ${shrinkWidth} 2s forwards;
    padding: 21px;
    display: flex;
    justify-content: flex-start;
    position: relative;
  }

  .slide-bar-menu-open {
    width: 19%;
    height: 100%;
    animation: ${expandWidth} 2s forwards;
    background-color: #d4d3f3;
    padding: 21px;
    display: flex;
    gap: 2rem;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    position: relative;
  }

  .slide-bar-div-button {
    border-radius: 8px;
    height: 40px;
    width: 40px;
    padding: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
      background-color: #cdccee;
    }
  }

  .sideBar-content {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2rem;

    p {
      display: ${(props) => (props.slideMenuOpen ? 'flex' : 'none')};
    }

    button {
      display: ${(props) => (props.slideMenuOpen ? 'flex' : 'none')};
    }
  }

  .logo {
    display: flex;
    align-items: center;
    color: #0a0a15;
    gap: 0.5rem;
    user-select: none;
    width: 100%;
    justify-content: flex-end;
  }

  .chat {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 40%;
    gap: 2rem;

    h2 {
      font-size: 3rem;
      font-weight: 600;
    }

    .chat-conversation {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      max-height: 300px;
      min-height: 300px;
      width: 100%;
      overflow-y: auto;
      padding: 1rem;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
    }

    .message {
      display: flex;
      align-items: flex-end;
      max-width: 80%;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 1rem;
      line-height: 1.4;
    }

    .message.user {
      align-self: flex-end;
      background-color: #d4d3f3;
      color: #0a0a15;
    }

    .message.system {
      align-self: flex-start;
      align-items: center;
      gap: 0.5rem;
      background-color: #e0e0e0;
      color: #0a0a15;
    }

    .chat-input {
      display: flex;
      background-color: #d4d3f3;
      border: 1px solid #d4d3f3;
      border-radius: 4px;
      padding: 0.5rem 1rem;
      width: 100%;
      transition: all ease-in-out 0.3s;

      input {
        border: none;
        border-radius: 4px;
        color: #0a0a15;
        font-size: 1rem;
        background-color: transparent;
        width: 100%;

        &::placeholder {
          color: #0a0a1579;
        }

        &:focus {
          outline: none;
        }
      }

      &:hover {
        background-color: #e6e6f5;
        border: 1px solid #e2e2f5;
      }

      &:focus-within {
        background-color: #e0e0f5;
        border: 1px solid #dcdcf5;
      }

      button {
        background-color: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        padding: 0;
      }
    }
  }
`;

// Função para formatar a data
const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Janeiro é 0!
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const Dashboard = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [sendingMessage, setSendingMessage] = useState<string>('');
  const [conversation, setConversation] = useState<string[]>([]);
  const [isUserMessage, setIsUserMessage] = useState<boolean[]>([]);
  const [currentSchedule, setCurrentSchedule] = useState<string>('');
  const [schedules, setSchedules] = useState<ScheduleResponse | null>(null);
  const [slideMenuOpen, setSlideMenuOpen] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { setUser } = useUser();

  async function handleSendMessage() {
    if (!message) return;

    const schedule = currentSchedule || (await createSchedule());

    setConversation((prevConversation) => [...prevConversation, message!]);
    setIsUserMessage((prevIsUserMessage) => [...prevIsUserMessage, true]);

    await sendMessageToAi(sendingMessage, schedule.id);
  }

  const sendMessageToAi = async (message: string, schedule_id: string) => {
    setMessage('');
    try {
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
      setConversation((prevConversation) => [...prevConversation, iaResponse]);
      setIsUserMessage((prevIsUserMessage) => [...prevIsUserMessage, false]);
    } catch (error) {
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
          title: 'reunião teste',
        }),
      });

      const res = await data.json();

      setCurrentSchedule(res.data);

      return res.data;
    } catch (error) {
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
      const response = await fetch(apiUrl('/user/schedules'), {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
        credentials: 'include',
      });
      const data: ScheduleResponse = await response.json();
      setSchedules(data);
    } catch (error) {
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
  });

  return (
    <StyledDashboard slideMenuOpen={slideMenuOpen}>
      <div className={slideMenuOpen ? 'div-cover-open' : 'div-cover-closed'}>
        <div
          className={
            slideMenuOpen ? 'slide-bar-menu-open' : 'slide-bar-menu-closed'
          }
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
                createSchedule();
                setSlideMenuOpen(false);
              }}
            >
              <Icon icon="plus" size={24}></Icon> <p>Novo chat</p>
            </Button>
            <div className="host-div">
              {schedules ? <p>Host</p> : <p></p>}
              <div className="host-cards">
                {schedules &&
                  schedules.Schedules.map(
                    (schedule) =>
                      schedule.is_host && (
                        <div key={schedule.schedule_id}>
                          <Card
                            Display={slideMenuOpen ? 'Flex' : 'none'}
                            key={String(schedule.schedule_id)}
                            status={schedule.status}
                            subject={schedule.event_title}
                            eventDate={
                              schedule.event_date
                                ? formatDate(schedule.event_date)
                                : undefined
                            }
                            eventTime={schedule.event_time}
                            proposedDateRange={
                              schedule.proposed_date
                                ? formatDate(schedule.proposed_date)
                                : undefined
                            }
                          />
                        </div>
                      )
                  )}
              </div>
            </div>
            <div className="guest-div">
              {schedules ? <p>Convidado</p> : <p></p>}
              <div className="guest-cards">
                {schedules &&
                  schedules.Schedules.map(
                    (schedule) =>
                      !schedule.is_host && (
                        <div key={schedule.schedule_id}>
                          <Card
                            Display={slideMenuOpen ? 'Flex' : 'none'}
                            key={String(schedule.schedule_id)}
                            status={schedule.status}
                            subject={schedule.event_title}
                            eventDate={
                              schedule.event_date
                                ? formatDate(schedule.event_date)
                                : undefined
                            }
                            eventTime={schedule.event_time}
                            proposedDateRange={
                              schedule.proposed_date
                                ? formatDate(schedule.proposed_date)
                                : undefined
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
              <h2>Como Posso Ajudar?</h2>
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
                  <div
                    key={index}
                    className={`message ${
                      isUserMessage[index] ? 'user' : 'system'
                    }`}
                  >
                    {!isUserMessage[index] && (
                      <div className="icon-system">
                        <Icon
                          size={32}
                          icon="robot"
                          weight="fill"
                          color="#0a0a15"
                        />
                      </div>
                    )}
                    {msg}
                  </div>
                ))}
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
    </StyledDashboard>
  );
};
