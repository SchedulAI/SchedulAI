import styled, { css } from 'styled-components';

export const StyledSnackbar = styled.div<SnackbarContainerProps>`
  position: fixed;
  z-index: 1000;
  ${({ anchororigin }) => css`
    ${anchororigin.vertical}: 20px;
    ${anchororigin.horizontal}: 20px;
  `}
  transition: opacity 0.5s ease-in-out;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  display:flex;
  flex-direction: column;
  align-items: flex-end;

  .snackbar {
    padding: 1rem;
    width: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
  }

  .snackbar-success {
    background-color: #5eef76;
  }

  .snackbar-error {
    background-color: #ef5e5e;
  }

  .snackbar-info {
    background-color: #e8ef5e;
  }

  .snackbar-warning {
    background-color: #efa65e;
  }
`;
