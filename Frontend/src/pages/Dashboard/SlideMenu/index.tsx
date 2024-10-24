import { Icon } from '../../../components/Icon';
import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';
import { Modal } from '../../../components/Modal';
import { formatDate } from '../../../Utils/FormatDate';
import { SideMenuStyled } from './style';
import { useState } from 'react';
import { compareStatus } from '../../../Utils/sortSchedules';
import apiUrl from '../../../config/api';

export const SideMenu: React.FC<SideMenuProps> = ({
  slideMenuOpen,
  setSlideMenuOpen,
  schedules,
  openModal,
  closeModal,
  activeModalId,
  setSchedules,
  setCurrentSchedule,
  setConversation,
  setActiveModalId,
  addSnackbar,
}) => {
  const [rotate, setRotate] = useState(false);

  const getSchedules = async () => {
    setRotate(true);
    try {
      const response = await fetch(apiUrl('/schedule'), {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
        credentials: 'include',
      });
      const schedules: ScheduleResponse = await response.json();
      setRotate(false);
      if (!schedules.success) {
        addSnackbar(schedules.message, 'error');
      }
      if (schedules.success) {
        schedules.data.sort(compareStatus);
        setSchedules(schedules);
      }
      if (schedules.success && schedules.data.length === 0) {
        return;
      }
    } catch (error) {
      console.error(error);
      setRotate(false);
    }
  };

  return (
    <SideMenuStyled className={slideMenuOpen ? 'div-cover-open' : ''}>
      <div className="slidemenu-header">
        <div
          className={'slide-bar-div-button'}
          onClick={() => setSlideMenuOpen(!slideMenuOpen)}
        >
          {schedules &&
            schedules.data.some(
              (schedule) => schedule.status !== 'deleted'
            ) && (
              <div className="schedules-counter">
                <p>
                  {
                    schedules.data.filter(
                      (schedule) => schedule.status !== 'deleted'
                    ).length
                  }
                </p>
              </div>
            )}
          <Icon
            icon="sidebarSimple"
            size={32}
            weight="regular"
            color="#0A0A15"
          />
        </div>
        <div
          className={`refresh-div ${!slideMenuOpen ? 'hidden' : ''} ${
            rotate ? 'rotate' : ''
          }`}
          onClick={() => {
            getSchedules();
            setSlideMenuOpen(true);
          }}
        >
          <Icon icon="refresh" size={32} color="#0A0A15"></Icon>
        </div>
      </div>
      <div
        className={`slide-bar-menu
          ${slideMenuOpen ? 'slide-bar-menu-open' : 'slide-bar-menu-close'}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sideBar-content">
          <Button
            width="full"
            onClick={() => {
              setSlideMenuOpen(false);
              setConversation([]);
              setCurrentSchedule(null);
            }}
          >
            <Icon icon="plus" size={24} color="#f8f8fc"></Icon> <p>Novo chat</p>
          </Button>
          <div className="host-div">
            <p className="bold-card">Reuniões como anfitrião</p>
            <div className="host-cards">
              {schedules &&
              schedules.data.some(
                (schedule) => schedule.status !== 'deleted' && schedule.is_host
              ) ? (
                schedules.data.map(
                  (schedule) =>
                    schedule.is_host &&
                    schedule.status !== 'deleted' && (
                      <div key={schedule.id}>
                        <Card
                          visibility={slideMenuOpen}
                          key={String(schedule.id)}
                          status={schedule.status}
                          title={schedule.title}
                          proposed_date={
                            schedule.proposed_date
                              ? typeof schedule.proposed_date === 'object'
                                ? formatDate(
                                    schedule.proposed_date.proposed_date
                                  )
                                : formatDate(schedule.proposed_date)
                              : 'A definir'
                          }
                          onClick={() => openModal(schedule.id)}
                        />
                        {activeModalId === schedule.id && (
                          <Modal
                            onClick={closeModal}
                            schedule={schedule}
                            addSnackbar={addSnackbar}
                            setSchedules={setSchedules}
                            schedules={schedules}
                            setCurrentSchedule={setCurrentSchedule}
                            setConversation={setConversation}
                            setActiveModalId={setActiveModalId}
                            setSlideMenuOpen={setSlideMenuOpen}
                          />
                        )}
                      </div>
                    )
                )
              ) : (
                <p>Não há reuniões marcadas</p>
              )}
            </div>
          </div>
          <div className="guest-div">
            <p className="bold-card">Reuniões como convidado</p>
            <div className="guest-cards">
              {schedules &&
              schedules.data.some(
                (schedule: any) =>
                  schedule.status !== 'deleted' && !schedule.is_host
              ) ? (
                schedules.data.map(
                  (schedule: any) =>
                    !schedule.is_host &&
                    schedule.status !== 'deleted' && (
                      <div key={schedule.id}>
                        <Card
                          visibility={slideMenuOpen}
                          key={String(schedule.id)}
                          status={schedule.status}
                          title={schedule.title}
                          proposed_date={
                            schedule.proposed_date
                              ? typeof schedule.proposed_date === 'object'
                                ? formatDate(
                                    schedule.proposed_date.proposed_date
                                  )
                                : formatDate(schedule.proposed_date)
                              : 'A definir'
                          }
                          onClick={() => openModal(schedule.id)}
                        />
                        {activeModalId === schedule.id && (
                          <Modal
                            onClick={closeModal}
                            schedule={schedule}
                            setSchedules={setSchedules}
                            schedules={schedules}
                            setCurrentSchedule={setCurrentSchedule}
                            setConversation={setConversation}
                            setActiveModalId={setActiveModalId}
                            setSlideMenuOpen={setSlideMenuOpen}
                            addSnackbar={addSnackbar}
                          />
                        )}
                      </div>
                    )
                )
              ) : (
                <p>Não há reuniões marcadas</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </SideMenuStyled>
  );
};
