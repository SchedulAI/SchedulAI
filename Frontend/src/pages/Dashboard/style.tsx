import styled from 'styled-components';
import backgroundImage from '../../assets/background/4861091.png';

export const Dot = styled.span`
  display: inline-block;
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
  display: flex;
  width: 100%;
  height: 100%;
  background: #f8f8fc;
  position: relative;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-repeat: no-repeat;

  .logo {
    > Button {
      position: absolute;
      right: 0.75rem;
      top: 0.75rem;
      z-index: 12;
    }
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
      color: ${(props) => props.theme.colors.backgroundPrimary};
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
    background-image: url(bac);
    position: relative;

    h2 {
      font-size: 3rem;
      font-weight: 600;
      text-align: center;
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

    .message p {
      margin: 0;
      max-width: 100%;
      overflow-wrap: break-word;
      white-space: normal;
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
      border-radius: 8px;
      justify-content: center;
      align-items: center;
      padding: 1rem;
      gap: 0.5rem;
      position: sticky;
      bottom: 0;
      width: 50%;
      transition: all ease-in-out 0.3s;
      box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px;

      &.disabled {
        background-color: #bebecb;

        &:hover {
          background-color: #bebecb;
        }
      }

      textarea {
        border: none;
        border-radius: 4px;
        color: #0a0a15;
        font-size: 1rem;
        background-color: transparent;
        width: 100%;
        max-height: 200px;
        height: auto;
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

        &:disabled {
          background-color: #bebecb;
          cursor: not-allowed;

          &:hover {
            background-color: #bebecb;
          }
        }
      }

      &:hover {
        background-color: #cfceed;
      }

      &:focus {
        background-color: #c4c3e0;
      }

      &:focus-within {
        background-color: #c4c3e0;
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

  .confirm-modal {
    position: fixed;
    z-index: 99;
    top: 50%;
    left: 50%;
    height: 100%;
    width: 100%;
    background-color: #0a0a1580;
    color: #0a0a15;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;

    .confirm-modal-content {
      background-color: #e2e2ea;
      height: 40%;
      width: 40%;
      padding: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      text-align: center;
      gap: 2rem;
      border-radius: 8px;

      .modal-confirm-title {
        color: #5353df;
      }

      .confirm-modal-buttons {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 2rem;

        .button-no {
          button {
            background-color: #d62828;

            &&:hover {
              background-color: #d01f1f;
            }
          }
        }
      }
    }
  }
`;
