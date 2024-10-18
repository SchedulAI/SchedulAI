import React, { useState, useEffect } from 'react';



const Snackbar: React.FC<SnackbarProps> = ({ variant, message, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible) return null;

  return (
    <div
      className={`snackbar snackbar-${variant}`}
      style={{ position: 'relative', marginBottom: '10px' }}
    >
      <p>{message}</p>
    </div>
  );
};

export default Snackbar;
