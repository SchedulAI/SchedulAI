import { Icon } from '../../../components/Icon';
import { Dot } from '../StyleDashboard';
import { ChatInput } from './ChatInput';

export const Chat: React.FC<ChatProps> = ({
  conversation,
  message,
  setMessage,
  setSendingMessage,
  handleSendMessage,
  loadingMessage,
  chatEndRef,
  handleMarkdown,
}) => {
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
        />
      </div>
    </div>
  );
};
