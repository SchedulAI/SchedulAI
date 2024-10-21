import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/userHooks';
import apiUrl from '../../config/api';
import { deleteCookie, getCookie } from '../../Utils/Cookies';
import { compareStatus } from '../../Utils/sortSchedules';
import showdown from 'showdown';
import { StyledDashboard } from './StyleDashboard';
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
  const { setUser, user } = useUser();

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
    setLoadingMessage(true);
    setMessage('');
    const schedule = currentSchedule || (await createSchedule());
    setConversation((prevConversation) => [
      ...prevConversation,
      { sender: 'user', message: sendingMessage! },
    ]);
    if (schedule) {
      sendMessageToWebSocket(sendingMessage, schedule.data.id);
      setSendingMessage('');
    }
  };

  const sendMessageToWebSocket = (message: string, schedule_id: string) => {
    if (socket.current?.readyState === WebSocket.OPEN) {
      socket.current.send(JSON.stringify({ message, schedule_id }));
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
      deleteCookie('logged_in');
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

  const socket = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (user) {
      socket.current = new WebSocket(`ws://localhost:3000?userId=${user.id}`);

      socket.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setConversation((prevConversation) => [
          ...prevConversation,
          { sender: 'ia', message: data.message },
        ]);
        setLoadingMessage(false);
      };

      return () => {
        socket.current?.close();
      };
    }
  }, []);

  return (
    <StyledDashboard slidemenuopen={slideMenuOpen ? 'true' : undefined}>
      <div className="logo">
        <Button onClick={() => logout()}>
          <p>Sair</p>
        </Button>
      </div>
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
