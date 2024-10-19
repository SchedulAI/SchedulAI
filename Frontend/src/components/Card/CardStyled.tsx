import styled from 'styled-components';

export const CardStyled = styled.div<{ display: 'none' | 'flex' }>`
  display: ${(props) => props.display};
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  height: fit-content;
  width: 100%;
  padding: 0.5rem;
  gap: 8px;
  border: 1px solid #c8c6ee;
  border-radius: 4px;
  background-color: #bbbae1;
  color: black;
  transition: all ease-in-out 0.3s;
  cursor: pointer;
  user-select: none;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;

  .div-subject {
    font-weight: 500;
    font-size: 1.04rem;
    height: 19px;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    p {
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .div-data-status {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    font-weight: 400;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    p {
      color: #0a0a1575;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .div-status {
    display: flex;
    align-items: center;
    gap: 8px;

    p {
      color: #0a0a1575;
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
    background-color: #c9c8e9;
    border: 1px solid #b4b2e1;
  }
`;
