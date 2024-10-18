interface SnackbarContainerProps {
  anchororigin: { vertical: 'top' | 'bottom'; horizontal: 'left' | 'right' };
  visible: boolean;
}

interface SnackbarProps {
  anchororigin: { vertical: 'top' | 'bottom'; horizontal: 'left' | 'right' };
  variant: 'success' | 'error' | 'info' | 'warning';
  message: string;
  onClose: () => void;
}
