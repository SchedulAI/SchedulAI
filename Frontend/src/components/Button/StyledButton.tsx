import styled from 'styled-components';

export const StyledButton = styled.button<{
  width: 'full' | 'fit';
}>`
  width: ${({ width }) => (width === 'full' ? '100%' : 'fit-content')};
  background: ${(props) => props.theme.colors.buttonPrimaryBackground};
  gap: 4px;
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
    background: ${(props) => props.theme.colors.buttonPrimaryHoverBackground};
  }

  &:active {
    background: ${(props) => props.theme.colors.buttonPrimaryActiveBackground};
  }
`;
