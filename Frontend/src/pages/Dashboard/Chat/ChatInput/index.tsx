import React, { useEffect, useRef, useState } from 'react';
import { Icon } from '../../../../components/Icon';

export const ChatInput: React.FC<ChatInputProps> = ({
  message,
  setMessage,
  setSendingMessage,
  handleSendMessage,
  loadingMessage,
  disabled,
  placeholder,
}) => {
  const [textareaHeight, setTextareaHeight] = useState<number>(20);
  const textareaRef = useRef<HTMLTextAreaElement>(null); 

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (!loadingMessage) {
        handleSendMessage();
      }
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    setSendingMessage(e.target.value);

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const newHeight = Math.min(textareaRef.current.scrollHeight, 72);
      setTextareaHeight(newHeight);
      textareaRef.current.style.height = `${newHeight}px`;
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = `${textareaHeight}px`;
    }
  }, [textareaHeight]);

  return (
    <div className={`chat-input ${disabled ? 'disabled' : ''}`}>
      <textarea
        ref={textareaRef}
        rows={1}
        placeholder={placeholder}
        value={message || ''}
        onChange={handleInput}
        onKeyDown={handleKeyPress}
        disabled={disabled}
        style={{ height: textareaHeight, overflowY: 'hidden', resize: 'none' }}
      />
      <button onClick={handleSendMessage} disabled={!message || loadingMessage}>
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
