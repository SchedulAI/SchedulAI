import { Icon } from '../../../../components/Icon';

export const ChatInput: React.FC<ChatInputProps> = ({
  message,
  setMessage,
  setSendingMessage,
  handleSendMessage,
  loadingMessage,
  disabled,
}) => {
  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (!loadingMessage) {
        handleSendMessage();
      }
    }
  };

  return (
    <div className="chat-input">
      <textarea
        placeholder="Mensagem SchedulAI"
        value={message ? message : ''}
        onChange={(e) => {
          setMessage(e.target.value);
          setSendingMessage(e.target.value);
        }}
        onKeyDown={handleKeyPress}
        disabled={disabled}
      />
      <button
        onClick={() => {
          handleSendMessage();
        }}
        disabled={!message || loadingMessage}
      >
        <Icon
          icon="circleArrowUp"
          size={32}
          weight="fill"
          color={message ? '#0a0a15' : '#0a0a1580'}
        />
      </button>
    </div>
  );
};
