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

  .modal {
    background: #f8f8fc;
    border-radius: 4px;
    width: 40rem;
    height: 30rem;
    opacity: 1;
    padding: 1rem;
    display: flex;
    flex-direction: column;

    .header {
      padding: 0.5rem 0rem;
      display: flex;
      justify-content: space-between;
      width: 100%;

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
          gap: 0.5rem;
          height: 100%;

          p {
            font-size: 1rem;
            font-weight: 500;
            width: fit-content;
          }

          .guests-list {
            display: flex;
            gap: 4px;
            flex-direction: column;
            width: 100%;
            overflow-y: scroll;
            height: 100%;
            max-height: 10rem;

            .guest-item {
              display: flex;
              width: 100%;

              p {
                width: 100%;
              }

              .status {
                display: flex;
                align-items: center;
                gap: 4px;
              }
            }
          }
        }
      }

      .buttons {
        display: flex;
        flex-direction: column;
        gap: 4px;

        button {
          &:last-child {
            background-color: #dc2828;
            border: #dc282875;

            &:hover {
              background-color: #da0707;
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
    .div-status{
      display: flex;
      flex-direction: row;
      gap: 0.5rem;
      align-items: center;
    }
 }
`;
