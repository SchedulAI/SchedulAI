import styled from 'styled-components';

export const NavbarStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  position: fixed;
  background: ${(props) => props.theme.colors.backgroundPrimary};
  border: 1px solid ${(props) => props.theme.colors.backgroundDark};
  width: 100%;
  z-index: 100;

  .logo {
    display: flex;
    align-items: center;
    color: #0a0a15;
    gap: 0.5rem;
    user-select: none;
    cursor: pointer;
  }

  .nav {
    ul {
      display: flex;
      gap: 4rem;

      padding: 0;
      li {
        list-style: none;

        a {
          font-weight: 500;
        }
      }
    }
  }

  .buttons {
    display: flex;
    align-items: center;
    gap: 2rem;

    p {
      font-weight: 400;
    }
  }
`;
