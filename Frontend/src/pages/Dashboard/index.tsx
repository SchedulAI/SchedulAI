import styled, { keyframes } from 'styled-components';
import { Icon } from '../../components/Icon';
import { useState, useRef, useEffect } from 'react';
import { Button } from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/userHooks';
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
    width: 20%;
  }
`;

const StyledDashboard = styled.div`
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
  }

  .slide-bar-menu-closed {
    width: 4%;
    height: 100%;
    animation: ${shrinkWidth} 2s forwards;
    padding: 20px;
    display: flex;
    justify-content: flex-end;
    position: relative;
  }

  .slide-bar-menu-open {
    width: 20%;
    height: 100%;
    animation: ${expandWidth} 2s forwards;
    background-color: #d4d3f3;
    display: flex;
    justify-content: flex-end;
    position: relative;
  }

  .slide-bar-div-button {
    background-color: #8380e5;
    border-radius: 100%;
    height: 40px;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    position: absolute;
    right: 0;
    top: 50%;

    &.rotate {
      transform: rotate(180deg);
    }

    &:hover {
      background-color: #7a77da;
    }
  }

  .div-button-white {
    height: 100%;
    width: 15%;
    background-color: #fff;
  }

  .logo {
    display: flex;
    align-items: center;
    color: #0a0a15;
    gap: 0.5rem;
    user-select: none;
    padding: 1rem 2rem;
    width: 100%;
    justify-content: space-between;

    .schedul-ai {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
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

export const Dashboard = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [sendingMessage, setSendingMessage] = useState<string>('');
  const [conversation, setConversation] = useState<string[]>([]);
  const [isUserMessage, setIsUserMessage] = useState<boolean[]>([]);
  const [currentSchedule, setCurrentSchedule] = useState<string>('');
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
      const data = await fetch(apiUrl('chat/'), {
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

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversation]);

  return (
    <StyledDashboard>
      <div
        className={
          slideMenuOpen ? 'slide-bar-menu-open' : 'slide-bar-menu-closed'
        }
      >
        <div className="div-button-white">
          <div
            className={'slide-bar-div-button'}
            onClick={() =>
              slideMenuOpen ? setSlideMenuOpen(false) : setSlideMenuOpen(true)
            }
          >
            <Icon
              icon={slideMenuOpen ? 'expandLeft' : 'expandRight'}
              size={20}
              color="#0a0a15"
            />
          </div>
        </div>
      </div>
      <div className="chat-content">
        <div className="logo">
          <div className="schedul-ai">
            <Icon icon="robot" size={32} weight="fill" />
            <p>SchedulAI</p>
          </div>
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
