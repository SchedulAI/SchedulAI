import styled from 'styled-components';

export const LoginStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
  height: 100%;
  position: relative;
  color: #0a0a15;

  .btn-back-div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 8px;
    top: 0;
    left: 0;
    padding: 32px;
  }

  .login-div-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    width: 100%;
    height: 100%;
  }

  .login-title-div {
    width: 390px;
    text-align: left;

    h1 {
      font-size: 3.16rem;
      font-weight: 600;
    }

    span {
      font-size: 1rem;
      font-weight: 400;
      color: #0a0a15;
      opacity: 50%;
    }
  }

  .login-field {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    width: 100%;
  }

  .input-email,
  .input-password {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: fit-content;
    gap: 8px;
  }

  .input-email label,
  .input-password label {
    padding-left: 4px;
    font-weight: 500;
  }

  .login-remember-me-div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    width: 390px;
    font-size: 0.875rem;
  }

  #forget-password {
    font-size: 0.875rem;
  }

  #forget-password span {
    font-weight: 500;
  }

  .login-enter-register-div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    width: 390px;
  }

  #login-a-create-account {
    font-size: 0.875rem;
  }

  #login-a-create-account span {
    font-weight: 500;
  }
`;
