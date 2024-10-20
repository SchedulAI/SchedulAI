interface ChatInputProps {
  message: string | null;
  setMessage: React.Dispatch<React.SetStateAction<string | null>>;
  setSendingMessage: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: () => Promise<void>;
  loadingMessage: boolean;
}
