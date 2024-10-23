import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/userHooks';
import apiUrl from '../../config/api';
import { deleteCookie, getCookie } from '../../Utils/Cookies';
import { compareStatus } from '../../Utils/sortSchedules';
import showdown from 'showdown';
import { StyledDashboard } from './style';
import { Button } from '../../components/Button';
import SnackbarContainer from '../../components/Snackbar/SnackbarContainer';
import { SideMenu } from './SlideMenu/';
import { Chat } from './Chat';

export const Dashboard = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [sendingMessage, setSendingMessage] = useState<string>('');
  const [conversation, setConversation] = useState<ConversationMessage[]>([]);
  const [currentSchedule, setCurrentSchedule] =
    useState<ScheduleCreateResponse | null>(null);
  const [schedules, setSchedules] = useState<ScheduleResponse | null>(null);
  const [slideMenuOpen, setSlideMenuOpen] = useState(() => {
    return localStorage.getItem('preferenced') === 'true';
  });
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [activeModalId, setActiveModalId] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState(false);
  const [containerVisible, setContainerVisible] = useState(true);

  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleMarkdown = new showdown.Converter();

  const addSnackbar = (
    message: string,
    variant: 'success' | 'error' | 'info' | 'warning'
  ) => {
    const event = new CustomEvent('addSnackbar', {
      detail: {
        id: Date.now(),
        message,
        variant,
        anchororigin: { vertical: 'bottom', horizontal: 'right' },
      },
    });
    window.dispatchEvent(event);
    setContainerVisible(true);
  };

  const openModal = (schedule_id: string) => {
    setActiveModalId(schedule_id);
  };

  const closeModal = () => {
    setActiveModalId(null);
  };

  const handleSendMessage = async () => {
    if (!message) return;

    const schedule = currentSchedule || (await createSchedule());

    setConversation((prevConversation) => [
      ...prevConversation,
      { sender: 'user', message: message! },
    ]);

    if (schedule) {
      await sendMessageToAi(sendingMessage, schedule.data.id);
    }
  };

  const sendMessageToAi = async (message: string, schedule_id: string) => {
    setMessage('');
    try {
      setLoadingMessage(true);
      const data = await fetch(apiUrl('/chat/'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          message: message,
          schedule_id: schedule_id,
        }),
      });

      const res = await data.json();
      if (!data.ok) {
        addSnackbar(res.message, 'error');
        setLoadingMessage(false);
        return;
      }
      const iaResponse = res.data;
      setSendingMessage('');
      setConversation((prevConversation) => [
        ...prevConversation,
        { sender: 'ia', message: iaResponse },
      ]);
      if (res.schedule && schedules) {
        const updatedSchedules = schedules.data.map((schedule) =>
          schedule.id === schedule_id ? res.schedule : schedule
        );

        setSchedules({
          ...schedules,
          data: updatedSchedules,
        });
      }
      setLoadingMessage(false);
    } catch (error) {
      addSnackbar((error as Error).message, 'error');
      setLoadingMessage(false);
    }
  };

  const createSchedule = async () => {
    try {
      const data = await fetch(apiUrl('/schedule/'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          title: 'Nova reunião',
        }),
      });

      const res: ScheduleCreateResponse = await data.json();
      if (!res.success) {
        addSnackbar(res.message, 'error');
        return null;
      }
      setCurrentSchedule(res);
      await getSchedules();
      return res;
    } catch (error) {
      addSnackbar((error as Error).message, 'error');
    }
  };

  const logout = async () => {
    try {
      await fetch(apiUrl('/logout'), {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      setUser(null);
      navigate('/');
    } catch (error) {
      addSnackbar((error as Error).message, 'error');
    }
  };

  const getSchedules = async () => {
    try {
      const response = await fetch(apiUrl('/schedule'), {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
        credentials: 'include',
      });
      const schedules: ScheduleResponse = await response.json();
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
      addSnackbar((error as Error).message, 'error');
    }
  };

  const getInviteConversation = async (): Promise<void> => {
    const id = getCookie('schedule_id');
    deleteCookie('schedule_id');
    if (id) {
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
        }
        const data: ConversationMessage[] = await result.json();
        if (data) {
          setConversation(
            data.map((msg) => ({
              sender: msg.sender === 'user' ? 'user' : 'ia',
              message: msg.message.data.content,
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
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversation]);

  useEffect(() => {
    getSchedules();
  }, []);

  useEffect(() => {
    const isFirstLogin = getCookie('isFirstLogin');
    deleteCookie('isFirstLogin');

    if (isFirstLogin) {
      setSlideMenuOpen(true);
    }
  }, []);

  useEffect(() => {
    getInviteConversation();
  }, []);

  useEffect(() => {
    if (slideMenuOpen) {
      localStorage.setItem('preferenced', 'true');
    } else {
      localStorage.setItem('preferenced', 'false');
    }
  }, [slideMenuOpen]);

  return (
    <StyledDashboard slidemenuopen={slideMenuOpen ? 'true' : undefined}>
      {/* <div className="logo">
        <Button
          onClick={() => {
            logout();
            deleteCookie('logged_in');
          }}
        >
          <p>Sair</p>
        </Button>
      </div> */}
      <SideMenu
        slideMenuOpen={slideMenuOpen}
        setSlideMenuOpen={setSlideMenuOpen}
        schedules={schedules}
        openModal={openModal}
        closeModal={closeModal}
        activeModalId={activeModalId}
        setSchedules={setSchedules}
        setCurrentSchedule={setCurrentSchedule}
        setConversation={setConversation}
        setActiveModalId={setActiveModalId}
        addSnackbar={addSnackbar}
      />
      <Chat
        conversation={conversation}
        message={message}
        setMessage={setMessage}
        setSendingMessage={setSendingMessage}
        handleSendMessage={handleSendMessage}
        loadingMessage={loadingMessage}
        chatEndRef={chatEndRef}
        handleMarkdown={handleMarkdown}
        schedule={currentSchedule}
      />
      <SnackbarContainer
        anchororigin={{ vertical: 'bottom', horizontal: 'right' }}
        visible={containerVisible}
      />
    </StyledDashboard>
  );
};
