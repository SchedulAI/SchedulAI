import styled from 'styled-components';

export const FooterStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background: ${(props) => props.theme.colors.backgroundPrimary};
  border: 1px solid ${(props) => props.theme.colors.backgroundDark};

  .logo {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
  }

  .social {
    cursor: pointer;
    display: flex;
    gap: 8px;
    gap: 1rem;
    align-items: center;
  }
`;
