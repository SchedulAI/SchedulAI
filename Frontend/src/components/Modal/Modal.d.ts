interface Props {
  onClick: () => void;
  schedule: Schedule;
  setConversation: React.Dispatch<React.SetStateAction<ConversationMessage[]>>;
  setActiveModalId: React.Dispatch<React.SetStateAction<string | null>>;
  setSchedules: React.Dispatch<React.SetStateAction<ScheduleResponse | null>>;
  setCurrentSchedule: React.Dispatch<
    React.SetStateAction<ScheduleCreateResponse | null>
  >;
  setSlideMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  schedules: ScheduleResponse | null;
}
