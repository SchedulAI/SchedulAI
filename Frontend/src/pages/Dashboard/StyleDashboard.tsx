import styled, { keyframes } from 'styled-components';

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
    width: 100%;
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

export const StyledDashboard = styled.div<{
  slidemenuopen: string | undefined;
}>`
  * {
    transition: all ease-in-out 0.3s;
  }

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;

  pre {
    white-space: break-spaces;
  }

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
    width: 100%;
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
    max-height: 40vh;
    padding: 0.5rem;
    overflow-y: auto;

    .bold-card {
      font-weight: 600;
    }

    &::-webkit-scrollbar {
      width: 10px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #8380e5;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
      background-color: #4c4c4c;
      border-radius: 10px;
    }

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
    max-width: 25rem;
    width: 100%;
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
      display: ${(props) => (props.slidemenuopen ? 'flex' : 'none')};
    }

    button {
      display: ${(props) => (props.slidemenuopen ? 'flex' : 'none')};
      overflow: hidden;
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
      max-height: 70vh;
      min-height: 70vh;
      width: 100%;
      overflow-y: auto;
      padding: 1rem;
      border-radius: 8px;
      border: 1px solid #e0e0e0;

      &::-webkit-scrollbar {
        width: 10px;
      }

      &::-webkit-scrollbar-thumb {
        background-color: #8380e5;
        border-radius: 10px;
      }

      &::-webkit-scrollbar-track {
        background-color: #4c4c4c;
        border-radius: 10px;
      }
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

    .message.ia {
      align-self: flex-start;
      align-items: flex-start;
      background-color: #cdccee;
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

        &:disabled {
          cursor: not-allowed;
        }
      }
    }

    .typing {
      display: flex;
      align-items: center;
      align-self: flex-start;
      margin-top: auto;
      font-size: 1rem;
      color: #0a0a15;
    }
  }
`;
