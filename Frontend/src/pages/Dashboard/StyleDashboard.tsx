import styled, { keyframes } from 'styled-components';
import backgroundImage from '../../assets/background/4861091.png';

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
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  width: 100%;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-repeat: no-repeat;

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

    a{
      color: #5353df;
    }
  }

  .div-cover-closed {
    width: 0;
    height: 100vh;
    position: absolute;
    z-index: 0;
    top: 0;
  }

  .guest-div,
  .host-div {
    display: ${(props) => (props.slidemenuopen ? 'flex' : 'none')};
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
      gap: 1rem;
    }
  }

  .slide-bar-menu-closed {
    width: 4%;
    height: 100vh;
    animation: ${shrinkWidth} 2s forwards;
    padding: 21px;
    display: flex;
    justify-content: flex-start;
    position: fixed;
    top: 0;
    left: 0;
  }

  .slide-bar-menu-open {
    max-width: 25rem;
    width: 100%;
    height: 100vh;
    animation: ${expandWidth} 2s forwards;
    background-color: #d4d3f3;
    padding: 21px;
    display: flex;
    gap: 2rem;
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;

    button {
      box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
        rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    }
  }

  .slide-bar-div-button {
    border-radius: 8px;
    height: 40px;
    width: 40px;
    padding: 4px;
    display: flex;
    position: relative;
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
    color: #0a0a15;
    gap: 0.5rem;
    user-select: none;
    padding: 21px;
    width: 100%;
    justify-content: flex-end;
    position: relative;
    background-color: #f8f8fc;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  }

  .schedules-counter {
    position: absolute;
    background-color: #0a0a15;
    color: white;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 20px;
    width: 20px;
    top: 0;
    right: 0;

    p {
      font-size: 12px;
    }
  }

  .chat {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    gap: 1rem;
    position: relative;

    h2 {
      font-size: 3rem;
      font-weight: 600;
    }

    .chat-conversation {
      display: flex;
      flex-direction: column;
      align-items: center;
      max-height: 65vh;
      min-height: 65vh;
      width: 100%;
      overflow-y: auto;
      border-radius: 8px;
      position: sticky;
      padding-bottom: 0.5rem;

      &::-webkit-scrollbar {
        width: 12px;
      }

      &::-webkit-scrollbar-thumb {
        background-color: #8380e5;
        border-radius: 12px;
        border-top-right-radius: 0px;
        border-top-left-radius: 0px;
      }

      &::-webkit-scrollbar-track {
        background-color: #4c4c4c;
        border-radius: 12px;
        border-top-right-radius: 0px;
        border-top-left-radius: 0px;
      }

      .div-global-chat {
        width: 52%;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        padding: 1rem;
      }
    }

    .message {
      display: flex;
      align-items: flex-end;
      max-width: 80%;
      width: fit-content;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 1rem;
      line-height: 1.4;
      box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px,
        rgba(0, 0, 0, 0.23) 0px 3px 6px;
    }

    .message.user {
      align-self: flex-end;
      background-color: #d4d3f3;
      color: #0a0a15;
    }

    .message.ia {
      align-self: flex-start;
      align-items: flex-start;
      padding: 2rem 0.5rem;
      gap: 0.5rem;
      background-color: #e0e0e0;
      color: #0a0a15;
    }

    .chat-input {
      display: flex;
      background-color: #d4d3f3;
      border: 1px solid #d4d3f3;
      border-radius: 8px;
      justify-content: center;
      align-items: center;
      padding: 0.5rem 1rem;
      position: sticky;
      bottom: 0;
      width: 50%;
      transition: all ease-in-out 0.3s;
      box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px,
        rgba(0, 0, 0, 0.23) 0px 3px 6px;

      textarea {
        border: none;
        border-radius: 4px;
        color: #0a0a15;
        font-size: 1rem;
        background-color: transparent;
        width: 100%;
        max-height: 200px;
        height: 70px;
        resize: none;
        overflow-y: auto;
        word-wrap: break-word;
        white-space: pre-wrap;

        &::placeholder {
          color: #0a0a1579;
        }

        &:focus {
          outline: none;
        }

        &::-webkit-scrollbar {
          width: 10px;
        }

        &::-webkit-scrollbar-thumb {
          background-color: #8380e5;
          border-radius: 12px;
        }

        &::-webkit-scrollbar-track {
          background-color: #4c4c4c;
          border-radius: 10px;
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
      position: sticky;
      bottom: 0;
      font-size: 1rem;
      color: #0a0a15;
    }
  }

  ul,
  ol {
    display: flex;
    flex-direction: column;
    padding: 1rem;
  }
`;
