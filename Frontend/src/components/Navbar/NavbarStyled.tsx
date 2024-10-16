import styled from 'styled-components';

export const NavbarStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  position: fixed;
  background: #f8f8fc;
  width: 100%;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
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
