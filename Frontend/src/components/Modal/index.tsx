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
import { useRef, useState, useEffect } from 'react';
import { copyLinkToClipboard } from '../../Utils/CopyLink';

export const Modal = ({
  onClick,
  schedule,
  setSchedules,
  setConversation,
  setActiveModalId,
  setCurrentSchedule,
  setSlideMenuOpen,
  schedules,
  addSnackbar,
}: Props) => {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const detailsNotCreatedRef = useRef<HTMLDetailsElement>(null);
  const [openDetails, setOpenDetails] = useState<string | null>(null);
  const [buttonText, setButtonText] = useState('Copiar link');
  const [isConfirming, setIsConfirming] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleReviewChange = (id: string) => {
    if (isConfirming) {
      setIsConfirmed(true);
      reviewSchedule(id).then(() => setIsConfirmed(false));
    } else {
      setIsConfirming(true);
      setTimeout(() => {
        setIsConfirming(false);
      }, 2000);
    }
  };

  const reviewSchedule = async (id: string) => {
    try {
      const response = await fetch(apiUrl(`/schedule/${id}/review`), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const reviewSchedule: ScheduleCreateResponse = await response.json();

      if (schedules) {
        setSchedules({
          ...schedules,
          data: schedules.data.map((schedule) =>
            schedule.id === reviewSchedule.data.id
              ? { ...schedule, status: reviewSchedule.data.status }
              : schedule
          ),
        });
      }

      await getOldConversation(id);
    } catch (error) {
      addSnackbar((error as Error).message, 'error');
    }
  };

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
      addSnackbar((error as Error).message, 'error');
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
      if (data) {
        setConversation(
          data.map((msg) => ({
            sender: msg.sender === 'user' ? 'user' : 'ia',
            message: msg.message,
          }))
        );
      }
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
      addSnackbar((error as Error).message, 'error');
    }
  };

  const handleCopyLinkText = async () => {
    setButtonText('Link copiado !');
    setTimeout(() => {
      setButtonText('Copiar link');
    }, 2000);
  };

  useEffect(() => {
    const detailsElement = detailsRef.current;
    if (detailsElement) {
      const handleToggle = () => {
        if (detailsElement.open) {
          setOpenDetails('created');
        } else {
          setOpenDetails(null);
        }
      };
      detailsElement.addEventListener('toggle', handleToggle);
      return () => {
        detailsElement.removeEventListener('toggle', handleToggle);
      };
    }
  }, []);

  useEffect(() => {
    const detailsElement = detailsNotCreatedRef.current;
    if (detailsElement) {
      const handleToggle = () => {
        if (detailsElement.open) {
          setOpenDetails('notCreated');
        } else {
          setOpenDetails(null);
        }
      };
      detailsElement.addEventListener('toggle', handleToggle);
      return () => {
        detailsElement.removeEventListener('toggle', handleToggle);
      };
    }
  }, []);

  useEffect(() => {
    if (openDetails === 'created' && detailsNotCreatedRef.current?.open) {
      detailsNotCreatedRef.current.open = false;
    }
    if (openDetails === 'notCreated' && detailsRef.current?.open) {
      detailsRef.current.open = false;
    }
  }, [openDetails]);

  return (
    <ModalStyled onClick={onClick} key={schedule.id}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="header">
          <p>{schedule.title}</p>
          <div onClick={onClick} className="close-button">
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
            {schedule.host_name && schedule.status !== 'cancelled' && (
              <p className="host-name">
                <span>Criado por:</span>
                <span>{schedule.host_name}</span>
              </p>
            )}
            {schedule.proposed_date && schedule.status !== 'cancelled' ? (
              <p className="proposed-date">
                <span>Data Proposta:</span>
                <span>
                  {typeof schedule.proposed_date === 'string'
                    ? formatDate(schedule.proposed_date)
                    : formatDate(schedule.proposed_date.proposed_date)}
                </span>
              </p>
            ) : (
              <p className="proposed-date">
                <span>Data:</span>
                <span>A definir</span>
              </p>
            )}

            {schedule.invites &&
              schedule.invites.length > 0 &&
              schedule.status !== 'cancelled' && (
                <div className="details">
                  <details ref={detailsRef} className="guests">
                    <summary className="summary">
                      <p className="status">
                        <span>Status:</span>
                        {handleRenderStatus(schedule.status)}
                      </p>
                      <div
                        className={`status-circle ${handleStatusColor(
                          schedule.status
                        )}`}
                      />
                      <div className="icon-summary">
                        <Icon
                          icon={
                            openDetails === 'created' ? 'arrowUp' : 'arrowDown'
                          }
                        ></Icon>
                      </div>
                    </summary>
                    <div className="guest-section">
                      <p>Convidados:</p>
                      <div className="guests-list">
                        {schedule.invites.map((invite, index) => (
                          <div className="guest-item" key={index}>
                            <div className="guest-status-item">
                              <p>{invite.guest_name}</p>
                              <div className="status-guest">
                                <p>{handleInviteStatus(invite.status)}</p>
                                <div
                                  className={`status-circle ${handleRenderInviteStatus(
                                    invite.status
                                  )}`}
                                ></div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </details>
                  {schedule && schedule.peding_account && (
                    <details className="guests" ref={detailsNotCreatedRef}>
                      <summary className="summary">
                        <p className="status">Aguardando criação de conta</p>
                        <div className="icon-summary">
                          <Icon
                            icon={
                              openDetails === 'notCreated'
                                ? 'arrowUp'
                                : 'arrowDown'
                            }
                          ></Icon>
                        </div>
                      </summary>
                      <div className="not-created-accounts-div">
                        {schedule.peding_account.map((info) => (
                          <p>{info}</p>
                        ))}
                      </div>
                    </details>
                  )}
                </div>
              )}
          </div>

          {schedule && (
            <div className="buttons">
              {schedule.status !== 'cancelled' && (
                <>
                  <Button
                    onClick={() => {
                      getOldConversation(schedule.id);
                      setSlideMenuOpen(false);
                    }}
                    width="full"
                  >
                    <p>Ver conversa no chat</p>
                  </Button>
                  <div className="button-sides">
                    {schedule.status !== 'reviewing' && schedule.is_host && (
                      <div className="button-sides-1">
                        <Button
                          width="full"
                          onClick={() => {
                            handleReviewChange(schedule.id);
                          }}
                          disabled={isConfirmed}
                        >
                          <p>
                            {isConfirmed
                              ? 'Confirmado!'
                              : isConfirming
                              ? 'Tem certeza?'
                              : 'Revisar'}
                          </p>
                        </Button>
                      </div>
                    )}

                    <div className="button-sides-2">
                      <Button
                        width="full"
                        onClick={() => {
                          copyLinkToClipboard(schedule.id);
                          handleCopyLinkText();
                        }}
                      >
                        <p>{buttonText}</p>
                      </Button>
                    </div>
                  </div>
                </>
              )}
              {schedule && schedule.is_host && (
                <div className="cancel-button">
                  <Button
                    onClick={() => cancelSchedule(schedule.id)}
                    width="full"
                  >
                    <p>
                      {schedule.status === 'cancelled'
                        ? 'Excluir reunião'
                        : 'Cancelar reunião'}
                    </p>
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </ModalStyled>
  );
};
