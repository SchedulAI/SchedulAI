import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";

interface SnackbarProps {
  anchorOrigin: {
    vertical: "top" | "bottom";
    horizontal: "left" | "center" | "right";
  };
  variant: "success" | "error";
  message: string;
}

const SnackbarContainer = styled.div<{
  anchorOrigin: SnackbarProps["anchorOrigin"];
  variant: SnackbarProps["variant"];
  visible: boolean;
}>`
  position: fixed;
  ${({ anchorOrigin }) => css`
    ${anchorOrigin.vertical}: 20px;
    ${anchorOrigin.horizontal}: 20px;
  `}
  padding: 16px;
  border-radius: 4px;
  color: white;
  background-color: ${({ variant }) =>
    variant === "success" ? "#90BE6D" : "#F94144"};
  z-index: 1000;
  transition: opacity 0.5s ease-in-out;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
`;

const Snackbar: React.FC<SnackbarProps> = ({
  anchorOrigin,
  variant,
  message,
}) => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 50000000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SnackbarContainer
      anchorOrigin={anchorOrigin}
      variant={variant}
      visible={visible}
    >
      {message}
    </SnackbarContainer>
  );
};

export default Snackbar;
