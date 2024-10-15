import { Icon } from '../Icon';
import { Button } from '../Button';
import styled from 'styled-components';

const ModalStyled = styled.div`
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
`;

interface Props {
  onClick: () => void;
  schedule: Schedule;
}

export const Modal = ({ onClick, schedule }: Props) => {
  function handleStatusColor(status: string) {
    if (status === 'pending') {
      return 'yellow';
    } else if (status === 'declined') {
      return 'red';
    } else {
      return 'green';
    }
  }

  function handleRenderStatus(status: string) {
    if (status === 'accepted') {
      return 'Confirmado';
    } else if (status === 'pending') {
      return 'Pendente';
    } else {
      return 'Cancelado';
    }
  }

  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <ModalStyled onClick={onClick}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="header">
          <p>{schedule.event_title}</p>
          <div onClick={onClick}>
            <Icon icon="x" size={24} weight="bold" />
          </div>
        </div>
        <div className="content">
          <div className="content">
            <div className="info">
              <p className="status">
                <span>Status:</span>
                {handleRenderStatus(schedule.status)}
              </p>
              <p className="proposed-date">
                <span>Data Proposta:</span>
                {schedule.proposed_date && (
                  <p>
                    Entre {formatDate(schedule.proposed_date[0])} e{' '}
                    {formatDate(schedule.proposed_date[1])}
                  </p>
                )}
              </p>
              <p className="limit-date">
                <span>Data Limite:</span>
                {schedule.time_limit && formatDate(schedule.time_limit)}
              </p>
              <p className="event-time">
                <span>Horário proposto:</span>
              </p>
              <p className="description">
                <span>Descrição:</span>
                {schedule.event_description && (
                  <p>{schedule.event_description}</p>
                )}
              </p>
              <div className="guests">
                <p>Convidados:</p>
                <div className="guests-list">
                  {schedule.invites &&
                    schedule.invites.map((invite) => {
                      return (
                        <div className="guest-item">
                          <p>{invite.name}</p>
                          <div className="status">
                            <p>{handleRenderStatus(invite.status)}</p>
                            <div
                              className={`status-circle ${handleStatusColor(
                                invite.status
                              )}`}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="buttons">
              <Button onClick={() => {}} width="full">
                <p>Ver conversa no chat</p>
              </Button>
              <Button onClick={() => {}} width="full">
                <p>Cancelar reunião</p>
              </Button>
            </div>
            <p className="id">ID: 00000001</p>
          </div>
        </div>
      </div>
    </ModalStyled>
  );
};
