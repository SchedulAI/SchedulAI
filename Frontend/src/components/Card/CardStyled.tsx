import styled from 'styled-components';

export const CardStyled = styled.div<{ visibility: '1' | '0' }>`
  opacity: ${(props) => props.visibility};
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  height: fit-content;
  width: 100%;
  padding: 0.5rem;
  gap: 8px;
  border-radius: 4px;
  background-color: #bbbae1;
  color: black;
  cursor: pointer;
  user-select: none;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px;

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
    max-width: 100%;

    p {
      word-wrap: break-word;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 14rem;
      flex-grow: 1;
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
  }
`;
