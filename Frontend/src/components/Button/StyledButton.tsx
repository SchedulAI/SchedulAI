import styled from 'styled-components';

export const StyledButton = styled.button<{
  width: 'full' | 'fit';
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  border: 1px solid #7d79e6;
  border-radius: 4px;
  background-color: #8380e5;
  color: #0a0a15;
  transition: all ease-in-out 0.3s;
  width: ${({ width }) => (width === 'full' ? '100%' : 'fit-content')};

  > * {
    white-space: nowrap;
    margin: 0px;
  }

  &:hover {
    background-color: #7a77da;
    border: 1px solid #716ed2;
  }

  &:focus {
    background-color: #6e6bd0;
    border: 1px solid #6663c8;
  }

  &:disabled {
    background-color: #7a77da;
    border: 1px solid #7a77da;
    opacity: 50%;
    cursor: not-allowed;
  }
`;
