import { Icon } from '../Icon';
import { Button } from '../Button';
import apiUrl from '../../config/api';
import { ModalStyled } from './ModalStyled';
import { formatDate } from '../../Utils/FormatDate';
import {
  handleRenderStatus,
  handleStatusColor,
} from '../../Utils/HandleStatus';

export const Modal = ({
  onClick,
  schedule,
  setOldConversation,
  setActiveModalId,
}: Props) => {
  const cancelSchedule = async (id: string) => {
    try {
      await fetch(apiUrl(`/cancel/${id}`), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getOldConversation = async (id: string): Promise<void> => {
    try {
      const result = await fetch(apiUrl(`/dialog/messages/${id}`), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data: Message[] = await result.json();
      setOldConversation(data);
      setActiveModalId(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ModalStyled onClick={onClick} key={schedule.id}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="header">
          <p>{schedule.event_title}</p>
          <div onClick={onClick}>
            <Icon icon="x" size={24} weight="bold" />
          </div>
        </div>
        <div className="content">
          <div className="info">
            {schedule.event_description && (
              <p className="description">
                <span>Descrição:</span>
                <span>{schedule.event_description}</span>
              </p>
            )}
            <p className="status">
              <span>Status:</span>
              {handleRenderStatus(schedule.status)}
              <div
                className={`status-circle ${handleStatusColor(
                  schedule.status
                )}`}
              />
            </p>
            {schedule.proposed_date && (
              <p className="proposed-date">
                <span>Data Proposta:</span>
                <span>{formatDate(schedule.proposed_date)}</span>
              </p>
            )}
            {schedule.time_limit && (
              <p className="limit-date">
                <span>Data Limite:</span>
                {formatDate(new Date(schedule.time_limit))}
              </p>
            )}
            {schedule.invites && (
              <div className="guests">
                <p>Convidados:</p>
                <div className="guests-list">
                  {schedule.invites.map((invite, index) => (
                    <div className="guest-item" key={index}>
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
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="buttons">
            <Button
              onClick={() => {
                getOldConversation(schedule.id);
              }}
              width="full"
            >
              <p>Ver conversa no chat</p>
            </Button>
            <Button onClick={() => cancelSchedule(schedule.id)} width="full">
              <p>Cancelar reunião</p>
            </Button>
          </div>
          <p className="id">ID: {schedule.id}</p>
        </div>
      </div>
    </ModalStyled>
  );
};
