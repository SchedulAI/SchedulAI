import styled from 'styled-components';

export const SideMenuStyled = styled.div`
  & {
    border-right: 1px solid ${(props) => props.theme.colors.backgroundDarker};
    background: ${(props) => props.theme.colors.backgroundDark};
    padding: 0.75rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    min-width: fit-content;
    max-width: 20rem;
    width: 0%;
    transition: width 300ms ease;
    gap: 1rem;

    .slide-bar-div-button {
      width: fit-content;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 4px;
      border-radius: 4px;
      cursor: pointer;
      position: relative;
    }

    .slide-bar-menu {
      transition: width 100ms ease;
    }

    .slide-bar-menu-close {
      width: 0px;
    }

    .slide-bar-menu-open {
      width: 100%;
    }

    .sideBar-content {
      width: 0%;
      gap: 1rem;
      display: flex;
      flex-direction: column;
      overflow: hidden;

      .host-cards {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }
    }
  }

  &.div-cover-open {
    width: 100%;

    .sideBar-content {
      flex-direction: column;
      width: 100%;
    }
  }

  .bold-card {
    font-weight: 600;
  }
`;
