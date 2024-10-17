import { Icon } from '../Icon';
import { Button } from '../Button';
import apiUrl from '../../config/api';
import { ModalStyled } from './ModalStyled';
import { formatDate } from '../../Utils/FormatDate';
import {
  handleRenderStatus,
  handleStatusColor,
  handleInviteStatus,
  handleRenderInviteStatus,
} from '../../Utils/HandleStatus';

export const Modal = ({
  onClick,
  schedule,
  setSchedules,
  setConversation,
  setActiveModalId,
  setCurrentSchedule,
  setSlideMenuOpen,
  schedules,
}: Props) => {
  const cancelSchedule = async (id: string) => {
    try {
      const response = await fetch(apiUrl(`/schedule/${id}/cancel/`), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const canceledSchedule: ScheduleCreateResponse = await response.json();

      if (schedules) {
        setSchedules({
          ...schedules,
          data: schedules.data.map((schedule) =>
            schedule.id === canceledSchedule.data.id
              ? { ...schedule, status: canceledSchedule.data.status }
              : schedule
          ),
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getOldConversation = async (id: string): Promise<void> => {
    try {
      const result = await fetch(apiUrl(`/dialog/messages/${id}`), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (!result.ok) {
        setConversation([]);
        setActiveModalId(null);
      }
      const data: ConversationMessage[] = await result.json();
      setConversation(
        data.map((msg) => ({
          sender: msg.sender === 'user' ? 'user' : 'ia',
          message: msg.message,
        }))
      );
      if (schedules) {
        const foundSchedule = schedules.data.find(
          (schedule) => schedule.id === id
        );
        if (foundSchedule) {
          setCurrentSchedule({
            data: foundSchedule,
            message: 'Operação realizada com sucesso',
            success: true,
          });
        }
      }
      setActiveModalId(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ModalStyled onClick={onClick} key={schedule.id}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="header">
          <p>{schedule.title}</p>
          <div onClick={onClick} className='close-button'>
            <Icon icon="x" size={24} weight="bold" />
          </div>
        </div>
        <div className="content">
          <div className="info">
            {schedule.description && schedule.status !== 'cancelled' && (
              <p className="description">
                <span>Descrição:</span>
                <span>{schedule.description}</span>
              </p>
            )}
            <div className="div-status">
              <p className="status">
                <span>Status:</span>
                {handleRenderStatus(schedule.status)}
              </p>
              <div
                className={`status-circle ${handleStatusColor(
                  schedule.status
                )}`}
              />
            </div>
            {schedule.proposed_date && schedule.status !== 'cancelled' && (
              <p className="proposed-date">
                <span>Data Proposta:</span>
                <span>
                  {typeof schedule.proposed_date === 'string'
                    ? formatDate(schedule.proposed_date)
                    : formatDate(schedule.proposed_date.proposed_date)}
                </span>
              </p>
            )}
            {schedule.expiry_time && schedule.status !== 'cancelled' && (
              <p className="limit-date">
                <span>Data Limite:</span>
                {formatDate(new Date(schedule.expiry_time))}
              </p>
            )}
            {schedule.invites &&
              schedule.invites.length > 0 &&
              schedule.status !== 'cancelled' && (
                <div className="guests">
                  <p>Convidados:</p>
                  <div className="guests-list">
                    {schedule.invites.map((invite, index) => (
                      <div className="guest-item" key={index}>
                        <p>{invite.guest_name}</p>
                        <div className="status">
                          <p>{handleInviteStatus(invite.status)}</p>
                          <div
                            className={`status-circle ${handleRenderInviteStatus(
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

          {schedule && schedule.status !== 'cancelled' && (
            <div className="buttons">
              <Button
                onClick={() => {
                  getOldConversation(schedule.id);
                  setSlideMenuOpen(false);
                }}
                width="full"
              >
                <p>Ver conversa no chat</p>
              </Button>
              <Button onClick={() => cancelSchedule(schedule.id)} width="full">
                <p>Cancelar reunião</p>
              </Button>
            </div>
          )}

          <p className="id">ID: {schedule.id}</p>
        </div>
      </div>
    </ModalStyled>
  );
};
