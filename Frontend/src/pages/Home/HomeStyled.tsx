import styled from 'styled-components';

export const HomeStyled = styled.div`
  position: relative;

  .main-section {
    padding: 0rem 2rem;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    position: relative;

    .title-div {
      width: 1090px;
      h1 {
        font-size: 4.21rem;
        text-align: center;
        color: #000000;
      }
    }

    .start-now-div {
      display: flex;
      gap: 1rem;
      align-items: center;
      justify-content: center;

      a {
        cursor: pointer;
      }
    }

    .div-arrow-down {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      bottom: 60px;
      border-radius: 100%;
      height: 50px;
      width: 50px;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      transition: all ease-in-out 0.4s;

      &:hover {
        background-color: ${(props) =>
          props.theme.colors.buttonPrimaryBackground};
      }
    }
  }

  .news-section {
    padding: 0rem 2rem;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    justify-content: center;

    h2 {
      font-size: 3.16rem;
      color: #0a0a15;
    }

    .div-content {
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 1rem;

      h3 {
        font-weight: 500;
        font-size: 2.37rem;
      }

      p {
        text-align: center;
        color: #0a0a15;
        max-width: 40rem;
      }
    }
  }

  .about-section {
    height: 100vh;
    color: #0a0a15;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;

    h2 {
      font-size: 3.16rem;
      color: #0a0a15;
    }

    .div-content {
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 1rem;

      h3 {
        font-weight: 500;
        font-size: 2.37rem;
      }

      p {
        text-align: center;
        color: #0a0a15;
        max-width: 40rem;
      }
    }

    .div-about-list {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      align-self: center;

      ul {
        list-style-type: circle;
        padding: 1rem 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        gap: 8px;

        p {
          font-weight: 400;
        }

        li {
          flex: 1;
          text-align: center;
          width: fit-content;
        }
      }
    }
  }
`;
