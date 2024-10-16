import styled, { css } from 'styled-components';

export const SnackbarContainer = styled.div<{
  anchororigin: SnackbarProps['anchororigin'];
  variant: SnackbarProps['variant'];
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
    variant === 'success' ? '#90BE6D' : '#F94144'};
  z-index: 1000;
  transition: opacity 0.5s ease-in-out;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  display: ${({ visible }) => (visible ? 'flex' : 'none')};
  user-select: none;
`;
