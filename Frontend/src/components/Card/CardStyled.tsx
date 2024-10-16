import styled from 'styled-components';

export const CardStyled = styled.div<{ display: 'none' | 'flex' }>`
  display: ${(props) => props.display};
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  height: 78px;
  width: 100%;
  padding: 1rem;
  gap: 8px;
  border: 1px solid #c8c6ee;
  border-radius: 4px;
  background-color: #bbbae1;
  color: black;
  transition: all ease-in-out 0.3s;
  cursor: pointer;
  user-select: none;

  .div-subject {
    font-weight: 500;
    height: 19px;
  }

  .div-data-status {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 19px;
    font-weight: 400;

    p {
      color: #2a2a42;
    }
  }

  .div-status {
    display: flex;
    align-items: center;
    gap: 8px;

    p {
      color: #2a2a42;
    }
  }

  .status-circle {
    border-radius: 100%;
    height: 8px;
    width: 8px;
  }

  .yellow {
    background-color: #e2e21c;
  }

  .green {
    background-color: #38d44f;
  }

  .red {
    background-color: #dc2828;
  }

  &:hover {
    background-color: #bebce7;
    border: 1px solid #b4b2e1;
  }
`;