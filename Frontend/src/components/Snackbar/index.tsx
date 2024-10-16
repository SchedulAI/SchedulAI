import React, { useState, useEffect } from 'react';
import { SnackbarContainer } from './SnackbarContainer';

const Snackbar: React.FC<SnackbarProps> = ({
  anchororigin,
  variant,
  message,
}) => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SnackbarContainer
      anchororigin={anchororigin}
      variant={variant}
      visible={visible}
    >
      {message}
    </SnackbarContainer>
  );
};

export default Snackbar;
