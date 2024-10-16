interface SnackbarProps {
  anchororigin: {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  };
  variant: 'success' | 'error';
  message: string;
}
