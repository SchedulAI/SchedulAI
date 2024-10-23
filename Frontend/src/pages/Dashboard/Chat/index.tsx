import { Icon } from '../../../components/Icon';
import { Dot } from '../StyleDashboard';
import { ChatInput } from './ChatInput';
import { useUser } from '../../../hooks/userHooks';

export const Chat: React.FC<ChatProps> = ({
  conversation,
  message,
  setMessage,
  setSendingMessage,
  handleSendMessage,
  loadingMessage,
  chatEndRef,
  handleMarkdown,
  schedule,
}) => {
  const u = useUser();
  return (
    <div className="chat-content">
      <div className="chat">
        {conversation.length === 0 ? (
          <h2>O que gostaria de agendar hoje?</h2>
        ) : (
          <div className="chat-conversation">
            <div className="div-global-chat">
              {conversation.map((msg, index) => (
                <div key={index} className={`message ${msg.sender}`}>
                  {msg.sender === 'ia' && (
                    <div className="icon-ia">
                      <Icon
                        size={32}
                        icon="robot"
                        weight="fill"
                        color="#0a0a15"
                      />
                    </div>
                  )}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: handleMarkdown.makeHtml(msg.message),
                    }}
                  ></div>
                </div>
              ))}
              {loadingMessage && (
                <div className="typing">
                  Digitando algo <Dot>.</Dot>
                  <Dot>.</Dot>
                  <Dot>.</Dot>
                </div>
              )}
            </div>
            <div ref={chatEndRef} />
          </div>
        )}
        <ChatInput
          message={message}
          setMessage={setMessage}
          setSendingMessage={setSendingMessage}
          handleSendMessage={handleSendMessage}
          loadingMessage={loadingMessage}
          placeholder={
            schedule?.data.status === 'planning'
              ? 'Mensagem SchedulAI'
              : schedule?.data.status === 'pending'
              ? 'Aguarde a resposta dos convidados para continuar'
              : schedule?.data.status === 'reviewing'
              ? 'Revise o seu agendamento'
              : schedule?.data.status === 'scheduled'
              ? 'Agendamento realizado'
              : 'O que posso agendar para você hoje ?'
          }
          disabled={
            schedule?.data.is_host
              ? schedule.data.status === 'pending' ||
                schedule.data.status === 'scheduled'
              : schedule?.data.status === 'planning' ||
                schedule?.data.status === 'reviewing' ||
                schedule?.data.status === 'scheduled' ||
                (schedule?.data.invites ?? []).find(
                  (invite) =>
                    invite.user_id === u.user?.id && invite.status !== 'pending'
                ) !== undefined
          }
        />
      </div>
    </div>
  );
};
