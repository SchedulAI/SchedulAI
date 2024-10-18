import styled from 'styled-components';

export const FooterStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #0a0a15;

  .logo {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
  }

  p {
    color: #f7f7f7;
  }

  .social {
    cursor: pointer;
    display: flex;
    gap: 8px;
    gap: 1rem;
    align-items: center;
  }
`;
