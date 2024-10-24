/*

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
  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (!loadingMessage) {
        handleSendMessage();
      }
    }
  };

  return (
    <div className={`chat-input ${disabled ? 'disabled' : ''}`}>
      <textarea
        rows={1}
        placeholder={placeholder}
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

*/

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
  const [textareaHeight, setTextareaHeight] = useState<number>(20); // altura inicial
  const textareaRef = useRef<HTMLTextAreaElement>(null); // referência para o textarea

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

    // Redefine a altura do textarea com base no conteúdo
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Resetar a altura
      const newHeight = Math.min(textareaRef.current.scrollHeight, 72); // 72px é a altura máxima (3 linhas)
      setTextareaHeight(newHeight);
      textareaRef.current.style.height = `${newHeight}px`;
    }
  };

  // Define a altura inicial do textarea ao carregar
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
        style={{ height: textareaHeight, overflowY: 'hidden', resize: 'none' }} // estilo inline
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
