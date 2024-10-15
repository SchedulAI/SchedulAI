import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";

interface SnackbarProps {
  anchororigin: {
    vertical: "top" | "bottom";
    horizontal: "left" | "center" | "right";
  };
  variant: "success" | "error";
  message: string;
}

const SnackbarContainer = styled.div<{
  anchororigin: SnackbarProps["anchororigin"];
  variant: SnackbarProps["variant"];
  visible: boolean;
}>`
  position: fixed;
  ${({ anchororigin }) => css`
    ${anchororigin.vertical}: 20px;
    ${anchororigin.horizontal}: 20px;
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
