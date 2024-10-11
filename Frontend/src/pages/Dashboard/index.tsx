import styled from "styled-components";
import { Icon } from "../../components/Icon";
import { useState, useRef, useEffect } from "react";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/userHooks";
import apiUrl from "../../config/api";

const StyledDashboard = styled.div`
  * {
    transition: all ease-in-out 0.3s;
  }

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;

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
  const [conversation, setConversation] = useState<string[]>([]);
  const [isUserMessage, setIsUserMessage] = useState<boolean[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { setUser } = useUser();

  function handleSendMessage() {
    if (!message) return;
    setConversation([...conversation, message!]);
    setIsUserMessage([...isUserMessage, true]);
    setMessage("");
  }

  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  }

  const logout = async () => {
    try {
      await fetch(apiUrl('/logout'), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      setUser("");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation]);

  return (
    <StyledDashboard>
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
                value={message ? message : ""}
                onChange={(e) => setMessage(e.target.value)}
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
                  color={message ? "#0a0a15" : "#0a0a1580"}
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
                    isUserMessage[index] ? "user" : "system"
                  }`}
                >
                  {!isUserMessage[index] && (
                    <Icon icon="robot" weight="fill" color="#0a0a15" />
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
                value={message ? message : ""}
                onChange={(e) => setMessage(e.target.value)}
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
                  color={message ? "#0a0a15" : "#0a0a1580"}
                />
              </button>
            </div>
          </>
        )}
      </div>
    </StyledDashboard>
  );
};
