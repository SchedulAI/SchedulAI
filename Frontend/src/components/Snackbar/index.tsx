import React, { useState, useEffect } from 'react';

interface SnackbarProps {
  variant: 'success' | 'error' | 'info' | 'warning';
  message: string;
  onClose: () => void;
}

const Snackbar: React.FC<SnackbarProps> = ({ variant, message, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible) {
      const timer = setTimeout(() => {
        onClose();
      }, 300); // Tempo para a animação de fechamento

      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div
      className={`snackbar snackbar-${variant}`}
      style={{
        position: 'relative',
        marginBottom: '10px',
        transition: 'opacity 0.3s',
        opacity: visible ? 1 : 0,
      }}
    >
      <p>{message}</p>
    </div>
  );
};

export default Snackbar;
