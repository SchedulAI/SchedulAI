interface ChatProps {
  conversation: ConversationMessage[];
  message: string | null;
  setMessage: React.Dispatch<React.SetStateAction<string | null>>;
  setSendingMessage: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: () => Promise<void>;
  loadingMessage: boolean;
  chatEndRef: React.RefObject<HTMLDivElement>;
  handleMarkdown: showdown.Converter;
}
