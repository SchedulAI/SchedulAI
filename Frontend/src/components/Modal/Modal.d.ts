interface Props {
  onClick: () => void;
  schedule: Schedule;
  setOldConversation: React.Dispatch<React.SetStateAction<Message[]>>;
  setActiveModalId: React.Dispatch<React.SetStateAction<string | null>>;
}
