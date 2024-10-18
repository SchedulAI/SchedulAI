import React, { useState, useEffect } from 'react';
import { StyledSnackbar } from './StyledSnackbar.tsx';
import Snackbar from './index.tsx';

interface SnackbarMessage {
  id: number;
  message: string;
  variant: 'success' | 'error' | 'info' | 'warning';
  anchororigin: { vertical: 'top' | 'bottom'; horizontal: 'left' | 'right' };
}

const SnackbarContainer: React.FC<SnackbarContainerProps> = ({
  anchororigin,
}) => {
  const [snackbars, setSnackbars] = useState<SnackbarMessage[]>([]);
  const [containerVisible, setContainerVisible] = useState(true);

  useEffect(() => {
    const handleAddSnackbar = (event: CustomEvent<SnackbarMessage>) => {
      setSnackbars((prev) => [...prev, event.detail]);
      setContainerVisible(true);
    };

    window.addEventListener('addSnackbar', handleAddSnackbar as EventListener);

    return () => {
      window.removeEventListener(
        'addSnackbar',
        handleAddSnackbar as EventListener
      );
    };
  }, []);

  useEffect(() => {
    if (snackbars.length > 0) {
      const timer = setTimeout(() => {
        setContainerVisible(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [snackbars]);

  const removeSnackbar = (id: number) => {
    setSnackbars((prev) => prev.filter((snackbar) => snackbar.id !== id));
  };

  return (
    <StyledSnackbar anchororigin={anchororigin} visible={containerVisible}>
      {snackbars.map((snackbar) => (
        <Snackbar
          key={snackbar.id}
          message={snackbar.message}
          variant={snackbar.variant}
          anchororigin={snackbar.anchororigin}
          onClose={() => removeSnackbar(snackbar.id)}
        />
      ))}
    </StyledSnackbar>
  );
};

export default SnackbarContainer;
