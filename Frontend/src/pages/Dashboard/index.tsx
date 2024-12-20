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
import { Icon } from "../../components/Icon";

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

  const currentScheduleRef = useRef(currentSchedule);

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
    setConversation((prevConversation) => [
      ...prevConversation,
      { sender: 'user', message: sendingMessage! },
    ]);
    setMessage('');

    const schedule = currentSchedule || (await createSchedule());

    if (schedule) {
      await sendMessageToAi(sendingMessage, schedule.data.id);
    }
  };

  const sendMessageToAi = async (message: string, schedule_id: string) => {
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
        const scheduleExists = schedules.data.some(
          (schedule) => schedule.id === schedule_id
        );

        const updatedSchedules = scheduleExists
          ? schedules.data.map((schedule) =>
              schedule.id === schedule_id
                ? { ...schedule, ...res.schedule }
                : schedule
            )
          : [...schedules.data, res.schedule];
        schedules.data.sort(compareStatus);
        setSchedules({
          ...schedules,
          data: updatedSchedules,
        });
        setCurrentSchedule({
          data: res.schedule,
          success: true,
          message: 'Agenda atualizada com sucesso!',
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
        return;
      }
      if (schedules.success) {
        schedules.data.sort(compareStatus);
        setSchedules(schedules);
        if (currentSchedule) {
          setCurrentSchedule(
            schedules.data.find(
              (schedule) => schedule.id === currentSchedule.data.id
            )
              ? {
                  data: schedules.data.find(
                    (schedule) => schedule.id === currentSchedule.data.id
                  )!,
                  success: true,
                  message: 'Schedule found',
                }
              : null
          );
        }
      }
      if (schedules.success && schedules.data.length === 0) {
        return;
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
    } catch (error) {
      addSnackbar((error as Error).message, 'error');
    }
  };

  const scheduleLongPolling = async () => {
    try {
      const response = await fetch(apiUrl('/schedule/longpolling'), {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
        credentials: 'include',
      });
      const schedules: ScheduleResponse = await response.json();
      if (response.status === 404) {
        setSchedules(null);
      }
      if (!response.ok) {
        setTimeout(scheduleLongPolling, 10000);
        return;
      }
      if (schedules.update) {
        setSchedules(schedules);
        scheduleLongPolling();
        if (currentScheduleRef.current) {
          getOldConversation(currentScheduleRef.current?.data.id);
          setCurrentSchedule(
            schedules.data.find(
              (schedule) => schedule.id === currentScheduleRef.current!.data.id
            )
              ? {
                  data: schedules.data.find(
                    (schedule) =>
                      schedule.id === currentScheduleRef.current!.data.id
                  )!,
                  success: true,
                  message: 'Schedule found',
                }
              : null
          );
        }
      }
      if (!schedules.update) {
        scheduleLongPolling();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getInviteConversation = async (): Promise<void> => {
    const id = getCookie('schedule_id');
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
    scheduleLongPolling();
  }, []);

  useEffect(() => {
    const isFirstLogin = getCookie('isFirstLogin');
    deleteCookie('isFirstLogin');

    if (isFirstLogin) {
      setSlideMenuOpen(true);
    }
  }, []);

  useEffect(() => {
    getSchedules();
  }, []);

  useEffect(() => {
    currentScheduleRef.current = currentSchedule;
  }, [currentSchedule]);

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
      <div className="logo">
        <Button
          onClick={() => {
            logout();
            deleteCookie('logged_in');
          }}
        >
          <Icon icon="signOut" size={18} color="#f8f8fc"  />
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
        currentSchedule={currentSchedule}
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
