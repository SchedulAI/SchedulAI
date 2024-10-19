import styled from 'styled-components';

export const ModalStyled = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0px;
  left: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0a0a1580;

  .modal {
    background: #f8f8fc;
    border-radius: 4px;
    width: 40rem;
    height: 30rem;
    opacity: 1;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    position: relative;

    .close-button {
      position: absolute;
      padding: 1rem;
      right: 0;
      top: 0;
    }

    .header {
      padding: 0.5rem 0rem;
      display: flex;
      justify-content: space-between;
      width: 80%;

      div {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      p {
        font-size: 20px;
        color: #0a0a15;
        font-weight: 500;
      }
    }

    .content {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      height: 100%;

      .info {
        display: flex;
        flex-direction: column;
        height: 100%;
        gap: 8px;

        p {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 4px;
          span {
            font-weight: 500;
          }
        }

        .guests {
          display: flex;
          gap: 1rem;
          align-items: center;
          background-color: #cfcfcf1d;
          border-radius: 8px;
          padding: 1rem;
          box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

          p {
            font-size: 1rem;
            font-weight: 500;
            width: fit-content;
          }

          .guest-section {
            padding: 1rem;
            max-height: 10rem;
            overflow-y: auto;
          }

          .status-guest {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 1rem;
          }

          .guests-list {
            display: flex;
            gap: 4px;
            flex-direction: column;
            align-items: center;
            width: 80%;
            overflow-y: auto;
            height: 100%;
            max-height: 10rem;

            .guest-item {
              display: flex;
              justify-content: space-between;
              width: 100%;
            }
          }
        }
      }

      .buttons {
        display: flex;
        flex-direction: column;
        gap: 4px;

        .cancel-button {
          button {
            background-color: #ec9191;
            border: #dc282875;

            &:hover {
              background-color: #eb7171;
              border: #dc282875;
            }
          }
        }

        .id {
          color: #777794;
        }
      }
    }

    .status-circle {
      border-radius: 100%;
      height: 8px;
      width: 8px;
    }

    .yellow {
      background-color: #e2e21c;
    }

    .green {
      background-color: #38d44f;
    }

    .red {
      background-color: #dc2828;
    }
    .div-status {
      display: flex;
      flex-direction: row;
      gap: 0.5rem;
      align-items: center;
    }
  }

  .summary {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    position: relative;
    cursor: pointer;

    .icon-summary {
      position: absolute;
      right: 0;
      cursor: pointer;
    }
  }
`;
