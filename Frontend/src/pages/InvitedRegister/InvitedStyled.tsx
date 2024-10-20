import styled, { keyframes } from 'styled-components';

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
`;

export const InvitedStyled = styled.div`
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

export const Dot = styled.span`
  display: inline-block;
  animation: ${bounce} 0.6s infinite;
  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  &:nth-child(3) {
    animation-delay: 0.4s;
  }
`;
