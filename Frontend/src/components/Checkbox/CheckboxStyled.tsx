import styled from 'styled-components';

export const CheckboxStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: fit-content;

  -webkit-appearance: none;
  appearance: none;
  cursor: pointer;
  opacity: 50%;
  outline: none;

  .label {
    color: #0a0a15;
    width: fit-content;
    cursor: pointer;
    user-select: none;
  }

  .container-checkbox {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
  }

  &.checked {
    width: 12px;
    height: 12px;
    border: 1px solid #0a0a15;
    cursor: pointer;
    outline: none;
  }

  &.checked:checked {
    background-color: #646cff;
  }
`;
