import styled from 'styled-components';

export const StyledButton = styled.button<{
  width: 'full' | 'fit';
  disabled?: boolean;
}>`
  width: ${({ width }) => (width === 'full' ? '100%' : 'fit-content')};
  background: ${(props) =>
    props.disabled
      ? props.theme.colors.backgroundDark
      : props.theme.colors.buttonPrimaryBackground};
  gap: 8px;
  padding: 0.75rem 1rem;
  border: none;
  transition: background-color 0.1s ease-in-out;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 4px;
  justify-content: center;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px;

  > * {
    white-space: nowrap;
    margin: 0px;
  }

  > p,
  span,
  a {
    font-size: 1rem;
    line-height: 1.5rem;
    color: ${(props) => props.theme.colors.backgroundPrimary};
    font-weight: 400;
  }

  &:hover {
    background: ${(props) =>
      props.disabled
        ? props.theme.colors.backgroundDark
        : props.theme.colors.buttonPrimaryHoverBackground};
  }

  &:active {
    background: ${(props) =>
      props.disabled
        ? props.theme.colors.backgroundDark
        : props.theme.colors.buttonPrimaryActiveBackground};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;
