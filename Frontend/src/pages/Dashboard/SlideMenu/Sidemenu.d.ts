interface SideMenuProps {
  slideMenuOpen: boolean;
  setSlideMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  schedules: ScheduleResponse | null;
  openModal: (schedule_id: string) => void;
  closeModal: () => void;
  activeModalId: string | null;
  setSchedules: React.Dispatch<React.SetStateAction<ScheduleResponse | null>>;
  setCurrentSchedule: React.Dispatch<
    React.SetStateAction<ScheduleCreateResponse | null>
  >;
  setConversation: React.Dispatch<React.SetStateAction<ConversationMessage[]>>;
  setActiveModalId: React.Dispatch<React.SetStateAction<string | null>>;
  addSnackbar: (
    message: string,
    variant: 'success' | 'error' | 'info' | 'warning'
  ) => void;
}
