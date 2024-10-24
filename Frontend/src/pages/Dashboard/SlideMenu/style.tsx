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
    /* position: relative; */

    .slidemenu-header{
      width: 100%;
      position: relative;
    }

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

      .host-cards, .guest-cards {
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

  .refresh-div {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
  }

  .hidden {
    display: none;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .rotate {
    animation: rotate 2s linear infinite;
  }
`;
