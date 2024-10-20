import { Icon } from '../../../components/Icon';
import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';
import { Modal } from '../../../components/Modal';
import { formatDate } from '../../../Utils/FormatDate';

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
  return (
    <div
      className={slideMenuOpen ? 'div-cover-open' : 'div-cover-closed'}
      onClick={() => setSlideMenuOpen(!slideMenuOpen)}
    >
      <div
        className={
          slideMenuOpen ? 'slide-bar-menu-open' : 'slide-bar-menu-closed'
        }
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={'slide-bar-div-button'}
          onClick={() => setSlideMenuOpen(!slideMenuOpen)}
        >
          {schedules && (
            <div className="schedules-counter">
              <p>{schedules.data.length}</p>
            </div>
          )}
          <Icon icon="sidebarSimple" size={32} weight="regular" color="#0A0A15" />
        </div>
        <div className="sideBar-content">
          <Button
            width="full"
            onClick={() => {
              setSlideMenuOpen(false);
              setConversation([]);
              setCurrentSchedule(null);
            }}
          >
            <Icon icon="plus" size={24}></Icon> <p>Novo chat</p>
          </Button>
          <div className="host-div">
            {schedules && <p className="bold-card">Anfitrião</p>}
            <div className="host-cards">
              {schedules &&
                schedules.data.map(
                  (schedule) =>
                    schedule.is_host && (
                      <div key={schedule.id}>
                        <Card
                          Display={slideMenuOpen ? 'Flex' : 'none'}
                          key={String(schedule.id)}
                          status={schedule.status}
                          title={schedule.title}
                          proposed_date={
                            schedule.proposed_date
                              ? typeof schedule.proposed_date === 'object'
                                ? formatDate(schedule.proposed_date.proposed_date)
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
                )}
            </div>
          </div>
          <div className="guest-div">
            {schedules && <p className="bold-card">Convidado</p>}
            <div className="guest-cards">
              {schedules &&
                schedules.data.map(
                  (schedule) =>
                    !schedule.is_host && (
                      <div key={schedule.id}>
                        <Card
                          Display={slideMenuOpen ? 'Flex' : 'none'}
                          key={String(schedule.id)}
                          status={schedule.status}
                          title={schedule.title}
                          proposed_date={
                            schedule.proposed_date
                              ? typeof schedule.proposed_date === 'object'
                                ? formatDate(schedule.proposed_date.proposed_date)
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
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};