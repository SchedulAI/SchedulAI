import { Icon } from '../Icon';
import { Button } from '../Button';
import apiUrl from '../../config/api';
import { ModalStyled } from './ModalStyled';

import {
  handleRenderStatus,
  handleStatusColor,
  handleInviteStatus,
  handleRenderInviteStatus,
} from '../../Utils/HandleStatus';
import { useRef, useState, useEffect } from 'react';
import { copyLinkToClipboard } from '../../Utils/CopyLink';
import { renderDateInfo } from '../../Utils/RenderDateInfo';
import { FormatTime } from '../../Utils/FormatTime';
import capitalizeFirstLetter from '../../Utils/capitalizeFirstLetter';

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
  currentSchedule,
}: Props) => {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const [openDetails, setOpenDetails] = useState<string | null>(null);
  const [buttonText, setButtonText] = useState('Copiar link');
  const [isConfirming, setIsConfirming] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalType, setModalType] = useState<Modal>(null);
  const [modalText, setModalText] = useState<string | null>(null);

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

      if (!reviewSchedule.success) {
        addSnackbar(reviewSchedule.message, 'error');
        return;
      }

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
      if (currentSchedule?.data.id === id) {
        setConversation([]);
      }
      if (!canceledSchedule.success) {
        addSnackbar(canceledSchedule.message, 'error');
        return;
      }

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

  const deleteSchedule = async (id: string) => {
    try {
      const response = await fetch(apiUrl(`/schedule/${id}/delete/`), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const deletedSchedule: ScheduleCreateResponse = await response.json();
      if (!deletedSchedule.success) {
        addSnackbar(deletedSchedule.message, 'error');
        return;
      }
      if (currentSchedule?.data.id === id) {
        setConversation([]);
        setCurrentSchedule(null);
      }
      setActiveModalId(null);
      if (schedules) {
        setSchedules({
          ...schedules,
          data: schedules.data.map((schedule) =>
            schedule.id === deletedSchedule.data.id
              ? { ...schedule, status: deletedSchedule.data.status }
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
        addSnackbar('Erro ao buscar conversa', 'error');
        return;
      }
      const data: GetConversation = await result.json();
      if (data) {
        setConversation(
          data.messages.map((msg) => ({
            sender: msg.sender === 'user' ? 'user' : 'ia',
            message: msg.message.data.content,
            messages: [
              {
                sender: msg.sender === 'user' ? 'user' : 'ia',
                message: msg.message.data.content,
              },
            ],
          }))
        );
      }
      setCurrentSchedule({
        data: data.schedule,
        message: 'Operação realizada com sucesso',
        success: true,
      });
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

  const handleDeleteClick = () => {
    setShowConfirmModal(true);
    setModalText('Se você deletar esse card, não será capaz de recuperá-lo.');
    setModalType('delete');
  };

  const handleConfirmDelete = () => {
    deleteSchedule(schedule.id);
    setShowConfirmModal(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
  };

  const handleCancelClick = () => {
    setShowConfirmModal(true);
    setModalText(
      'Se você cancelar esse card, não será capaz de reativá-lo e seus convidados não poderam mais agendar um horário.'
    );
    setModalType('cancel');
  };

  const handleConfirmCancel = () => {
    cancelSchedule(schedule.id);
    setShowConfirmModal(false);
  };

  return (
    <>
      {schedule.status !== 'deleted' && (
        <ModalStyled onClick={onClick} key={schedule.id}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="header">
              <div className='title-and-delete'>
                <p>{schedule.title}</p>
                {schedule && schedule.is_host && (
                  <div className="delete-event" onClick={handleDeleteClick}>
                    <Icon icon="exclude" size={24} />
                  </div>
                )}
              </div>
              <div onClick={onClick} className="close-button">
                <Icon icon="x" size={24} weight="bold" />
              </div>
            </div>
            <div className="content">
              <div className="detail-main-section">
                <div className="main-section">
                  <div className="info">
                    {schedule.status === 'cancelled' && (
                      <div className="status-cancelled">
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
                    )}
                    {schedule.description &&
                      schedule.status !== 'cancelled' && (
                        <p className="description">
                          <span>Descrição:</span>
                          <span>{schedule.description}</span>
                        </p>
                      )}
                    {schedule.host_name && schedule.status !== 'cancelled' && (
                      <p className="host-name">
                        <span>Criado por:</span>
                        <span>{capitalizeFirstLetter(schedule.host_name)}</span>
                      </p>
                    )}
                    {schedule.proposed_date &&
                    schedule.status !== 'cancelled' ? (
                      <p className="proposed-date">
                        <span>Data Proposta:</span>
                        <span>
                          {renderDateInfo(
                            schedule.status,
                            schedule.proposed_date
                          )?.toString()}
                        </span>
                      </p>
                    ) : schedule.status !== 'cancelled' ? (
                      <p className="proposed-date">
                        <span>Data:</span>
                        <span>Definindo</span>
                      </p>
                    ) : null}
                    {schedule.duration && schedule.status !== 'cancelled' && (
                      <p className="duration">
                        <span>Duração:</span>
                        <span>{FormatTime(schedule.duration)}</span>
                      </p>
                    )}
                  </div>
                  {schedule.status !== 'cancelled' && (
                    <div className="main-section-right">
                      <Button
                        onClick={() => {
                          getOldConversation(schedule.id);
                          setSlideMenuOpen(false);
                        }}
                        width="full"
                      >
                        <p>Ver conversa no chat</p>
                      </Button>
                      {schedule.is_host &&
                        schedule.status !== 'planning' &&
                        schedule.status !== 'scheduled' &&
                        schedule.status !== 'reviewing' && (
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
                        )}
                    </div>
                  )}
                </div>

                <div>
                  {schedule && schedule.status !== 'cancelled' && (
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
                                openDetails === 'created'
                                  ? 'arrowUp'
                                  : 'arrowDown'
                              }
                            ></Icon>
                          </div>
                        </summary>
                        <div className="main-detail-section">
                          <div className="guest-section">
                            {schedule &&
                              schedule.invites &&
                              schedule.invites.length > 0 && (
                                <>
                                  <p>Convidados:</p>
                                  <div className="table-list">
                                    <table>
                                      <thead>
                                        <tr>
                                          <th>Nome</th>
                                          <th>Status</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {schedule.invites?.map(
                                          (invite, index) => (
                                            <tr
                                              key={index}
                                              className="table-item"
                                            >
                                              <td className="table-status-item">
                                                {capitalizeFirstLetter(
                                                  invite.guest_name
                                                )}
                                              </td>
                                              <td className="table-status-guest">
                                                {handleInviteStatus(
                                                  invite.status
                                                )}
                                                <div
                                                  className={`status-circle ${handleRenderInviteStatus(
                                                    invite.status
                                                  )}`}
                                                ></div>
                                              </td>
                                            </tr>
                                          )
                                        )}
                                        {schedule &&
                                          (schedule.pending_account ?? [])
                                            .length > 0 &&
                                          schedule.is_host &&
                                          (schedule.pending_account ?? []).map(
                                            (info, index) => (
                                              <tr
                                                key={`pending-${index}`}
                                                className="table-item"
                                              >
                                                <td className="table-status-item">
                                                  {info}
                                                </td>
                                                <td className="table-status-guest">
                                                  <div className="div-status">
                                                    <span>
                                                      Aguardando criação de
                                                      conta
                                                    </span>
                                                    <div className="status-circle yellow"></div>
                                                  </div>
                                                </td>
                                              </tr>
                                            )
                                          )}
                                      </tbody>
                                    </table>
                                  </div>
                                </>
                              )}
                          </div>
                        </div>
                      </details>
                      {schedule.status === 'pending' &&
                        schedule.invites?.some(
                          (invite) => invite.status !== 'pending'
                        ) &&
                        schedule.is_host && (
                          <div className="div-info">
                            <p>
                              Atualmente você está aguardando os convidados
                              responderem, porém{' '}
                              {
                                schedule.invites?.filter(
                                  (invite) => invite.status === 'accepted'
                                ).length
                              }{' '}
                              {schedule.invites?.filter(
                                (invite) => invite.status === 'accepted'
                              ).length === 1
                                ? 'convidado'
                                : 'convidados'}{' '}
                              já{' '}
                              {schedule.invites?.filter(
                                (invite) => invite.status === 'accepted'
                              ).length === 1
                                ? 'aceitou'
                                : 'aceitaram'}{' '}
                              o convite, caso deseje dar continuidade na sua
                              reunião sem esperar a resposta dos outros
                              convidados, clique no botão "Continuar
                              agendamento".
                            </p>
                          </div>
                        )}
                    </div>
                  )}
                </div>
              </div>
              {schedule && (
                <div className="buttons">
                  {schedule.status !== 'cancelled' && (
                    <>
                      <div className="button-sides">
                        {schedule.status !== 'reviewing' &&
                          schedule.is_host &&
                          schedule.status !== 'scheduled' &&
                          schedule.status !== 'planning' &&
                          schedule.invites?.some(
                            (invite) => invite.status !== 'pending'
                          ) && (
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
                                    : 'Continuar agendamento'}
                                </p>
                              </Button>
                            </div>
                          )}
                      </div>
                    </>
                  )}
                  {schedule &&
                    schedule.is_host &&
                    schedule.status !== 'cancelled' && (
                      <div className="cancel-button">
                        <Button onClick={handleCancelClick} width="full">
                          <p>Cancelar Reunião</p>
                        </Button>
                      </div>
                    )}
                </div>
              )}
            </div>
          </div>
        </ModalStyled>
      )}

      {showConfirmModal && (
        <div className="confirm-modal" onClick={handleCancelDelete}>
          <div className="confirm-modal-content">
            <h1 className="modal-confirm-title">Atenção!</h1>
            <p>{modalText}</p>
            <div className="confirm-modal-buttons">
              <div className="button-yes">
                <Button
                  onClick={() => {
                    if (modalType === 'cancel') {
                      handleConfirmCancel();
                    } else {
                      handleConfirmDelete();
                    }
                  }}
                  width="full"
                >
                  <p>Sim</p>
                </Button>
              </div>
              <div className="button-no">
                <Button onClick={handleCancelDelete} width="full">
                  <p>Não</p>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
